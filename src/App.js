import React, { useState } from 'react';
import './App.css';
import data from './data.json';
import toast from 'react-hot-toast';

const MovieList = ({ movies }) => {
  const [filters, setFilters] = useState({
    language: [],
    country: [],
    genre: []
  });

  const handleCheckboxChange = (type, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(value)
        ? prevFilters[type].filter(item => item !== value)
        : [...prevFilters[type], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      language: [],
      country: [],
      genre: []
    });

    toast.success('Filter cleared!')
  };

  const filteredMovies = movies.filter(movie => {
    return (
      filters.language.length === 0 ||
      filters.language.includes(movie.movielanguages.find(lang => filters.language.includes(lang)))
    ) && (
      filters.country.length === 0 ||
      filters.country.includes(movie.moviecountries.find(country => filters.country.includes(country)))
    ) && (
      filters.genre.length === 0 ||
      movie.moviegenres.some(genre => filters.genre.includes(genre))
    );
  });


  return (
    <div>
      <div className='container'>
      <h2>Movies Filter</h2>
        <div>
          <h3 className='heading'>Languages</h3>
          {Array.from(new Set(movies.flatMap(movie => movie.movielanguages))).map(language => (
            <label key={language} className='filter-item'>
              <input
                type="checkbox"
                checked={filters.language.includes(language)}
                onChange={() => handleCheckboxChange('language', language)}
              />
              {language}
            </label>
          ))}
        </div>
        <div>
          <h3>Countries</h3>
          {Array.from(new Set(movies.flatMap(movie => movie.moviecountries))).map(country => (
            <label key={country} className='filter-item'>
              <input
                type="checkbox"
                checked={filters.country.includes(country)}
                onChange={() => handleCheckboxChange('country', country)}
              />
              {country}
            </label>
          ))}
        </div>
        <div>
          <h3>Genres</h3>
          {Array.from(new Set(movies.flatMap(movie => movie.moviegenres))).map(genre => (
            <label key={genre} className='filter-item'>
              <input
                type="checkbox"
                checked={filters.genre.includes(genre)}
                onChange={() => handleCheckboxChange('genre', genre)}
              />
              {genre}
            </label>
          ))}
        </div>
        <button className='clear-filter-btn' onClick={clearFilters}>Clear Filters</button>

      </div>
      <div>
        <h2 className='movie-list-heading'>Movie List</h2>
        <div className='movie-list'>
          {filteredMovies.map(movie => (
            <div className='movie-card' key={movie.imdbmovieid}>
              <h3>{movie.movietitle}</h3>
              <img src={movie.moviemainphotos[0]} alt={movie.movietitle} />
              <p> <b>Languages: </b> {movie.movielanguages.join(', ')}</p>
              <p> <b>Countries: </b> {movie.moviecountries.join(', ')}</p>
              <p> <b>Genres: </b> {movie.moviegenres.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const movies = data;

  return <MovieList movies={movies} />;
};

export default App;
