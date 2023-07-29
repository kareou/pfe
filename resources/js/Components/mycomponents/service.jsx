import axios from 'axios';

const API_KEY = "da9925427b9b3e99c966f87cb43b66f5";
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (type = 'trending/movie/day',search) => {
  if (!search) {
    const response = await axios.get(`${BASE_URL}/${type}?api_key=${API_KEY}`);
    return response.data.results;
  } else {
    const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${search}`);
    return response.data.results;
  }
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
//   console.log(response.data);
  return response.data;
};


export const fetchMovieVideos = async (type) => {
    const response = await axios.get(`${BASE_URL}${type}?api_key=${API_KEY}`);
    return response.data.results
}

export const fetchMovieCredits = async (id) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
    return response.data.cast
}

export  const fetchMovieBackdrops = async (id) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`);
    return response.data.backdrops
}

export const fetchMoviePosters = async (id) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`);
    return response.data.posters
}

export const fetchMovieRecomandations = async(id) => {
    const response =  await axios.get(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`);
    return response.data.results
}

export const fetchMovieKeywords = async (id) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}/keywords?api_key=${API_KEY}`);
    return response.data.keywords
}
