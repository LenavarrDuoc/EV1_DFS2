import { Link }    from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ContadorCarrito } from "../atoms/ContadorCarrito";

export const IconoCarrito = () => {

    const { totalItems } = useCart();

    return (
        <Link to="/carrito">
            <span className="icono-carrito">🛒</span>
            <ContadorCarrito count={totalItems} />
        </Link>
    );

};