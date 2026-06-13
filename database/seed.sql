USE papeleria;

INSERT INTO usuario (nombre, apellido, email, password, rol)
VALUES
('Admin', 'Sistema', 'admin@papeleria.com', '123456', 'ADMIN'),
('Juan', 'Perez', 'cliente@papeleria.com', '123456', 'CLIENTE');

INSERT INTO categoria (nombre, descripcion)
VALUES
('Cuadernos', 'Cuadernos y libretas'),
('Lápices', 'Lápices y portaminas'),
('Plumas', 'Plumas y bolígrafos'),
('Arte', 'Material para dibujo'),
('Oficina', 'Artículos de oficina');

INSERT INTO producto
(nombre, descripcion, precio, stock, categoria_id, imagen_url)
VALUES
('Cuaderno Profesional', 'Cuaderno de 100 hojas', 85.50, 20, 1, '/assets/img/cuaderno.jpg'),
('Lápiz HB', 'Lápiz de grafito HB', 8.00, 100, 2, '/assets/img/lapiz.jpg'),
('Pluma Azul', 'Pluma tinta azul', 12.50, 50, 3, '/assets/img/pluma.jpg'),
('Caja de Colores', 'Caja con 24 colores', 95.00, 15, 4, '/assets/img/colores.jpg'),
('Paquete de hojas', '500 hojas tamaño carta', 145.00, 10, 5, '/assets/img/hojas.jpg');