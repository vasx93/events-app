import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import RoomIcon from '@material-ui/icons/Room';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import Typography from '@material-ui/core/Typography';
import NoImg from '../../assets/noimg.png';

const useStyles = makeStyles({
	root: {
		height: 350,
		width: 350,
		borderRadius: '7px',
		padding: 0,
		margin: 0,
	},
	list: {
		height: 195,
		width: 750,
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		padding: '0 5%',
		borderRadius: '7px',
	},
	info: {
		display: 'flex',
		flexDirection: 'column',
		placeContent: 'center center',
		padding: '2%',
	},
	text: {
		textAlign: 'center',
		width: '100%',
		fontFamily: 'Roboto',
		fontWeight: 500,
	},
	title: {
		textAlign: 'center',
		padding: '1%',
		fontSize: '2rem',
	},
});

export default function Item({ item, isGrid }) {
	const classes = useStyles();

	let image =
		typeof item.images != 'undefined' &&
		item.images &&
		typeof item.images.standard != 'undefined' &&
		item.images.standard
			? item.images.standard
			: '';

	let timeString;
	if (item.event_date && item.event_date.value) {
		timeString = new Date(Date.parse(item.event_date.value)).toLocaleDateString(
			'en-GB',
			{
				day: 'numeric',
				month: 'short',
				year: 'numeric',
			}
		);
	}

	let date =
		typeof item.event_date != 'undefined' &&
		item.event_date &&
		typeof item.event_date.value != 'undefined' &&
		item.event_date.value
			? timeString
			: 'Date not set';

	return (
		<Card className={isGrid ? classes.root : classes.list}>
			<CardActionArea className={classes.root.width}>
				<CardMedia
					component="img"
					alt={item.name}
					height={{ height: '100%' }}
					width={{ width: '100%' }}
					image={typeof image.url != 'undefined' ? image.url : NoImg}
					title={item.name}
				/>
				<div className={classes.title}>
					<Typography component="h1">{item.name}</Typography>
				</div>
				{/* <CardContent>
					<Typography gutterBottom variant="h5" component="h3">
						{item.name}
					</Typography>
				</CardContent> */}
			</CardActionArea>

			<CardActions className={classes.info}>
				<Typography
					variant="body2"
					color="textPrimary"
					component="p"
					className={classes.text}
				>
					<CalendarTodayIcon />
					{date}
				</Typography>
				<Typography
					variant="body2"
					color="textPrimary"
					component="p"
					className={classes.text}
				>
					<RoomIcon />
					{item.venue.name}, {item.venue.location.address.city}
				</Typography>
			</CardActions>
		</Card>
	);
}
