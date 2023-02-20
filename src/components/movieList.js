import React, { Component } from 'react';
import {  buildStyles, CircularProgressbar  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class MovieList extends Component {

	//update button status in parent component 
	loadMore = event => {
		this.props.updLoadButton('hide');
	}

  render () {
  	const { movies, textInParag } = this.props;
  	if (textInParag.length) {
  		return (
  			<div>
  				<div className='white_column no_pad'>
			  		<section className='panel'>
			  			<div className='media_items results'>
			  				<div id='page_1' className='page_wrapper'>
			  					<p>{textInParag}</p>
			  				</div>
			  			</div>
			  		</section>
			  	</div>
  			</div>	
  			)
  	}
  	return (
  	<div>
	  	<div className='white_column no_pad'>
	  		<section className='panel'>
	  			<div className='media_items results'>
	  				<div id='page_1' className='page_wrapper'>
		  				{
			          movies.map((movie, i) => {
			            return (
				  					<div key={i} className='card style_1'>
				  						<div className="image">
										    <div className="wrapper">
										      <a className="image" href={'https://www.themoviedb.org/movie/' +movies[i].id} title={movies[i].title}>
										              <img loading="lazy" className="poster" src={'https://image.tmdb.org/t/p/w500' + movies[i].poster_path}  alt="" />
										      </a>
										    </div></div>
										  <div className="content">
										  	<div className="consensus tight">
												  <div className="outer_ring">
												    <div id='percent_div' className="user_score_chart" >
												      <CircularProgressbar value={+movies[i].vote_average * 10} text={`${+movies[i].vote_average * 10}%`} styles={buildStyles({pathColor:'#21d07a', trailColor: '#204529', textColor: 'white', textSize: '2.0em'})}  />
												    </div>
												    
												  </div>
												</div>

											  <h2><a href={'https://www.themoviedb.org/movie/' +movies[i].id} title={movies[i].title} >{movies[i].title}</a></h2>
											  <p>{movies[i].release_date}</p>
											  <p id='overview'>{movies[i].overview.slice(0,105)}...</p>
											</div>
				  					</div>
				  			);
			          })
			      	}

		      		<div id='loadMore' className={'pagination infinite ' + this.props.loadButton}>
		      			<p className="load_more">
		      				<a onClick={ this.loadMore }>Load More</a>
		      			</p>
		      		</div>
	  				</div>
	  			</div>
	  		</section>
	    </div>
	 </div>
  );
  }
  
}

export default MovieList;