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
import GridOnIcon from '@material-ui/icons/GridOn';
import ListIcon from '@material-ui/icons/List';
import axios from 'axios';

import DebounceSearch from './components/DebounceSearch';
import Search from './components/Search';

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
		justifyContent: 'center',
		background: '#FEFEFF',
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
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	change__view: {
		margin: '-1% auto 3% auto',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	change__view_button: {
		marginRight: '1%',
	},
	item__container: {
		width: '100%',
	},
	search: {
		width: '100%',
		margin: '0 auto',
	},
}));

function ResponsiveDrawer(props) {
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);

	const [isGrid, setIsGrid] = useState(true);
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [domain, setDomain] = useState('Germany');
	const [category, setCategory] = useState('10001');
	const [page, setPage] = useState(0);
	const [total, setTotal] = useState(10);
	const [sort, setSort] = useState('Eventdate');
	const [city, setCity] = useState('');
	const [cityList, setCityList] = useState([]);
	const [venue, setVenue] = useState('');
	const [venueList, setVenueList] = useState([]);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const onCitySelect = val => {
		let newArray = val
			.map(el => el.id)
			.join(',')
			.toString();

		setCity(newArray);
	};
	const onVenueChange = val => {
		console.log(val);
		// let newArray = val
		// 	.map(el => el.id)
		// 	.join(',')
		// 	.toString();

		// setCity(newArray);
	};
	const onCountryChange = val => {
		setDomain(val);
	};

	const onCategoryChange = val => {
		setCategory(val);
	};

	const onPageChange = val => {
		setPage(val);
	};

	const onSortChange = val => {
		setSort(val);
	};

	const API_FETCH = {
		async fetchCategories() {
			const res = await axios.get(
				`https://app.ticketmaster.eu/amplify/v2/categories?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&domain=${domain}&lang=en-us`
			);

			if (res.status === 200) {
				setCategoryList(res.data.categories);
			}
		},

		async fetchData() {
			setLoading(true);

			const res = await axios.get(
				`https://app.ticketmaster.eu/amplify/v2/events?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&lang=en-us`,
				{
					params: {
						domain: domain,
						sort_by: sort,
						category_ids: category,
						start: page,
						rows: 12,
						city_ids: city,
						venue_ids: venue,
					},
				}
			);

			if (res.status === 200) {
				setTotal(
					Math.floor(res.data.pagination.total / res.data.pagination.rows)
				);
				setResults(res.data.events);

				setLoading(false);
			} else {
				setLoading(false);
			}
		},

		async fetchCities() {
			let id;

			if (domain === 'Germany') id = '276';
			else if (domain === 'Spain') id = '724';
			else if (domain === 'Poland') id = '616';

			const res = await axios.get(
				`https://app.ticketmaster.eu/amplify/v2/cities?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&domain=${domain}&lang=en-us&country_id=${id}`
			);

			if (res.status === 200) {
				const firstTenResults = res.data.cities.slice(0, 10);
				setCityList(firstTenResults);
			}
		},

		async fetchVenues() {
			const res = await axios.get(
				`https://app.ticketmaster.eu/amplify/v2/venues?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&domain=${domain}&venue_name=${city}`
			);

			if (res.data) {
				console.log(res.data.venues);
				setVenueList(res.data.venues);
			}

			if (term && !results.length) {
				search();
			} else {
				let timer = setTimeout(() => {
					clearTimeout(timer);
					if (term) {
						search();
					}
				}, 750);

				return () => clearTimeout(timer);
			}
		},
	};

	//TODO DEBOUNCER

	useEffect(() => {
		const search = async () => {
			const res = await axios.get(
				`https://app.ticketmaster.eu/amplify/v2/venues?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&domain=${domain}&venue_name=${city}`
			);

			if (res.data) {
				console.log(res.data.venues);
				setVenueList(res.data.venues);
			}
		};

		if (venue && !results.length) {
			search();
		} else {
			// Debouncer
			let timer = setTimeout(() => {
				clearTimeout(timer);
				if (term) {
					search();
				}
			}, 750);

			return () => clearTimeout(timer);
		}
	}, [term]);

	useEffect(() => {
		API_FETCH.fetchCategories();
		API_FETCH.fetchCities();
	}, [domain]);

	useEffect(() => {
		API_FETCH.fetchData();
		API_FETCH.fetchVenues();
	}, [venue, city, category, domain, sort, page, total]);

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				<DebounceSearch onVenueChange={onVenueChange} items={venueList} />
				<Search onCitySelect={onCitySelect} items={cityList} />
				<CountryAccordion
					title={'Country'}
					values={['Germany', 'Spain', 'Poland']}
					marked={domain}
					onCountryChange={onCountryChange}
				/>
				<CategoryAccordion
					values={categoryList}
					title={'Category'}
					marked={category}
					onSortChange={onSortChange}
					onCategoryChange={onCategoryChange}
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
			<main className={classes.content}>
				<div className={classes.toolbar} />

				<div className={classes.change__view}>
					<button
						className={classes.change__view_button}
						onClick={() => setIsGrid(true)}
					>
						<GridOnIcon color={'primary'} fontSize={'large'} />
					</button>
					<button onClick={() => setIsGrid(false)}>
						<ListIcon color={'primary'} fontSize={'large'} />
					</button>
				</div>

				{loading ? (
					<Spinner style={{ margin: '0 auto' }} />
				) : (
					<>
						<div className={classes.item__container}>
							<ItemList isGrid={isGrid} results={results} />
						</div>
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
