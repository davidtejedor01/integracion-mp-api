import { Product } from "../../shared/types/Products";

type Props = {
    prod: Product;
    onSelectProduct: (prod: Product) => void;
};

const CardProducts = ({ prod, onSelectProduct }: Props) => {
    return (
        <div className="bg-blue-500 shadow-lg hover:shadow-2xl rounded-2xl p-5 max-w-xs text-center 
      transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 mx-4 my-6 border border-blue-500"
        >
            <img src={prod.image} alt={prod.title} className="w-full h-52 object-cover rounded-xl mb-4 border border-blue-300" />
            <h3 className="text-xl font-semibold text-white mb-2 truncate">{prod.title}</h3>
            <p className="text-2xl font-bold text-white mb-4">{prod.price}</p>
            <button
                onClick={() => onSelectProduct(prod)} // Al hacer clic, selecciona el producto
                className="cursor-pointer w-full bg-white text-blue-700 font-semibold py-2 rounded-lg shadow hover:bg-blue-100 transition-all"
            >
                Comprar con Mercado Pago
            </button>
        </div>
    );
};

export default CardProducts;
