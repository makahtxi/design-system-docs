import React from 'react';

interface TypeSampleProps {
  label: string;
  family: string;
  size: number;
  weight: number | string;
  sampleText?: string;
  textDecoration?: string;
  textTransform?: any;
}

const TypeSample: React.FC<TypeSampleProps> = ({ 
  label, 
  family, 
  size, 
  weight, 
  sampleText = 'Aproveita já!', 
  textDecoration = 'none',
  textTransform = 'none'
}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #eee',
      padding: '24px 0',
      gap: '40px'
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: family === 'Party' ? "'Party', sans-serif" : "'Manrope', sans-serif",
          fontSize: `${size}px`,
          fontWeight: weight,
          textDecoration: textDecoration,
          textTransform: textTransform,
          lineHeight: 1.2,
          color: '#333',
          wordWrap: 'break-word'
        }}>
          {sampleText}
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '200px',
        color: '#666',
        fontSize: '14px',
        fontFamily: "'Manrope', sans-serif"
      }}>
        <div style={{ fontWeight: 600, color: '#333', marginBottom: '8px' }}>{label}</div>
        <div>Family: {family}</div>
        <div>Size: {size}px</div>
        <div>Weight: {weight}</div>
      </div>
    </div>
  );
};

export default TypeSample;
