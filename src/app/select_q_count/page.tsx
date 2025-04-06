'use client';

import { Button } from '@/components/ui/button';
import { quiz_count_atom } from '@/data/atom';
import { useSetAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SelectQuizCountPage() {
  const countArr = [
    {
      id: 0,
      count: 10,
    },
    {
      id: 1,
      count: 25,
    },
    {
      id: 2,
      count: 50,
    },
    {
      id: 3,
      count: 100,
    },
  ];

  const [selectedCount, setSelectedCount] = useState(-1);
  const setQuizCount = useSetAtom(quiz_count_atom);

  const handleClick = (count: number) => {
    setSelectedCount(count);
  };

  useEffect(() => {
    if (selectedCount !== -1) {
      setQuizCount(countArr[selectedCount].count);
    }
  }, [selectedCount]);

  return (
    <div className="text-white flex flex-col items-center justify-evenly min-h-screen py-2">
      <h1 className="text-[1.5rem] md:text-[2rem]">문제 수를 선택하세요</h1>
      <div className="grid gap-12 grid-cols-2 mt-4">
        {countArr.map((item) => (
          <div
            key={item.id}
            className={`w-28 h-28 md:w-40 md:h-40 flex items-center justify-center ${
              selectedCount === item.id ? 'bg-blue-500' : 'bg-red-500'
            } rounded-full cursor-pointer text-[1.25rem] md:text-[1.5rem] hover:scale-105 duration-300`}
            onClick={() => handleClick(item.id)}
          >
            {item.count}
          </div>
        ))}
      </div>
      <Link href={`/quiz/`}>
        <Button
          className="dark md:text-[1.25rem] px-8 py-6 md:px-12 md:py-8"
          disabled={selectedCount === -1}
        >
          GO!
        </Button>
      </Link>
    </div>
  );
}
