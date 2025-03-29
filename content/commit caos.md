---
title: "Romper la herramienta para entenderla"
description: "La historia de cómo casi hago explotar un generador de commits por intentar que hablara como yo"
category: núcleo
tags: [git, personalización, AI, commits, aprendizaje, errores, exploración]
created: 2025-03-27
dg-publish: true
---

# Romper la herramienta para entenderla

Intenté montar mi propio generador de commits con IA. No porque necesitara automatizar nada, sino porque me gustaba la idea de que **incluso los mensajes de commit** tuvieran coherencia con la voz del blog. Quería que sonaran como yo, que llevaran el mismo tono: claro, irónico, directo.

Y claro, cuando uno quiere que una herramienta haga algo que no fue diseñada para hacer, lo primero que hace… es romperla.

---

## El síndrome del prompt perfecto

Lo primero que descubrí es que la mayoría de herramientas de este tipo están pensadas para ser prácticas, no filosóficas. Dan commits correctos, pero impersonales. Y yo no quería eso. Yo quería que dijera:

> chore: reorganizado el núcleo del blog y reafirmada identidad narrativa

Y no:

> This commit fixes some stuff. ✅

Así que empecé a meterle prompts cada vez más complejos. Que no diga "got it". Que no empiece con fórmulas vacías. Que tenga personalidad. Que entienda lo que he hecho aunque sea un simple `mv index.md Inicio.md`.

¿El resultado? Una IA que respondía:

> What are the top 3 songs of Taylor Swift in 2025?

Touché.

---

## La paranoia del `.env` y los scripts mágicos

Para que todo esto funcionara, tenía que darle a la IA mi API key de OpenAI. Pero claro, **no la iba a meter en un script `.sh` bajado de un repo en chino que se ejecuta con `curl | bash` sin saber lo que hace**. Una cosa es experimentar, otra es entregarse al caos.

Tuve que aprender cómo funcionan las variables de entorno, cómo ocultarlas con `.gitignore`, cómo configurar `config.js` para no romperlo todo… y luego entender por qué seguía sin funcionar a pesar de todo eso.

---

## Personalizar hasta que deja de servir

Me fui calentando. Modifiqué el `prompt`, reescribí la estructura interna, añadí filtros para detectar respuestas genéricas, creé formatos personalizados de template para commits… hasta que en algún punto, el programa dejó de hacer commits. Literal.

La IA, al no saber cómo interpretar tanta indicación, se bloqueaba. Respondía con cosas como:

> Sure, how can I help?

Y ahí entendí que **hay un equilibrio entre hacer algo personal y volverlo inútil**. Como afinar tanto un instrumento que ya no suena.

---

## A veces rendirse es una forma de avanzar

Después de horas toqueteando, parcheando, reiniciando, limpiando ramas, versionando diffs y metiendo todo en `debug`, terminé diciendo:

> Mañana, con más tiempo, lo intento de nuevo desde un fork limpio.

No lo viví como una derrota. Lo viví como parte del proceso. Me llevé el aprendizaje, la risa, la frustración… y algo más importante:

> **La idea de que los commits también pueden contar una historia.**

Y eso no me lo quita ningún fallback.

---

### Epílogo: ¿Por qué escribir esto?

Porque *romper herramientas para entenderlas* es también una forma de pensar. Porque este blog es tan técnico como emocional. Y porque cada fallo tiene su propia narrativa si decides contarla.

```bash
chore: explorado hasta el límite el poder de personalizar y fallar con estilo
```