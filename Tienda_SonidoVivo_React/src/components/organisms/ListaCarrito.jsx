import CarritoItem from '../molecules/CarritoItem';

function ListaCarrito({ items }) {
  return (
    <div className="d-flex flex-column gap-3">
      {items.map((item) => (
        <CarritoItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ListaCarrito;