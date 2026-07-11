# Inventario Físico — Carga Local

App standalone (sin backend, sin conexión requerida) para cargar en el celular un conteo
físico de inventario. Pensada para depósitos sin señal: todo corre en el navegador y los
datos se guardan en el celular.

## Cómo funciona
- Arranca con la **planilla vacía**. No hay ningún SKU precargado.
- Buscás/escaneás un **Part Number** (lector físico que actúa como teclado + Enter, o
  cámara con el botón 📷).
  - Si el Part Number **ya existe** en lo cargado, abre ese artículo para editar cantidades.
  - Si **no existe todavía**, lo crea como artículo nuevo: pedís Descripción y SPQ
    (ambos opcionales) y cargás las cantidades.
- Por artículo se carga: cajas cerradas en depósito (se multiplica automático x SPQ),
  piezas en caja abierta, piezas en línea, piezas en scrap y producto terminado. Se
  calcula el total de piezas por SKU.
- Todo se guarda solo en el celular (localStorage del navegador) — no se pierde si se
  cierra la pestaña ni si se corta la señal.
- Se puede **eliminar** un artículo cargado por error desde su ficha.
- Botón **Exportar Excel** genera un .xlsx con todos los artículos cargados y el total
  general.
- Botón **Reiniciar todo** borra el inventario cargado (pide confirmación).

## Funciona sin internet
Las dos librerías que usa (lectura de códigos de barra y generación del Excel) están
copiadas dentro de la carpeta `vendor/` — no se descargan de internet en cada uso. Una
vez que el navegador cargó la página una vez, todo lo demás (cargar artículos, calcular
totales, exportar el Excel) funciona sin señal.

## Cómo usarla 100% local (sin depender de ningún hosting)
Si el depósito no tiene señal ni siquiera para la primera carga, la forma más simple es
copiar la carpeta entera al celular y abrir `index.html` directamente desde el
explorador de archivos del teléfono (o con una app tipo "servidor local" / navegador que
permita abrir carpetas). Con esto:
- La carga manual y el lector físico (teclado) funcionan siempre.
- El **escaneo con cámara** puede no funcionar al abrir el archivo directamente
  (`file://`), porque los navegadores exigen HTTPS o `localhost` para dar permiso de
  cámara. Si necesitás cámara, usá la opción de instalar la PWA (ver abajo) al menos una
  vez con señal, y después te sigue funcionando offline.

## Instalar como app (recomendado)
1. Abrí la URL publicada (ver abajo) una sola vez con señal/wifi.
2. Desde el menú del navegador, "Agregar a pantalla de inicio".
3. A partir de ahí funciona como una app normal, sin necesidad de conexión.

## Publicar / actualizar
Repo en GitHub Pages: `gustavozaltzman-lgtm/inventario-metagal-tasa`, rama `main`.
Cualquier cambio en estos archivos y `git push` actualiza el sitio publicado en uno o
dos minutos.
