import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { categoryName, toDoSelector, toDoState } from "./atoms";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ToDoBtn } from "./ToDoBtn.styled";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";
import CateSelector from "./components/Select";

const Container = styled.div`
	width: 540px;
	margin: 0 auto;
`;
const Title = styled.h1`
	text-align: center;
`;
const AddInput = styled.input`
	width: 200px;
	height: 50px;
	border: none;
`;
const FormContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
const CategoryForm = styled.form`
	display: flex;
	margin-bottom: 20px;
`;
interface IFormCategory {
	categoryName: string;
	deleteName: string;
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
	const setTodo = useSetRecoilState(toDoState);

	const onAdd = ({ categoryName }: IFormCategory) => {
		if (categoryName) {
			setCateList((prev) => [...prev, { categoryName }]);
			setValue("categoryName", "");
		} else {
			alert("Please write category!");
		}
	};
	const onDelete = ({ deleteName }: IFormCategory) => {
		const nameList = cateList.map((list) => list.categoryName);
		const idx = nameList.findIndex((name) => name === deleteName);
		if (idx > 0) {
			console.log(nameList.findIndex((name) => name === deleteName));
			setTodo((todo) =>
				todo.filter((list) => list.cateName !== deleteName)
			);
			setCateList((prev) => [
				...prev.slice(0, idx),
				...prev.slice(idx + 1),
			]);
		} else if (idx === 0) {
			alert("You can't delete basic!");
		} else {
			alert(`There is no category ${deleteName}!`);
		}
		setValue("deleteName", "");
		console.log(cateList);
	};

	return (
		<Container>
			<Title>To Do List</Title>
			<FormContainer>
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
				<CategoryForm onSubmit={handleSubmit(onDelete)}>
					<AddInput
						{...register("deleteName", {
							maxLength: 10,
							pattern: {
								value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
								message: "Just korean or english. No empty",
							},
						})}
						placeholder="Please write category to delete"
					/>
					<ToDoBtn>
						<BiMinusCircle />
					</ToDoBtn>
					<span style={{ lineHeight: "50px", color: "#93B5C6" }}>
						{errors?.categoryName?.message}
					</span>
				</CategoryForm>
			</FormContainer>
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
