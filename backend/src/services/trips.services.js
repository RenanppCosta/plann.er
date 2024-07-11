import { getMailClient } from "../lib/mail.js";
import { createTripRepository } from "../repositories/trips.repository.js";
import nodemailer from "nodemailer";
import dayjs from "dayjs";

export const createTripService = async (body) => {
    let { destination, starts_at, ends_at, owner_name, owner_email, emails_to_invite} = body;

    if(!destination || !starts_at || !ends_at || !owner_email || !owner_name) throw new Error ("Registre todos os campos corretamente!");
    

    const formattedStartsAt = dayjs(starts_at).format('dddd, MMMM D YYYY [at] h:mm A');;
    const formattedEndsAt = dayjs(ends_at).format('dddd, MMMM D YYYY [at] h:mm A');;

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
        subject: `Confirme sua viagem para ${destination} em ${formattedStartsAt}`,
        html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
          <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong> nas datas de <strong>${formattedStartsAt}</strong> até <strong>${formattedEndsAt}</strong>.</p>
          <p></p>
          <p>Para confirmar sua viagem, clique no link abaixo:</p>
          <p></p>
          <p>
            <a href="">Confirmar viagem</a>
          </p>
          <p></p>
          <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
        </div>
      `.trim(),
    });

    console.log(nodemailer.getTestMessageUrl(message));

    const trip = await createTripRepository({
        destination,
        starts_at,
        ends_at,
        participants: {
            createMany: {
                data: [
                    {
                        name: owner_name,
                        email: owner_email,
                        is_confirmed: true,
                        is_owner: true,
                    },
                    ...emails_to_invite.map(email => {
                        return { email };
                    })
                ]
                
            }
        }
    });

    return trip;
}

