import React, { Component } from 'react';

class Filter extends Component {
	constructor(props) {
    super(props)
    this.state = {
      selectedGenres: []
    }
  }

  //disable click event on genres
  disableClick(event) {
		event.preventDefault();
	}

	//handling select process of genres
  handleClick = event => {
  	//unmarking selected genres
  	if (event.currentTarget.classList.contains('selected')) {
  		event.currentTarget.classList.replace('selected', 'no_hover');
  		document.getElementById('search').classList.replace('disabled', 'enabled');
  		this.setState({
    		selectedGenres: this.state.selectedGenres.filter((genre) => 
    			genre !== +event.currentTarget.getAttribute('data-key'))
  		});

  	} else {
  		//marking selected genres
  		event.currentTarget.classList.add('selected');
  		event.currentTarget.classList.remove('no_hover');
  		this.setState({ selectedGenres: [...this.state.selectedGenres, +event.currentTarget.getAttribute('data-key')]});
			document.getElementById('search').classList.replace('disabled', 'enabled');
  	} 
	};


	//removing 'no_hover' effect after leaving genre element
	onMouseLeave = event => {
		event.currentTarget.classList.remove('no_hover');
	}

	//sending info about selected genres to parent component
	handleSearch = event => {
		if (event.currentTarget.classList.contains('enabled')) {
			event.currentTarget.classList.replace('enabled', 'disabled');
			this.props.setSelectedGenres(this.state.selectedGenres);
		}
	}

  render () {
  	const { genres } = this.props;
  	return (
  	<div>
	  	<div className='filter_panel card'>
	    	<div className='filter'>
		      <h4>Genres</h4>
		      <ul>
		      {
		          genres.map((genre, i) => {
		            return (
		                <li key={genres[i].id} data-key={genres[i].id} 
		                	className='' onClick={this.handleClick} 
		                	onMouseLeave={this.onMouseLeave}>
		                	<a onClick={this.disableClick} >{genres[i].name}</a>
		                </li>
		            );
		          })
		      }
		      </ul>        
		    </div>
	    </div>
	    <div id='search' className='search disabled ' onClick={this.handleSearch}><p><a>Search</a></p></div>
	 </div>
  );
  }
}

export default Filter;

