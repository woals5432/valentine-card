"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// 터지는 입자(하트/입술) 컴포넌트
const ExplosionParticle = ({
  x,
  y,
  dx,
  dy,
  rot,
}: {
  x: number;
  y: number;
  dx: number;
  dy: number;
  rot: number;
}) => (
  <motion.div
    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
    animate={{
      opacity: 0,
      scale: 2,
      x: dx,
      y: dy,
      rotate: rot,
    }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="absolute text-3xl pointer-events-none z-50"
    style={{ left: x, top: y }}
  ></motion.div>
);

export default function ValentinePage() {
  // '아니오' 버튼은 fixed + x/y 이동으로 안정화
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [noButtonText, setNoButtonText] = useState("아니요");

  const [particles, setParticles] = useState<
    {
      id: number;
      x: number;
      y: number;
      dx: number;
      dy: number;
      rot: number;
    }[]
  >([]);

  // '좋아요' 클릭 시 파티클 생성 로직 (랜덤값 고정)
  const handleAccept = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX =
      "clientX" in e ? e.clientX : (e as React.TouchEvent).touches[0].clientX;
    const clientY =
      "clientY" in e ? e.clientY : (e as React.TouchEvent).touches[0].clientY;

    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: Date.now() + i,
      x: clientX,
      y: clientY,
      dx: (Math.random() - 0.5) * 400,
      dy: (Math.random() - 0.5) * 400,
      rot: Math.random() * 720,
      // icon: icons[Math.floor(Math.random() * icons.length)],
    }));

    setParticles(newParticles);

    // 모바일이면 살짝 진동 (지원 브라우저 한정)
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(30);
    }

    setTimeout(() => setIsAccepted(true), 800);
  };

  const moveButton = () => {
    const padding = 24;
    const btnWidth = 220; // 대략적 버튼 폭(고정 이동용)
    const btnHeight = 52;

    const x =
      Math.random() * (window.innerWidth - btnWidth - padding * 2) + padding;
    const y =
      Math.random() * (window.innerHeight - btnHeight - padding * 2) + padding;

    setNoButtonPos({ x, y });

    const texts = [
      "앗, 잠시만요!",
      "조금만 더 생각해 주세요..",
      "정말 괜찮으실까요?",
      "잡을 수 있으시면 잡아보세요!",
      "이건 너무하신데요..",
      "진심으로요?",
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
          함께해 주셔서 정말 고마워요
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed break-keep">
          2026년 2월 14일,
          <br />
          덕분에 오늘이 가장 사랑스러운 날이 되었어요.
        </p>

        <div className="mt-12 text-5xl animate-bounce">✨👩‍❤️‍👨✨</div>
      </div>
    );
  }

  return (
    <main className="relative flex items-center justify-center min-h-[100dvh] bg-[#fff0f3] overflow-hidden p-6">
      {/* 💥 좋아요 클릭 시 터지는 이펙트 레이어 */}
      {particles.map((p) => (
        <ExplosionParticle
          key={p.id}
          x={p.x}
          y={p.y}
          dx={p.dx}
          dy={p.dy}
          rot={p.rot}
        />
      ))}

      {!isOpened ? (
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsOpened(true)}
          role="button"
          aria-label="편지 열기"
          className="z-10 cursor-pointer bg-white p-12 rounded-[2.5rem] shadow-xl text-center border-2 border-pink-100"
        >
          <div className="text-7xl mb-6 animate-bounce">💌</div>
          <p className="text-lg font-medium text-pink-500">
            특별한 편지가 도착했어요
          </p>
          <p className="text-sm text-gray-400 mt-2">클릭해서 열어보세요</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 bg-white/85 backdrop-blur-sm p-10 rounded-[3rem] shadow-2xl max-w-[360px] w-full border border-white"
        >
          <div className="space-y-5 text-gray-800 mb-8 text-center leading-relaxed break-keep">
            <p className="text-pink-300 text-2xl">─── 💌 ───</p>

            <p className="text-lg">
              어쩌면 스쳐 지나갔을 수많은 순간들 사이에서,
              <br />
              <span className="text-pink-500 font-semibold">
                당신을 만난 건 정말 큰 행운이었어요.
              </span>
            </p>

            <p className="text-xl font-bold text-gray-900">
              오늘, 제 마음을 받아주실래요?
            </p>

            <p className="text-sm text-gray-500">
              (대답은 “네”만 가능하실지도 몰라요 🙂)
            </p>
          </div>

          <div className="flex flex-col gap-4 relative">
            <button
              onClick={handleAccept}
              className="w-full py-4 bg-[#ff4d6d] text-white rounded-2xl font-bold text-xl shadow-lg hover:bg-[#ff758f] transition-all z-20"
            >
              네, 좋아요! ❤️
            </button>

            {/* '아니요' 버튼: fixed + x/y 이동 */}
            <motion.button
              onTouchStart={moveButton}
              onMouseEnter={moveButton}
              initial={false}
              animate={{
                x: noButtonPos.x,
                y: noButtonPos.y,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="fixed left-0 top-0 w-[220px] py-3 bg-gray-50 text-gray-300 rounded-2xl font-medium shadow-sm"
            >
              {noButtonText}
            </motion.button>

            <p className="text-xs text-gray-400 text-center">
              * “아니요”는 도망갈 수도 있어요
            </p>
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
