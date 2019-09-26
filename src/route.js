import Router from 'express';


export default (app) => {
  const apiRouter = Router();

  apiRouter.get("/", (req, res, next) => {
    res.json({message: "Welcome to Traction App Backend!"});
  });
};
