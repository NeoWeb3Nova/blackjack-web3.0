"use client";
import { LuxuryCard } from '@/components/LuxuryCard';

export default function ShowcasePage() {
  const suits = ['♠', '♥', '♦', '♣'];
  const ranks = ['A', 'K', 'Q', 'J'];

  return (
    <div className="min-h-screen bg-casino-gradient relative overflow-hidden">
      {/* 背景装饰效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]"></div>
      
      <div className="relative z-10 flex flex-col items-center min-h-screen py-12">
        {/* 标题 */}
        <h1 className="text-6xl font-bold text-center mb-12 gradient-text animate-pulse-glow">
          🎰 豪华扑克牌展示 🎰
        </h1>
        
        {/* 描述 */}
        <div className="text-center mb-12 max-w-2xl">
          <p className="text-xl text-gold mb-4">
            根据您上传的金绿色豪华扑克牌设计重新制作的Web3.0 21点游戏扑克牌
          </p>
          <p className="text-lg text-gray-300">
            采用深绿色背景、金色边框装饰、精致圆角设计和优雅排版布局
          </p>
        </div>

        {/* 四张A的展示 */}
        <div className="cards-container mb-12">
          <h2 className="text-3xl font-bold text-gold text-center mb-8">四张A - 经典展示</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {suits.map((suit, index) => (
              <LuxuryCard
                key={suit}
                rank="A"
                suit={suit}
                className="animate-luxury-float"
                style={{ animationDelay: `${index * 400}ms` }}
              />
            ))}
          </div>
        </div>

        {/* 皇室牌组合展示 */}
        <div className="cards-container mb-12">
          <h2 className="text-3xl font-bold text-gold text-center mb-8">皇室组合 - 黑桃花色</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {ranks.map((rank, index) => (
              <LuxuryCard
                key={rank}
                rank={rank}
                suit="♠"
                className="animate-float"
                style={{ animationDelay: `${index * 200}ms` }}
              />
            ))}
          </div>
        </div>

        {/* 设计特点说明 */}
        <div className="cards-container max-w-4xl">
          <h2 className="text-3xl font-bold text-gold text-center mb-8">设计特点</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <div className="bg-gradient-to-r from-green-800/30 to-green-700/30 p-6 rounded-xl border border-gold/30">
              <h3 className="text-xl font-bold text-gold mb-3">🎨 视觉设计</h3>
              <ul className="text-gray-200 space-y-2">
                <li>• 深绿色渐变背景，经典赌场风格</li>
                <li>• 金色边框和装饰元素</li>
                <li>• 精致的圆角设计</li>
                <li>• 优雅的排版布局</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-yellow-800/20 to-yellow-700/20 p-6 rounded-xl border border-gold/30">
              <h3 className="text-xl font-bold text-gold mb-3">✨ 交互效果</h3>
              <ul className="text-gray-200 space-y-2">
                <li>• 悬浮时的3D变换效果</li>
                <li>• 金色光晕旋转动画</li>
                <li>• 花色背景脉冲效果</li>
                <li>• 平滑的过渡动画</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-purple-800/20 to-purple-700/20 p-6 rounded-xl border border-gold/30">
              <h3 className="text-xl font-bold text-gold mb-3">🔧 技术实现</h3>
              <ul className="text-gray-200 space-y-2">
                <li>• React + TypeScript组件</li>
                <li>• Tailwind CSS + 自定义CSS</li>
                <li>• SVG花色图标</li>
                <li>• 响应式设计</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-red-800/20 to-red-700/20 p-6 rounded-xl border border-gold/30">
              <h3 className="text-xl font-bold text-gold mb-3">🎯 用户体验</h3>
              <ul className="text-gray-200 space-y-2">
                <li>• 豪华赌场氛围</li>
                <li>• 流畅的动画效果</li>
                <li>• 清晰的视觉层次</li>
                <li>• 移动端适配</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 返回游戏链接 */}
        <div className="mt-12">
          <a 
            href="/"
            className="px-12 py-6 btn-luxury rounded-2xl text-2xl font-bold
                     hover:scale-110 transform transition-all duration-300 
                     shadow-glow-gold hover:shadow-glow-gold-lg border-3 inline-block"
          >
            🎲 开始游戏
          </a>
        </div>
      </div>
    </div>
  );
}
