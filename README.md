# Inventario Físico — METAGAL / TASA

App standalone (sin backend) para cargar en el celular el conteo físico de inventario
de la planilla "V-V Inventario físico METAGAL". No depende del repo DAC-WMS.

## Uso
- Buscar/escanear el **Part Number TASA (12 dígitos)** con el lector físico (actúa como
  teclado: escanea y apreta Enter) o con el botón 📷 (cámara del celular).
- Cargar por artículo: cajas cerradas (se multiplica automático x SPQ), piezas en caja
  abierta, piezas en línea, piezas en scrap y producto terminado.
- El progreso se guarda solo en el celular (localStorage del navegador) — no se pierde
  si se cierra la pestaña.
- Botón **Exportar Excel** genera un .xlsx con todos los artículos, cantidades y el total
  general, listo para enviar.
- Botón **Reiniciar conteo** borra todo lo cargado (pide confirmación).

## Publicar para usar desde el celular
La cámara solo funciona en HTTPS (o localhost), así que hay que subir estos 4 archivos
(`index.html`, `manifest.json`, `sw.js`, `icon.svg`) a un hosting estático gratuito:

**Opción rápida — Netlify Drop**
1. Ir a https://app.netlify.com/drop
2. Arrastrar la carpeta `inventario-metagal-tasa` completa.
3. Abrir la URL que da Netlify desde el navegador del celular.

**Opción Vercel / GitHub Pages**: subir la carpeta a un repo nuevo y desplegar como sitio
estático (sin build step).

Una vez abierta la URL en el celular, desde el menú del navegador usar
"Agregar a pantalla de inicio" para que quede como un ícono de app normal.

## Si no hay conexión en el depósito
Sin internet solo funciona la búsqueda manual/lector físico (la cámara requiere que la
librería de escaneo se haya cargado una vez con conexión). Los datos cargados y la
exportación a Excel funcionan siempre offline una vez que la página se abrió una vez.
