import { useRecoilState, useRecoilValue } from "recoil";
import {
	Categories,
	categoryState,
	cateNameState,
	categoryName,
} from "../atoms";
import styled from "styled-components";

const Selector = styled.select`
	width: 150px;
	margin-right: 10px;
	height: 30px;
	font-size: 16px;
`;
function CateSelector() {
	const [category, setCategory] = useRecoilState(categoryState);
	const [cateName, setCateName] = useRecoilState(cateNameState);
	const cateList = useRecoilValue(categoryName);

	const handleStatus = (event: React.FormEvent<HTMLSelectElement>) => {
		const {
			currentTarget: { value },
		} = event;
		setCategory(value as any);
	};
	const handleCategory = (event: React.FormEvent<HTMLSelectElement>) => {
		const {
			currentTarget: { value },
		} = event;
		setCateName(value);
	};

	return (
		<>
			<Selector value={cateName} onInput={handleCategory}>
				{cateList.map((list, idx) => {
					return (
						<option value={list.categoryName} key={idx}>
							{list.categoryName}
						</option>
					);
				})}
			</Selector>
			<Selector value={category} onInput={handleStatus}>
				<option value={Categories.TO_DO}>TO DO</option>
				<option value={Categories.DOING}>DOING</option>
				<option value={Categories.DONE}>DONE</option>
			</Selector>
		</>
	);
}

export default CateSelector;
