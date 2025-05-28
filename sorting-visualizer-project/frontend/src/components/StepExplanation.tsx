import React from 'react';
import { useVisualizer } from '../contexts/VisualizerContext';
import { useAlgorithm } from '../contexts/AlgorithmContext';

const StepExplanation: React.FC = () => {
  const { steps, currentStepIndex } = useVisualizer();
  const { algorithmInfo } = useAlgorithm();
  
  if (!steps.length || !algorithmInfo) {
    return null;
  }
  
  const currentStep = steps[currentStepIndex];
  const isSearchAlgorithm = 'foundIndex' in currentStep;
  
  // 현재 단계에 대한 설명 생성
  const generateExplanation = () => {
    if (currentStepIndex === 0) {
      return '초기 배열 상태입니다.';
    }
    
    if (isSearchAlgorithm) {
      const { comparingIndices, foundIndex } = currentStep as any;
      
      if (foundIndex !== -1) {
        return `인덱스 ${foundIndex}에서 찾는 값을 발견했습니다.`;
      }
      
      if (comparingIndices.length > 0) {
        return `인덱스 ${comparingIndices[0]}의 값을 검사 중입니다.`;
      }
      
      if (currentStepIndex === steps.length - 1) {
        return '검색이 완료되었지만 값을 찾지 못했습니다.';
      }
    } else {
      const { comparingIndices, swappedIndices } = currentStep as any;
      
      if (swappedIndices.length > 0) {
        return `인덱스 ${swappedIndices[0]}와 ${swappedIndices[1]}의 값을 교환했습니다.`;
      }
      
      if (comparingIndices.length > 0) {
        return `인덱스 ${comparingIndices[0]}와 ${comparingIndices[1]}의 값을 비교 중입니다.`;
      }
      
      if (currentStepIndex === steps.length - 1) {
        return '정렬이 완료되었습니다.';
      }
    }
    
    return '알고리즘이 실행 중입니다.';
  };
  
  return (
    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
      <h3 className="text-sm font-medium text-blue-800 mb-1">단계 설명</h3>
      <p className="text-sm text-blue-700">{generateExplanation()}</p>
    </div>
  );
};

export default StepExplanation;
