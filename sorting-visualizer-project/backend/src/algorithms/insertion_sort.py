"""
삽입 정렬(Insertion Sort) 알고리즘 구현

시간 복잡도:
- 최악의 경우: O(n²)
- 평균의 경우: O(n²)
- 최선의 경우: O(n) (이미 정렬된 배열)

공간 복잡도: O(1)

작동 방식:
1. 배열을 정렬된 부분과 정렬되지 않은 부분으로 나눔
2. 정렬되지 않은 부분에서 첫 번째 원소를 선택
3. 정렬된 부분에서 해당 원소가 들어갈 적절한 위치를 찾아 삽입
4. 모든 원소가 정렬될 때까지 2-3 과정을 반복
"""

def insertion_sort(arr):
    """
    삽입 정렬 알고리즘
    
    Args:
        arr (list): 정렬할 배열
        
    Returns:
        list: 정렬된 배열
        list: 정렬 과정의 각 단계를 담은 배열
    """
    # 정렬 과정의 각 단계를 저장할 배열
    steps = []
    
    # 배열의 복사본 생성 (원본 배열 변경 방지)
    arr_copy = arr.copy()
    
    # 초기 상태 저장
    steps.append({
        'array': arr_copy.copy(),
        'comparingIndices': [],
        'swappedIndices': []
    })
    
    n = len(arr_copy)
    
    # 첫 번째 원소는 이미 정렬된 것으로 간주
    for i in range(1, n):
        # 현재 삽입할 원소
        key = arr_copy[i]
        # 정렬된 부분의 마지막 인덱스
        j = i - 1
        
        # 현재 상태 저장 (삽입할 원소 선택)
        steps.append({
            'array': arr_copy.copy(),
            'comparingIndices': [i],
            'swappedIndices': []
        })
        
        # 정렬된 부분에서 key보다 큰 원소들을 오른쪽으로 이동
        while j >= 0 and arr_copy[j] > key:
            # 비교 중인 인덱스 저장
            comparing_indices = [j, j+1]
            
            # 현재 상태 저장 (비교 중)
            steps.append({
                'array': arr_copy.copy(),
                'comparingIndices': comparing_indices,
                'swappedIndices': []
            })
            
            # 원소 이동
            arr_copy[j+1] = arr_copy[j]
            
            # 이동 후 상태 저장
            steps.append({
                'array': arr_copy.copy(),
                'comparingIndices': [],
                'swappedIndices': comparing_indices
            })
            
            j -= 1
        
        # key를 적절한 위치에 삽입
        arr_copy[j+1] = key
        
        # 삽입 후 상태 저장
        steps.append({
            'array': arr_copy.copy(),
            'comparingIndices': [],
            'swappedIndices': [j+1]
        })
    
    # 최종 정렬된 상태 저장
    steps.append({
        'array': arr_copy.copy(),
        'comparingIndices': [],
        'swappedIndices': []
    })
    
    return arr_copy, steps
