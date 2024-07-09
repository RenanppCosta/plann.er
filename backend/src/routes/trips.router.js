import { Router } from "express";
import { createTripController } from "../controllers/trips.controller.js";

export const tripRouter = Router();

tripRouter.post("/", createTripController);
