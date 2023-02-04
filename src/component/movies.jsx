import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from './../utils/paginate';
import ListGroup from './common/listGroup';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    const genres = [
      { _id: "5b21ca3eeb7f6fbccd471888", name: "All Genres" },
      ...getGenres(),
    ];
    this.setState({ movies: getMovies(), genres});
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLiked = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage : 1 });
  };

  handleSort = (path) => {
    
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, selectedGenre, movies } = this.state;

    if (count === 0) return <p>There is no movies in the database</p>;

    const filteredMovies = selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;

    const allMovies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <div className="container">
        <div className="row">
          <div className="col-3 mt-3">
            <ListGroup
              items={this.state.genres}
              textProperty="name"
              valuePropery="_id"
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <p className="m-2">
              Showing {allMovies.length} movies in the database
            </p>
            <table className="table m-3">
              <thead>
                <tr>
                  <th onClick={() => this.handleSort('title')}>Title</th>
                  <th onClick={() => this.handleSort('genre.name')}>Genre</th>
                  <th onClick={() => this.handleSort('numberInStock')}>Stock</th>
                  <th onClick={() => this.handleSort('dailyRentalRate')}>Rate</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {allMovies.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={movie.liked}
                        onClick={() => this.handleLiked(movie)}
                      />{" "}
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(movie)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={filteredMovies.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
 
export default Movies;