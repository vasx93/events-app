import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			marginTop: theme.spacing(2),
		},
	},
}));

export default function BasicPagination({ page, onPageChange, count }) {
	const classes = useStyles();
	const [current, setCurrent] = React.useState(page);

	const handleChange = (ev, pageNum) => {
		console.log(pageNum);
		setCurrent(pageNum);
	};

	React.useEffect(() => {
		onPageChange(current);
	}, [current]);

	return (
		<div className={classes.root}>
			<Pagination count={count} page={current} onChange={handleChange} />
		</div>
	);
}
