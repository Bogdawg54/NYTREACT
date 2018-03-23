var React = require('react');

var axios = require('axios');

var Results = require('./GrandChildren/Results.js');


var Search = React.createClass({

	getInitialState: function(){
		return {
			fiveArticles: [],
			isDisplayed: false
		}
	},

	searchArticles: function(){

        this.setState({isDisplayed: false});


		console.log("Search button clicked");

	    var queryTerm = document.getElementById('searchTerm').value;
	    var startYear = document.getElementById('startYear').value;
	    var endYear = document.getElementById('endYear').value;

	    

	    document.getElementById('searchTerm').value = "";
	    document.getElementById('startYear').value = "";
	    document.getElementById('endYear').value = "";

	    var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
	    var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&page=0&q=";
	    var queryURL = queryURLBase + queryTerm;

	    if (parseInt(startYear)) {
	        queryURL = queryURL + "&begin_date=" + startYear + "0101";
	    }
	    if (parseInt(endYear)) {
	        queryURL = queryURL + "&end_date=" + endYear + "1231";
	    } 


		axios.get(queryURL)
			.then(function(NYTData){


				var articlesArray = [];
				this.setState({fiveArticles: articlesArray});



				for (var i = 0; i < 5; i++) {
					var articleObj = {
						headline: NYTData.data.response.docs[i].headline.main,
						date: NYTData.data.response.docs[i].pub_date,
						url: NYTData.data.response.docs[i].web_url
					}

					articlesArray.push(articleObj);
				}


				this.changeHandler(articlesArray);

			}.bind(this));
	},

    changeHandler: function(value) {


        this.setState({
            fiveArticles: value
        });


        this.setState({
            isDisplayed: true
        });
    },	

	render: function(){

		var view;

		if(this.state.isDisplayed) {
			view = <Results fiveArticles={this.state.fiveArticles} />
		}



		return(

			<div className="container">
				<div className="row">
					<div className="col-sm-12">
					<br />

						<div className="panel panel-primary">
							<div className="panel-heading">
								<h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
							</div>
							<div className="panel-body">


								<form role="form">


								  <div className="form-group">
								    <label for="search">Search Term:</label>
								    <input type="text" className="form-control" id="searchTerm" />
								  </div>

								  <div className="form-group">
								    <label for="startYear">Start Year:</label>
								    <input type="number" className="form-control" id="startYear" />
								  </div>


								  <div className="form-group">
								    <label for="endYear">End Year:</label>
								    <input type="number" className="form-control" id="endYear" />
								  </div>

								  <button className="btn btn-default" id="runSearch" type="button" onClick={this.searchArticles}><i className="fa fa-search"></i> Search</button>




								</form>
							</div>
						</div>
					</div>
				</div>


				<div className="row">







					<div className="col-sm-12">
					<br />


						<div className="panel panel-primary">


							<div className="panel-heading">
								<h3 className="panel-title"><strong><i className="fa fa-table"></i>   Results</strong></h3>
							</div>


							<div className="panel-body" id="wellSection">

							{view}


							</div>
						</div>

					</div>














				</div>
			</div>















		)
	}
});

module.exports = Search;
