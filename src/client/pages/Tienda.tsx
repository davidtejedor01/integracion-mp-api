import { initMercadoPago } from "@mercadopago/sdk-react"
import CardProducts from '../components/CardProducts.tsx'
import { products } from "../../shared/data/products.ts"

initMercadoPago('APP_USR-cce1f40e-1925-47db-8666-8d31f64eeb49')

function Tienda() {
  return (
    <div className="grid gap-8 grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((prod, index) => (<CardProducts key={index} prod={prod} />))}
    </div>
  )
}

export default Tienda
