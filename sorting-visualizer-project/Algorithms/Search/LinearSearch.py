"""
선형 검색(Linear Search) 알고리즘 구현

시간 복잡도:
- 최악의 경우: O(n)
- 평균의 경우: O(n)
- 최선의 경우: O(1) (찾는 원소가 배열의 첫 번째 위치에 있는 경우)

공간 복잡도: O(1)

작동 방식:
1. 배열의 첫 번째 원소부터 마지막 원소까지 순차적으로 검색
2. 각 원소를 찾고자 하는 값과 비교
3. 일치하는 원소를 찾으면 해당 인덱스 반환
4. 배열의 모든 원소를 검색해도 찾지 못하면 -1 반환
"""

def linear_search(arr, target):
    """
    선형 검색 알고리즘
    
    Args:
        arr (list): 검색할 배열
        target: 찾고자 하는 값
        
    Returns:
        int: 찾은 원소의 인덱스 (없으면 -1)
        list: 검색 과정의 각 단계를 담은 배열
    """
    # 검색 과정의 각 단계를 저장할 배열
    steps = []
    
    # 배열의 복사본 생성 (원본 배열 변경 방지)
    arr_copy = arr.copy()
    
    # 초기 상태 저장
    steps.append({
        'array': arr_copy.copy(),
        'comparingIndices': [],
        'foundIndex': -1
    })
    
    # 배열의 모든 원소에 대해 반복
    for i in range(len(arr_copy)):
        # 현재 비교 중인 인덱스 저장
        comparing_indices = [i]
        
        # 현재 상태 저장 (비교 중)
        steps.append({
            'array': arr_copy.copy(),
            'comparingIndices': comparing_indices,
            'foundIndex': -1
        })
        
        # 현재 원소가 찾고자 하는 값과 일치하는지 확인
        if arr_copy[i] == target:
            # 찾은 경우 상태 저장
            steps.append({
                'array': arr_copy.copy(),
                'comparingIndices': [],
                'foundIndex': i
            })
            
            return i, steps
    
    # 찾지 못한 경우 상태 저장
    steps.append({
        'array': arr_copy.copy(),
        'comparingIndices': [],
        'foundIndex': -1
    })
    
    return -1, steps

# 테스트
if __name__ == "__main__":
    test_array = [64, 34, 25, 12, 22, 11, 90]
    target_value = 22
    
    found_index, search_steps = linear_search(test_array, target_value)
    
    print("배열:", test_array)
    print("찾는 값:", target_value)
    print("찾은 인덱스:", found_index)
    print("검색 단계 수:", len(search_steps))
