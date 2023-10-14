import { FeatureManager, IFeatureManager } from "./feature.manager";
import express, { Request, Response } from "express";
import "dotenv/config";
const port = process.env.PORT || 4;
interface IRequest {
  arg: number;
}
interface IResponse {
  result: string;
}
interface IRouteParams {
  maintenance?: string;
}
interface IContext {
  featureManager: IFeatureManager;
  logger: ILogger;
}

interface ILogger {
  info(message: string): void;
}

class ConsoleLogger implements ILogger {
  info(message: string): void {
    console.log(message);
  }
}

const app = express();
const featureManager = new FeatureManager();
const logger = new ConsoleLogger();
app.use<IRouteParams, any, any, any, IContext>((req, res, next) => {
  res.locals.featureManager = featureManager;
  res.locals.logger = logger;

  if (
    !req.params.maintenance &&
    !res.locals.featureManager.isEnable("maintenance")
  ) {
    return next();
  }
  res.send("Maintenance mode");
});
app.get<"/env/:keyword", { keyword: string }>("/env/:keyword", (req, res) => {
  return res.send(process.env[req.params.keyword]);
});
app.get<"/", { asx: string }, IResponse, IRequest>("/", (req, res) => {
  const asx = req.params.asx;
  function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  return res.send({ result: getRandomArbitrary(10, 10_000).toString() });
});

app.get<"/enable-maintenance", {}, {}, {}, {}, IContext>(
  "/enable-maintenance",
  (req, res) => {
    res.locals.featureManager.enable("maintenance");
    res.send(true);
  }
);

app.get<"/disable-maintenance", {}, {}, {}, {}, IContext>(
  "/disable-maintenance",
  (req, res) => {
    res.locals.featureManager.disable("maintenance");
    res.send(true);
  }
);

app.listen(port, () => {
  logger.info(`Server started on port: ${port}`);
});
