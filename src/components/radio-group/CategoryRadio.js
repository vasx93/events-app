import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RadioButtonsGroup({
	values,
	marked,
	onCategoryChange,
}) {
	const [option, setOption] = React.useState(marked);

	const handleChange = ev => {
		setOption(ev.target.value);
	};

	React.useEffect(() => {
		onCategoryChange(option);
	}, [option, onCategoryChange]);

	return (
		<FormControl component="fieldset">
			<RadioGroup aria-label="Categories" onChange={handleChange}>
				{values.map(el => {
					return (
						<FormControlLabel
							control={<Radio />}
							label={el.name}
							value={el.id}
							checked={el.id == option ? true : false}
						/>
					);
				})}
			</RadioGroup>
		</FormControl>
	);
}
