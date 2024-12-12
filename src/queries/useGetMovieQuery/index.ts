import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import {
  IMovieApiService,
  IMovieApiServiceToken,
} from "../../services/api/IMovieApiService";

export function useGetMovieQuery(id: number, lang: string) {
  const movieApiService = container.resolve<IMovieApiService>(
    IMovieApiServiceToken
  );

  const getMovieQueryResult = useQuery({
    queryKey: ["movie", id, lang],
    queryFn: () => movieApiService.getMovie(id, lang),
    staleTime: 1000 * 60 * 30, // 30 minutes,
  });

  return { getMovieQueryResult };
}
