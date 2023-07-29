import React, { useEffect, useState } from 'react';
import { fetchMovies } from './service';
import Card from './card';
import photo from '../../../../../Rectangle 49.png';

const DivComponent = ({ children }) => (
    <div className="item">{children}</div>
  );

const MovieList = ( {type} ) => {
  const [movies, setMovies] = useState([]);

    const [back,setBack] = useState(false);

    useEffect(() => {
    if(type === '/trending/movie/day'){
        setBack(true);
    } else {
        setBack(false);
    }
    }, [type]);

  useEffect(() => {
    fetchMovies(type).then(setMovies);
  }, []);

  return (
    <div className="scroll-container relative mt-10">
        {back &&
            <img className='absolute h-[80%] w-full' src={photo} alt="" />
        }
      {movies.map(movie => (
        <DivComponent key={movie.id}>
          <Card movie={movie} />
        </DivComponent>
          ))}
    </div>
  );
};

export default MovieList;



