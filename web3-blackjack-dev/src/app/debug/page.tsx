"use client";
import { SuitIcon } from '@/components/SuitIcon';

export default function DebugPage() {
  const suits = ["♠️", "♥️", "♦️", "♣️"];
  const cleanSuits = ["♠", "♥", "♦", "♣"];

  return (
    <div className="min-h-screen bg-casino-gradient p-8">
      <h1 className="text-4xl text-white mb-8">花色图标调试页面</h1>
      
      {/* 测试原始花色字符 */}
      <div className="mb-12">
        <h2 className="text-2xl text-gold mb-4">原始花色字符（带变体选择符）</h2>
        <div className="flex gap-4 mb-4">
          {suits.map((suit, index) => (
            <div key={index} className="bg-white/10 p-4 rounded text-center">
              <div className="text-white mb-2">字符: "{suit}"</div>
              <div className="text-white mb-2">长度: {suit.length}</div>
              <div className="w-16 h-16 bg-white/20 rounded flex items-center justify-center">
                <SuitIcon suit={suit} className="w-12 h-12" color="#FFD700" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 测试清理后的花色字符 */}
      <div className="mb-12">
        <h2 className="text-2xl text-gold mb-4">清理后的花色字符</h2>
        <div className="flex gap-4 mb-4">
          {cleanSuits.map((suit, index) => (
            <div key={index} className="bg-white/10 p-4 rounded text-center">
              <div className="text-white mb-2">字符: "{suit}"</div>
              <div className="text-white mb-2">长度: {suit.length}</div>
              <div className="w-16 h-16 bg-white/20 rounded flex items-center justify-center">
                <SuitIcon suit={suit} className="w-12 h-12" color="#FFD700" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 测试不同尺寸 */}
      <div className="mb-12">
        <h2 className="text-2xl text-gold mb-4">不同尺寸测试</h2>
        <div className="flex gap-4 items-end">
          <div className="text-center">
            <div className="text-white mb-2">小尺寸 (1rem)</div>
            <SuitIcon suit="♠️" className="suit-small" color="#FFD700" />
          </div>
          <div className="text-center">
            <div className="text-white mb-2">中尺寸 (2rem)</div>
            <SuitIcon suit="♠️" className="w-8 h-8" color="#FFD700" />
          </div>
          <div className="text-center">
            <div className="text-white mb-2">大尺寸 (4rem)</div>
            <SuitIcon suit="♠️" className="suit-large" color="#FFD700" />
          </div>
        </div>
      </div>

      {/* 直接SVG测试 */}
      <div className="mb-12">
        <h2 className="text-2xl text-gold mb-4">直接SVG测试</h2>
        <div className="flex gap-4">
          <svg viewBox="0 0 24 24" className="w-16 h-16" fill="#FFD700">
            <path d="M12 2.5C12 2.5 5.5 8.5 5.5 12.5C5.5 16.8 8.2 18.8 12 18.8C15.8 18.8 18.5 16.8 18.5 12.5C18.5 8.5 12 2.5 12 2.5Z" />
            <path d="M10.2 18.8C10.2 20.2 10.8 21.5 12 21.5C13.2 21.5 13.8 20.2 13.8 18.8" />
          </svg>
          <div className="text-white">直接SVG黑桃</div>
        </div>
      </div>
    </div>
  );
}
