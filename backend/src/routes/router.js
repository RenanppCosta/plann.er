import { Router } from "express";
import { tripRouter } from "./trips.router.js";

export const router = Router();

router.use("/trips", tripRouter);