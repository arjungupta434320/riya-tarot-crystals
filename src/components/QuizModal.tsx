"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import BraceletQuiz from "./BraceletQuiz";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizModal() {
  const { isQuizModalOpen, closeQuizModal } = useStore();

  if (!isQuizModalOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#2C2A29]/35 backdrop-blur-sm"
          onClick={closeQuizModal}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-xl z-10"
        >
          <BraceletQuiz isModal={true} onClose={closeQuizModal} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
