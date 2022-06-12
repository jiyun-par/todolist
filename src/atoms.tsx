import { atom, selector } from "recoil";
//first arg useRecoilValue(getvalue), sec arg useSetRecoilState(modify value)

export enum Categories {
	"TO_DO" = "TO_DO",
	"DOING" = "DOING",
	"DONE" = "DONE",
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
