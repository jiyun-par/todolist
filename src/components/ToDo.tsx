import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";
function ToDo(props: IToDo) {
	const setToDos = useSetRecoilState(toDoState);

	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name },
		} = event;
		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex(
				(toDo) => toDo.id === props.id
			);
			const newToDo = {
				text: props.text,
				id: props.id,
				//만약 event로 name을 받아오지 않고 arg 직접 값을 넣어줬으면 as any는 사용하지 않아도 된다
				category: name as any,
			};
			return [
				...oldToDos.slice(0, targetIndex),
				newToDo,
				...oldToDos.slice(targetIndex + 1),
			];
		});
	};
	return (
		<li>
			{props.text}
			{props.category !== Categories.DOING && (
				<button name={Categories.DOING} onClick={onClick}>
					DOING
				</button>
			)}
			{props.category !== Categories.TO_DO && (
				<button name={Categories.TO_DO} onClick={onClick}>
					TO DO
				</button>
			)}
			{props.category !== Categories.DONE && (
				<button name={Categories.DONE} onClick={onClick}>
					DONE
				</button>
			)}
		</li>
	);
}
export default ToDo;
