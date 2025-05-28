import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold">정렬 알고리즘 시각화</h1>
        <p className="mt-2">정렬 및 검색 알고리즘의 동작 과정을 시각적으로 이해해보세요</p>
      </div>
    </header>
  );
};

export default Header;
