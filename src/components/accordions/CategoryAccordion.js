import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CategoryRadio from '../radio-group/CategoryRadio';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

export default function SimpleAccordion({ title, marked, onRadioChange }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Accordion defaultExpanded={true}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading}>{title}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<CategoryRadio marked={marked} onRadioChange={onRadioChange} />
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
