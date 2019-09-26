import express, {Application, NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import route from "./route";

const app = express();

app.use(cors());
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
route(app);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.info(`App running and listening on port ${port}!`);
});

export default app;
