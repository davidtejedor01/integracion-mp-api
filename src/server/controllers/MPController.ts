import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { Request, Response } from "express";
import nodemailer from 'nodemailer';
import { WebhookPay } from '../../shared/types/WebhookPay';

const token = process.env.MP_ACCESS_TOKEN

if (!token)
    throw new Error("MP_ACCESS_TOKEN no está definido en el .env");

const client = new MercadoPagoConfig({ accessToken: token });

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io", //cambiar a gmail en producción
    port: 2525,
    auth: { // datos de cooperadora
        user: process.env.USER_MSJ,
        pass: process.env.PSW_MSJ
    }
})

const sendMsj = async (subject: string, text: string) => {
    try {
        await transporter.sendMail({
            from: '"Mercado Pago" <no-responder@test-app.com>',
            to: "testcorreo@test-jeje.com", // Correo de cooperadora
            subject,
            text
        });
        console.log("Correo enviado exitosamente.");
    } catch (error) {
        console.error("Error al enviar el correo:", error);
    }
}

const getPaymentById = async (id: string) => {
    const payment = new Payment(client);
    return await payment.get({ id })
}
export default class MPController {
    static async crearPreferencia(req: Request, res: Response) {
        try {
            const payload = req.body;
            const preference = new Preference(client);
            const response = await preference.create({
                body: {
                    items: [
                        {
                            id: String(payload.id),
                            title: payload.title,
                            unit_price: payload.price,
                            quantity: 1,
                        },
                    ],
                    metadata: {
                        dni: payload.dni,
                        name: payload.name,
                        last_name: payload.last_name
                    }
                    ,
                    back_urls: {
                        success: 'https://github.com/davidtejedor01/',
                        failure: 'https://github.com/davidtejedor01/',
                        pending: 'https://github.com/davidtejedor01/',
                    },
                    notification_url: 'https://3ce2-2800-810-492-369-41e4-e424-da79-c6dd.ngrok-free.app/webhook'
                }
            })

            res.json({ init_point: response.init_point });
            console.log(response);

        } catch (error: any) {
            console.error('Error en crearPreferencia:', error);
            res.status(500).json({ error: error.message });
        }

    }

    static async webhook(req: Request, res: Response) {
        try {
            const webhookPay = req.body as WebhookPay;

            if (!webhookPay.data?.id) {
                res.status(400).send({ error: "webhookPay está vacío" });
                return;
            }

            if (webhookPay.type === "payment") {
                const mpPay = await getPaymentById(webhookPay.data.id);

                if (mpPay.status === "approved") {
                    const { name, last_name, dni } = mpPay.metadata || {};
                    const userCompleto = `${name} ${last_name} con DNI: ${dni}`;
                    const monto = mpPay.transaction_amount;

                    await sendMsj(
                        "Pago aprobado;",
                        `Pago de $${monto} aprobado por ${userCompleto}.`
                    );
                }
            }

            res.status(200).send("Webhook procesado");
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

}