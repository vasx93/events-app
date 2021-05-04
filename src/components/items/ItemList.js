import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Item from './Item';

const useStyles = makeStyles({
	grid: {
		background: 'black',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		flexWrap: 'wrap',
	},

	list: {
		background: 'red',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
});

//TODO do css

const List = ({ results, isGrid }) => {
	const classes = useStyles();

	const render = results.map(item => {
		return <Item key={item.id} item={item} />;
	});

	return (
		<div className={isGrid ? classes.grid : classes.list}>
			{results.length < 1 ? <h1>No events</h1> : render}
		</div>
	);
};

export default List;
