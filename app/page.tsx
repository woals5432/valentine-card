"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 터지는 입자(하트/입술) 컴포넌트
const ExplosionParticle = ({
  x,
  y,
  icon,
}: {
  x: number;
  y: number;
  icon: string;
}) => (
  <motion.div
    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
    animate={{
      opacity: 0,
      scale: 2,
      x: (Math.random() - 0.5) * 400, // 사방으로 퍼지는 너비
      y: (Math.random() - 0.5) * 400,
      rotate: Math.random() * 720,
    }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="absolute text-3xl pointer-events-none z-50"
    style={{ left: x, top: y }}
  >
    {icon}
  </motion.div>
);

export default function ValentinePage() {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [noButtonText, setNoButtonText] = useState("아니오");
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; icon: string }[]
  >([]);

  // '좋아요' 클릭 시 파티클 생성 로직
  const handleAccept = (e: React.MouseEvent | React.TouchEvent) => {
    // 클릭/터치 좌표 추출
    const clientX =
      "clientX" in e ? e.clientX : (e as React.TouchEvent).touches[0].clientX;
    const clientY =
      "clientY" in e ? e.clientY : (e as React.TouchEvent).touches[0].clientY;

    const icons = ["💋", "❤️", "💖", "🌸", "✨"];
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: Date.now() + i,
      x: clientX,
      y: clientY,
      icon: icons[Math.floor(Math.random() * icons.length)],
    }));

    setParticles(newParticles);

    // 이펙트가 충분히 보인 후 화면 전환 (0.8초 뒤)
    setTimeout(() => setIsAccepted(true), 800);
  };

  const moveButton = () => {
    const padding = 30;
    const btnWidth = 100;
    const btnHeight = 50;
    const x =
      Math.random() * (window.innerWidth - btnWidth - padding * 2) + padding;
    const y =
      Math.random() * (window.innerHeight - btnHeight - padding * 2) + padding;
    setNoButtonPos({ x, y });

    const texts = [
      "안돼요!",
      "생각해봐요..",
      "정말?",
      "잡아봐라!",
      "이건 아니지..",
      "진심인가요?",
    ];
    setNoButtonText(texts[Math.floor(Math.random() * texts.length)]);
  };

  if (isAccepted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-[#fff5f6] text-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-8xl mb-6"
        >
          ❤️
        </motion.div>
        <h1 className="text-3xl font-bold text-[#d44d5c] mb-4">
          함께해줘서 고마워요
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed break-keep">
          2026년의 발렌타인데이가 <br /> 덕분에 가장 특별한 날이 되었어요.
        </p>
        <div className="mt-12 text-5xl animate-bounce">✨👩‍❤️‍👨✨</div>
      </div>
    );
  }

  return (
    <main className="relative flex items-center justify-center min-h-[100dvh] bg-[#fff0f3] overflow-hidden p-6 touch-none">
      {/* 💥 좋아요 클릭 시 터지는 이펙트 레이어 */}
      {particles.map((p) => (
        <ExplosionParticle key={p.id} x={p.x} y={p.y} icon={p.icon} />
      ))}

      {!isOpened ? (
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsOpened(true)}
          className="z-10 cursor-pointer bg-white p-12 rounded-[2.5rem] shadow-xl text-center border-2 border-pink-100"
        >
          <div className="text-7xl mb-6 animate-bounce">💌</div>
          <p className="text-lg font-medium text-pink-400 italic">
            A Special Letter for You
          </p>
          <p className="text-sm text-gray-300 mt-2">클릭해서 열어보세요</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 bg-white/80 backdrop-blur-sm p-10 rounded-[3rem] shadow-2xl max-w-[340px] w-full border border-white"
        >
          <div className="space-y-6 text-gray-700 font-serif mb-12 text-center leading-relaxed break-keep">
            <p className="text-pink-300 text-2xl">─── 💌 ───</p>
            <p className="text-lg">
              어쩌면 스쳐 지나갔을 수많은 순간들 속에서 <br />
              <span className="text-pink-500 font-semibold italic">
                그대를 만난 건 기적 같아요.
              </span>
            </p>
            <p className="text-xl font-bold text-gray-800">
              오늘, 내 가장 따뜻한 진심이 되어줄래요?
            </p>
          </div>

          <div className="flex flex-col gap-4 relative">
            <button
              onClick={handleAccept} // 여기서 파티클 실행!
              className="w-full py-4 bg-[#ff4d6d] text-white rounded-2xl font-bold text-xl shadow-lg hover:bg-[#ff758f] transition-all z-20"
            >
              네, 좋아요! ❤️
            </button>

            <motion.button
              onTouchStart={moveButton}
              onMouseEnter={moveButton}
              animate={{
                position: noButtonPos.x === 0 ? "relative" : "fixed",
                left: noButtonPos.x,
                top: noButtonPos.y,
              }}
              className="w-full py-3 bg-gray-50 text-gray-300 rounded-2xl font-medium"
            >
              {noButtonText}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* 기본 배경 은은한 효과 (벚꽃잎) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -1000],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{ duration: 7, repeat: Infinity, delay: i * 0.5 }}
            className="absolute bottom-[-50px] text-pink-200 opacity-40 text-xl"
            style={{ left: `${Math.random() * 100}%` }}
          >
            🌸
          </motion.div>
        ))}
      </div>
    </main>
  );
}
