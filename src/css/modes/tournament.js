import styled from 'styled-components';
import back from '../../assets/tourn1.jpg';
export const Container = styled.div`
	box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
		rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
		rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
	max-width: 100%;
	height: 80vh;
	.container__div {
		width: 100%;

		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman',
				serif;
			font-size: 1.5rem;
			color: darkgreen;
			font-weight: bold;
			position: absolute;
			background: orange;
			&:hover {
				background: lightblue;
			}
		}
	}
	.myform {
		max-width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		form {
			width: 50%;
			margin-top: 2rem;
			padding: 2rem;
			input,
			textArea,
			label,
			button,
			select {
				margin: 1rem auto;
				padding: 0.6rem;
			}
			input[type='text'],
			textArea {
				outline: none;
				width: 100%;
				border-radius: 6px;
				border: 1px solid lightgrey;
				&:focus {
					outline-width: 0;
				}
			}
			button {
				font-family: Cambria, Cochin, Georgia, Times,
					'Times New Roman', serif;

				color: white;
				font-weight: bold;

				background: orangered;
				border: none;
			}
		}
	}
`;
export const Points_Container = styled.div`
	display: flex;

	.left {
		flex: 7;
		background: black;
		min-height: 80vh;
		h4 {
			color: orangered;
			text-align: center;
		}
		.left__header {
			display: flex;
			flex-direction: column;
			max-width: 80%;
			button {
				margin: 1rem auto;
				width: 40%;
			}
		}
		.left__body {
			.col,
			.row {
				border: none;
				width: 100%;
			}
			.data {
				max-width: 80%;
				input {
					margin: 1rem;
					width: 100%;
				}
				select {
					margin: 1rem;
					width: 100%;
				}
				button {
					margin: 1rem auto;
					width: 50%;
				}
			}
		}
	}
	.right__body {
		flex: 3;
		background: grey;
		min-height: 80vh;
	}
`;
