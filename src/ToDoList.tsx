import { useRecoilValue, useRecoilState } from "recoil";
import { Categories, categoryState, toDoSelector } from "./atoms";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";

function ToDoList() {
	const toDos = useRecoilValue(toDoSelector);
	const [category, setCategory] = useRecoilState(categoryState);
	const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
		const {
			currentTarget: { value },
		} = event;
		setCategory(value as any);
	};

	return (
		<div>
			<h1>To Dos</h1>
			<select value={category} onInput={onInput}>
				<option value={Categories.TO_DO}>TO DO</option>
				<option value={Categories.DOING}>DOING</option>
				<option value={Categories.DONE}>DONE</option>
			</select>
			<hr />
			<CreateToDo />
			{toDos?.map((todo) => (
				<ToDo key={todo.id} {...todo} />
			))}
		</div>
	);
}

export default ToDoList;
