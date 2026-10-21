"use client";

import React from "react";
import { QuizEngine } from "@/components/quiz/QuizEngine";

interface BraceletQuizProps {
  isModal?: boolean;
  onClose?: () => void;
}

export default function BraceletQuiz({ isModal = false, onClose }: BraceletQuizProps) {
  return <QuizEngine isModal={isModal} onClose={onClose} />;
}
