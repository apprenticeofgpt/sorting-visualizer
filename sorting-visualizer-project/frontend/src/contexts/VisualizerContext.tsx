import React, { useState, useEffect, createContext, useContext } from 'react';

// 시각화 단계 타입 정의
export interface SortStep {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
}

export interface SearchStep {
  array: number[];
  comparingIndices: number[];
  foundIndex: number;
}

export type Step = SortStep | SearchStep;

// 시각화 컨텍스트 타입 정의
interface VisualizerContextType {
  array: number[];
  steps: Step[];
  currentStepIndex: number;
  isPlaying: boolean;
  speed: 'slow' | 'medium' | 'fast';
  arraySize: number;
  target: number | null;
  
  // 액션 메서드
  generateRandomArray: (size: number) => void;
  setArray: (array: number[]) => void;
  executeAlgorithm: () => Promise<void>;
  setCurrentStepIndex: (index: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setSpeed: (speed: 'slow' | 'medium' | 'fast') => void;
  setArraySize: (size: number) => void;
  setTarget: (target: number | null) => void;
  resetVisualizer: () => void;
  
  // 상태
  loading: boolean;
  error: string | null;
}

// 기본값 생성
const defaultContext: VisualizerContextType = {
  array: [],
  steps: [],
  currentStepIndex: 0,
  isPlaying: false,
  speed: 'medium',
  arraySize: 20,
  target: null,
  
  generateRandomArray: () => {},
  setArray: () => {},
  executeAlgorithm: async () => {},
  setCurrentStepIndex: () => {},
  setIsPlaying: () => {},
  setSpeed: () => {},
  setArraySize: () => {},
  setTarget: () => {},
  resetVisualizer: () => {},
  
  loading: false,
  error: null,
};

// 컨텍스트 생성
const VisualizerContext = createContext<VisualizerContextType>(defaultContext);

// 알고리즘 컨텍스트 임포트
import { useAlgorithm, AlgorithmType } from './AlgorithmContext';

// 속도 매핑 (밀리초 단위)
const SPEED_MAP = {
  slow: 1000,
  medium: 500,
  fast: 100,
};

// 컨텍스트 프로바이더 컴포넌트
export const VisualizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { selectedAlgorithm, algorithmInfo } = useAlgorithm();
  
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');
  const [arraySize, setArraySize] = useState<number>(20);
  const [target, setTarget] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // 랜덤 배열 생성
  const generateRandomArray = (size: number) => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setSteps([]);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };
  
  // 초기 배열 생성
  useEffect(() => {
    generateRandomArray(arraySize);
  }, [arraySize]);
  
  // 알고리즘 실행
  const executeAlgorithm = async () => {
    if (!selectedAlgorithm) {
      setError('알고리즘을 선택해주세요.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const requestBody: any = {
        algorithm: selectedAlgorithm,
        array: array,
      };
      
      // 검색 알고리즘인 경우 target 추가
      if (algorithmInfo?.type === 'search' && target !== null) {
        requestBody.target = target;
      } else if (algorithmInfo?.type === 'search' && target === null) {
        setError('검색할 값을 입력해주세요.');
        setLoading(false);
        return;
      }
      
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        throw new Error('알고리즘 실행에 실패했습니다.');
      }
      
      const data = await response.json();
      setSteps(data.steps);
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } catch (err) {
      setError('알고리즘 실행 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // 시각화 리셋
  const resetVisualizer = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };
  
  // 자동 재생 효과
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && steps.length > 0 && currentStepIndex < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, SPEED_MAP[speed]);
    } else if (isPlaying && currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [isPlaying, currentStepIndex, steps, speed]);
  
  return (
    <VisualizerContext.Provider
      value={{
        array,
        steps,
        currentStepIndex,
        isPlaying,
        speed,
        arraySize,
        target,
        
        generateRandomArray,
        setArray,
        executeAlgorithm,
        setCurrentStepIndex,
        setIsPlaying,
        setSpeed,
        setArraySize,
        setTarget,
        resetVisualizer,
        
        loading,
        error,
      }}
    >
      {children}
    </VisualizerContext.Provider>
  );
};

// 커스텀 훅
export const useVisualizer = () => useContext(VisualizerContext);
