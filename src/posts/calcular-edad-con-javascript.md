---
title: Calcular edad con Javascript
date: '2018-09-27'
tags:
  - javascript
  - js
---
Bueno, para arrancar posteando una problemática no tan compleja y tratar de agarrarle la mano a esto del blog, vamos a ver cómo calcular una edad con una función escrita en Javascript. Quizás le sirve a alguien más cuando se lo pidan para algún TP de la facu jaja

Como habrán visto en el about de este blog, mi edad cambió ayer ya que fue mi cumple (no Agustín, nadie anda mirando el about a ver si cambia el numerito 🤣) y eso lo hice con la siguiente función:

```javascript
function getEdad(dateString) {
  var hoy = new Date();
  var fechaNacimiento = new Date(dateString);
  var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  var diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
  if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  return edad;
}
```

Esta función se encuentra en el archivo [about.js](https://github.com/agustinmulet/agustinmuletblog/blob/master/src/pages/about.js) del código fuente de mi blog, vamos a analizarla de a poco

Podemos ver en la primer línea que la función `getEdad` va a recibir una fecha en formato String en el parámetro `dateString`, la cual luego debemos convertir al tipo de dato [Date](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date) (<- Es un link directo a Mozilla para que lo estudien 🤓) para poder utilizar las funciones y las bondades que tiene el tipo de dato Date. También nos guardamos en `hoy` la fecha del momento en que se corre el script para tener una referencia y poder realizar el cálculo

```javascript
function getEdad(dateString) {
  var hoy = new Date();
  var fechaNacimiento = new Date(dateString);
/* [...] */
```

Listo, ahora resta obtener los años, el de ahora (2018) y el de mi nacimiento (1986) y ya está, tenemos mi edad! Para esto usamos las bondades del tipo de dato Date (es un objeto en realidad, TODO en JS es un objeto) y su método `getFullYear()`

```javascript
/* [...] */
var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
/* [...] */
```

Veamos, eso lo digo ahora 27 de septiembre, yo cumplí el 26, pero si hago el mismo cálculo el 15 de julio por ejemplo? La cuenta me da 32 también 🤔

Entonces deberíamos pensar cómo hacer con los meses, la idea es hacer lo mismo que con los años, sacar la diferencia. Pero si estamos en el mismo mes? Ahí ya hay que chequear los días, vamos a ver eso en las siguientes líneas:
```javascript
/* [...] */
  var diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
  if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
/* [...] */
```
Bueno, ese if puede ser un poco complicado, vamos a analizar de a partes la lógica:
- Con `diferenciaMeses < 0` chequeamos si estamos en algún mes anterior al pasado por parámetro. Faltaría ver el tema de los días, eso lo vemos en la otra parte de la condición de nuestro `if` con el operador OR `||` (si alguna de las condiciones se cumple, ingresamos)
- `(diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())` Acá puede complicarse un poco más la cosa, nos fijamos si el mes actual es el mismo que el que recibimos por parámetro pero chequeamos además con el operador AND `&&` si el día que recibimos por parámetro es mayor que el día actual, usando el método `getDate()` y comparando

Si alguna de las dos condiciones se cumple, deberíamos restar un año, ya que se cumpliría que estamos posicionados antes de la fecha de cumpleaños de esa persona. Esto lo hacemos dentro del `if` al hacer `edad--` y retornamos ese dato para poder luego guardarlo en alguna variable con `return edad`

```javascript
/* [...] */
  if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  return edad;
}
```
En mi blog esto lo guardamos en el `state` del about para luego mostrarlo:
```javascript
  this.state = {
    edad: getEdad('1986/09/26 11:30:00'),
  };
```

Y recién ahora me doy cuenta que usé hasta el horario aproximado de mi nacimiento, cosa que a la función ni le interesa saber porque no lo usa 😂

Bueno, espero que les haya servido la explicación, y de paso tienen una función para ir entendiendo algunas cosas de Javascript y poder resolver problemas de la facu, o simplemente para mostrarle a sus amig@s que pueden calcular edades con un script compacto (y que se podría hacer aún más compacto). Cualquier duda que tengan me pueden escribir comentarios, si les gustó la explicación y/o qué se puede mejorar, dentro de poco empiezo a escrbir tutoriales para que puedan hacerse su propio blog en Gatsby como el mío

Saludos!
