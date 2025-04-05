import Image from 'next/image';
import { Category } from './select_dialog';

interface Select_dialog_itemProps {
  setSelectedCat: React.Dispatch<React.SetStateAction<number>>;
  item: Category;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Select_dialog_item({
  setSelectedCat,
  item,
  setOpen,
}: Select_dialog_itemProps) {
  const handleClick = () => {
    setSelectedCat(item.id);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-2" onClick={handleClick}>
      <div
        className="relative w-36 h-36 rounded-full overflow-hidden cursor-pointer 
      border-4 border-gray-500
      hover:scale-105
      hover:border-red-500
      duration-300"
      >
        <Image src={item.img} alt={item.name} fill={true} />
      </div>
      <p>{item.name}</p>
    </div>
  );
}
