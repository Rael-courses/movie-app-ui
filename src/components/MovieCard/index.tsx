import {
  Card,
  CardMedia,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import useCurrentLang from "../../i18n/hooks/useCurrentLang";
import { MovieModel } from "../../models/MovieModel";
import classes from "./classes.module.css";
import { useState } from "react";
import { i18nMap } from "../../i18n/map";

type Props = {
  movie: MovieModel;
};

export default function MovieCard({ movie }: Props) {
  const currentLang = useCurrentLang();
  const { t } = useTranslation();
  const [moviePosterUrl, setMoviePosterUrl] = useState<string>(
    movie.getPosterUrl()
  );

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        className={classes.media}
        image={moviePosterUrl}
        alt={movie.title}
        onError={() => setMoviePosterUrl(MovieModel.fallbackImageUrl)}
      />

      <CardContent>
        <Rating
          value={movie.voteAverage}
          precision={0.25}
          max={10}
          size="large"
          readOnly
        />

        <Typography gutterBottom variant="h5" component="div" mt={3}>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview}
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={3}>
          {t(i18nMap.movie.card.releaseDate)} :{" "}
          {movie.getFormattedReleaseDate(currentLang)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t(i18nMap.movie.card.originalTitle)} : {movie.originalTitle} -{" "}
          {t(i18nMap.movie.card.originalLanguage)} : {movie.originalLanguage}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t(i18nMap.movie.card.popularity)} : {movie.popularity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t(i18nMap.movie.card.voteAverage)} : {movie.voteAverage}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t(i18nMap.movie.card.voteCount)} : {movie.voteCount}
        </Typography>
      </CardContent>
    </Card>
  );
}
