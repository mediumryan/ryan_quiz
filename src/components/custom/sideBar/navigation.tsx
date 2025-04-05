'use client';

import {
  audioPlayAtom,
  quiz_count_atom,
  selected_category_atom,
} from '@/data/atom';
import { useSetAtom } from 'jotai';
import { HomeIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();

  const setQuizCount = useSetAtom(quiz_count_atom);
  const setSelectedCategory = useSetAtom(selected_category_atom);
  const setAudioPlay = useSetAtom(audioPlayAtom);

  const onClickBtnHome = () => {
    setQuizCount(0);
    setSelectedCategory(-1);
    setAudioPlay(false);

    router.push('/');
  };

  return (
    <div className="absolute top-0 left-0 p-4 z-20" onClick={onClickBtnHome}>
      <HomeIcon className="text-white" />
    </div>
  );
}
