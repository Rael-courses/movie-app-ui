import { container, singleton } from "tsyringe";
import { movieDtoSchema, searchMoviesResponseDtoSchema } from "./dto";
import { SearchMoviesResponseModel } from "../../../models/SearchMoviesResponseModel";
import { MovieModel } from "../../../models/MovieModel";
import { MovieMapper } from "./mappers/MovieMapper";
import { SearchMoviesResponseMapper } from "./mappers/SearchMoviesResponseMapper";
import { IMovieApiService } from "../IMovieApiService";

@singleton()
export class MovieAppApiService implements IMovieApiService {
  private readonly searchMoviesResponseMapper = container.resolve(
    SearchMoviesResponseMapper
  );
  private readonly movieMapper = container.resolve(MovieMapper);

  private readonly baseUrl = "https://localhost:7044/api";
  private readonly imageUrlBase = "https://image.tmdb.org/t/p/w500";
  public readonly fallbackImageUrl = `/images/movie-fallback.png`;

  public search(
    term: string,
    lang: string
  ): Promise<SearchMoviesResponseModel> {
    return fetch(`${this.baseUrl}/movies?language=${lang}&search_term=${term}`)
      .then((r) => r.json())
      .then((json) => searchMoviesResponseDtoSchema.parse(json))
      .then((dto) => this.searchMoviesResponseMapper.mapDtoToModel(dto));
  }

  public getPosterUrl(path: string | null): string {
    if (!path) {
      return this.fallbackImageUrl;
    }

    const isPathStartingWithSlash = path?.startsWith("/");
    const pathWithoutStartingSlash = isPathStartingWithSlash
      ? path.substring(1)
      : path;

    return `${this.imageUrlBase}/${pathWithoutStartingSlash}`;
  }

  public async getMovie(id: number, lang: string): Promise<MovieModel | null> {
    return fetch(`${this.baseUrl}/movies/${id}?&language=${lang}`)
      .then((r) => {
        if (r.status === 404) {
          return null; // Return null if 404 is encountered
        }
        return r.json(); // Proceed with JSON parsing for other status codes
      })
      .then((json) => {
        if (json === null) return null; // Return null if 404 is encountered

        return movieDtoSchema
          .parseAsync(json)
          .then((dto) => this.movieMapper.mapDtoToModel(dto));
      });
  }
}
