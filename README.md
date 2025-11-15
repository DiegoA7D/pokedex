# Pokédex - Web Application

Una aplicación web interactiva para explorar información de Pokémon utilizando la API oficial de Pokémon.

## Tecnologías Utilizadas

- **Frontend:**
  - HTML5
  - Bootstrap 5 - Framework CSS responsive
  - jQuery - Librería JavaScript para manipulación del DOM
  - Font Awesome - Iconografía

- **Backend:**
  - PHP 8.2
  - Guzzle HTTP Client - Librería para consumir APIs REST

- **API:**
  - PokéAPI v2 (https://pokeapi.co/api/v2/)

## Características

✨ **Búsqueda de Pokémon** - Busca por nombre o ID
📱 **Diseño Responsivo** - Compatible con dispositivos móviles
🎨 **Interfaz Moderna** - Diseño atractivo con gradientes y animaciones
📊 **Información Detallada** - Stats, tipos, habilidades y más
🔄 **Paginación** - Navega entre diferentes Pokémon
🏷️ **Códigos de Color** - Colores específicos para cada tipo de Pokémon

## Estructura del Proyecto

```
pokedex/
├── index.html          # Página principal
├── api.php             # Backend - Consumidor de PokéAPI
├── js/
│   └── app.js          # Lógica del frontend con jQuery
├── composer.json       # Dependencias de PHP
├── vendor/             # Librerías instaladas por Composer
└── README.md           # Este archivo
```

## Requisitos

- Apache Web Server
- PHP 8.0+
- Composer (para instalar Guzzle)
- Conexión a Internet (para consumir PokéAPI)

## Instalación

1. **Descargar dependencias con Composer:**
```bash
cd /opt/lampp/htdocs/pokedex
composer install
```

2. **Acceder a la aplicación:**
```
http://localhost:8080/pokedex/
```

## Uso

### Búsqueda Individual
1. Ingresa el nombre o ID del Pokémon en la barra de búsqueda
2. Presiona Enter o haz clic en el botón de búsqueda
3. Se mostrará un modal con la información detallada

### Exploración de Catálogo
1. Haz clic en el botón "Ver Todo" para cargar el catálogo
2. Usa los botones de paginación para navegar entre páginas
3. Haz clic en cualquier tarjeta de Pokémon para ver detalles

### Modal de Detalles
- **Tipos:** Código de color según tipo de Pokémon
- **Habilidades:** Listado de habilidades especiales
- **Estadísticas:** Gráficos de barras con estadísticas base
- **Información Física:** Altura y peso

## Endpoints de API

### Backend (api.php)

#### Búsqueda de Pokémon Individual
```
GET /api.php?action=search&name=pikachu
```

Respuesta exitosa:
```json
{
  "success": true,
  "data": {
    "id": 25,
    "name": "Pikachu",
    "height": 4,
    "weight": 60,
    "image": "https://...",
    "types": ["electric"],
    "abilities": ["static", "lightningrod"],
    "stats": [...]
  }
}
```

#### Listado Paginado
```
GET /api.php?action=list&offset=0
```

## Características del Código

### api.php
- Utiliza Guzzle para hacer peticiones HTTP a PokéAPI
- Manejo de errores con try-catch
- Respuestas en formato JSON
- Paginación con límite de 20 Pokémon por página

### app.js
- Funciones AJAX para comunicación con el backend
- Renderizado dinámico de tarjetas
- Sistema de colores para tipos de Pokémon
- Modal Bootstrap para detalles
- Validaciones de entrada del usuario

### index.html
- Diseño responsivo con Bootstrap 5
- Barra de búsqueda estilizada
- Grid dinámico de tarjetas
- Modal para detalles del Pokémon
- Controles de paginación

## Códigos de Color por Tipo

- 🔴 **Fire** - #F08030
- 💧 **Water** - #6890F0
- ⚡ **Electric** - #F8D030
- 🌿 **Grass** - #78C850
- ❄️ **Ice** - #98D8D8
- 🥊 **Fighting** - #C03028
- ☠️ **Poison** - #A040A0
- 🏔️ **Ground** - #E0C068
- 🪶 **Flying** - #A890F0
- 👁️ **Psychic** - #F85888
- 🐛 **Bug** - #A8B820
- 🪨 **Rock** - #B8A038
- 👻 **Ghost** - #705898
- 🐉 **Dragon** - #7038F8
- 🌑 **Dark** - #705848
- ⚙️ **Steel** - #B8B8D0
- 🧚 **Fairy** - #EE99AC
- ⚪ **Normal** - #A8A878

## Mejoras Futuras

- [ ] Base de datos local para caché
- [ ] Favoritos del usuario
- [ ] Filtrado por tipo
- [ ] Comparador de Pokémon
- [ ] Análisis de movimientos
- [ ] Interfaz en múltiples idiomas
- [ ] Progressive Web App (PWA)

## Troubleshooting

**Error: "Cannot find 'vendor/autoload.php'"**
```bash
composer install
```

**Error: "Port 8080 already in use"**
Cambia el puerto en la configuración de XAMPP o libera el puerto.

**Error: "API connection failed"**
Verifica tu conexión a internet y que PokéAPI esté disponible.

## Autor

Proyecto desarrollado como ejemplo educativo de integración de APIs.

## Licencia

Este proyecto es de código abierto y está disponible para uso libre.
