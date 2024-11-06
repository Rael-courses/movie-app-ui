import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class EnvService {
  private readonly schema = z.object({
    REACT_APP_TMDB_API_KEY: z.string(),
  });

  public get vars(): z.infer<typeof this.schema> {
    return this.schema.parse(process.env);
  }

  public constructor() {
    this.schema.parse(process.env);
  }
}
