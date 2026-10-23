import CarritoItem from '../molecules/CarritoItem';

function ListaCarrito({ items }) {

    return (
        <div className="carrito-lista">
            {items.map((item) => (
                <CarritoItem key={item.id} item={item} />
            ))}
        </div>
    );

};

export default ListaCarrito;