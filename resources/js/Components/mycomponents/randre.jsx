import React from 'react'
import {fetchTvRecomandations, fetchMovieRecomandations} from '@/Components/mycomponents/service'

function randre(props) {


    const [movies, setMovies] = React.useState([]);
    const [index, setIndex] = React.useState([]);


    React.useEffect(() => {
        if(props.media_type === 'tv'){
            fetchTvRecomandations(props.id).then(data => {
                setMovies(data)
            })}
        else{
            fetchMovieRecomandations(props.id).then(data => {
                setMovies(data)
            })
        }
        var rand = Math.floor(Math.random())
        console.log(movies[1])
        setIndex(movies)
    }
    , [])


    const getimage = (path) => {
        if (path) return `https://image.tmdb.org/t/p/w500/${path}`;
        else
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019";
    }

  return (
    <div>
        {index &&(
            <>
        <img
           src={ getimage(index.poster_path)}
              alt="poster"
                className="w-20 h-28 rounded-md drop-shadow-lg"
                />
            <h1>

            </h1>
            </>
        )}
    </div>
  )
}

export default randre
