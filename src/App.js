import React, { Component } from 'react';
import { BottomScrollListener, useBottomScrollListener}  from 'react-bottom-scroll-listener';
import Filter from './components/filter';
import MovieList from './components/movieList';
import './App.scss';

const urlMovies = 'https://api.themoviedb.org/3/movie/popular?api_key=' + process.env.REACT_APP_API_KEY + '&language=sl&page='
const urlGenres = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + process.env.REACT_APP_API_KEY + '&language=sl'

class App extends Component {
 constructor() {
    super();
    this.myRef = React.createRef();
    this.state = {
      currentPage: 1,
      moviesOnPage: [],
      genres: [],
      selectedGenres: [],
      moreMovies: [],
      loadButton: 'hide',
      textInParag: ''
    }
  }

  //load page for first time
  componentDidMount() {
    this.loadMovies(this.state.currentPage, infos => {this.setState({ 
      moviesOnPage: infos.results, loadButton: 'show'})})
    
    //fetch data about genres from API
    fetch(urlGenres)
      .then(response=> response.json())
      .then(infos => {this.setState({ genres: infos.genres})});
  }
  
  //function for fetching movie data fom API 
  loadMovies = (page, fun) => {
    fetch(urlMovies + page)
      .then(response=> response.json())
      .then(fun);
  }

  //load filtered movies
  loadFiltered = (page, func) => {
    const selectedGenres = this.state.selectedGenres.toString();
    const urlFilteredMovies = 'https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.REACT_APP_API_KEY + '&language=sl&sort_by=popularity.desc&include_adult=false&include_video=false&page=' +page+ '&with_genres=' +selectedGenres+ '&with_watch_monetization_types=flatrate'
    fetch(urlFilteredMovies)
      .then(response=> response.json())
      .then(func)
  }

  //show button 'Load more' after data done fetching 
  showLoadButton = () => {
    if (this.state.moviesOnPage.length === 20 ) {
      this.setState({ loadButton: 'show'})
    } else {
      this.setState({ loadButton: 'hide'})
      if (!this.state.moviesOnPage.length) {
        this.setState({ textInParag: 'No items were found that match your query.'})
      }
    }
  }

  //filter movies when button Search in child component - Filter was cklicked 
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedGenres !== this.state.selectedGenres) {
      this.setState({ currentPage: 1}, function() {this.filterMovies()})        
    }
  }

  //func for filtering movies
  filterMovies = () => {
    //load movies from API if genres are not selected
    this.setState({ textInParag: ''})
    if (!this.state.selectedGenres.length) {
      this.loadMovies(this.state.currentPage, infos => {this.setState({ 
      moviesOnPage: infos.results },
      function() {this.showLoadButton()})});    
    } else {
        //load movies from API with selected genres
      this.loadFiltered(this.state.currentPage, infos => {this.setState({ moviesOnPage: infos.results.slice(0, 20) },
           function() {this.showLoadButton()})})
      }  
  }   

  
  //func for infinite scroll
  isBottom = () => {
    if (this.state.loadButton === 'hide' ) {
      //loading more movies without selected genres
      if (!this.state.selectedGenres.length) {
        this.loadMovies(++this.state.currentPage, infos => {
        this.setState({ moviesOnPage: this.state.moviesOnPage.concat(infos.results), 
        currentPage: this.state.currentPage })})
      } else {
        //loading more movies with selected genres
        this.loadFiltered(++this.state.currentPage, infos => {this.setState({ moviesOnPage: this.state.moviesOnPage.concat(infos.results) })});
      } 
    }
  }

  //update button status when button is clicked in movieList element
  updLoadButton = (upd) => {
    this.setState({ loadButton: upd})
  }

  //set selected genres from child element - Filter
  setSelectedGenres = (genres) => {
    this.setState({ selectedGenres: genres });
  }

  render() {
    const { moviesOnPage, genres } = this.state;
    return (
      <div className='column_wrapper'>
        <div className='container'>
          <div className='title'><h2>Popular Movies</h2></div>
          <div className='content'>
            <Filter genres={genres}  setSelectedGenres={this.setSelectedGenres}/>
            <BottomScrollListener onBottom={this.isBottom} >
            <MovieList onScroll={this.handleScroll} movies={moviesOnPage} setCurrentPage={this.setCurrentPage} updLoadButton={this.updLoadButton} loadButton={this.state.loadButton.toString()} textInParag={this.state.textInParag} />
            </BottomScrollListener>
          </div> 
        </div>
      </div>
    );
  }
}
  

export default App;
