from flask import Flask, request, jsonify
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))  # DON'T CHANGE THIS !!!

# 알고리즘 모듈 임포트
from src.algorithms.bubble_sort import bubble_sort
from src.algorithms.insertion_sort import insertion_sort
from src.algorithms.selection_sort import selection_sort
from src.algorithms.linear_search import linear_search

# 알고리즘 정보 데이터
ALGORITHM_INFO = {
    "bubble_sort": {
        "name": "버블 정렬 (Bubble Sort)",
        "type": "sort",
        "description": "인접한 두 원소를 비교하여 순서가 잘못되어 있으면 교환하는 방식으로 동작하는 정렬 알고리즘입니다.",
        "time_complexity": {
            "best": "O(n)",
            "average": "O(n²)",
            "worst": "O(n²)"
        },
        "space_complexity": "O(1)",
        "pseudocode": [
            "for i from 0 to n-1",
            "  for j from 0 to n-i-1",
            "    if array[j] > array[j+1]",
            "      swap array[j] and array[j+1]"
        ]
    },
    "insertion_sort": {
        "name": "삽입 정렬 (Insertion Sort)",
        "type": "sort",
        "description": "배열을 정렬된 부분과 정렬되지 않은 부분으로 나누고, 정렬되지 않은 부분의 원소를 정렬된 부분의 적절한 위치에 삽입하는 정렬 알고리즘입니다.",
        "time_complexity": {
            "best": "O(n)",
            "average": "O(n²)",
            "worst": "O(n²)"
        },
        "space_complexity": "O(1)",
        "pseudocode": [
            "for i from 1 to n-1",
            "  key = array[i]",
            "  j = i - 1",
            "  while j >= 0 and array[j] > key",
            "    array[j+1] = array[j]",
            "    j = j - 1",
            "  array[j+1] = key"
        ]
    },
    "selection_sort": {
        "name": "선택 정렬 (Selection Sort)",
        "type": "sort",
        "description": "배열에서 최소값을 찾아 맨 앞의 원소와 교환하고, 그 다음 원소부터 다시 최소값을 찾는 과정을 반복하는 정렬 알고리즘입니다.",
        "time_complexity": {
            "best": "O(n²)",
            "average": "O(n²)",
            "worst": "O(n²)"
        },
        "space_complexity": "O(1)",
        "pseudocode": [
            "for i from 0 to n-1",
            "  min_idx = i",
            "  for j from i+1 to n-1",
            "    if array[j] < array[min_idx]",
            "      min_idx = j",
            "  swap array[i] and array[min_idx]"
        ]
    },
    "linear_search": {
        "name": "선형 검색 (Linear Search)",
        "type": "search",
        "description": "배열의 각 원소를 순차적으로 확인하며 찾고자 하는 값과 일치하는지 검사하는 검색 알고리즘입니다.",
        "time_complexity": {
            "best": "O(1)",
            "average": "O(n)",
            "worst": "O(n)"
        },
        "space_complexity": "O(1)",
        "pseudocode": [
            "for i from 0 to n-1",
            "  if array[i] == target",
            "    return i",
            "return -1"
        ]
    }
}

# 알고리즘 함수 매핑
ALGORITHM_FUNCTIONS = {
    "bubble_sort": bubble_sort,
    "insertion_sort": insertion_sort,
    "selection_sort": selection_sort,
    "linear_search": linear_search
}

app = Flask(__name__)

@app.route('/')
def index():
    return "정렬 알고리즘 시각화 API 서버"

@app.route('/api/algorithms', methods=['GET'])
def get_algorithms():
    """모든 알고리즘 목록 반환"""
    algorithms = []
    for key, info in ALGORITHM_INFO.items():
        algorithms.append({
            "id": key,
            "name": info["name"],
            "type": info["type"]
        })
    return jsonify(algorithms)

@app.route('/api/algorithms/<algorithm_name>', methods=['GET'])
def get_algorithm_info(algorithm_name):
    """특정 알고리즘의 상세 정보 반환"""
    if algorithm_name not in ALGORITHM_INFO:
        return jsonify({"error": "알고리즘을 찾을 수 없습니다."}), 404
    
    return jsonify(ALGORITHM_INFO[algorithm_name])

@app.route('/api/execute', methods=['POST'])
def execute_algorithm():
    """알고리즘 실행 및 단계별 결과 반환"""
    data = request.json
    
    if not data:
        return jsonify({"error": "요청 본문이 없습니다."}), 400
    
    algorithm = data.get('algorithm')
    array = data.get('array')
    target = data.get('target', None)
    
    if not algorithm:
        return jsonify({"error": "알고리즘을 지정해야 합니다."}), 400
    
    if not array:
        return jsonify({"error": "배열을 제공해야 합니다."}), 400
    
    if not isinstance(array, list):
        return jsonify({"error": "배열은 리스트 형식이어야 합니다."}), 400
    
    if algorithm not in ALGORITHM_FUNCTIONS:
        return jsonify({"error": f"지원하지 않는 알고리즘입니다: {algorithm}"}), 400
    
    try:
        # 알고리즘 유형에 따라 다른 처리
        if ALGORITHM_INFO[algorithm]["type"] == "search":
            if target is None:
                return jsonify({"error": "검색 알고리즘에는 target 값이 필요합니다."}), 400
            result, steps = ALGORITHM_FUNCTIONS[algorithm](array, target)
        else:
            result, steps = ALGORITHM_FUNCTIONS[algorithm](array)
        
        return jsonify({
            "result": result,
            "steps": steps
        })
    except Exception as e:
        return jsonify({"error": f"알고리즘 실행 중 오류가 발생했습니다: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
