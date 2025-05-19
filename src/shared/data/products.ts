import { Product } from "../types/Products";
import buzo from '../../client/assets/buzo.png'
import remera from '../../client/assets/remera.jpg'
import marciano from '../../client/assets/marciano.jpg'
export const products: Product[] = [
    {
        id: 1,
        title: "Buzo",
        price: 100,
        image: `${buzo}`,
    },
    {
        id: 2,
        title: "Remera",
        price: 10,
        image: `${remera}`,
    },
    {
        id: 3,
        title: "Marciano",
        price: 5,
        image: `${marciano}`,
    }
]