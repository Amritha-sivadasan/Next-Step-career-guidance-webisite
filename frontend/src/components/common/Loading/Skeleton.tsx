
import React from 'react';

const Skeleton: React.FC<{ width?: string; height?: string; borderRadius?: string }> = ({
  width = '100%',
  height = '100%',
  borderRadius = '0',
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#e0e0e0', 
        animation: 'pulse 1.5s infinite',
      }}
      className="skeleton-loader"
    >
    
    </div>
  );
};

export default Skeleton;
