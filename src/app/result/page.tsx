'use client';

import ResultBottom from '@/components/custom/result/resultBottom';
import ResultTop from '@/components/custom/result/resultTop';
import { useSearchParams } from 'next/navigation';

export default function ResultPage() {
  const params = useSearchParams();
  const correctCnt = params.get('ccnt') as string;
  const totalCnt = params.get('tcnt') as string;

  return (
    <div className="text-white flex flex-col justify-center items-center h-screen gap-20">
      <ResultTop correctCnt={correctCnt} totalCnt={totalCnt} />
      <ResultBottom />
    </div>
  );
}
