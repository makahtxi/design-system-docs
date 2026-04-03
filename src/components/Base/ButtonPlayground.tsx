import React, { useState } from 'react';
import Button from './BasicButton';

const ButtonPlayground: React.FC = () => {
  const [variant, setVariant] = useState<'Default' | 'Outline'>('Default');
  const [showIcon, setShowIcon] = useState(true);
  const [iconOnly, setIconOnly] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const variants = [
    { label: 'Default', value: 'Default', icon: true, only: false },
    { label: 'Default (No-Icon)', value: 'Default', icon: false, only: false },
    { label: 'Outline', value: 'Outline', icon: true, only: false },
    { label: 'Icon Only', value: 'Default', icon: true, only: true },
  ];

  return (
    <div style={{
      display: 'flex',
      height: '400px',
      border: '1px solid #eee',
      borderRadius: '12px',
      overflow: 'hidden',
      background: '#fff'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '240px',
        borderRight: '1px solid #eee',
        background: '#fcfcfc',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px', fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Variants</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {variants.map((v) => (
            <button
              key={v.label}
              onClick={() => {
                setVariant(v.value as any);
                setShowIcon(v.icon);
                setIconOnly(v.only);
              }}
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: (variant === v.value && showIcon === v.icon && iconOnly === v.only) ? '#e21212' : 'transparent',
                background: (variant === v.value && showIcon === v.icon && iconOnly === v.only) ? '#fff1f1' : 'transparent',
                color: (variant === v.value && showIcon === v.icon && iconOnly === v.only) ? '#e21212' : '#333',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: (variant === v.value && showIcon === v.icon && iconOnly === v.only) ? '600' : '400',
                transition: 'all 0.2s'
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 'auto', borderTop: '1px solid #eee', paddingTop: '20px' }}>
           <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem' }}>
             <input 
               type="checkbox" 
               checked={isDisabled} 
               onChange={(e) => setIsDisabled(e.target.checked)} 
             />
             Disabled State
           </label>
        </div>
      </div>

      {/* Preview Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5',
        position: 'relative'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Button 
            variant={variant}
            showIcon={showIcon}
            iconOnly={iconOnly}
            state={isDisabled ? 'Disabled' : undefined}
            text="Interactive Button"
          />
          <p style={{ marginTop: '20px', color: '#999', fontSize: '0.8rem' }}>
            Hover, Click, or Tab to see interactions
          </p>
        </div>
      </div>
    </div>
  );
};

export default ButtonPlayground;
