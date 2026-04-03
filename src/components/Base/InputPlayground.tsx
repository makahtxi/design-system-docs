import React, { useState } from 'react';
import BasicInput from './BasicInput';

const InputPlayground: React.FC = () => {
  const [type, setType] = useState<'Default' | 'Dropdown' | 'Password'>('Default');
  const [state, setState] = useState<'Default' | 'Hover' | 'Selected' | 'Error' | 'Disabled'>('Default');
  const [label, setLabel] = useState('Label');
  const [placeholder, setPlaceholder] = useState('Placeholder');
  const [required, setRequired] = useState(true);
  const [showTrailingIcon, setShowTrailingIcon] = useState(true);

  const types = ['Default', 'Dropdown', 'Password'];
  const states = ['Default', 'Hover', 'Selected', 'Error', 'Disabled'];

  return (
    <div style={{
      display: 'flex',
      minHeight: '400px',
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
          <h3 style={{ margin: '0 0 12px', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Input Type</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t as any)}
                style={{
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: type === t ? '#006efa' : 'transparent',
                  background: type === t ? '#f0f7ff' : 'transparent',
                  color: type === t ? '#006efa' : '#333',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: type === t ? '600' : '400',
                  transition: 'all 0.2s'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ margin: '0 0 12px', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>State</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {states.map((s) => (
              <button
                key={s}
                onClick={() => setState(s as any)}
                style={{
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: state === s ? '#006efa' : 'transparent',
                  background: state === s ? '#f0f7ff' : 'transparent',
                  color: state === s ? '#006efa' : '#333',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: state === s ? '600' : '400',
                  transition: 'all 0.2s'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ margin: '0 0 12px', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Configuration</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)} />
              Required
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input type="checkbox" checked={showTrailingIcon} onChange={(e) => setShowTrailingIcon(e.target.checked)} />
              Show Trailing Icon
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>Label Text</span>
              <input 
                type="text" 
                value={label} 
                onChange={(e) => setLabel(e.target.value)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.9rem' }}
              />
            </div>
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
        <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <BasicInput 
            type={type}
            state={state}
            label={label}
            placeholder={placeholder}
            required={required}
            showTrailingIcon={showTrailingIcon}
          />
          <p style={{ marginTop: '20px', color: '#999', fontSize: '0.8rem' }}>
            Interactive Preview
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputPlayground;
