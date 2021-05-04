import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RadioButtonsGroup({ values, marked, onCountryChange }) {
	const [option, setOption] = React.useState(marked);

	const handleChange = ev => {
		setOption(ev.target.value);
		onCountryChange(option);
	};

	React.useEffect(() => {
		onCountryChange(option);
	}, [option, onCountryChange]);

	return (
		<FormControl component="fieldset">
			<RadioGroup aria-label="Country" onChange={handleChange}>
				{values.map(val => (
					<FormControlLabel
						control={<Radio />}
						label={val}
						value={val}
						checked={val === option ? true : false}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}
