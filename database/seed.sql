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
('Cuaderno Profesional', 'Cuaderno de 100 hojas', 85.50, 20, 1, 'https://images.pexels.com/photos/15422314/pexels-photo-15422314.jpeghttps://images.pexels.com/photos/15422314/pexels-photo-15422314.jpeg'),
('Lápiz HB', 'Lápiz de grafito HB', 8.00, 100, 2, 'https://images.pexels.com/photos/6952395/pexels-photo-6952395.jpeg'),
('Pluma Azul', 'Pluma tinta azul', 12.50, 50, 3, 'https://images.pexels.com/photos/19364472/pexels-photo-19364472.jpeg'),
('Caja de Colores', 'Caja con 24 colores', 95.00, 15, 4, 'https://images.pexels.com/photos/6969321/pexels-photo-6969321.jpeg'),
('Paquete de hojas', '500 hojas tamaño carta', 145.00, 10, 5, 'https://images.pexels.com/photos/8060101/pexels-photo-8060101.jpeg');


select * from venta;

select * from producto;