import { atom } from 'jotai';

export const quiz_count_atom = atom(0);

export const selected_category_atom = atom(-1);

export const audioPlayAtom = atom<boolean>(false);
