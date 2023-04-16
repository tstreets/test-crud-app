import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH,
	databaseURL: process.env.NEXT_PUBLIC_DB_URL,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function useFirebase() {
	const [currentUser, setCurrentUser] = React.useState({});

	auth.onAuthStateChanged(function (user) {
		if (user && user.email !== currentUser.email) {
			setCurrentUser({
				email: user.email,
				displayName: user.displayName,
			});
		} else if (!user && currentUser.email) {
			setCurrentUser({});
		}
	});

	return {
		currentUser,
		async loginUser() {
			const signInResponse = await auth.signInWithPopup(googleProvider);
			const user = signInResponse.user;
			return {
				email: user.email,
				displayName: user.displayName,
			};
		},
		async logoutUser() {
			await auth.signOut();
			return {};
		},
	};
}
