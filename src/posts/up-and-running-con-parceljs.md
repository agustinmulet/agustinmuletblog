---
title: Up and running con Parcel.js
date: "2020-06-06"
tags:
  - react
  - parceljs
ogImage: "./up-and-running-con-parceljs.jpg"
description: "Cómo levantar un entorno de trabajo súper rápido!"
---

Cómo levantamos un entorno de trabajo si queremos trabajar con React? Usando [create-react-app](https://github.com/facebookincubator/create-react-app), no? Pero no les pasa que últimamente tarda cada vez más en instalar todas las dependencias? O que trae conflictos de versiones si lo tenés instalado de forma global en tu compu? Hoy vamos a ver [Parcel.js](https://parceljs.org/)<!-- end -->

⚠ Disclaimer: Con este post no quiero dar a entender que Parcel sea **mejor** que CRA, sino que es una **alternativa**.

Habiendo aclarado eso, a diferencia de [create-react-app](https://github.com/facebookincubator/create-react-app), que viene con Webpack 
como bundler, [Parcel.js](https://parceljs.org/) nos ofrece una alternativa como bundler `zero configuration` (sin configuración alguna). 
Lo cual trae sus pros y sus contras, pero está muy bueno para empezar un proyecto rápido o para esas veces que queremos probar una cosa 
chiquita en React que nos quedó picando el cerebro. Usando `Parcel`, podemos tener nuestro componente _root_ montado en el DOM en unos 
pocos minutos, veamos cómo:

Primero creamos una carpeta para nuestro proyecto y lo inicializamos para poder instalar Parcel

- En Windows: `mkdir miproyecto` -> `cd miproyecto` -> `yarn init -y` / `npm init -y`
- En Mac o Linux: `take miproyecto` -> `yarn init -y` / `npm init -y`

Luego instalamos Parcel como dependencia de desarrollo:

- Con Yarn: `yarn add -D parcel-bundler`
- Con NPM: `npm i --save-dev parcel-bundler`

Y ahora creamos una carpeta `/src` para nuestros archivos de desarrollo, y adentro un archivo `index.html` y otro `index.js`. 
Nuestro proyecto debería quedar así:

```md
miproyecto/
├── node_modules/
│   └── ∞
├── src/
│   ├── index.html
│   └── index.js
├── package.json
└── yarn.lock o package-lock.json
```

Y les prometo que ya no tenemos que crear ningún archivo más 😱 me creen? Bueno, igual si no me creen, sigamos 🤣

Lo primero que vamos a hacer es escribir en nuestro `package.json` lo que queremos que corra cuando 
hacemos `yarn start` / `npm start`, sumemos también el comando para generar los archivos listos para hacer deploy en producción:

```js
// En package.json
{
  // Agregamos scripts si no lo tenemos, a la altura de name, version, etc.
  "scripts": {
    "start": "parcel src/index.html",
    "build": "parcel build src/index.html"
  }
}
```

Guardamos nuestro archivo y ya podemos correr nuestro proyecto con `yarn start` / `npm start`, el cual va a levantar nuestro 
proyecto en http://localhost:1234 aunque si entramos, no vamos a ver nada.

Llenemos entonces nuestro archivo HTML con lo justo y necesario, poniéndole un id al elemento donde vamos a montar nuestra app de React
e incluyendo el script `index.js` que creamos antes:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root">
        Hola desde HTML
    </div>

    <script src="js/index.js"></script>
</body>
</html>
```

Guardamos los cambios, esperamos a que Parcel haga el build y seguramente tengamos que refrescar la pestaña donde tengamos 
abierta nuestra app. Una vez que refresquemos con <kbd>F5</kbd> veremos nuestro HTML que nos saluda con el mensajito: 
`Hola desde HTML`.

Ahora vamos a usar un poco la magia ✨ de Parcel. Con nuestro servidor de desarrollo aún corriendo y nuestra app abierta 
en una pestaña, vamos a nuestro archivo `index.js` para empezar a usar React (Pero cómo? Si todavía no lo instalamos?!?!) 😏

Empecemos por importar React en nuestro proyecto, abrimos `index.js` y tipeamos lo siguiente:

```js
import React from 'react'
```

Guardamos nuestro archivo y si prestamos atención a la consola donde tenemos corriendo el servidor, Parcel NOS BAJA 
AUTOMATICAMENTE EL PAQUETE React SIN TENER QUE HACER `npm install` O `yarn add`. Yo les dije, **magia** 😉
Bueno, el próximo paquete que necesitamos es `react-dom` para poder montar nuestra app, hagamos lo mismo e importémosla:

```js
import React from 'react'
import ReactDOM from 'react-dom'
```

Otra vez guardamos y ya Parcel se encarga de bajar el paquete en segundo plano, ahora tenemos que definir el componente _root_ o 
raíz de nuestra app y usando la función `render()` de ReactDOM, indicamos qué componente queremos montar en qué elemento del DOM:

```js
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => <h1>Hola desde React!!!</h1>

ReactDOM.render(<App/>, document.getElementById('root'))
```

Guardamos nuestro archivo y se debería refrescar automáticamente nuestra app y vemos cómo nos saluda nuestro componente de React 
montado en el DOM de nuestro HTML 😁

### Update: Agregar archivo .gitignore

Olvidé decir que es importante crear este archivo para indicar qué archivos o carpetas queremos ignorar al 
subir nuestro proyecto a [Github](https://github.com), [Bitbucket](https://bitbucket.org), [Gitlab](http://www.gitlab.com/), o lo que 
usen para sus repositorios en Git.

Creemos entonces un archivo con nombre `.gitignore` (sí, tiene un punto al principio) en la raíz de nuestro proyecto, debería 
quedar a la misma altura que el `package.json` y adentro del archivo escribimos lo siguiente:

```md
#Carpetas con dependencias
node_modules/

#Carpetas generadas por Parcel
.cache/
dist/

#Variables de entorno
.env

#Carpeta con configuracions de VSCode
.vscode/
```

Y sumen archivos o carpetas que crean necesarios, las líneas que comienzan con # indica que son comentarios 😀

Desde que aprendí esta forma de hacer un proyecto nuevo en el curso de Brian Holt [Complete intro to React](https://btholt.github.io/complete-intro-to-react-v5/), es la forma en la que empiezo proyectos nuevos, pruebo cosas o enseño cosas de React. Espero que les sirva para la próxima que tengan que probar algo ya que me parece que es súper útil y rápido.

Nos vemos en el próximo post!