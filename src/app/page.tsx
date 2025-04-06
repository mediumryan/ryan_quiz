import Go_select_count_btn from '@/components/custom/main/go_select_count_btn';
import Select_dialog from '@/components/custom/main/select_dialog';

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen py-2 text-white">
      <h1 className="text-[1.75rem] md:text-[2.5rem] font-bold mt-12 mb-16 md:mb-24">
        Ryanseok Quiz!
      </h1>
      <p className="text-[1.25rem] md:text-[1.5rem] mb-6">카테고리 선택하기</p>
      <Select_dialog />
      <Go_select_count_btn />
    </div>
  );
}
