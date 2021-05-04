import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';

import ItemList from './components/items/ItemList';
import CountryAccordion from './components/accordions/CountryAccordion';
import CategoryAccordion from './components/accordions/CategoryAccordion';
import SortAccordion from './components/accordions/SortAccordion';
import Pagination from './components/Pagination';
import Spinner from './components/Spinner';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	isGrid: {
		background: 'black',
	},
}));

function ResponsiveDrawer(props) {
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);

	const [loading, setLoading] = useState(false);

	const [results, setResults] = useState([]);
	const [domain, setDomain] = useState('Germany');
	const [category, setCategory] = useState('10001');
	const [page, setPage] = useState(0);
	const [total, setTotal] = useState(10);
	const [sort, setSort] = useState('eventdate');

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const onRadioChange = val => {
		console.log(typeof val, val, 'u APPU');

		if (val.startsWith('1')) {
			setCategory(val);
		} else {
			setDomain(val);
		}
	};

	const onPageChange = val => {
		setPage(val);
	};

	const onSortChange = val => {
		setSort(val);
	};

	const fetchData = async () => {
		setLoading(true);
		const res = await axios.get(
			`https://app.ticketmaster.eu/amplify/v2/events?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&domain=${domain}&lang=en-us&category_ids=${category}&sort_by=${sort}&start=${page}&rows=20`
		);

		if (res.status === 200) {
			console.log(res.data.events);

			setTotal(
				Math.floor(res.data.pagination.total / res.data.pagination.rows)
			);
			setResults(res.data.events);
			setLoading(false);
		} else {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [domain, category, sort, page, total]);

	// SORT DRAWER
	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				<CountryAccordion
					title={'Country'}
					values={['Germany', 'Spain', 'Poland']}
					marked={domain}
					onRadioChange={onRadioChange}
				/>
				<CategoryAccordion
					title={'Category'}
					marked={category}
					onSortChange={onSortChange}
					onRadioChange={onRadioChange}
				/>
				<SortAccordion
					title={'Sort'}
					marked={sort}
					values={['Eventdate', 'Popularity', 'Eventname']}
					onSortChange={onSortChange}
				/>
			</List>
			<Divider />
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Events
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true,
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={`${classes.content}`}>
				<div className={classes.toolbar} />
				{loading ? (
					<Spinner />
				) : (
					<>
						<ItemList results={results} />
						<Pagination count={total} page={page} onPageChange={onPageChange} />
					</>
				)}
			</main>
		</div>
	);
}

ResponsiveDrawer.propTypes = {
	window: PropTypes.func,
};

export default ResponsiveDrawer;
