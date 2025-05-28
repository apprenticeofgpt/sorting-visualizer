import React, { useState } from 'react';
import { useVisualizer } from '../contexts/VisualizerContext';

const ManualArrayInput: React.FC = () => {
  const { setArray, arraySize, steps } = useVisualizer();
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setError(null);
  };

  const handleSubmit = () => {
    try {
      // 입력값 파싱 및 검증
      const values = inputValue
        .split(',')
        .map(val => val.trim())
        .filter(val => val !== '')
        .map(val => {
          const num = parseInt(val);
          if (isNaN(num)) {
            throw new Error(`'${val}'은(는) 유효한 숫자가 아닙니다.`);
          }
          if (num < 1 || num > 100) {
            throw new Error(`모든 값은 1에서 100 사이여야 합니다.`);
          }
          return num;
        });

      // 배열 크기 검증
      if (values.length < 5) {
        throw new Error('최소 5개 이상의 값을 입력해주세요.');
      }
      if (values.length > 100) {
        throw new Error('최대 100개까지의 값만 입력 가능합니다.');
      }

      // 배열 설정
      setArray(values);
      setInputValue('');
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-1">수동 배열 입력</h3>
      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          rows={3}
          placeholder="쉼표로 구분된 숫자를 입력하세요 (예: 64, 34, 25, 12, 22, 11, 90)"
          value={inputValue}
          onChange={handleInputChange}
          disabled={steps.length > 0}
        />
        
        {error && (
          <div className="mt-2 p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="mt-2 text-xs text-gray-500">
          <p>• 1에서 100 사이의 숫자만 입력 가능</p>
          <p>• 최소 5개, 최대 100개의 값 입력 가능</p>
          <p>• 쉼표(,)로 값을 구분</p>
        </div>
        
        <button
          className="mt-3 py-1 px-3 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSubmit}
          disabled={steps.length > 0 || !inputValue.trim()}
        >
          배열 적용
        </button>
      </div>
    </div>
  );
};

export default ManualArrayInput;
