import { createGlobalStyle } from "styled-components";

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
	}
	a{
		color:inherit;
		text-decoration:none;
	}

`;

function App() {
	return (
		<>
			<GlobalStyle />
		</>
	);
}

export default App;
