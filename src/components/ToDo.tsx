import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";
import { SubText, ToDoBtn } from "../ToDoBtn.styled";
import styled from "styled-components";
import { BiRun, BiCalendar, BiCheckCircle, BiTrash } from "react-icons/bi";

const List = styled.li`
	display: flex;
	margin-top: 10px;
`;
const ListText = styled.div`
	line-height: 50px;
	text-indent: 10px;
	color: #000;
	width: 300px;
	background-color: rgba(148, 180, 159, 0.5);
`;

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
			return name !== Categories.DELETE
				? [
						...oldToDos.slice(0, targetIndex),
						newToDo,
						...oldToDos.slice(targetIndex + 1),
				  ]
				: [
						...oldToDos.slice(0, targetIndex),

						...oldToDos.slice(targetIndex + 1),
				  ];
		});
	};
	return (
		<List>
			<ListText>{props.text}</ListText>

			{props.category !== Categories.DOING && (
				<ToDoBtn name={Categories.DOING} onClick={onClick}>
					<BiRun />
					<SubText>{Categories.DOING}</SubText>
				</ToDoBtn>
			)}
			{props.category !== Categories.TO_DO && (
				<ToDoBtn name={Categories.TO_DO} onClick={onClick}>
					<BiCalendar />
					<SubText>{Categories.TO_DO}</SubText>
				</ToDoBtn>
			)}
			{props.category !== Categories.DONE && (
				<ToDoBtn name={Categories.DONE} onClick={onClick}>
					<BiCheckCircle />
					<SubText>{Categories.DONE}</SubText>
				</ToDoBtn>
			)}
			<ToDoBtn name={Categories.DELETE} onClick={onClick}>
				<BiTrash />
				<SubText>{Categories.DELETE}</SubText>
			</ToDoBtn>
		</List>
	);
}
export default ToDo;
