import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import CategoryList from '../../data/categories';

export default function RadioButtonsGroup({ marked, onRadioChange }) {
	const [option, setOption] = React.useState(marked);

	const handleChange = ev => {
		setOption(ev.target.value);
	};

	React.useEffect(() => {
		onRadioChange(option);
	}, [option]);

	return (
		<FormControl component="fieldset">
			<RadioGroup aria-label="gender">
				{CategoryList.map(el => {
					return (
						<FormControlLabel
							control={<Radio />}
							label={el.name}
							value={el.id}
							checked={el.id == option ? true : false}
							onChange={handleChange}
						/>
					);
				})}
			</RadioGroup>
		</FormControl>
	);
}
