import React from 'react';

import Item from './Item';

const List = ({ results }) => {
	const render = results.map(item => {
		return <Item key={item.id} item={item} />;
	});
	return <div>{results.length < 1 ? <h1>No events</h1> : render}</div>;
};

export default List;
