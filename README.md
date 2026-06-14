# 📚 Papelería Online

Sistema web para la administración y venta de productos de papelería, desarrollado con **Angular 20**, **Node.js**, **Express** y **MySQL**.

## ✨ Funcionalidades

### 👤 Cliente

* Visualización del catálogo de productos.
* Carrito de compras.
* Inicio de sesión.
* Finalización de compras.

### ⚙️ Administrador

* CRUD de productos.
* CRUD de categorías.
* CRUD de usuarios.
* Consulta de ventas.
* Visualización del detalle de ventas.

---

# 🛠️ Tecnologías utilizadas

| Tecnología   | Versión |
| ------------ | ------- |
| Angular      | 20.3.x  |
| Angular CLI  | 20.3.28 |
| Node.js      | 22.16.0 |
| Express.js   | 5.x     |
| MySQL        | 8.0+    |
| Tailwind CSS | 4.x     |

---

# 💻 Compatibilidad

El proyecto puede ejecutarse en los siguientes sistemas operativos:

* ✅ Windows
* ✅ macOS
* ✅ Linux

Se recomienda utilizar **Volta** para administrar las versiones de Node.js y Angular CLI.

---

# 📋 Preparación del entorno

## 1. Instalar Git

Descarga oficial:

https://git-scm.com/downloads

Verificar instalación:

```bash
git --version
```

---

## 2. Instalar Volta

Volta permite administrar las versiones de Node.js y Angular CLI utilizadas por el proyecto.

Sitio oficial:

https://volta.sh/

### Instalación en macOS / Linux

```bash
curl https://get.volta.sh | bash
```

### Instalación en Windows

Descargar el instalador desde:

https://volta.sh/

Verificar instalación:

```bash
volta --version
```

---

## 3. Instalar Node.js

Instalar la versión recomendada para este proyecto:

```bash
volta install node@22.16.0
```

Verificar:

```bash
node -v
npm -v
```

---

## 4. Instalar Angular CLI

Instalar la misma versión utilizada durante el desarrollo:

```bash
volta install @angular/cli@20.3.28
```

Verificar:

```bash
ng version
```

---

# 📥 Clonar el repositorio

```bash
git clone https://github.com/KiaraCuautleG/papeleria.git
cd papeleria
```

---

# 🗄️ Configuración de la Base de Datos

## Opción A: Instalación desde la página oficial (recomendada)

Descargar MySQL Community Server y MySQL Workbench:

https://dev.mysql.com/downloads/

## Opción B: Instalación mediante Homebrew (macOS)

Instalar MySQL:

```bash
brew install mysql
brew services start mysql
```

Instalar MySQL Workbench:

```bash
brew install --cask mysqlworkbench
```

## Crear la base de datos

Abrir MySQL Workbench y ejecutar el script:

```text
database/papeleria.sql
```

Si el proyecto incluye datos iniciales, ejecutar también:

```text
database/seed.sql
```

---

# ⚙️ Configuración del Backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` tomando como referencia `.env.example`.

Ejemplo:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=app_pass
DB_NAME=papeleria
PORT=3000
```

Iniciar el backend:

```bash
npm run dev
```

Servidor disponible en:

```text
http://localhost:3000
```

---

# 🎨 Configuración del Frontend

Abrir una nueva terminal y entrar a la carpeta del frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Iniciar la aplicación:

```bash
ng serve
```

Abrir en el navegador:

```text
http://localhost:4200
```

---

# 🔑 Usuario Administrador de Prueba

Si se ejecutó el archivo `seed.sql`, se puede utilizar el siguiente usuario:

| Campo      | Valor                                             |
| ---------- | ------------------------------------------------- |
| Correo     | [admin@papeleria.com](mailto:admin@papeleria.com) |
| Contraseña | 123456                                            |

---

# 🚀 Inicio rápido

```bash
# Clonar el proyecto
git clone https://github.com/KiaraCuautleG/papeleria.git

# Backend
cd papeleria/backend
npm install
npm run dev

# Frontend (en otra terminal)
cd ../frontend
npm install
npm start
```

---

# 📁 Estructura del proyecto

```text
papeleria/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── config/
│   └── package.json
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── database/
│   ├── papeleria.sql
│   └── seed.sql
│
└── README.md
```

---

# ❓ Problemas comunes

### El comando `ng` no es reconocido

Verificar que Angular CLI se encuentre instalado:

```bash
volta install @angular/cli@20.3.28
```

Y confirmar:

```bash
ng version
```

### Error de conexión con MySQL

* Verificar que el servicio de MySQL esté iniciado.
* Revisar la configuración del archivo `.env`.
* Confirmar que la base de datos fue creada correctamente.

### Verificar versiones instaladas

```bash
node -v
npm -v
ng version
volta --version
```

---

