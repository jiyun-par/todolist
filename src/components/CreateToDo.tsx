import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, cateNameState, toDoState } from "../atoms";
import { BiPlusCircle } from "react-icons/bi";
import styled from "styled-components";
import { ToDoBtn } from "../ToDoBtn.styled";

const ToDoInput = styled.input`
	width: 520px;
	height: 40px;
	text-indent: 10px;
	padding: 0;
	margin: 5px 0;
	border: none;
	background: #94b49f;
	color: #fff;
	font-size: 17px;
	outline: none;
	&::placeholder {
		color: #fff;
		font-size: 16px;
	}
`;

const Form = styled.form`
	display: flex;
`;

interface IForm {
	toDo: string;
}

function CreateToDo() {
	const setToDos = useSetRecoilState(toDoState);
	const category = useRecoilValue(categoryState);
	const cateName = useRecoilValue(cateNameState);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IForm>();
	const onSubmit = ({ toDo }: IForm) => {
		setToDos((oldToDos) => [
			{ text: toDo, id: Date.now(), cateName, category },
			...oldToDos,
		]);
		setValue("toDo", "");
	};
	const PlaceHolderText = `Please write a ${category} list for ${cateName.toUpperCase()}`;
	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<ToDoInput
					{...register("toDo", { required: "Please write a list!" })}
					placeholder={PlaceHolderText}
				/>
				<ToDoBtn>
					<BiPlusCircle />
				</ToDoBtn>
			</Form>
			<span>{errors?.toDo?.message}</span>
		</>
	);
}

export default CreateToDo;
