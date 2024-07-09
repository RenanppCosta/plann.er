import { createTripRepository } from "../repositories/trips.repository.js";

export const createTripService = (body) => {
    let { destination, starts_at, ends_at } = body;

    if(!destination || !starts_at || !ends_at) throw new Error ("Registre todos os campos corretamente!");

    const trip = createTripRepository(body);

    return trip;
}