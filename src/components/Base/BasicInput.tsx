import React, { useState } from 'react';

type InputProps = {
  className?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  state?: 'Default' | 'Hover' | 'Selected' | 'Error' | 'Disabled';
  type?: 'Default' | 'Dropdown' | 'Password';
  value?: string;
  onChange?: (value: string) => void;
  trailingIcon?: React.ReactNode;
  showTrailingIcon?: boolean;
  options?: string[];
};

const BasicInput: React.FC<InputProps> = ({
  className = '',
  label = 'Label',
  placeholder = 'Placeholder',
  required = true,
  state: explicitState,
  type = 'Default',
  value: controlledValue,
  onChange,
  trailingIcon,
  showTrailingIcon = true,
  options = ['Option 1', 'Option 2', 'Option 3'],
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // Design Tokens
  const tokens = {
    error: '#cc1010',
    text: '#333',
    textSecondary: '#666',
    container: 'white',
    stroke: '#8c8c8c',
    focus: '#006efa',
    hoverOverlay: 'rgba(0, 0, 0, 0.08)',
    radiusSm: '4px',
    spacing4: '4px',
    spacing5: '8px',
    spacing6: '12px',
    shadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  const isDisabled = explicitState === 'Disabled';
  const currentState = (explicitState && explicitState !== 'Default') ? explicitState :
    (isFocused || isOpen ? 'Selected' : isHovered ? 'Hover' : 'Default');

  const isError = currentState === 'Error';
  const isSelected = currentState === 'Selected';
  const isHover = currentState === 'Hover';

  // Label styles
  const labelStyle: React.CSSProperties = {
    fontFamily: "'Manrope', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '1.2',
    color: isError ? tokens.error : tokens.text,
    marginBottom: tokens.spacing4,
    display: 'flex',
    gap: '2px',
    opacity: isDisabled ? 0.5 : 1,
  };

  // Input Container styles
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: `${tokens.spacing6} ${tokens.spacing6} ${tokens.spacing6} ${tokens.spacing5}`,
    backgroundColor: tokens.container,
    border: '1px solid',
    borderColor: isError ? tokens.error : (isSelected ? tokens.focus : tokens.stroke),
    borderRadius: tokens.radiusSm,
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    transition: 'all 0.2s',
    cursor: isDisabled ? 'not-allowed' : (type === 'Dropdown' ? 'pointer' : 'text'),
    opacity: isDisabled ? 0.6 : 1,
  };

  if (isHover && !isDisabled && !isSelected && !isError) {
    containerStyle.backgroundImage = `linear-gradient(90deg, ${tokens.hoverOverlay} 0%, ${tokens.hoverOverlay} 100%)`;
  }

  // Input element styles
  const inputStyle: React.CSSProperties = {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontFamily: "'Manrope', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '1.2',
    color: tokens.text,
    width: '100%',
    pointerEvents: type === 'Dropdown' ? 'none' : 'auto',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleToggleDropdown = () => {
    if (isDisabled || type !== 'Dropdown') return;
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (opt: string) => {
    setInternalValue(opt);
    if (onChange) onChange(opt);
    setIsOpen(false);
  };

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
      {label && (
        <label style={labelStyle}>
          {label}
          {required && <span>*</span>}
        </label>
      )}
      <div
        style={containerStyle}
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleToggleDropdown}
      >
        <input
          type={type === 'Password' ? (showPassword ? 'text' : 'password') : 'text'}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => !isDisabled && type !== 'Dropdown' && setIsFocused(true)}
          onBlur={() => !isDisabled && type !== 'Dropdown' && setIsFocused(false)}
          readOnly={type === 'Dropdown'}
          disabled={isDisabled}
          style={inputStyle}
        />

        {showTrailingIcon && (
          <div 
            onClick={(e) => {
              if (type === 'Password') {
                e.stopPropagation();
                setShowPassword(!showPassword);
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              marginLeft: '10px',
              color: tokens.text,
              transform: type === 'Dropdown' && isOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s',
              cursor: type === 'Password' ? 'pointer' : 'inherit',
            }}
          >
            {trailingIcon || (
              type === 'Dropdown' ? (
                <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5.5 5L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : type === 'Password' ? (
                <img 
                  src={showPassword ? "/password-open.svg" : "/password-close.svg"} 
                  alt="Toggle Password Visibility" 
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.25 15.75V6.75L9 1.5L15.75 6.75V15.75H10.5V11.25H7.5V15.75H2.25Z" fill="currentColor" />
                </svg>
              )
            )}
          </div>
        )}
      </div>

      {type === 'Dropdown' && isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '4px',
          backgroundColor: tokens.container,
          border: `1px solid ${tokens.stroke}`,
          borderRadius: tokens.radiusSm,
          boxShadow: tokens.shadow,
          zIndex: 10,
          maxHeight: '200px',
          overflowY: 'auto',
        }}>
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => handleSelectOption(opt)}
              style={{
                padding: `${tokens.spacing6} ${tokens.spacing6}`,
                cursor: 'pointer',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '14px',
                color: tokens.text,
                transition: 'background-color 0.2s',
                backgroundColor: value === opt ? '#f0f7ff' : 'transparent',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = value === opt ? '#f0f7ff' : 'transparent'}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BasicInput;
