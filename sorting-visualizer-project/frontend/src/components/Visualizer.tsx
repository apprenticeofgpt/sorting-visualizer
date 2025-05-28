import React from 'react';
import { useVisualizer } from '../contexts/VisualizerContext';

interface BarProps {
  value: number;
  maxValue: number;
  index: number;
  isComparing: boolean;
  isSwapped: boolean;
  isFound: boolean;
  isSorted: boolean;
}

const Bar: React.FC<BarProps> = ({ 
  value, 
  maxValue, 
  index, 
  isComparing, 
  isSwapped, 
  isFound,
  isSorted 
}) => {
  // 막대 높이 계산 (최대 높이의 비율로)
  const height = `${(value / maxValue) * 100}%`;
  
  // 막대 상태에 따른 클래스 결정
  let className = 'bar';
  if (isComparing) className += ' comparing';
  if (isSwapped) className += ' swapped';
  if (isFound) className += ' found';
  if (isSorted) className += ' sorted';
  
  return (
    <div 
      className={className} 
      style={{ height }} 
      title={`값: ${value}, 인덱스: ${index}`}
    />
  );
};

const Visualizer: React.FC = () => {
  const { 
    array, 
    steps, 
    currentStepIndex 
  } = useVisualizer();
  
  // 현재 단계 데이터
  const currentStep = steps[currentStepIndex] || { 
    array: array, 
    comparingIndices: [], 
    swappedIndices: [] 
  };
  
  // 배열의 최대값 계산
  const maxValue = Math.max(...array, 1);
  
  // 검색 알고리즘인지 확인
  const isSearchAlgorithm = 'foundIndex' in currentStep;
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">시각화</h2>
      <div className="bar-container">
        {array.map((value, index) => {
          // 현재 요소의 상태 결정
          const isComparing = currentStep.comparingIndices?.includes(index) || false;
          const isSwapped = currentStep.swappedIndices?.includes(index) || false;
          const isFound = isSearchAlgorithm && (currentStep as any).foundIndex === index;
          const isSorted = false; // 정렬 완료 상태는 추후 구현
          
          return (
            <Bar
              key={index}
              value={value}
              maxValue={maxValue}
              index={index}
              isComparing={isComparing}
              isSwapped={isSwapped}
              isFound={isFound}
              isSorted={isSorted}
            />
          );
        })}
      </div>
      
      {steps.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            단계: {currentStepIndex + 1} / {steps.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default Visualizer;
