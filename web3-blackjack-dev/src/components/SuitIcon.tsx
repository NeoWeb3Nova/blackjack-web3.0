import React from 'react';

interface SuitIconProps {
  suit: string;
  className?: string;
  color?: string;
}

export const SuitIcon: React.FC<SuitIconProps> = ({ suit, className = "", color }) => {
  const getSuitColor = () => {
    if (color) return color;
    // 清理花色字符，移除emoji变体选择符
    const cleanSuit = suit.replace(/️/g, '');
    // 默认颜色保持传统红黑配色，但在豪华卡片中会被覆盖
    return cleanSuit === '♥' || cleanSuit === '♦' ? '#ef4444' : '#1f2937';
  };

  const getSuitPath = () => {
    // 清理花色字符，移除emoji变体选择符
    const cleanSuit = suit.replace(/️/g, '');
    
    switch (cleanSuit) {
      case '♠': // 黑桃 - 更精致的形状
        return (
          <g fill={getSuitColor()}>
            <path d="M12 2.5C12 2.5 5.5 8.5 5.5 12.5C5.5 16.8 8.2 18.8 12 18.8C15.8 18.8 18.5 16.8 18.5 12.5C18.5 8.5 12 2.5 12 2.5Z" />
            <path d="M10.2 18.8C10.2 20.2 10.8 21.5 12 21.5C13.2 21.5 13.8 20.2 13.8 18.8" />
          </g>
        );
      case '♥': // 红心 - 更饱满的心形
        return (
          <path
            d="M12 21.8L10.4 20.32C4.9 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 19.1 15.36 13.6 20.32L12 21.8Z"
            fill={getSuitColor()}
          />
        );
      case '♣': // 梅花 - 更对称的三叶草
        return (
          <g fill={getSuitColor()}>
            <circle cx="12" cy="7.5" r="3.8" />
            <circle cx="7.8" cy="13.8" r="3.8" />
            <circle cx="16.2" cy="13.8" r="3.8" />
            <path d="M10.5 17.5C10.5 19.2 11.1 21.5 12 21.5C12.9 21.5 13.5 19.2 13.5 17.5" />
          </g>
        );
      case '♦': // 方块 - 更尖锐的菱形
        return (
          <path
            d="M12 2.8L19.2 12L12 21.2L4.8 12L12 2.8Z"
            fill={getSuitColor()}
          />
        );
      default:
        // 如果没有匹配到，显示一个默认的圆形
        console.warn(`Unknown suit: "${suit}" (cleaned: "${cleanSuit}")`);
        return (
          <circle
            cx="12"
            cy="12"
            r="8"
            fill={getSuitColor()}
            stroke={getSuitColor()}
            strokeWidth="2"
          />
        );
    }
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} card-suit-svg`}
      style={{ color: getSuitColor() }}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      {/* 添加渐变定义以增强金色效果 */}
      <defs>
        <linearGradient id={`goldGradient-${suit}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#F4D03F" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <filter id={`goldGlow-${suit}`}>
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {getSuitPath()}
    </svg>
  );
};
