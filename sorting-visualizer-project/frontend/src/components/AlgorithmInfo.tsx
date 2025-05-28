import React from 'react';
import { useAlgorithm } from '../contexts/AlgorithmContext';

const AlgorithmInfo: React.FC = () => {
  const { algorithmInfo, loading } = useAlgorithm();
  
  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">알고리즘 정보</h2>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }
  
  if (!algorithmInfo) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">알고리즘 정보</h2>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500">알고리즘을 선택하면 정보가 표시됩니다.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">알고리즘 정보</h2>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">{algorithmInfo.name}</h3>
        
        <div className="mb-4">
          <p className="text-gray-700">{algorithmInfo.description}</p>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-1">시간 복잡도</h4>
          <ul className="text-sm">
            <li><span className="font-medium">최선의 경우:</span> {algorithmInfo.time_complexity.best}</li>
            <li><span className="font-medium">평균의 경우:</span> {algorithmInfo.time_complexity.average}</li>
            <li><span className="font-medium">최악의 경우:</span> {algorithmInfo.time_complexity.worst}</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-1">공간 복잡도</h4>
          <p className="text-sm">{algorithmInfo.space_complexity}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-800 mb-1">의사 코드</h4>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
            {algorithmInfo.pseudocode.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmInfo;
