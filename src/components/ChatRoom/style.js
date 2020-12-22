import styled from "styled-components/macro";

export const PageWrapper = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background: rgb(53, 49, 61);
`;

export const Container = styled.div`
	overflow: hidden;
	border-radius: 10px;

	display: flex;
	flex-direction: column;
	background: ;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.42);
	width: 300px;
	height: 500px;
	@media only screen and (max-width: 800px) {
		width: 100%;
		height: 100%;
	}
`;

export const MessagesBox = styled.div`
	height: 100%;
	padding: 0 15px;
	background: rgb(53, 49, 61);
	overflow: auto;
	display: flex;
	flex-direction: column;
`;

export const SenderAvatar = styled.img`
	display: inline-block;
	width: 35px;
	height: 35px;
	border-radius: 50%;
	align-self: flex-start;
`;

const Message = styled.div`
	display: flex;
	padding: 5px 8px;
	border-radius: 10px;
	color: white;
	align-items: center;
	margin-bottom: 10px;
	:first-child {
		margin-top: 10px;
	}
`;

export const ReceivedContainer = styled(Message)`
	margin-right: auto;
`;

const Text = styled.p`
	background: #26c9be;
	padding: 8px 13px;
	border-radius: 20px;
	@media only screen and (max-width: 800px) {
		max-width: 400px;
	}
	@media only screen and (max-width: 600px) {
		max-width: 300px;
	}
	@media only screen and (max-width: 500px) {
		max-width: 200px;
	}
`;

export const SentMessage = styled(Text)`
	background: #5bc0eb;
`;

export const ReceivedMessage = styled(Text)``;

export const SentContainer = styled(Message)`
	margin-left: auto;
`;

export const InputContainer = styled.form`
	display: flex;
  border-top: 2px solid #26262642;
  `;

export const InputBox = styled.input`
	width: 100%;
	margin: 8px;
	padding: 8px 10px;
	outline: none;
	border-radius: 50px;
	background: #ffffff;
	border: none;
	&:focus {
		box-shadow: 0px 0px 8px #1affe0eb;
	}
`;

export const TopContainer = styled.div`
	display: flex;
  margin: 10px 0;
  
	width: 300px;
	@media only screen and (max-width: 800px) {
		width: 100%;
	}
`;

export const LoginButton = styled.button`
	padding: 10px 20px;
	background: none;
	color: #1dd3c7;
	font-weight: 700;
	border-radius: 50px;
	border: 1px solid #ffffffeb;
	outline: none;
	cursor: pointer;
`;

export const InputButton = styled.button`
	padding: 10px 20px;
	border: none;
	background: none;
	color: #03a5fc;
	font-weight: 700;
`;

export const Icon = styled.img`
  
	width: 48px;
	height: 100%;
`;

export const SignOutIcon = styled.img``;

export const SendIcon = styled.img`
	width: 30px;
	height: 100%;
`;
