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
export const fetchActor = async (id) => {
    const response = await axios.get(`${BASE_URL}/person/${id}?api_key=${API_KEY}`);
    return response.data
}

export const fetchActorKnownFor = async (id) => {
    const response = await axios.get(`${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}`);
    return response.data.cast
}

export const fetchActorSocial = async (id) => {
    const response = await axios.get(`${BASE_URL}/person/${id}/external_ids?api_key=${API_KEY}`);
    return response.data
}

export const fetchActorImages = async (id) => {
    const response = await axios.get(`${BASE_URL}/person/${id}/images?api_key=${API_KEY}`);
    return response.data.profiles
}

export const fetchTv = async (id) => {
    const response = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
    return response.data
}

export const fetchMovieByKeyword = async (id, page) => {
    const response = await axios.get(`${BASE_URL}/keyword/${id}/movies?api_key=${API_KEY}&page=${page}`);
    return response.data.results;
}

export const fetchtvcast = async (id) => {
    const response = await axios.get(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`);
    return response.data.cast
}

export const fetchTvVideos = async (id) => {
    const response = await axios.get(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`);
    return response.data.results
}

export const fetchTvBackdrops = async (id) => {
    const response = await axios.get(`${BASE_URL}/tv/${id}/images?api_key=${API_KEY}`);
    return response.data.backdrops
}

export const fetchTvPosters = async (id) => {
    const response = await axios.get(`${BASE_URL}/tv/${id}/images?api_key=${API_KEY}`);
    return response.data.posters
}

export const fetchTvRecomandations = async(id) => {
    const response =  await axios.get(`${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}`);
    return response.data.results
}

export const fetchTvKeywords = async (id) => {
    const response = await axios.get(`${BASE_URL}/tv/${id}/keywords?api_key=${API_KEY}`);
    return response.data.results
}

export const fetchTvbykeyword = async (id, page, sort) => {
    const response = await axios.get(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_keywords=${id}&page=${page}&sort_by=${sort}`);
    return response.data.results;
}
