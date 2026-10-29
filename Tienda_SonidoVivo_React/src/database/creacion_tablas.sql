-- 1. ROL
CREATE TABLE ROLES (
    id_rol      INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol  VARCHAR(30) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 2. ESTILO MUSICAL:
CREATE TABLE ESTILOS_MUSICALES (
    id_estilo        INT AUTO_INCREMENT PRIMARY KEY,
    nombre_estilo    VARCHAR(50)  NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 3. CATEGORIA INSTRUMENTO:
CREATE TABLE CATEGORIAS_INSTRUMENTOS (
    id_categoria_inst        INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria_inst    VARCHAR(100)  NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 4. USUARIO
CREATE TABLE USUARIOS (
    id_usuario              INT AUTO_INCREMENT PRIMARY KEY,
    run                     VARCHAR(12)  NOT NULL UNIQUE,
    pnombre                 VARCHAR(50)  NOT NULL,
    snombre                 VARCHAR(50)  NULL,
    apaterno                VARCHAR(50)  NOT NULL,
    amaterno                VARCHAR(50) NULL,
    correo                  VARCHAR(100) NOT NULL UNIQUE,
    password_hash           VARCHAR(64)  NOT NULL,
    fecha_nacimiento        DATE         NOT NULL,
    direccion               VARCHAR(80)  NOT NULL,
    comuna                  VARCHAR(50)  NOT NULL,
    id_estilo               INT          NULL,
    id_categoria_inst       INT          NULL,
    id_rol                  INT          NOT NULL,
    fecha_registro          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_usuarios_roles
    FOREIGN KEY (id_rol) REFERENCES ROLES(id_rol),

    CONSTRAINT fk_usuarios_estilos_musicales
    FOREIGN KEY (id_estilo) REFERENCES ESTILOS_MUSICALES(id_estilo),

    CONSTRAINT fk_usuarios_categorias_instrumentos
    FOREIGN KEY (id_categoria_inst) REFERENCES CATEGORIAS_INSTRUMENTOS(id_categoria_inst),
    
    CONSTRAINT chk_email_format
    CHECK (correo LIKE '%@%.%')
) ENGINE=InnoDB;


-- 5. CATEGORIA PRODUCTO
CREATE TABLE CATEGORIAS_PRODUCTOS (
    id_categoria_prod        INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria_prod    VARCHAR(50)  NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 6. PRODUCTO
CREATE TABLE PRODUCTOS (
    id_producto         INT AUTO_INCREMENT PRIMARY KEY,
    nombre              VARCHAR(100) NOT NULL,
    descripcion         TEXT         NULL,
    precio              INT          NOT NULL,
    stock               INT          NOT NULL  DEFAULT 0,
    imagen_url          VARCHAR(255) NOT NULL,
    id_categoria_prod   INT          NOT NULL,
    activo              TINYINT(1)   NOT NULL  DEFAULT 1,
    fecha_creacion      DATETIME     NOT NULL  DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_productos_categorias
    FOREIGN KEY (id_categoria_prod) REFERENCES CATEGORIAS_PRODUCTOS(id_categoria_prod),

    CONSTRAINT chk_precio_posicion
    CHECK (precio >= 0),
    
    CONSTRAINT chk_stock_positivo
    CHECK (stock >= 0)
) ENGINE=InnoDB;

-- 7. CARRITO
CREATE TABLE CARRITOS (
    id_carrito          INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario          INT      NOT NULL UNIQUE,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_carritos_usuarios
    FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- 8. CARRITO_DETALLE
CREATE TABLE CARRITO_DETALLE (
    id_carrito_item     INT AUTO_INCREMENT PRIMARY KEY,
    id_carrito          INT NOT NULL,
    id_producto         INT NOT NULL,
    cantidad            INT NOT NULL,

    CONSTRAINT fk_carrito_items_carritos
    FOREIGN KEY (id_carrito) REFERENCES CARRITOS(id_carrito)
    ON DELETE CASCADE,

    CONSTRAINT fk_carrito_items_productos
    FOREIGN KEY (id_producto) REFERENCES PRODUCTOS(id_producto),

    CONSTRAINT uq_carrito_producto
    UNIQUE (id_carrito, id_producto),

    CONSTRAINT chk_cantidad_item
    CHECK (cantidad > 0)
) ENGINE=InnoDB;

-- 9. VENTAS
CREATE TABLE VENTAS (
    id_venta            INT AUTO_INCREMENT PRIMARY KEY,
    codigo_seguimiento  VARCHAR(20) NOT NULL UNIQUE,
    id_usuario          INT NOT NULL,
    subtotal            INT NOT NULL,
    iva                 INT NOT NULL,
    total               INT NOT NULL,
    estado_envio        VARCHAR(30) NOT NULL DEFAULT 'Registrado',
    fecha_venta         DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_ventas_usuarios
    FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario),
    
    CONSTRAINT chk_subtotal_pos
    CHECK (subtotal >= 0),
    
    CONSTRAINT chk_iva_pos
    CHECK (iva >= 0),

    CONSTRAINT chk_total_pos
    CHECK (total >= 0),

    CONSTRAINT chk_estado_envio
    CHECK (estado_envio IN ('Registrado', 'En Proceso', 'Enviado', 'Entregado'))
) ENGINE=InnoDB;

-- 10. VENTA_DETALLES
CREATE TABLE VENTA_DETALLE (
    id_detalle          INT AUTO_INCREMENT PRIMARY KEY,
    id_venta            INT NOT NULL,
    id_producto         INT NOT NULL,
    precio_unitario     INT NOT NULL,
    cantidad            INT NOT NULL,
    subtotal_linea      INT NOT NULL,
    CONSTRAINT fk_detalles_ventas
    FOREIGN KEY (id_venta) REFERENCES VENTAS(id_venta)
    ON DELETE CASCADE,
    
    CONSTRAINT fk_detalles_productos
    FOREIGN KEY (id_producto) REFERENCES PRODUCTOS(id_producto),

    CONSTRAINT chk_cantidad_detalle
    CHECK (cantidad > 0),

    CONSTRAINT chk_precio_unitario
    CHECK (precio_unitario >= 0),

    CONSTRAINT chk_subtotal_linea
    CHECK (subtotal_linea >= 0)
) ENGINE=InnoDB;