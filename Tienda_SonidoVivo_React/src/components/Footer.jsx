function Footer({itemsFooter}) {
    return (
        <>
            <footer className="main-footer">
                <p>@ SonidoVivo 2026 - Todos los derechos reservados</p>
                {itemsFooter.map((item) => (
                    <p key={item.href}>
                        <b>{item.contacto}<a href={item.href}>{item.label}</a></b>
                    </p>
                ))}
            </footer>
        </>
    )
}

export default Footer