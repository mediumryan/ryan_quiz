import { RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ResultBottom() {
  const router = useRouter();

  const btnStyle =
    'w-16 h-8 md:w-24 md:h-12 flex justify-center items-center bg-white rounded-lg text-black cursor-pointer hover:text-blue-900 duration-300';

  return (
    <div className="w-36 h-36 flex flex-col justify-center items-center gap-4 p-4 bg-gray-900 rounded-lg shadow-md">
      <div
        className={btnStyle}
        onClick={() => {
          router.back();
        }}
      >
        <RotateCcw className="w-4 md:w-16" />
      </div>
      <Link href="/">
        <button className={btnStyle}>HOME</button>
      </Link>
    </div>
  );
}
