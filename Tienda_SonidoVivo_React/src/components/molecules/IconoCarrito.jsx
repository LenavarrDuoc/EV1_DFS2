import { Link }    from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ContadorCarrito } from "../atoms/ContadorCarrito";

export const IconoCarrito = () => {

    const { totalItems } = useCart();

    return (
        <Link to="/carrito" className="link-carrito-header" title="Ver Carrito de Compras">
            <span className="icono-carrito-emoji">🛒</span>
            <span>CARRITO</span>
            <ContadorCarrito count={totalItems} />
        </Link>
    );

};