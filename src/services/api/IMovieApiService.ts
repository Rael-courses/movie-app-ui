import { MovieModel } from "../../models/MovieModel";
import { SearchMoviesResponseModel } from "../../models/SearchMoviesResponseModel";

export const IMovieApiServiceToken = "IMovieApiService";

export interface IMovieApiService {
  search(term: string, lang: string): Promise<SearchMoviesResponseModel>;
  getPosterUrl(path: string | null): string;
  getMovie(id: number, lang: string): Promise<MovieModel | null>;
}
