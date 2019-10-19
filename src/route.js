import Router from 'express';
import v1Controller from './controllers/v1';


export default (app) => {
  app.get("/", (req, res, next) => {
    console.log(req.get('Host'), req.protocol)
    res.json({
      message: `Welcome to Traction App Backend!. API Docs available at ${req.protocol}://${req.get('Host')}/docs`
    });
  });

  // v1 routes
  const apiRouter = Router();
  apiRouter.get('/vehicles', v1Controller.vehicle.getAll)
  apiRouter.get('/vehicles-data', v1Controller.vehicle.getData)
  apiRouter.get('/vehicles-search', v1Controller.vehicle.search)

  app.use("/v1", apiRouter)
  // end of v1 routes
};
