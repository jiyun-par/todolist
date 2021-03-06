import { createGlobalStyle } from "styled-components";
import ToDoList from "./ToDoList";
import { Helmet } from "react-helmet";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
	*{
		box-sizing:border-box;
	}
	body,html{
		width:100vw;
		overflow-x:hidden;
	}
	body::-webkit-scrollbar{
		display:none;
	}
	body {
		font-family:'Source Sans Pro', sans-serif;
		background:#F4DFD0;
	}
	a{
		color:inherit;
		text-decoration:none;
	}
	li{
		list-style:none;
	}
	button{
		margin:0;
		padding:0;
		background: transparent;
		border:none;
	}

`;

function App() {
	return (
		<>
			<Helmet title="To Do List" />
			<GlobalStyle />
			<ToDoList />
		</>
	);
}

export default App;
