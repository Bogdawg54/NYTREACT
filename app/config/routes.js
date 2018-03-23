var React = require('react');

var Router = require('react-router');
var Route = Router.Route;

var IndexRoute	= Router.IndexRoute;

var Main = require('../components/Main');
var Search = require('../components/Children/Search'); 
var Saved = require('../components/Children/Saved'); 

module.exports = (

	<Route path='/' component={Main}>

		{/* If user selects Search then show the appropriate component*/}
		<Route path='Search' component={Search} />

		{/* If user selects Saved then show the appropriate component*/}
		<Route path='Saved' component={Saved} />

		{/*If user selects any other path... we get the Home Route*/}
		<IndexRoute component={Search} />
		
	</Route>


);