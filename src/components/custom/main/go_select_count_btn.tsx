'use client';

import { Button } from '@/components/ui/button';
import { selected_category_atom } from '@/data/atom';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';

export default function Go_select_count_btn() {
  const selectedCategory = useAtomValue(selected_category_atom);
  const routes = useRouter();

  const onClick = () => {
    routes.push('/select_q_count');
  };

  return (
    <div className="group">
      <Button
        className="dark mt-24 text-[1.5rem] group-hover:animate-bounce group-hover:text-red-400"
        onClick={onClick}
        disabled={selectedCategory === -1}
      >
        시작하기
      </Button>
    </div>
  );
}
