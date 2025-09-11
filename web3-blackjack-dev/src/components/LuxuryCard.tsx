import React from 'react';
import { SuitIcon } from './SuitIcon';

interface LuxuryCardProps {
  rank: string;
  suit: string;
  className?: string;
  style?: React.CSSProperties;
}

export const LuxuryCard: React.FC<LuxuryCardProps> = ({ 
  rank, 
  suit, 
  className = "",
  style
}) => {
  const getSuitColor = () => {
    // 所有花色都使用金色
    return '#D4AF37';
  };

  const getRankColor = () => {
    // 所有点数都使用金色
    return '#F4D03F';
  };

  return (
    <div className={`luxury-playing-card ${className}`} style={style}>
      {/* 卡片主体 */}
      <div className="luxury-card-inner">
        {/* 金色边框装饰 */}
        <div className="luxury-border-decoration"></div>
        
        {/* 角落装饰元素 */}
        <div className="corner-ornament top-left"></div>
        <div className="corner-ornament top-right"></div>
        <div className="corner-ornament bottom-left"></div>
        <div className="corner-ornament bottom-right"></div>
        
        {/* 顶部左角的点数和花色 */}
        <div className="card-corner top-left-content">
          <div className="rank-display" style={{color: getRankColor()}}>
            {rank}
          </div>
          <SuitIcon 
            suit={suit} 
            className="suit-small" 
            color={getSuitColor()}
          />
        </div>
        
        {/* 底部右角的点数和花色（旋转180度） */}
        <div className="card-corner bottom-right-content">
          <div className="rank-display" style={{color: getRankColor()}}>
            {rank}
          </div>
          <SuitIcon 
            suit={suit} 
            className="suit-small" 
            color={getSuitColor()}
          />
        </div>
        
        {/* 中央大花色图案 */}
        <div className="center-suit">
          <div className="suit-background-glow"></div>
          <SuitIcon 
            suit={suit} 
            className="suit-large" 
            color={getSuitColor()}
          />
        </div>
        
        {/* 额外的装饰元素 */}
        <div className="luxury-pattern-overlay"></div>
        
        {/* 金色光晕效果 */}
        <div className="golden-glow-effect"></div>
      </div>
    </div>
  );
};
