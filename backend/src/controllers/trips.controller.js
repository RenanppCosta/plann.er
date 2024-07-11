import { createTripService } from "../services/trips.services.js";
import { tripSchema } from "../validations/schemas/trips.schemas.js";

export const createTripController = async (req,res) =>{
    const body = req.body;

    try {
        const data = tripSchema.parse(body);
        const trip = await createTripService(data);

        res.send(trip);
    } catch (error) {
        res.status(400).send(error.message);
    }
}