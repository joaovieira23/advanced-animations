import { API_KEY } from './config';

// interface PropsMovies {
//     id: number,
//     original_title: string;
//     poster_path: string;
//     backdrop_path: string;
//     vote_average: string;
//     overview: string;
//     release_date: string;
//     genre_ids: string;
// }

const genres = {
    12: 'Aventura',
    14: 'Fantasia',
    16: 'Animação',
    18: 'Drama',
    27: 'Horror',
    28: 'Ação',
    35: 'Comédia',
    36: 'História',
    37: 'Ocidental',
    53: 'Thriller',
    80: 'Crime',
    99: 'Documentário',
    878: 'Ficção científica',
    9648: 'Mistério',
    10402: 'Música',
    10749: 'Romance',
    10751: 'Família',
    10752: 'Guerra',
    10770: 'Filme de TV'
};

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
const getImagePath = (path) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export const getMovies = async () => {
  const { results } = await fetch(API_URL).then((x) => x.json());
  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map((genre) => genres[genre]),
    })
  );

  return movies;
};