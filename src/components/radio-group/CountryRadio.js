import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RadioButtonsGroup({ text, marked, onRadioChange }) {
	const [option, setOption] = React.useState(marked);

	const handleChange = ev => {
		setOption(ev.target.value);
	};

	React.useEffect(() => {
		onRadioChange(option);
	}, [option]);

	return (
		<FormControl component="fieldset">
			<RadioGroup aria-label="Country">
				{text.map(val => (
					<FormControlLabel
						control={<Radio />}
						label={val}
						value={val}
						checked={val === option ? true : false}
						onChange={handleChange}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}
