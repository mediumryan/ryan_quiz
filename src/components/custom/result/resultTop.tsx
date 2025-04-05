import React, { useEffect, useState } from 'react';

type TResultTop = {
  correctCnt: string;
  totalCnt: string;
};

export default function ResultTop({ correctCnt, totalCnt }: TResultTop) {
  const [title, setTitle] = useState('');

  const topTitleArr = [
    'Oops...',
    'Good.',
    'Great!',
    'Excelente!!',
    'Perfect!!!',
  ];

  const getTitle = (percentage: number) => {
    if (percentage < 50) {
      setTitle(topTitleArr[0]);
    } else if (percentage <= 70) {
      setTitle(topTitleArr[1]);
    } else if (percentage <= 80) {
      setTitle(topTitleArr[2]);
    } else if (percentage <= 90) {
      setTitle(topTitleArr[3]);
    } else {
      setTitle(topTitleArr[4]);
    }
  };

  useEffect(() => {
    const percentage = Math.floor(
      (Number(correctCnt) / Number(totalCnt)) * 100
    );

    getTitle(percentage);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-4xl font-extrabold">{title}</h1>
      <p className="italic text-lg font-bold">
        {correctCnt} / {totalCnt}
      </p>
    </div>
  );
}
