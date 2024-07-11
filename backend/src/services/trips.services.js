import { getMailClient } from "../lib/mail.js";
import { createTripRepository } from "../repositories/trips.repository.js";
import nodemailer from "nodemailer";

export const createTripService = async (body) => {
    let { owner_name, owner_email, ...tripData } = body;

    const { destination, starts_at, ends_at } = tripData;

    if(!destination || !starts_at || !ends_at || !owner_email || !owner_name) throw new Error ("Registre todos os campos corretamente!");

    const mail = await getMailClient();

    const message = await mail.sendMail({
        from: {
            name: "Equipe plann.er",
            address: "equipe.planner@planner.com"
        },
        to:{
            name: owner_name,
            address: owner_email
        },
        subject: "Testando envio de email",
        html: `<p>Teste do envio de email</p>`
    });

    console.log(nodemailer.getTestMessageUrl(message));

    const trip = createTripRepository(tripData);

    return trip;
}