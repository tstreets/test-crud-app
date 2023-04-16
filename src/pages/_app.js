import React from 'react';
import '@/styles/globals.css';
import useFirebase from '../useHooks/useFirebase';
import Link from 'next/link';
import { GlobalProvider } from '../useHooks/useGlobalValues';

export default function App({ Component, pageProps }) {
	const firebase = useFirebase();
	const initialGlobalValues = {
		gamesList: [],
		error: '',
	};
	const [globalValues, setGlobalValues] = React.useState(initialGlobalValues);

	function updateGlobalValues(newValues) {
		setGlobalValues({ ...globalValues, ...newValues });
	}

	async function clearGlobalValuesOnLogout() {
		await firebase.logoutUser();
		setGlobalValues(initialGlobalValues);
	}

	async function clearErrorOnLogin() {
		await firebase.loginUser();
		setGlobalValues({ ...globalValues, error: '' });
	}

	return (
		<>
			<GlobalProvider value={{ ...globalValues, update: updateGlobalValues }}>
				<nav>
					<ul>
						<li>
							<Link href='/'>Home</Link>
						</li>
						<li>
							{firebase.currentUser.email ? (
								<>
									<button onClick={clearGlobalValuesOnLogout}>Logout</button>
								</>
							) : (
								<>
									<button onClick={clearErrorOnLogin}>Login</button>
								</>
							)}
						</li>
					</ul>
				</nav>
				<Component {...pageProps} />
			</GlobalProvider>
		</>
	);
}
