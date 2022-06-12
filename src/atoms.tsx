import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
//first arg useRecoilValue(getvalue), sec arg useSetRecoilState(modify value)
export const { persistAtom } = recoilPersist();

export enum Categories {
	"TO_DO" = "TO DO",
	"DOING" = "DOING",
	"DONE" = "DONE",
	"DELETE" = "DELETE",
}
export interface IToDo {
	text: string;
	id: number;
	category: Categories;
}

export const categoryState = atom<Categories>({
	key: "category",
	default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
	key: "toDo",
	default: [],
	effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
	key: "toDoSelector",
	get: ({ get }) => {
		const toDos = get(toDoState);
		const category = get(categoryState);
		return toDos.filter((toDo) => toDo.category === category);
	},
});
//selector 기존의 atom의 output을 변형시켜준다
