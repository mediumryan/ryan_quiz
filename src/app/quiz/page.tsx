'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import doge from '@/image/test_for_doge.jpg';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { checkUserAnswer, getQuizData, Quiz } from '@/service/service';
import { shuffleArray } from '@/utils/shuffleArray';
import { quiz_count_atom, selected_category_atom } from '@/data/atom';
import { useAtomValue } from 'jotai';
import { quiz_title } from '@/data/quiz_title';
import { useRouter } from 'next/navigation';

type Inputs = {
  inputValue: string;
};

export default function QuizPage() {
  const quizCount = useAtomValue(quiz_count_atom);
  const selectedCategory = useAtomValue(selected_category_atom);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(0); // 0: not yet, 1: correct, 2: wrong
  const [correctCnt, setCorrectCnt] = useState(0);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const correctAudioRef = useRef<HTMLAudioElement>(null);
  const inCorrectAudioRef = useRef<HTMLAudioElement>(null);

  const { register, handleSubmit, setValue, setFocus } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitted(true);
    const isAnswer = await checkUserAnswer(quiz[0].id, data.inputValue);
    if (isAnswer) {
      correctAudioRef.current?.play();
      setIsCorrect(1);
      setCorrectCnt((prev) => prev + 1);
    } else {
      inCorrectAudioRef.current?.play();
      setIsCorrect(2);
    }
    nextBtnRef.current?.focus();
  };

  const onClickNextBtn = () => {
    if (quiz.length - 1 === 0) {
      router.push(`/result?ccnt=${correctCnt}&tcnt=${quizCount}`);
    }
    setIsSubmitted(false);
    setIsCorrect(0);
    setValue('inputValue', '');
    setQuiz((prev) => {
      const temp = [...prev];
      temp.shift();
      return temp;
    });
    setFocus('inputValue');
  };

  const [quiz, setQuiz] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const data = (await getQuizData(selectedCategory)) as Quiz[];
        const shuffledData = shuffleArray(data);
        setQuiz(shuffledData.slice(0, quizCount));
      } catch (error) {
        console.error('Error loading actor data:', error);
      }
    };

    fetchActorData();
  }, []);

  return (
    <div className="relative text-white flex flex-col items-center justify-evenly min-h-screen py-2">
      <h1 className="text-[1.5rem]">{quiz_title[selectedCategory]}</h1>
      <div
        className={`relative 
          w-[400px] h-[400px] rounded-lg overflow-hidden cursor-pointer 
      border-4 ${
        isCorrect === 0
          ? 'border-gray-500'
          : isCorrect === 1
          ? 'border-green-500'
          : 'border-red-500'
      } duration-300`}
      >
        <Image
          src={quiz.length > 0 ? quiz[0].image_path : doge}
          alt="image for quiz"
          fill={true}
        />
      </div>
      <div
        className={`flex items-center gap-2 text-[1.25rem]
            cursor-none
            ${isSubmitted ? 'opacity-100' : 'opacity-0'}`}
      >
        <p>정답 :</p>
        <p>{quiz.length > 0 ? quiz[0].answers[0] : ''}</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex gap-4 ${isSubmitted ? 'opacity-0' : 'opacity-100'}`}
      >
        <Input
          {...register('inputValue', { required: true })}
          id="quiz_input"
          type="text"
          placeholder="이름을 입력하세요"
        />
        <Button type="submit">확인</Button>
      </form>
      <Button
        ref={nextBtnRef}
        className={`dark text-[1.25rem] py-6 px-8 ${
          isSubmitted ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClickNextBtn}
      >
        다음문제
      </Button>
      <div
        className="absolute top-24 right-24 p-4 bg-opacity-50
        text-[1.25rem] bg-slate-700 rounded-lg flex flex-col items-center gap-2
      "
      >
        <h4>Score</h4>
        <p className="text-red-500">
          {correctCnt} / {quizCount}
        </p>
      </div>
      <div>
        <audio ref={correctAudioRef}>
          <source src="/music/correct.wav" type="audio/wav" />
        </audio>
        <audio ref={inCorrectAudioRef}>
          <source src="/music/incorrect.wav" type="audio/wav" />
        </audio>
      </div>
    </div>
  );
}
