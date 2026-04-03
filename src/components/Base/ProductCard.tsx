import React, { useState } from 'react';

type PromoTagProps = {
  color?: 'Default' | 'yellow' | 'teal' | 'red';
  text?: string;
};

const PromoTag: React.FC<PromoTagProps> = ({ color = 'Default', text = 'Promoção' }) => {
  const tokens = {
    blue: '#006efa',
    yellow: '#ffdb00',
    teal: '#27e4ab',
    red: '#e21212',
    text: '#333',
    textOnPrimary: 'white',
    radiusPill: '999px',
    spacing4: '4px',
    spacing6: '12px',
  };

  let bgColor = tokens.blue;
  let textColor = tokens.textOnPrimary;

  if (color === 'yellow') {
    bgColor = tokens.yellow;
    textColor = tokens.text;
  } else if (color === 'teal') {
    bgColor = tokens.teal;
    textColor = tokens.text;
  } else if (color === 'red') {
    bgColor = tokens.red;
    textColor = tokens.textOnPrimary;
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${tokens.spacing4} ${tokens.spacing6}`,
      backgroundColor: bgColor,
      borderRadius: tokens.radiusPill,
      whiteSpace: 'nowrap',
    }}>
      <span style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 400,
        fontSize: '12px',
        color: textColor,
      }}>
        {text}
      </span>
    </div>
  );
};

const AvailableDot: React.FC = () => (
  <div style={{
    width: '6px',
    height: '6px',
    backgroundColor: '#27e4ab',
    borderRadius: '50%',
    display: 'inline-block',
  }} />
);

type StatusTextProps = {
  disponibilidade?: 'Disponível';
  tipoDeEntrega?: 'Envio' | 'Levantamento';
  dark?: boolean;
};

const StatusText: React.FC<StatusTextProps> = ({ disponibilidade = 'Disponível', tipoDeEntrega = 'Envio', dark = false }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
    }}>
      <AvailableDot />
      <span style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 400,
        fontSize: '12px',
        color: dark ? 'white' : '#333',
      }}>
        {tipoDeEntrega === 'Levantamento' ? 'Disponível na sua loja' : 'Entrega em 24h'}
      </span>
    </div>
  );
};

export type ProductCardProps = {
  className?: string;
  discount?: boolean;
  discountValue?: string;
  price?: string;
  productName?: string;
  pvPr?: string;
  pvPrStrikethrough?: boolean;
  state?: 'Default' | 'Hover' | 'Pressed' | 'Focus';
  sticker1?: boolean;
  sticker2?: boolean;
  type?: 'Default' | 'Super Deal' | 'Black Friday';
  image?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  className = '',
  discount = true,
  discountValue = '26% DE DESCONTO',
  price = '999,99€',
  productName = 'Nintendo Switch OLED Azul/Vermeho',
  pvPr = '9999,99€',
  pvPrStrikethrough = true,
  state: explicitState,
  sticker1 = true,
  sticker2 = true,
  type = 'Default',
  image = 'https://www.figma.com/api/mcp/asset/a50699f0-f6bd-47ee-8715-b842cecee447',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const tokens = {
    primary: '#e21212',
    text: '#333',
    textOnPrimary: 'white',
    container: 'white',
    discount: '#ffdb00',
    blackFriday: '#333',
    focus: '#006efa',
    hoverOverlay: 'rgba(0, 0, 0, 0.08)',
    pressedOverlay: 'rgba(0, 0, 0, 0.12)',
    radiusLg: '16px',
    radiusMd: '8px',
    radiusPill: '999px',
    spacing0: '0px',
    spacing4: '4px',
    spacing5: '8px',
    spacing6: '12px',
    spacing7: '16px',
  };

  const currentState = explicitState ||
    (isPressed ? 'Pressed' : isFocused ? 'Focus' : isHovered ? 'Hover' : 'Default');

  const isBlackFriday = type === 'Black Friday';
  const isSuperDeal = type === 'Super Deal';

  const containerBg = isBlackFriday ? tokens.blackFriday : (isSuperDeal ? tokens.discount : tokens.container);
  const textColor = isBlackFriday ? tokens.textOnPrimary : tokens.text;

  const cardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    paddingTop: tokens.spacing6,
    position: 'relative',
    width: '252px',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
  };

  const productStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing7,
    alignItems: 'center',
    padding: tokens.spacing7,
    backgroundColor: containerBg,
    borderRadius: tokens.radiusLg,
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 1,
  };

  const imageContainerStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '1',
    borderRadius: tokens.radiusMd,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isBlackFriday || isSuperDeal ? 'rgba(255,255,255,0.1)' : '#f9f9f9',
  };

  const stateLayerStyle: React.CSSProperties = {
    position: 'absolute',
    top: tokens.spacing6,
    left: 0,
    width: '100%',
    height: 'calc(100% - ' + tokens.spacing6 + ')',
    borderRadius: tokens.radiusLg,
    pointerEvents: 'none',
    zIndex: 2,
    transition: 'all 0.2s',
  };

  if (currentState === 'Hover') {
    stateLayerStyle.backgroundColor = tokens.hoverOverlay;
  } else if (currentState === 'Pressed') {
    stateLayerStyle.backgroundColor = tokens.pressedOverlay;
  } else if (currentState === 'Focus') {
    stateLayerStyle.boxShadow = `0 0 0 2px ${tokens.focus}`;
  }

  return (
    <div
      style={cardStyle}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
    >
      <div style={productStyle}>
        <div style={imageContainerStyle}>
          <img src={image} alt={productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing5, width: '100%' }}>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: '1px',
            lineHeight: '1.2',
            margin: 0,
            color: textColor,
          }}>
            {productName}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing4 }}>
            <StatusText tipoDeEntrega="Envio" dark={isBlackFriday} />
            <StatusText tipoDeEntrega="Levantamento" dark={isBlackFriday} />
          </div>

          <div style={{ height: '20px', display: 'flex', alignItems: 'center' }}>
            <div style={{
              backgroundColor: tokens.primary,
              padding: '4px 6px',
              borderRadius: tokens.radiusPill,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              visibility: discount ? 'visible' : 'hidden',
            }}>
              <span style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '12px',
                color: tokens.textOnPrimary,
                textTransform: 'uppercase',
              }}>
                {discountValue}
              </span>
            </div>
          </div>

          <div style={{ height: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              fontFamily: "'Party', sans-serif",
              fontWeight: 900,
              fontSize: '24px',
              lineHeight: '1',
              color: isSuperDeal || isBlackFriday ? textColor : tokens.primary,
            }}>
              {price}
            </div>
            <div style={{
              fontFamily: "'Party', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '1',
              color: textColor,
              textDecoration: pvPrStrikethrough ? 'line-through' : 'none',
              visibility: discount ? 'visible' : 'hidden',
            }}>
              {pvPr}
            </div>
          </div>
        </div>
      </div>

      <div style={stateLayerStyle} />

      {/* Stickers */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        gap: tokens.spacing5,
        paddingLeft: tokens.spacing5,
        zIndex: 3,
      }}>
        {isBlackFriday ? (
          sticker1 && <PromoTag color="yellow" text="BLACK FRIDAY" />
        ) : isSuperDeal ? (
          sticker1 && <PromoTag color="red" text="SUPER DEAL" />
        ) : (
          <>
            {sticker1 && <PromoTag color="Default" text="PROMOÇÃO" />}
            {sticker2 && <PromoTag color="teal" text="PROMOÇÃO" />}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
