"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// CSS 하트 컴포넌트
const CSSHeart = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 32 29.6" className="w-full h-full">
      <path
        d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
        fill="currentColor"
      />
    </svg>
  </div>
);

// 편지 봉투 SVG 컴포넌트
const EnvelopeIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={`w-full h-full ${className}`}>
    <path
      d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z"
      fill="#ff4d6d"
      stroke="#ff4d6d"
      strokeWidth="1.5"
    />
    <path
      d="M22 6L12 13L2 6"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 터지는 입자(하트/입술) 컴포넌트
const ExplosionParticle = ({
  x,
  y,
  dx,
  dy,
  rot,
  icon,
}: {
  x: number;
  y: number;
  dx: number;
  dy: number;
  rot: number;
  icon: string;
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
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="absolute text-3xl pointer-events-none z-50"
    style={{ left: x, top: y }}
  >
    {icon}
  </motion.div>
);

export default function ValentinePage() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [noClickCount, setNoClickCount] = useState(0);

  const [particles, setParticles] = useState<
    {
      id: number;
      x: number;
      y: number;
      dx: number;
      dy: number;
      rot: number;
      icon: string;
    }[]
  >([]);

  // '좋아요' 클릭 시
  const handleAccept = () => {
    // 모바일이면 살짝 진동 (지원 브라우저 한정)
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(30);
    }

    setTimeout(() => setIsAccepted(true), 500);
  };

  const handleNoClick = () => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);

    // "좋아요" 버튼은 점점 커지고
    setYesButtonScale(1 + newCount * 0.15);

    // "아니요" 버튼은 점점 작아지고
    setNoButtonScale(Math.max(0.4, 1 - newCount * 0.15));

    // 진동 효과
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([50, 30, 50]);
    }
  };

  if (isAccepted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gradient-to-br from-pink-50 via-red-50 to-pink-100 text-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="w-24 h-24 md:w-32 md:h-32 mb-8 text-[#ff4d6d] drop-shadow-2xl"
        >
          <CSSHeart />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-[#ff4d6d] mb-6"
        >
          함께해줘서 정말 고마워!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base md:text-lg text-gray-700 leading-relaxed break-keep max-w-md"
        >
          2026년 2월 14일,
          <br />
          너와 함께하는 오늘이 가장 특별하고 사랑스러운 날이야.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="mt-12 flex items-center gap-3"
        >
          <span className="text-4xl">✨</span>
          <div className="w-12 h-12 text-pink-500">
            <CSSHeart />
          </div>
          <span className="text-4xl">✨</span>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative flex items-center justify-center min-h-[100dvh] bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-hidden p-6">
      {/* 💥 좋아요 클릭 시 터지는 이펙트 레이어 */}
      {particles.map((p) => (
        <ExplosionParticle
          key={p.id}
          x={p.x}
          y={p.y}
          dx={p.dx}
          dy={p.dy}
          rot={p.rot}
          icon={p.icon}
        />
      ))}

      {!isOpened ? (
        <motion.div
          whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpened(true)}
          role="button"
          aria-label="편지 열기"
          className="z-10 cursor-pointer bg-white p-12 rounded-[2.5rem] shadow-2xl hover:shadow-pink-200/50 text-center border-2 border-pink-100 transition-shadow"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-20 h-20 mx-auto mb-6"
          >
            <EnvelopeIcon />
          </motion.div>
          <p className="text-lg font-semibold text-pink-500">
            특별한 편지가 도착했어!
          </p>
          <p className="text-sm text-gray-400 mt-2 flex items-center justify-center gap-2">
            클릭해서 열어봐
            <span className="inline-block w-4 h-4 text-yellow-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </span>
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 bg-white/85 backdrop-blur-sm p-10 rounded-[3rem] shadow-2xl max-w-[360px] w-full border border-white"
        >
          <div className="space-y-5 text-gray-800 mb-8 text-center leading-relaxed break-keep">
            <div className="flex items-center justify-center gap-3 text-pink-300 text-xl">
              <span>───</span>
              <div className="w-6 h-6 text-pink-400">
                <CSSHeart />
              </div>
              <span>───</span>
            </div>

            <p className="text-lg">
              어쩌면 스쳐 지나갔을 수많은 순간들 사이에서,
              <br />
              <span className="text-[#ff4d6d] font-bold">
                너를 만난 건 정말 큰 행운이야.
              </span>
            </p>

            <p className="text-xl md:text-2xl font-bold text-gray-900">
              오늘, 내 마음을 받아줄래?
            </p>

            {/* <p className="text-sm text-gray-500">
              (대답은 "좋아"만 가능할지도 몰라 🙂)
            </p> */}
          </div>

          <div className="flex flex-col gap-4">
            <motion.button
              onClick={handleAccept}
              animate={{ scale: yesButtonScale }}
              whileHover={{
                scale: yesButtonScale * 1.05,
                boxShadow: "0 10px 30px rgba(255, 77, 109, 0.4)",
              }}
              whileTap={{ scale: yesButtonScale * 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full py-4 bg-[#ff4d6d] text-white rounded-2xl font-bold text-lg md:text-xl shadow-lg hover:bg-[#ff5c7c] transition-colors origin-center flex items-center justify-center gap-2"
            >
              {noClickCount >= 3 ? (
                <>
                  제발 좋아해줘!
                  <div className="w-5 h-5 inline-block">
                    <CSSHeart />
                  </div>
                </>
              ) : noClickCount >= 1 ? (
                <>
                  응, 좋아!
                  <div className="w-5 h-5 inline-block">
                    <CSSHeart />
                  </div>
                  <div className="w-5 h-5 inline-block">
                    <CSSHeart />
                  </div>
                </>
              ) : (
                <>
                  응, 좋아!
                  <div className="w-5 h-5 inline-block">
                    <CSSHeart />
                  </div>
                </>
              )}
            </motion.button>

            <motion.button
              onClick={handleNoClick}
              animate={{ scale: noButtonScale }}
              whileHover={{ scale: noButtonScale * 1.05 }}
              whileTap={{ scale: noButtonScale * 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full py-3 bg-gray-100 text-gray-500 rounded-2xl font-medium shadow-sm hover:bg-gray-200 transition-colors origin-center"
            >
              {noClickCount >= 3
                ? "미안해.."
                : noClickCount >= 1
                  ? "아니요..?"
                  : "아니요"}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* 기본 배경 은은한 효과 (벚꽃잎) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -1000],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            className="absolute bottom-[-50px] opacity-30"
            style={{ left: `${Math.random() * 100}%` }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path
                d="M12 5.5c-1.5-2-4-2.5-6-1-2.5 2-2.5 5.5 0 8l6 6 6-6c2.5-2.5 2.5-6 0-8-2-1.5-4.5-1-6 1z"
                fill="#ffc0cb"
                stroke="#ffb6c1"
                strokeWidth="1"
              />
              <circle cx="8" cy="10" r="1" fill="#fff" opacity="0.6" />
            </svg>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
