import React, { useState, useRef } from "react";
import {
	Container,
	PageWrapper,
	InputBox,
	MessagesBox,
	InputContainer,
	InputButton,
	ReceivedContainer,
	SentContainer,
	SenderAvatar,
	SentMessage,
	ReceivedMessage,
	LoginButton,
	SendIcon,
	TopContainer,
	Icon,
} from "./components/ChatRoom/style";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import sendArrow from "./images/paper-plane-right.svg";
import signOutLogo from "./images/sign-out.svg";
import infoIcon from "./images/info.svg";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
	apiKey: "AIzaSyDDjufNkOPGxsHN7d5Esq3YACQX1KS4giw",
	authDomain: "bestpalchat.firebaseapp.com",
	databaseURL: "https://bestpalchat.firebaseio.com",
	projectId: "bestpalchat",
	storageBucket: "bestpalchat.appspot.com",
	messagingSenderId: "747227937066",
	appId: "1:747227937066:web:8901415cfe1535b9ad8653",
	measurementId: "G-C978SJVEED",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const App = () => {
	const [user] = useAuthState(auth);
	return (
		<div>
			<section>{user ? <ChatRoom /> : <SignIn />}</section>
		</div>
	);
};

function SignIn() {
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

	return (
		<PageWrapper>
			<h1>CoolChat</h1>
			<LoginButton onClick={signInWithGoogle}>Sign in with Google</LoginButton>
		</PageWrapper>
	);
}

function SignOut() {
	return (
		auth.currentUser && (
			<Icon
				style={{ marginLeft: "auto", marginRight: "10px" }}
				onClick={() => auth.signOut()}
				src={signOutLogo}
			></Icon>
		)
	);
}

function ChatMessage(props) {
	const { text, uid, photoURL } = props.message;
	const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
	if (messageClass === "sent") {
		return (
			<SentContainer>
				<SentMessage style={{ marginRight: "10px" }}>{text}</SentMessage>
				<SenderAvatar src={photoURL} />
			</SentContainer>
		);
	} else {
		return (
			<ReceivedContainer>
				<SenderAvatar src={photoURL} />
				<ReceivedMessage style={{ marginLeft: "10px" }}>{text}</ReceivedMessage>
			</ReceivedContainer>
		);
	}
}

function ChatRoom() {
	const dummy = useRef();

	const messagesRef = firestore.collection("messages");
	const query = messagesRef.orderBy("createdAt").limit(25);
	const [values, loading, error] = useCollectionData(query, {
		idField: "id",
	});
	const [formValue, setFormValue] = useState("");

	const sendMessage = async (e) => {
		e.preventDefault();
		if (formValue.trim() !== "") {
			const { uid, photoURL } = auth.currentUser;

			try {
				await messagesRef.add({
					text: formValue,
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					uid,
					photoURL,
				});
				setFormValue("");
				dummy.current.scrollIntoView({ behavior: "smooth" });
			} catch (error) {
				throw error;
			}
		} else {
			return;
		}
	};

	return (
		<>
			<PageWrapper>
				<TopContainer>
					<Icon
						src={infoIcon}
						style={{ marginRight: "auto", marginLeft: "10px" }}
					></Icon>
					<SignOut></SignOut>
				</TopContainer>
				<Container>
					<MessagesBox>
						{values &&
							values.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
						<div ref={dummy}></div>
					</MessagesBox>
					<InputContainer onSubmit={sendMessage}>
						<InputBox
							value={formValue}
							onChange={(e) => setFormValue(e.target.value)}
						/>
						<InputButton type="submit">
							<SendIcon src={sendArrow}></SendIcon>
						</InputButton>
					</InputContainer>
				</Container>
			</PageWrapper>
		</>
	);
}

export default App;
