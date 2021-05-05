import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Item from './Item';

const useStyles = makeStyles({
	grid: {
		flexGrow: '1',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		flexWrap: 'wrap',
	},

	list: {
		display: 'grid',
		gridTemplateColumns: '1fr',
		gridRowGap: '3%',
		padding: '0 5%',
	},
});

//TODO do css

const List = ({ results, isGrid }) => {
	const classes = useStyles();

	const render = results.map(item => {
		return <Item key={item.id} item={item} isGrid={isGrid} />;
	});

	return (
		<div className={isGrid ? classes.grid : classes.list}>
			{results.length < 1 ? <h1>No events</h1> : render}
		</div>
	);
};

export default List;
