import React, { useState, useEffect, createContext, useContext } from 'react';

// 알고리즘 타입 정의
export type AlgorithmType = 'bubble_sort' | 'insertion_sort' | 'selection_sort' | 'linear_search';

// 알고리즘 정보 타입 정의
export interface AlgorithmInfo {
  name: string;
  type: 'sort' | 'search';
  description: string;
  time_complexity: {
    best: string;
    average: string;
    worst: string;
  };
  space_complexity: string;
  pseudocode: string[];
}

// 알고리즘 컨텍스트 타입 정의
interface AlgorithmContextType {
  algorithms: { id: string; name: string; type: string }[];
  selectedAlgorithm: AlgorithmType | null;
  algorithmInfo: AlgorithmInfo | null;
  setSelectedAlgorithm: (algorithm: AlgorithmType) => void;
  loading: boolean;
  error: string | null;
}

// 기본값 생성
const defaultContext: AlgorithmContextType = {
  algorithms: [],
  selectedAlgorithm: null,
  algorithmInfo: null,
  setSelectedAlgorithm: () => {},
  loading: false,
  error: null,
};

// 컨텍스트 생성
const AlgorithmContext = createContext<AlgorithmContextType>(defaultContext);

// 컨텍스트 프로바이더 컴포넌트
export const AlgorithmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [algorithms, setAlgorithms] = useState<{ id: string; name: string; type: string }[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType | null>(null);
  const [algorithmInfo, setAlgorithmInfo] = useState<AlgorithmInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 알고리즘 목록 가져오기
  useEffect(() => {
    const fetchAlgorithms = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/algorithms');
        if (!response.ok) {
          throw new Error('알고리즘 목록을 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setAlgorithms(data);
        setError(null);
      } catch (err) {
        setError('알고리즘 목록을 가져오는데 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlgorithms();
  }, []);

  // 선택된 알고리즘 정보 가져오기
  useEffect(() => {
    if (!selectedAlgorithm) return;

    const fetchAlgorithmInfo = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/algorithms/${selectedAlgorithm}`);
        if (!response.ok) {
          throw new Error('알고리즘 정보를 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setAlgorithmInfo(data);
        setError(null);
      } catch (err) {
        setError('알고리즘 정보를 가져오는데 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlgorithmInfo();
  }, [selectedAlgorithm]);

  return (
    <AlgorithmContext.Provider
      value={{
        algorithms,
        selectedAlgorithm,
        algorithmInfo,
        setSelectedAlgorithm,
        loading,
        error,
      }}
    >
      {children}
    </AlgorithmContext.Provider>
  );
};

// 커스텀 훅
export const useAlgorithm = () => useContext(AlgorithmContext);
