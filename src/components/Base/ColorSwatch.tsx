import React from 'react';

interface ColorSwatchProps {
  name: string;
  hex: string;
  token?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, hex, token }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      width: '136px'
    }}>
      <div style={{
        backgroundColor: hex,
        height: '136px',
        width: '100%',
        borderRadius: '8px',
        border: hex.toLowerCase() === '#ffffff' || hex.toLowerCase() === 'white' ? '1px solid #eee' : 'none'
      }} />
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        color: '#333'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{name}</div>
        <div style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase' }}>{token || hex}</div>
      </div>
    </div>
  );
};

export default ColorSwatch;
