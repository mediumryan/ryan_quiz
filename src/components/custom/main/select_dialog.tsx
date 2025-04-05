'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import doge from '@/image/test_for_doge.jpg';
import Select_dialog_item from './select_dialog_item';
import { useAtom, useSetAtom } from 'jotai';
import { audioPlayAtom, selected_category_atom } from '@/data/atom';

export type Category = {
  id: number;
  name: string;
  img: string;
};

export default function Select_dialog() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useAtom(
    selected_category_atom
  );

  const [audioPlay, setAudioPlay] = useAtom(audioPlayAtom);

  const arr = [
    {
      id: 0,
      name: '한국 배우',
      img: 'https://raw.githubusercontent.com/mediumryan/ryan_quiz_image_dir/refs/heads/master/src/images/actor/이병헌.webp',
    },
    {
      id: 1,
      name: '나라별 국기',
      img: 'https://raw.githubusercontent.com/mediumryan/ryan_quiz_image_dir/refs/heads/master/src/images/nation/대한민국.svg',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center gap-2">
          <div
            className="relative flex items-center gap-2 w-48 h-48 rounded-md overflow-hidden
          cursor-pointer hover:scale-105 duration-300"
          >
            <Image
              src={selectedCategory === -1 ? doge : arr[selectedCategory].img}
              alt="Selected category image"
              fill={true}
            />
          </div>
          <p>{selectedCategory === -1 ? '' : arr[selectedCategory].name}</p>
        </div>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] max-h-[600px] overflow-y-auto"
        onClick={() => {
          setAudioPlay(true);
        }}
      >
        <DialogTitle className="text-center">카테고리를 선택하세요</DialogTitle>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          {arr.map((item, index) => (
            <Select_dialog_item
              key={index}
              setSelectedCat={setSelectedCategory}
              item={item}
              setOpen={setOpen}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
