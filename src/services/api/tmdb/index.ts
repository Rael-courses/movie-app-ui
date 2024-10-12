import { container, singleton } from "tsyringe";
import { movieDtoSchema, searchMoviesResponseDtoSchema } from "./dto";
import { EnvService } from "../../envService";
import { SearchMoviesResponseModel } from "../../../models/SearchMoviesResponseModel";
import { MovieModel } from "../../../models/MovieModel";

@singleton()
export class TmdbApiService {
  private readonly baseUrl = "https://api.themoviedb.org/3";
  private readonly apiKey =
    container.resolve(EnvService).vars.REACT_APP_TMDB_API_KEY;

  public readonly imageUrlBase = "https://image.tmdb.org/t/p/w500";

  public async search(
    term: string,
    lang: string
  ): Promise<SearchMoviesResponseModel> {
    return fetch(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=${lang}
      &query=${term}&page=1&include_adult=false`
    )
      .then((r) => r.json())
      .then((json) => searchMoviesResponseDtoSchema.parseAsync(json))
      .then((dto) => SearchMoviesResponseModel.fromDto(dto));
  }

  public async getMovie(id: number, lang: string): Promise<MovieModel | null> {
    return fetch(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=${lang}`
    )
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
          .then((dto) => MovieModel.fromDto(dto));
      });
  }
}
