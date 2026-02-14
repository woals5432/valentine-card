"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ValentinePage() {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  // '아니오' 버튼을 도망가게 만드는 함수
  const moveButton = () => {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    setNoButtonPos({ x, y });
  };

  if (isAccepted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          className="text-8xl mb-6"
        >
          🥰
        </motion.div>
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          예스! 수락되었습니다!
        </h1>
        <p className="text-xl text-gray-600 font-mono">
          Merge Request Accepted Forever. <br />
          우리 사이 충돌(Conflict)은 이제 없어요! 🚀
        </p>
        <div className="mt-10 text-6xl animate-bounce text-pink-400">
          ❤️❤️❤️
        </div>
      </div>
    );
  }

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-[#fff0f3] overflow-hidden p-4">
      {!isOpened ? (
        // 1. 편지 봉투
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpened(true)}
          className="cursor-pointer bg-white p-12 rounded-3xl shadow-2xl border-4 border-pink-200 text-center"
        >
          <div className="text-7xl mb-6">💌</div>
          <p className="text-xl font-bold text-pink-500 animate-pulse">
            눌러서 확인하기
          </p>
        </motion.div>
      ) : (
        // 2. 고백 카드
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full border-t-[12px] border-pink-400 relative"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-left">
            나의 소중한 사람에게...
          </h2>
          <div className="space-y-4 text-gray-600 font-medium mb-10 text-left leading-relaxed break-keep">
            <p>
              너는 내 인생에서 절대{" "}
              <span className="text-pink-500 font-bold">revert</span> 하고 싶지
              않은 소중한 순간이야.
            </p>
            <p>
              우리의 만남은 내 삶의{" "}
              <span className="text-pink-500 font-bold underline">
                가장 완벽한 로직
              </span>
              이었어.
            </p>
            <p>
              나와 함께 평생{" "}
              <span className="text-pink-500 font-bold underline text-lg font-mono">
                merge
              </span>{" "}
              해줄래? ❤️
            </p>
          </div>

          <h3 className="text-2xl font-extrabold text-gray-900 mb-10">
            내 발렌타인이 되어줄래?
          </h3>

          <div className="flex justify-center gap-6 h-14 relative">
            {/* 좋아요 버튼 */}
            <button
              onClick={() => setIsAccepted(true)}
              className="flex-1 bg-pink-500 text-white rounded-2xl font-bold text-xl hover:bg-pink-600 transition-all shadow-lg active:scale-95 z-10"
            >
              좋아요!
            </button>

            {/* 아니오 버튼 (도망가는 버튼) */}
            <motion.button
              onMouseEnter={moveButton}
              onClick={moveButton}
              animate={{
                position: noButtonPos.x === 0 ? "relative" : "fixed",
                left: noButtonPos.x,
                top: noButtonPos.y,
              }}
              className="flex-1 bg-gray-100 text-gray-400 rounded-2xl font-bold text-lg shadow-sm"
            >
              아니오
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* 배경 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -window.innerHeight],
              x: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.7,
            }}
            className="absolute bottom-0 text-3xl"
            style={{ left: `${Math.random() * 100}%` }}
          >
            {i % 2 === 0 ? "🌸" : "💗"}
          </motion.div>
        ))}
      </div>
    </main>
  );
}
