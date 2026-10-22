export const ContadorCarrito = ({ count }) => {
    
    if (count === 0) return null;

    return (
        <span className="contador-carrito">
            {count}
        </span>
    );

};