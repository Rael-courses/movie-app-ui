import { container, singleton } from "tsyringe";
import { SearchMoviesResultDto, searchMoviesResultDtoSchema } from "./dto";
import { EnvService } from "../../envService";

@singleton()
export class TmdbApiService {
  private readonly baseUrl = "https://api.themoviedb.org/3";
  private readonly apiKey =
    container.resolve(EnvService).vars.REACT_APP_TMDB_API_KEY;

  public async search(
    term: string,
    lang: string
  ): Promise<SearchMoviesResultDto> {
    return fetch(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=${lang}&query=${term}&page=1&include_adult=false`
    )
      .then((r) => r.json())
      .then((json) => searchMoviesResultDtoSchema.parseAsync(json));
  }
}
