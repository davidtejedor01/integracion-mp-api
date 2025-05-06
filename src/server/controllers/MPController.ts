import { MercadoPagoConfig, Preference } from 'mercadopago';
import { Request, Response } from "express";

const token = process.env.MP_ACCESS_TOKEN

if (!token)
    throw new Error("MP_ACCESS_TOKEN no está definido en el .env");

const client = new MercadoPagoConfig({ accessToken: token });

export default class MPController {
    static async crearPreferencia(req: Request, res: Response) {
        try {
            const prod = req.body;
            const preference = new Preference(client);
            const response = await preference.create({
                body: {
                    items: [
                        {
                            id: String(prod.id),
                            title: prod.title,
                            unit_price: prod.price,
                            quantity: 1,
                        },
                    ],
                    back_urls: {
                        success: 'http://localhost:5173/success',
                        failure: 'http://localhost:5173/failure',
                        pending: 'http://localhost:5173/pending',
                    }
                }
            })

            res.json({ init_point: response.init_point }); // Enviamos solo el ID de la preferencia

        } catch (error: unknown) {
            const e = error as Error;
            console.error('Error en crearPreferencia:', e);
            res.status(500).json({ error: e.message });
        }

    }
    static async success(_: Request, res: Response) {
        res.send("success")
    }
    static async failure(_: Request, res: Response) {
        res.send("failure")
    }
    static async pending(_: Request, res: Response) {
        res.send("pending")
    }
}