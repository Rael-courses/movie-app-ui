import { Box } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { z } from "zod";
import { MovieModel } from "../../models/MovieModel";
import MovieCard from "../../components/MovieCard";

const paramsSchema = z.object({
  movieId: z.coerce.number(),
});

export default function Movie() {
  const params = useParams();
  const { movieId } = paramsSchema.parse(params);
  console.log(movieId);

  const location = useLocation();
  const movieModel = MovieModel.validate(location.state.movie);

  return (
    <Box>
      <MovieCard movie={movieModel} />
    </Box>
  );
}
