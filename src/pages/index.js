import React from 'react';
import useFirebase from '../useHooks/useFirebase';
import Message from '../components/Message';

export default function HomePage() {
	const [gamesList, setGamesList] = React.useState([]);
	const [error, setError] = React.useState('');
	const firebase = useFirebase();

	async function loadGames() {
		try {
			if (!firebase.currentUser.email) throw { name: 'Auth Issue', code: 'access-denied' };
			const games = await firebase.getGames();
			setGamesList(games);
			setError(``);
		} catch (e) {
			setGamesList([]);
			setError(`${e.name} (${e.code}): You need to login to load the games.`);
		}
	}

	const gamesListComponent = gamesList.map(game => {
		return <li key={game.id}>{game.name}</li>;
	});

	return (
		<>
			<h1>My Name: {firebase.currentUser.displayName || '--'}</h1>
			<button onClick={loadGames}>Get Game List</button>
			{gamesListComponent}
			{error ? <Message type='error'>{error}</Message> : <></>}
		</>
	);
}
