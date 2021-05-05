/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
	root: {
		width: 220,
		padding: '1% 5%',
	},
});

export default function SearchBar({ onVenueChange, items }) {
	const classes = useStyles();
	const [input, setInput] = React.useState('');

	const handleChange = (ev, val) => {
		console.log(val.name);
		setInput(val.name);
	};

	React.useEffect(() => {
		onVenueChange(input);
	}, [input]);

	return (
		<div className={classes.root}>
			<Autocomplete
				options={items}
				getOptionLabel={option => option.name}
				onChange={handleChange}
				renderInput={params => (
					<TextField
						{...params}
						variant="standard"
						placeholder={term ? term : 'Search Venue..'}
						margin="normal"
						fullWidth
						variant="outlined"
					/>
				)}
			/>
		</div>
	);
}
