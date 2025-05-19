import { useState } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import CardProducts from "../components/CardProducts";
import { products } from "../../shared/data/products";
import FormPay from "../components/FormPay";
import axios from "axios";
import { Product } from "../../shared/types/Products";
import { FormPreference } from "../../shared/utils/formValidateMP";

initMercadoPago("APP_USR-cce1f40e-1925-47db-8666-8d31f64eeb49"); // CREDENCIALES DE PRODUCCION -> Public Key

function Tienda() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod);
    setShowForm(true);
  };

  const handleBuy = async (formData: FormPreference) => {
    try {
      const payload = { ...selectedProduct, ...formData };
      const res = await axios.post<{ init_point: string }>(`${import.meta.env.VITE_API_URL}/crearPreferencia`, payload);
      window.open(res.data.init_point, "_blank");
      setShowForm(false);
    } catch (error) {
      console.log("Error al crear la preferencia", error);
    }
  };

  return (
    <div>
      <div className="grid gap-8 grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((prod, index) => (
          <CardProducts key={index} prod={prod} onSelectProduct={handleSelectProduct} />
        ))}
      </div>

      {showForm && selectedProduct && (
        <FormPay
          onClose={() => setShowForm(false)}
          onSubmit={handleBuy}
        />
      )}
    </div>
  );
}

export default Tienda;
