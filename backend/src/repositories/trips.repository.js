import { prisma } from "../lib/prisma.js";

export const createTripRepository = (body) => prisma.trip.create({data: body});

