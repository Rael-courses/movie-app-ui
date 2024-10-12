import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import classes from "./classes.module.css";
import { MovieModel } from "../../models/MovieModel";
import useCurrentLang from "../../i18n/hooks/useCurrentLang";
import { useTranslation } from "react-i18next";
import { i18nMap } from "../../i18n/map";
import { useNavigate } from "react-router-dom";

type Props = {
  movies: MovieModel[];
};

export default function MoviesTable({ movies }: Props) {
  const currentLang = useCurrentLang();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateToMoviePage = (movie: MovieModel) => {
    navigate(`/movies/${movie.id}`, { state: { movie } });
  };

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.headCell}>
              {t(i18nMap.movies.table.id)}
            </TableCell>
            <TableCell align="center" className={classes.headCell}>
              {t(i18nMap.movies.table.title)}
            </TableCell>
            <TableCell align="center" className={classes.headCell}>
              {t(i18nMap.movies.table.voteAverage)}
            </TableCell>
            <TableCell align="center" className={classes.headCell}>
              {t(i18nMap.movies.table.voteCount)}
            </TableCell>
            <TableCell align="center" className={classes.headCell}>
              {t(i18nMap.movies.table.popularity)}
            </TableCell>
            <TableCell align="center" className={classes.headCell}>
              {t(i18nMap.movies.table.releaseDate)}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <TableRow
              key={movie.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className={classes.row}
              onClick={() => navigateToMoviePage(movie)}
            >
              <TableCell align="center">{movie.id}</TableCell>
              <TableCell align="center" className={classes.titleCell}>
                {movie.title}
              </TableCell>
              <TableCell align="center">{movie.voteAverage}</TableCell>
              <TableCell align="center">{movie.voteCount}</TableCell>
              <TableCell align="center">{movie.popularity}</TableCell>
              <TableCell align="center">
                {movie.getFormattedReleaseDate(currentLang)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
