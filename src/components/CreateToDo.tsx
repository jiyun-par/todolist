import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
	toDo: string;
}

function CreateToDo() {
	const setToDos = useSetRecoilState(toDoState);
	const category = useRecoilValue(categoryState);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IForm>();

	const onSubmit = ({ toDo }: IForm) => {
		setToDos((oldToDos) => [
			{ text: toDo, id: Date.now(), category },
			...oldToDos,
		]);
		setValue("toDo", "");
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				{...register("toDo", { required: "Please write todolist" })}
				placeholder="Write a to do"
			/>
			<span>{errors?.toDo?.message}</span>
			<button>Add</button>
		</form>
	);
}

export default CreateToDo;
