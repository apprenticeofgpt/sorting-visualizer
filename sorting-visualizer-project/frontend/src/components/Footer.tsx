import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p>© 2025 정렬 알고리즘 시각화 프로젝트</p>
        <p className="text-sm mt-1">React + TypeScript + Flask로 구현된 교육용 도구입니다</p>
      </div>
    </footer>
  );
};

export default Footer;
