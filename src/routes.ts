import { Router } from "express";
import {
  deleteCars,
  detailCars,
  listCars,
  registerCars,
  updateCars,
} from "./controllers/cars";

const routes = Router();

routes.get("/carros", listCars);
routes.get("/carros/:id", detailCars);
routes.post("/carros", registerCars);
routes.put("/carros/:id", updateCars);
routes.delete("/carros/:id", deleteCars);

export default routes;
