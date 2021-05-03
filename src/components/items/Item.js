import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
});

export default function Item({ item }) {
	const classes = useStyles();

	let image =
		typeof item.images != 'undefined' &&
		item.images &&
		typeof item.images.standard != 'undefined' &&
		item.images.standard
			? item.images.standard
			: '';

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					component="img"
					alt={item.name}
					height={typeof image.height != 'undefined' ? image.height : ''}
					width={typeof image.width != 'undefined' ? image.width : ''}
					image={
						typeof image.url != 'undefined' ? image.url : 'Image not found'
					}
					title={item.name}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{item.name}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Typography variant="body2" color="textSecondary" component="p">
					{item.venue.name}, {item.venue.location.address.city}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{typeof item.event_date != 'undefined'
						? item.event_date.value
						: 'Coming soon'}
					,{item.timezone}
				</Typography>
			</CardActions>
		</Card>
	);
}
