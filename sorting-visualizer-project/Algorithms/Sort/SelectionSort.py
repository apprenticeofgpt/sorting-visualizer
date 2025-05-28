"""
선택 정렬(Selection Sort) 알고리즘 구현

시간 복잡도:
- 최악의 경우: O(n²)
- 평균의 경우: O(n²)
- 최선의 경우: O(n²)

공간 복잡도: O(1)

작동 방식:
1. 정렬되지 않은 부분에서 최소값(또는 최대값)을 찾음
2. 최소값을 정렬되지 않은 부분의 첫 번째 원소와 교환
3. 정렬된 부분의 크기를 1 증가시킴
4. 배열이 완전히 정렬될 때까지 1-3 과정을 반복
"""

def selection_sort(arr):
    """
    선택 정렬 알고리즘
    
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
    
    # 배열의 모든 원소에 대해 반복
    for i in range(n):
        # 현재 위치를 최소값의 인덱스로 초기화
        min_idx = i
        
        # 현재 상태 저장 (현재 위치 선택)
        steps.append({
            'array': arr_copy.copy(),
            'comparingIndices': [i],
            'swappedIndices': []
        })
        
        # 정렬되지 않은 부분에서 최소값 찾기
        for j in range(i+1, n):
            # 비교 중인 인덱스 저장
            comparing_indices = [min_idx, j]
            
            # 현재 상태 저장 (비교 중)
            steps.append({
                'array': arr_copy.copy(),
                'comparingIndices': comparing_indices,
                'swappedIndices': []
            })
            
            # 현재 최소값보다 작은 값을 찾으면 최소값 인덱스 갱신
            if arr_copy[j] < arr_copy[min_idx]:
                min_idx = j
                
                # 최소값 갱신 후 상태 저장
                steps.append({
                    'array': arr_copy.copy(),
                    'comparingIndices': [min_idx],
                    'swappedIndices': []
                })
        
        # 최소값이 현재 위치가 아니면 교환
        if min_idx != i:
            # 교환할 인덱스 저장
            swapped_indices = [i, min_idx]
            
            # 원소 교환
            arr_copy[i], arr_copy[min_idx] = arr_copy[min_idx], arr_copy[i]
            
            # 교환 후 상태 저장
            steps.append({
                'array': arr_copy.copy(),
                'comparingIndices': [],
                'swappedIndices': swapped_indices
            })
    
    # 최종 정렬된 상태 저장
    steps.append({
        'array': arr_copy.copy(),
        'comparingIndices': [],
        'swappedIndices': []
    })
    
    return arr_copy, steps

# 테스트
if __name__ == "__main__":
    test_array = [64, 34, 25, 12, 22, 11, 90]
    sorted_array, sorting_steps = selection_sort(test_array)
    
    print("원본 배열:", test_array)
    print("정렬된 배열:", sorted_array)
    print("정렬 단계 수:", len(sorting_steps))
