import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { MovieModel } from "../../models/MovieModel";
import MovieCard from "../../components/MovieCard";
import useCurrentLang from "../../i18n/hooks/useCurrentLang";
import useGetMovieQuery from "../../queries/GetMovieQuery";
import { i18nMap } from "../../i18n/map";
import { useTranslation } from "react-i18next";
import { ArrowBackIos } from "@mui/icons-material";

const paramsSchema = z.object({
  movieId: z.coerce.number(),
});

export default function Movie() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const params = useParams();
  const { movieId } = paramsSchema.parse(params);

  const location = useLocation();
  const stateMovieModel = location.state?.movie
    ? MovieModel.validate(location.state.movie)
    : null;

  const currentLang = useCurrentLang();
  const { getMovieQueryResult } = useGetMovieQuery(movieId, currentLang);
  const fetchedMovieModel = getMovieQueryResult.data;

  const movieModel = fetchedMovieModel ?? stateMovieModel;

  const isNotFound = !movieModel && getMovieQueryResult.isFetched;

  function navigateToMovies() {
    navigate("/movies");
  }

  return (
    <Box gap={2} display="flex" flexDirection="column">
      <Box>
        <Button onClick={navigateToMovies} variant="outlined">
          <ArrowBackIos fontSize="small" />
          {t(i18nMap.movies.page)}
        </Button>
      </Box>

      {movieModel && <MovieCard movie={movieModel} />}

      {isNotFound && (
        <Typography>{t(i18nMap.movie.error.notFound)} !</Typography>
      )}
    </Box>
  );
}
