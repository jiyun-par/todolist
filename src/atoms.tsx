import { atom, selector, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";
import { constants } from "zlib";
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
	cateName: string;
	category: Categories;
}

interface IList {
	categoryName: string;
}

export const categoryName = atom<IList[]>({
	key: "categoryName",
	default: [{ categoryName: "basic" }],
	effects_UNSTABLE: [persistAtom],
});

export const cateNameState = atom<string>({
	key: "cateNameState",
	default: "basic",
});

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
		const cateName = get(cateNameState);
		return toDos.filter(
			(toDo) => toDo.category === category && toDo.cateName === cateName
		);
	},
});
//selector 기존의 atom의 output을 변형시켜준다
