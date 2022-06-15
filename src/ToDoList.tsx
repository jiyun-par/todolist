import { useRecoilValue, useRecoilState } from "recoil";
import { categoryName, toDoSelector } from "./atoms";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ToDoBtn } from "./ToDoBtn.styled";
import { BiPlusCircle } from "react-icons/bi";
import CateSelector from "./components/Select";

const Container = styled.div`
	width: 540px;
	margin: 0 auto;
`;
const Title = styled.h1`
	text-align: center;
`;
const ListContainer = styled.ul``;
const AddInput = styled.input`
	width: 200px;
	height: 30px;
	margin-top: 10px;
`;
const CategoryForm = styled.form`
	display: flex;
`;
interface IFormCategory {
	categoryName: string;
}

function ToDoList() {
	const toDos = useRecoilValue(toDoSelector);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IFormCategory>();
	const [cateList, setCateList] = useRecoilState(categoryName);
	const onAdd = ({ categoryName }: IFormCategory) => {
		setCateList((prev) => [...prev, { categoryName }]);
		setValue("categoryName", "");
	};

	return (
		<Container>
			<Title>To Do List</Title>
			<CategoryForm onSubmit={handleSubmit(onAdd)}>
				<AddInput
					{...register("categoryName", {
						maxLength: 10,
						pattern: {
							value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
							message: "Just korean or english. No empty",
						},
					})}
					placeholder="Please write category to add"
				/>
				<ToDoBtn>
					<BiPlusCircle />
				</ToDoBtn>
				<span style={{ lineHeight: "50px", color: "#93B5C6" }}>
					{errors?.categoryName?.message}
				</span>
			</CategoryForm>
			<CateSelector />
			<hr />
			<CreateToDo />
			{toDos?.map((todo) => (
				<ToDo key={todo.id} {...todo} />
			))}
		</Container>
	);
}

export default ToDoList;
