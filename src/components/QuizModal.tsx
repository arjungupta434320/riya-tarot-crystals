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
        className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden"
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

        {/* Modal Window: Native Bottom Sheet on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 35 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-xl z-10 max-h-[92dvh] overflow-y-auto rounded-t-[28px] sm:rounded-3xl bg-white shadow-2xl pb-safe sm:pb-0"
        >
          <div className="w-12 h-1.5 bg-[#EAE5DF] rounded-full mx-auto mt-3 mb-1 sm:hidden flex-shrink-0" />
          <BraceletQuiz isModal={true} onClose={closeQuizModal} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
