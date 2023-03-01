import styled from 'styled-components';
import back from '../../assets/tourn1.jpg';
export const Container = styled.div`
	box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
		rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
		rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
	max-width: 100%;
	height: 75vh;
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
		background: black;
		font-family: 'sofia', serif;
		form {
			width: 35%;
			margin-top: 2rem;
			padding: 1rem;
			margin-bottom: 1.5rem !important;
			input,
			textArea,
			label,
			button,
			select {
				margin: 0.6rem auto;
				padding: 0.6rem;
			}
			input[type='text'],
			textArea {
				color: green;
				font-weight: bold;
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
		h5 {
			color: violet;
			font-weight: bold;
		}
	}
	@media screen and (max-device-width: 1200px) and (min-device-width: 768px) {
		.container_main {
			min-height: 90vh !important;
		}
	}
`;
export const Points_Container = styled.div`
	display: flex;

	.lefts {
		flex: 4;
		background: black;
		min-height: 80vh;
		h4 {
			color: orangered;
			text-align: center;
		}
		.left__headers {
			display: flex;
			flex-direction: column;
			max-width: 80%;
			button {
				margin: 1rem auto;
				width: 40%;
			}
		}
		.left__bodys {
			.col,
			.row {
				border: none;
				width: 100%;
			}
			.row {
				height: 50%;
			}
			.data {
				max-width: 80%;
				input {
					margin: 1rem;

					width: 100%;
				}
				select {
					margin: 1rem;
					margin-top: 2rem;
					width: 100%;
				}
				button {
					margin: 1rem auto !important;
					width: 40%;
				}
			}
		}
	}
	.right__body {
		flex: 6;
		flex-direction: column;
		min-height: 80vh;
		.right {
			margin: 0;
			display: flex;
			height: 100%;
			.round {
				height: fit-content;
				h6 {
					margin: 1rem;
					text-decoration: underline;
				}
			}
			.list1 {
				flex: 5;

				border-right: 1px solid lightgrey;
			}
			.list2 {
				flex: 5;
			}
			.listname_left {
				display: flex;
				align-items: center;
				justify-content: space-evenly;
			}
			.listname_right {
				display: flex;
				align-items: center;
				justify-content: space-evenly;
			}
			.results {
				margin: 0.4rem;
				padding: 0.4rem;
			}
			h6 {
				font-family: georgia;
			}
		}
	}
	@media screen and (max-device-width: 1200px) and (min-device-width: 768px) {
		.left__bodys {
			margin-top: -1.5rem;
			form {
				margin-top: -1.5rem;
				.btn-success {
					width: 70% !important;
				}
			}
		}
		.right__body {
			margin-bottom: 1rem !important;
		}
	}
`;
