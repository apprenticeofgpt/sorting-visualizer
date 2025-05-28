"""
버블 정렬(Bubble Sort) 알고리즘 구현

시간 복잡도:
- 최악의 경우: O(n²)
- 평균의 경우: O(n²)
- 최선의 경우: O(n) (이미 정렬된 배열)

공간 복잡도: O(1)

작동 방식:
1. 인접한 두 원소를 비교하여 순서가 잘못되어 있으면 교환
2. 배열의 끝까지 이 과정을 반복하면 가장 큰 원소가 배열의 끝으로 이동
3. 배열의 크기를 1씩 줄여가며 위 과정을 반복
"""

def bubble_sort(arr):
    """
    버블 정렬 알고리즘
    
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
    
    # 외부 루프: n-1번 반복
    for i in range(n):
        # 최적화: 교환이 일어나지 않으면 이미 정렬된 상태
        swapped = False
        
        # 내부 루프: 아직 정렬되지 않은 부분 배열에 대해 반복
        for j in range(0, n-i-1):
            # 현재 비교 중인 인덱스 저장
            comparing_indices = [j, j+1]
            
            # 현재 상태 저장 (비교 중)
            steps.append({
                'array': arr_copy.copy(),
                'comparingIndices': comparing_indices,
                'swappedIndices': []
            })
            
            # 인접한 원소 비교 및 교환
            if arr_copy[j] > arr_copy[j+1]:
                arr_copy[j], arr_copy[j+1] = arr_copy[j+1], arr_copy[j]
                swapped = True
                
                # 교환 후 상태 저장
                steps.append({
                    'array': arr_copy.copy(),
                    'comparingIndices': [],
                    'swappedIndices': comparing_indices
                })
            
        # 교환이 일어나지 않았다면 이미 정렬된 상태
        if not swapped:
            break
    
    # 최종 정렬된 상태 저장
    steps.append({
        'array': arr_copy.copy(),
        'comparingIndices': [],
        'swappedIndices': []
    })
    
    return arr_copy, steps
