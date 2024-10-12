import { container, singleton } from "tsyringe";
import { searchMoviesResponseDtoSchema } from "./dto";
import { EnvService } from "../../envService";
import { SearchMoviesResponseModel } from "../../../models/SearchMoviesResponseModel";

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
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=${lang}&query=${term}&page=1&include_adult=false`
    )
      .then((r) => r.json())
      .then((json) => searchMoviesResponseDtoSchema.parseAsync(json))
      .then((dto) => SearchMoviesResponseModel.fromDto(dto));
  }
}
