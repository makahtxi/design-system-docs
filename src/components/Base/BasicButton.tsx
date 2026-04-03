import React, { useState } from 'react';

type ButtonProps = {
  className?: string;
  onClick?: () => void;
  state?: 'Default' | 'Hover' | 'Pressed' | 'Disabled' | 'Focus';
  variant?: 'Default' | 'Outline';
  text?: string;
  iconOnly?: boolean;
  showIcon?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  className = '',
  onClick,
  state: explicitState,
  variant = 'Default',
  text = 'BUTTON',
  iconOnly = false,
  showIcon = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Design Tokens
  const tokens = {
    primary: '#e21212',
    white: '#ffffff',
    disabled: '#a8a8a8',
    disabledText: '#bfbfbf',
    focus: '#006efa',
    hoverOverlay: 'rgba(0, 0, 0, 0.08)',
    pressedOverlay: 'rgba(0, 0, 0, 0.12)',
    radiusPill: '999px',
    spacing5: '8px',
    spacing6: '12px',
    spacing10: '32px',
  };

  // Determine current state
  const isDisabled = explicitState === 'Disabled';
  const currentState = explicitState || 
    (isPressed ? 'Pressed' : isFocused ? 'Focus' : isHovered ? 'Hover' : 'Default');

  // Variant & State specific styles
  let variantStyles: React.CSSProperties = {};
  let textColor = tokens.white;

  if (variant === 'Default') {
    variantStyles = {
      backgroundColor: isDisabled ? tokens.disabled : tokens.primary,
      padding: iconOnly ? tokens.spacing6 : `${tokens.spacing6} ${tokens.spacing10}`,
    };
  } else if (variant === 'Outline') {
    textColor = isDisabled ? tokens.disabledText : tokens.primary;
    variantStyles = {
      backgroundColor: tokens.white,
      border: `2px solid ${isDisabled ? tokens.disabled : tokens.primary}`,
      padding: iconOnly ? tokens.spacing6 : `${tokens.spacing6} ${tokens.spacing10}`,
    };
  }

  // Base styles
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: tokens.radiusPill,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    border: 'none',
    transition: 'background-color 0.2s, box-shadow 0.2s, transform 0.1s',
    outline: 'none',
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '20px',
    fontFamily: "'Manrope', sans-serif",
    gap: tokens.spacing5,
    userSelect: 'none',
    color: textColor,
  };


  // State Overlays/Effects
  const stateLayerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: variant === 'Outline' ? '-2px' : '0px',
    borderRadius: tokens.radiusPill,
    pointerEvents: 'none',
    transition: 'background-color 0.2s',
  };

  if (currentState === 'Hover') {
    stateLayerStyle.backgroundColor = tokens.hoverOverlay;
  } else if (currentState === 'Pressed') {
    stateLayerStyle.backgroundColor = tokens.pressedOverlay;
    variantStyles.transform = 'scale(0.98)';
  } else if (currentState === 'Focus') {
    // Improved focus ring: outer shadow for better visibility
    variantStyles.boxShadow = `0 0 0 2px ${tokens.white}, 0 0 0 4px ${tokens.focus}`;
  }

  return (
    <button
      style={{ ...baseStyles, ...variantStyles }}
      className={className}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      onMouseEnter={() => !isDisabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !isDisabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onFocus={() => !isDisabled && setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {!iconOnly && <span>{text}</span>}
      {(showIcon || iconOnly) && (
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}
        >
          <path d="M3 0C3.35938 0 3.66875 0.255938 3.7375 0.609688L3.78437 1H16.9312C17.5656 1 18.0719 1.63281 17.8937 2.27063L16.2062 8.27188C16.0844 8.70313 15.6906 9 15.2437 9H5.33437L5.62187 10.5H15.25C15.6656 10.5 16 10.8344 16 11.25C16 11.6656 15.6656 12 15.25 12H4.97188C4.64063 12 4.33125 11.7438 4.2625 11.3906L2.37937 1.5H0.75C0.335938 1.5 0 1.16406 0 0.75C0 0.335938 0.335938 0 0.75 0H3ZM8.5 5.625H9.875V7C9.875 7.34375 10.1281 7.625 10.5 7.625C10.8438 7.625 11.125 7.34375 11.125 7V5.625H12.5C12.8438 5.625 13.125 5.34375 13.125 5C13.125 4.62813 12.8438 4.375 12.5 4.375H11.125V3C11.125 2.65469 10.8438 2.375 10.5 2.375C10.1281 2.375 9.875 2.65469 9.875 3V4.375H8.5C8.12813 4.375 7.875 4.62813 7.875 5C7.875 5.34375 8.12813 5.625 8.5 5.625ZM4 14.5C4 13.6719 4.67188 13 5.5 13C6.32812 13 7 13.6719 7 14.5C7 15.3281 6.32812 16 5.5 16C4.67188 16 4 15.3281 4 14.5ZM16 14.5C16 15.3281 15.3281 16 14.5 16C13.6719 16 13 15.3281 13 14.5C13 13.6719 13.6719 13 14.5 13C15.3281 13 16 13.6719 16 14.5Z" />
        </svg>
      )}
      <div style={stateLayerStyle} />
    </button>
  );
};

export default Button;
