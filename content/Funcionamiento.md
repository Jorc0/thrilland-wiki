---
title: "Funcionamiento del CodexMental"
description: "Un repaso de las herramientas técnicas que uso para mantener esta enciclopedia mental viva, portátil y mínimamente resistente al caos"
tags: [infraestructura, herramientas, Quartz, Cursor, GitHub, sistema, blog]
category: núcleo
dg-publish: true
---
## Lo técnico también piensa (o al menos lo sostiene)

Este blog no flota en el éter.  
Tiene tripas. Y como todo sistema vivo, son un poco improvisadas, un poco funcionales, y un poco parcheadas con cinta adhesiva digital.

Esto no es un Wordpress. Ni una app custom.  
Es un *collage estable* de herramientas que me permiten escribir, organizar y publicar sin tener que depender de plataformas opacas o de interfaces que me gritan.

Así funciona, por ahora:

## 1. Escribo con IA en Cursor

Porque es más que un editor. Es un espacio donde la IA está integrada de forma natural.  
Cada entrada de este blog empieza como un `.md` en Cursor, donde puedo:
- Escribir y editar con asistencia de IA
- Generar commits inteligentes
- Tener control de versiones integrado
- Hacer búsquedas y navegación eficiente

La clave: **la IA no es un plugin ni una herramienta separada. Es parte del flujo natural de escritura.**

## 2. Publico con Quartz

Quartz es una plantilla de sitio web que convierte carpetas de Markdown en una web estática tipo wiki.  
Me permite publicar esto como una enciclopedia personal, con navegación simple y enlaces automáticos.

No es perfecto, pero hace justo lo que necesito: **mostrar texto sin que parezca un blog comercial ni una web corporativa.**

También me permite tener URLs legibles y que cada entrada viva en su propia página, sin florituras.

## 3. Lo sirvo desde GitHub Pages

Después de probar Cloudflare Workers y tener más de una pelea con configuraciones raras, DNS y otras bestias, decidí volver a lo básico.

Ahora subo el sitio generado a un repositorio de GitHub y lo sirvo con GitHub Pages.

Ventajas:
- Gratis
- Simple
- Funciona
- No rompe cosas (tan seguido)

**GitHub Pages + Quartz = publicación estable sin sustos.**

## 4. Automatización mínima (por ahora)

No tengo scripts raros ni CI/CD sofisticado.  
Cuando quiero actualizar el blog:
- Escribo en Cursor con asistencia de IA
- Genero el sitio con Quartz
- Hago commit y push directamente desde Cursor
- Y listo

Podría automatizar más cosas. Y quizá lo haga. Pero **prefiero que el sistema sea entendible incluso medio dormido**.

## 5. ¿Y la IA?

La IA ya no es una herramienta separada.  
Está integrada en el proceso de escritura a través de Cursor, donde:
- Me ayuda a escribir y editar
- Me sugiere commits inteligentes
- Me ayuda a organizar el código y el contenido
- Me permite mantener un flujo de trabajo más natural

**La IA no es un copiloto, es parte del cockpit.**

---

## Esto podría cambiar mañana. Pero hoy funciona.

No es una infraestructura perfecta.  
Pero **me da independencia**, que es lo que más valoro.

Puedo cambiar Quartz si sale algo mejor.  
Puedo migrar los `.md` a otro sistema si hace falta.  
Pero mientras tanto, esto camina.

Y mientras camine, seguiré dejando huellas.

## Enlaces relacionados

- [[uso_de_ia]] - Pensar con IA: no soy más listo, pero me entiendo mejor
- [[uso_de_ia_2]] - Pensar con eco: lo que cambia cuando no pienso solo
- [[codexmental]] - El manual de mi IA coeditora personal
- [[mapa_mental]] - Cómo organizo mis pensamientos
- [[declaracion_de_intenciones]] - Por qué decidí archivar mi mente
