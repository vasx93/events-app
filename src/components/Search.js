/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		width: 220,
		padding: '1% 5%',
	},
});

export default function SearchBar({ onCitySelect, items }) {
	const classes = useStyles();
	const [input, setInput] = React.useState([]);

	const handleChange = (ev, val) => {
		setInput(val);
	};

	React.useEffect(() => {
		onCitySelect(input);
	}, [input]);

	return (
		<div className={classes.root}>
			<Autocomplete
				autoSelect
				multiple
				options={items}
				getOptionLabel={option => option.name}
				onChange={handleChange}
				renderInput={params => (
					<TextField
						{...params}
						variant="standard"
						placeholder="Search City.."
						margin="normal"
						fullWidth
						variant="outlined"
					/>
				)}
			/>
		</div>
	);
}
