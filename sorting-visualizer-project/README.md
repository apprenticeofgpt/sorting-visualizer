# 정렬 알고리즘 시각화 프로젝트

## 프로젝트 개요

이 프로젝트는 다양한 정렬 및 검색 알고리즘을 시각적으로 보여주는 웹 애플리케이션입니다. React와 TypeScript를 사용한 프론트엔드와 Flask를 사용한 백엔드로 구성되어 있으며, 알고리즘의 동작 과정을 단계별로 시각화하여 교육적 목적으로 활용할 수 있습니다.

## 주요 기능

- **정렬 알고리즘 시각화**
  - 버블 정렬 (Bubble Sort)
  - 삽입 정렬 (Insertion Sort)
  - 선택 정렬 (Selection Sort)

- **검색 알고리즘 시각화**
  - 선형 검색 (Linear Search)

- **인터랙티브 기능**
  - 알고리즘 선택 및 실행
  - 애니메이션 속도 조절 (느림/중간/빠름)
  - 재생/일시정지/리셋 기능
  - 단계별 진행 (이전/다음)
  - 배열 크기 조절 (10-100 요소)
  - 랜덤 배열 생성
  - 수동 배열 입력

- **알고리즘 정보 제공**
  - 시간 복잡도 (최선/평균/최악)
  - 공간 복잡도
  - 알고리즘 설명
  - 의사 코드
  - 단계별 실행 설명

## 기술 스택

### 프론트엔드
- React
- TypeScript
- Tailwind CSS
- Context API (상태 관리)

### 백엔드
- Flask (Python)
- RESTful API

## 설치 및 실행 방법

### 백엔드 설정

1. 백엔드 디렉토리로 이동
```bash
cd backend
```

2. 가상 환경 활성화
```bash
source venv/bin/activate  # Linux/Mac
# 또는
venv\Scripts\activate  # Windows
```

3. 필요한 패키지 설치
```bash
pip install -r requirements.txt
```

4. 서버 실행
```bash
python src/main.py
```

### 프론트엔드 설정

1. 프론트엔드 디렉토리로 이동
```bash
cd frontend
```

2. 필요한 패키지 설치
```bash
npm install
# 또는
pnpm install
```

3. 개발 서버 실행
```bash
npm run dev
# 또는
pnpm run dev
```

4. 브라우저에서 `http://localhost:5173` 접속

## 프로젝트 구조

```
SortingVisualizerProject/
├── backend/                # Flask 백엔드
│   ├── venv/              # 가상 환경
│   ├── src/
│   │   ├── main.py        # 애플리케이션 진입점
│   │   ├── algorithms/    # 알고리즘 구현
│   │   └── routes/        # API 라우트
│   └── requirements.txt   # 의존성 목록
│
├── frontend/              # React 프론트엔드
│   ├── public/            # 정적 파일
│   ├── src/
│   │   ├── components/    # UI 컴포넌트
│   │   ├── contexts/      # 컨텍스트 API
│   │   ├── App.tsx        # 루트 컴포넌트
│   │   └── main.tsx       # 진입점
│   ├── package.json       # 의존성 및 스크립트
│   └── tailwind.config.js # Tailwind 설정
│
└── Algorithms/            # 원본 Python 알고리즘 (참조용)
    ├── Sort/
    └── Search/
```

## API 엔드포인트

- `GET /api/algorithms`: 지원되는 모든 알고리즘 목록 반환
- `GET /api/algorithms/{algorithm_name}`: 특정 알고리즘의 상세 정보 반환
- `POST /api/execute`: 알고리즘 실행 및 단계별 결과 반환

## 사용 방법

1. 알고리즘 선택: 드롭다운 메뉴에서 원하는 알고리즘 선택
2. 배열 설정: 슬라이더로 배열 크기 조절 또는 수동으로 배열 입력
3. 검색 알고리즘의 경우: 검색할 값 입력
4. 알고리즘 실행: '알고리즘 실행' 버튼 클릭
5. 애니메이션 제어: 재생/일시정지/리셋/이전/다음 버튼으로 시각화 제어
6. 속도 조절: 드롭다운 메뉴에서 애니메이션 속도 선택

## 배포 정보

이 프로젝트는 다음 URL에서 라이브로 확인할 수 있습니다:
[정렬 알고리즘 시각화 라이브 데모](https://sorting-visualizer-demo.example.com)

## 향후 개선 사항

- 추가 정렬 알고리즘 구현 (퀵 정렬, 병합 정렬, 힙 정렬 등)
- 추가 검색 알고리즘 구현 (이진 검색 등)
- 다크 모드 지원
- 알고리즘 성능 비교 기능
- 다국어 지원

## 라이선스

MIT License
