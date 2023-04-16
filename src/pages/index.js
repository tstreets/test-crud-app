import React from 'react';
import useFirebase from '../useHooks/useFirebase';
import Message from '../components/Message';
import useGlobalValues from '../useHooks/useGlobalValues';

export default function HomePage() {
	const firebase = useFirebase();
	const { gamesList, update, error } = useGlobalValues();

	async function loadGames() {
		try {
			if (!firebase.currentUser.email) throw { name: 'Auth Issue', code: 'access-denied' };
			const games = await firebase.getGames();
			update({ gamesList: games, error: '' });
		} catch (e) {
			update({ gamesList: [], error: `${e.name} (${e.code}): You need to login to load the games.` });
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
