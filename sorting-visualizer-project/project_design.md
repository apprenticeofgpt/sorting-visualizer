# 정렬 알고리즘 시각화 프로젝트 설계 문서

## 1. 전체 애플리케이션 구조

### 1.1 아키텍처 개요
- **프론트엔드**: React + TypeScript + Tailwind CSS
- **백엔드**: Flask (Python)
- **통신 방식**: RESTful API

### 1.2 주요 구성 요소
```
SortingVisualizerProject/
├── backend/                # Flask 백엔드
│   ├── venv/              # 가상 환경
│   ├── src/
│   │   ├── main.py        # 애플리케이션 진입점
│   │   ├── routes/        # API 라우트
│   │   ├── models/        # 데이터 모델
│   │   └── algorithms/    # 알고리즘 구현
│   └── requirements.txt   # 의존성 목록
│
├── frontend/              # React 프론트엔드
│   ├── public/            # 정적 파일
│   ├── src/
│   │   ├── components/    # UI 컴포넌트
│   │   ├── hooks/         # 커스텀 훅
│   │   ├── contexts/      # 컨텍스트 API
│   │   ├── types/         # TypeScript 타입 정의
│   │   ├── utils/         # 유틸리티 함수
│   │   ├── App.tsx        # 루트 컴포넌트
│   │   └── index.tsx      # 진입점
│   ├── package.json       # 의존성 및 스크립트
│   └── tailwind.config.js # Tailwind 설정
│
└── Algorithms/            # 원본 Python 알고리즘 (참조용)
    ├── Sort/
    └── Search/
```

## 2. 백엔드 설계

### 2.1 API 엔드포인트
- **GET /api/algorithms**: 지원되는 모든 알고리즘 목록 반환
- **GET /api/algorithms/{algorithm_name}**: 특정 알고리즘의 상세 정보 반환
- **POST /api/execute**: 알고리즘 실행 및 단계별 결과 반환

### 2.2 데이터 모델
```python
# 알고리즘 정보 모델
class AlgorithmInfo:
    name: str                  # 알고리즘 이름
    type: str                  # 'sort' 또는 'search'
    description: str           # 알고리즘 설명
    time_complexity: dict      # 시간 복잡도 (최선/평균/최악)
    space_complexity: str      # 공간 복잡도
    pseudocode: list[str]      # 의사 코드 단계

# 알고리즘 실행 요청 모델
class ExecuteRequest:
    algorithm: str             # 알고리즘 이름
    array: list[int]           # 입력 배열
    target: Optional[int]      # 검색 대상 (검색 알고리즘용)

# 알고리즘 실행 응답 모델
class ExecuteResponse:
    result: Union[list[int], int]  # 정렬된 배열 또는 검색 결과 인덱스
    steps: list[dict]          # 알고리즘 실행 단계
```

### 2.3 알고리즘 모듈 구조
- 각 알고리즘은 독립적인 모듈로 구현
- 공통 인터페이스를 통해 일관된 입출력 형식 유지
- 알고리즘 메타데이터(복잡도, 설명 등)를 함께 관리

## 3. 프론트엔드 설계

### 3.1 컴포넌트 계층 구조
```
App
├── Header
├── AlgorithmSelector
├── VisualizerControls
│   ├── ArraySizeSlider
│   ├── SpeedController
│   ├── PlaybackControls
│   └── ArrayGenerator
├── Visualizer
│   ├── ArrayBars
│   └── StepIndicator
├── AlgorithmInfo
│   ├── ComplexityInfo
│   └── StepExplanation
└── Footer
```

### 3.2 주요 컴포넌트 설명

#### 3.2.1 AlgorithmSelector
- 알고리즘 유형(정렬/검색) 및 구체적인 알고리즘 선택
- 드롭다운 메뉴 형태로 구현

#### 3.2.2 VisualizerControls
- 배열 크기 조절 슬라이더 (10-100)
- 애니메이션 속도 조절 (느림/중간/빠름)
- 재생/일시정지/리셋 버튼
- 새 랜덤 배열 생성 버튼
- 수동 배열 입력 옵션

#### 3.2.3 Visualizer
- 배열 요소를 막대 그래프로 시각화
- 현재 비교/교환 중인 요소 강조 표시
- 단계별 진행 상태 표시

#### 3.2.4 AlgorithmInfo
- 선택된 알고리즘의 시간/공간 복잡도 표시
- 알고리즘 설명 및 의사 코드 표시
- 현재 실행 중인 단계에 대한 설명 표시

### 3.3 상태 관리 전략
- **React Context API** 사용
  - AlgorithmContext: 알고리즘 선택 및 정보 관리
  - VisualizerContext: 배열 데이터 및 시각화 상태 관리
  - AnimationContext: 애니메이션 제어 상태 관리

- **주요 상태 항목**:
  - 선택된 알고리즘
  - 입력 배열
  - 알고리즘 실행 단계
  - 현재 표시 중인 단계 인덱스
  - 애니메이션 상태 (재생/일시정지)
  - 애니메이션 속도

### 3.4 API 통신 전략
- Axios 라이브러리를 사용한 HTTP 요청 처리
- 커스텀 훅을 통한 API 호출 추상화
- 로딩 및 에러 상태 관리

## 4. UI/UX 디자인 방향

### 4.1 레이아웃
- 반응형 디자인 (모바일, 태블릿, 데스크톱 지원)
- 상단 헤더: 제목, 알고리즘 선택기
- 중앙 영역: 시각화 컴포넌트
- 하단 영역: 제어 패널 및 알고리즘 정보

### 4.2 색상 팔레트
- 기본 배경: 밝은 중성색
- 막대 그래프: 그라데이션 블루
- 비교 중인 요소: 노란색 또는 주황색
- 교환된 요소: 빨간색
- 정렬 완료 요소: 녹색
- 찾은 요소: 보라색

### 4.3 애니메이션
- 부드러운 막대 높이 전환 효과
- 요소 교환 시 크로스페이드 효과
- 속도 조절에 따른 애니메이션 타이밍 조정

### 4.4 접근성
- 키보드 탐색 지원
- 고대비 모드 옵션
- 스크린 리더 호환성

## 5. 기술적 고려사항

### 5.1 성능 최적화
- 대규모 배열 처리를 위한 가상화 기법 적용
- 메모이제이션을 통한 불필요한 렌더링 방지
- 애니메이션 성능을 위한 CSS 트랜지션 활용

### 5.2 오류 처리
- 사용자 입력 유효성 검사
- API 오류 처리 및 사용자 피드백
- 예외 상황 로깅

### 5.3 확장성
- 새로운 알고리즘 추가가 용이한 모듈식 구조
- 다양한 시각화 옵션 지원 가능
- 다국어 지원 준비

## 6. 구현 우선순위

1. 기본 백엔드 API 구현
2. 핵심 시각화 컴포넌트 개발
3. 알고리즘 실행 및 애니메이션 로직 구현
4. 사용자 제어 기능 추가
5. 알고리즘 정보 및 설명 통합
6. UI 디자인 개선 및 반응형 지원
7. 오류 처리 및 예외 상황 대응
8. 성능 최적화 및 테스트
