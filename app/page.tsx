"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ValentinePage() {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  // 'No' 버튼 위치를 랜덤하게 옮기는 함수
  const moveButton = () => {
    // 버튼이 화면 밖으로 나가지 않도록 패딩(100px) 부여
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    setNoButtonPos({ x, y });
  };

  if (isAccepted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-6xl mb-6"
        >
          ❤️
        </motion.div>
        <h1 className="text-3xl font-bold text-pink-600 mb-2">I Love You!</h1>
        <p className="text-lg text-gray-600">
          Merge Request Accepted Forever. 🚀
        </p>
        <div className="mt-8 flex gap-2">
          {/* 귀여운 캐릭터 이미지나 GIF를 여기에 넣으세요 */}
          <span className="text-8xl animate-bounce">🥰</span>
        </div>
      </div>
    );
  }

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-[#fce4ec] overflow-hidden">
      {!isOpened ? (
        // 1. 초기 봉투 화면
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsOpened(true)}
          className="cursor-pointer bg-white p-10 rounded-2xl shadow-xl border-4 border-pink-300 text-center"
        >
          <div className="text-6xl mb-4">✉️</div>
          <p className="font-mono text-pink-500 font-bold">Click to open</p>
        </motion.div>
      ) : (
        // 2. 고백 카드 화면
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full border-t-8 border-pink-400"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 font-mono text-left">
            To the love of my life...
          </h2>
          <div className="space-y-3 text-gray-600 font-medium mb-8 text-left leading-relaxed">
            <p>
              You are the{" "}
              <span className="text-pink-500 font-bold">'commit'</span> I'll
              never revert.
            </p>
            <p>My life's best logic started the day I met you.</p>
            <p>
              You're my favorite person to{" "}
              <span className="text-pink-500 font-bold underline">merge</span>{" "}
              with. ❤️
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Will you be my Valentine?
          </h3>

          <div className="flex justify-center gap-4 h-12 relative">
            {/* YES 버튼 */}
            <button
              onClick={() => setIsAccepted(true)}
              className="px-8 py-2 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 transition-colors shadow-lg z-10"
            >
              YES
            </button>

            {/* NO 버튼 (도망가는 버튼) */}
            <motion.button
              onMouseEnter={moveButton}
              onClick={moveButton} // 모바일 대응용
              animate={{
                position: noButtonPos.x === 0 ? "relative" : "fixed",
                left: noButtonPos.x,
                top: noButtonPos.y,
              }}
              className="px-8 py-2 bg-gray-200 text-gray-500 rounded-full font-bold shadow-md"
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* 배경 장식 (둥둥 떠다니는 하트) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -1000],
              x: [0, Math.random() * 200 - 100],
              opacity: [1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute bottom-0 text-2xl"
            style={{ left: `${Math.random() * 100}%` }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    </main>
  );
}
