import React from 'react';
import useFirebase from '../useHooks/useFirebase';

export default function HomePage() {
	const [gamesList, setGamesList] = React.useState([]);
	const firebase = useFirebase();

	async function loadGames() {
		const games = await firebase.getGames();
		setGamesList(games);
	}

	const gamesListComponent = gamesList.map(game => {
		return <li key={game.id}>{game.name}</li>;
	});

	return (
		<>
			<h1>My Name: {firebase.currentUser.displayName || '--'}</h1>
			<button onClick={loadGames}>Get Game List</button>
			{gamesListComponent}
		</>
	);
}
