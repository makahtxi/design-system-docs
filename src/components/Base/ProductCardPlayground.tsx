import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductCardPlayground: React.FC = () => {
  const [type, setType] = useState<'Default' | 'Super Deal' | 'Black Friday'>('Default');
  const [discount, setDiscount] = useState(true);
  const [sticker1, setSticker1] = useState(true);
  const [sticker2, setSticker2] = useState(true);
  const [pvPrStrikethrough, setPvPrStrikethrough] = useState(true);

  const types = [
    { label: 'Default', value: 'Default' },
    { label: 'Super Deal', value: 'Super Deal' },
    { label: 'Black Friday', value: 'Black Friday' },
  ];

  return (
    <div style={{
      display: 'flex',
      minHeight: '500px',
      border: '1px solid #eee',
      borderRadius: '12px',
      overflow: 'hidden',
      background: '#fff'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '260px',
        borderRight: '1px solid #eee',
        background: '#fcfcfc',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div>
          <h3 style={{ margin: '0 0 12px', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Card Type</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {types.map((t) => (
              <button
                key={t.label}
                onClick={() => setType(t.value as any)}
                style={{
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: type === t.value ? '#e21212' : 'transparent',
                  background: type === t.value ? '#fff1f1' : 'transparent',
                  color: type === t.value ? '#e21212' : '#333',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: type === t.value ? '600' : '400',
                  transition: 'all 0.2s'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ margin: '0 0 12px', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Configuration</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input type="checkbox" checked={discount} onChange={(e) => setDiscount(e.target.checked)} />
              Show Discount
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input type="checkbox" checked={sticker1} onChange={(e) => setSticker1(e.target.checked)} />
              Show Sticker 1
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input type="checkbox" checked={sticker2} onChange={(e) => setSticker2(e.target.checked)} />
              Show Sticker 2
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input type="checkbox" checked={pvPrStrikethrough} onChange={(e) => setPvPrStrikethrough(e.target.checked)} />
              Show Strikethrough Price
            </label>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5',
        padding: '40px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <ProductCard 
            type={type}
            discount={discount}
            sticker1={sticker1}
            sticker2={sticker2}
            pvPrStrikethrough={pvPrStrikethrough}
          />
          <p style={{ color: '#999', fontSize: '0.8rem' }}>
            Interactive Preview
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCardPlayground;
