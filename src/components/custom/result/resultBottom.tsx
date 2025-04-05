import { RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ResultBottom() {
  const router = useRouter();

  return (
    <div className="w-36 h-36 flex flex-col justify-center items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <div
        className="w-24 h-12 flex justify-center items-center bg-white rounded-lg text-black cursor-pointer hover:text-blue-500 duration-300"
        onClick={() => {
          router.back();
        }}
      >
        <RotateCcw size={24} />
      </div>
      <Link href="/">
        <button className="w-24 h-12 bg-blue-500 text-black px-4 py-2 rounded-lg hover:text-white duration-300">
          HOME
        </button>
      </Link>
    </div>
  );
}
