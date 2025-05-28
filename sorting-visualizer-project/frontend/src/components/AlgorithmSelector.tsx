import React from 'react';
import { useAlgorithm, AlgorithmType } from '../contexts/AlgorithmContext';

const AlgorithmSelector: React.FC = () => {
  const { 
    algorithms, 
    selectedAlgorithm, 
    setSelectedAlgorithm, 
    loading 
  } = useAlgorithm();
  
  // 알고리즘 유형별 그룹화
  const sortAlgorithms = algorithms.filter(algo => algo.type === 'sort');
  const searchAlgorithms = algorithms.filter(algo => algo.type === 'search');
  
  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(e.target.value as AlgorithmType);
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">알고리즘 선택</h2>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedAlgorithm || ''}
          onChange={handleAlgorithmChange}
          disabled={loading}
        >
          <option value="">알고리즘을 선택하세요</option>
          
          {sortAlgorithms.length > 0 && (
            <optgroup label="정렬 알고리즘">
              {sortAlgorithms.map(algo => (
                <option key={algo.id} value={algo.id}>
                  {algo.name}
                </option>
              ))}
            </optgroup>
          )}
          
          {searchAlgorithms.length > 0 && (
            <optgroup label="검색 알고리즘">
              {searchAlgorithms.map(algo => (
                <option key={algo.id} value={algo.id}>
                  {algo.name}
                </option>
              ))}
            </optgroup>
          )}
        </select>
      </div>
    </div>
  );
};

export default AlgorithmSelector;
