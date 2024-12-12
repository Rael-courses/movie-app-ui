import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import {
  IMovieApiService,
  IMovieApiServiceToken,
} from "../../services/api/IMovieApiService";

export function useSearchMoviesQuery(searchTerm: string, lang: string) {
  const movieApiService = container.resolve<IMovieApiService>(
    IMovieApiServiceToken
  );

  const searchMoviesQueryResult = useQuery({
    queryKey: ["searchMovies", searchTerm, lang],
    queryFn: () => movieApiService.search(searchTerm, lang),
    enabled: searchTerm !== "",
    staleTime: 1000 * 60 * 30, // 30 minutes,
  });

  return { searchMoviesQueryResult };
}
