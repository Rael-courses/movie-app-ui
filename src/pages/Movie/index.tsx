import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { MovieModel } from "../../models/MovieModel";
import MovieCard from "../../components/MovieCard";
import { i18nMap } from "../../i18n/map";
import { useTranslation } from "react-i18next";
import { ArrowBackIos } from "@mui/icons-material";
import { useGetMovieQuery } from "../../queries/useGetMovieQuery";

const paramsSchema = z.object({
  movieId: z.coerce.number(),
});

export default function Movie() {
  const params = useParams();
  const { movieId } = paramsSchema.parse(params);

  const location = useLocation();
  const stateMovieModel = MovieModel.validate(location.state.movie);

  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { getMovieQueryResult } = useGetMovieQuery(movieId, currentLang);
  const fetchedMovieModel = getMovieQueryResult.data;

  const movieModel = fetchedMovieModel ?? stateMovieModel;

  const isNotFound = !movieModel && getMovieQueryResult.isFetched;

  const navigate = useNavigate();

  function navigateToMovies() {
    navigate("/movies");
  }

  return (
    <Box gap={2} display="flex" flexDirection="column">
      <Box>
        <Button onClick={navigateToMovies} variant="outlined">
          <ArrowBackIos fontSize="small" />
          {t(i18nMap.header.nav.movies)}
        </Button>
      </Box>

      {movieModel && <MovieCard movie={movieModel} />}

      {isNotFound && (
        <Typography>{t(i18nMap.movie.error.notFound)} !</Typography>
      )}
    </Box>
  );
}
