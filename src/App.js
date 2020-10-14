import React, { useState } from 'react';
import './App.scss';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';

function App() {
  const [currentMovie, setCurrentMovie] = useState({});

  return (
    <div className="App">
      <main>
        <MovieDetails movie={currentMovie} />
        <MovieList handleSwitch={setCurrentMovie} />
      </main>
    </div>
  );
}

export default App;
