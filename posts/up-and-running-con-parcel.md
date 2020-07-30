---
title: Up and running con Parcel
date: "2020-06-06"
tags:
  - React
  - Parcel
ogImage: "./up-and-running-con-parcel.png"
description: "Cómo levantar un entorno de trabajo súper rápido!"
---

Cómo levantamos un entorno de trabajo si queremos trabajar con React? Usando [create-react-app](https://github.com/facebookincubator/create-react-app), no? Pero no les pasa que últimamente tarda cada vez más en instalar todas las dependencias? O que trae conflictos de versiones si lo tenés instalado de forma global en tu compu? Hoy vamos a ver [Parcel](https://parceljs.org/)

⚠ Disclaimer: Con este post no quiero dar a entender que Parcel sea **mejor** que CRA, sino que es una **alternativa**.

Habiendo aclarado eso, a diferencia de [create-react-app](https://github.com/facebookincubator/create-react-app), que viene con Webpack 
como bundler, [Parcel](https://parceljs.org/) nos ofrece una alternativa como bundler <inline-code>zero configuration</inline-code> (sin configuración alguna). 
Lo cual trae sus pros y sus contras, pero está muy bueno para empezar un proyecto rápido o para esas veces que queremos probar una cosa 
chiquita en React que nos quedó picando el cerebro. Usando <inline-code>Parcel</inline-code>, podemos tener nuestro componente _root_ montado en el DOM en unos 
pocos minutos, veamos cómo:

Primero creamos una carpeta para nuestro proyecto y lo inicializamos para poder instalar Parcel

- En Windows: <inline-code>mkdir miproyecto</inline-code> -> <inline-code>cd miproyecto</inline-code> -> <inline-code>yarn init -y</inline-code> / <inline-code>npm init -y</inline-code>
- En Mac o Linux: <inline-code>take miproyecto</inline-code> -> <inline-code>yarn init -y</inline-code> / <inline-code>npm init -y</inline-code>

Luego instalamos Parcel como dependencia de desarrollo:

- Con Yarn: <inline-code>yarn add -D parcel-bundler</inline-code>
- Con NPM: <inline-code>npm i --save-dev parcel-bundler</inline-code>

Y ahora creamos una carpeta <inline-code>/src</inline-code> para nuestros archivos de desarrollo, y adentro un archivo <inline-code>index.html</inline-code> y otro <inline-code>index.js</inline-code>.
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

Lo primero que vamos a hacer es escribir en nuestro <inline-code>package.json</inline-code> lo que queremos que corra cuando 
hacemos <inline-code>yarn start</inline-code> / <inline-code>npm start</inline-code>, sumemos también el comando para generar los archivos listos para hacer deploy en producción:

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

Guardamos nuestro archivo y ya podemos correr nuestro proyecto con <inline-code>yarn start</inline-code> / <inline-code>npm start</inline-code>, el cual va a levantar nuestro 
proyecto en http://localhost:1234 aunque si entramos, no vamos a ver nada.

Llenemos entonces nuestro archivo HTML con lo justo y necesario, poniéndole un id al elemento donde vamos a montar nuestra app de React
e incluyendo el script <inline-code>index.js</inline-code> que creamos antes:

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

      <script src="index.js"></script>
  </body>
</html>
```

Guardamos los cambios, esperamos a que Parcel haga el build y seguramente tengamos que refrescar la pestaña donde tengamos 
abierta nuestra app. Una vez que refresquemos con <kbd>F5</kbd> veremos nuestro HTML que nos saluda con el mensajito: 
<inline-code>Hola desde HTML</inline-code>.

Ahora vamos a usar un poco la magia ✨ de Parcel. Con nuestro servidor de desarrollo aún corriendo y nuestra app abierta 
en una pestaña, vamos a nuestro archivo <inline-code>index.js</inline-code> para empezar a usar React (Pero cómo? Si todavía no lo instalamos?!?!) 😏

Empecemos por importar React en nuestro proyecto, abrimos <inline-code>index.js</inline-code> y tipeamos lo siguiente:

```js
import React from 'react'
```

Guardamos nuestro archivo y si prestamos atención a la consola donde tenemos corriendo el servidor, Parcel NOS BAJA 
AUTOMATICAMENTE EL PAQUETE React SIN TENER QUE HACER <inline-code>npm install</inline-code> O <inline-code>yarn add</inline-code>. Yo les dije, **magia** 😉
Bueno, el próximo paquete que necesitamos es <inline-code>react-dom</inline-code> para poder montar nuestra app, hagamos lo mismo e importémosla:

```js
import React from 'react'
import ReactDOM from 'react-dom'
```

Otra vez guardamos y ya Parcel se encarga de bajar el paquete en segundo plano, ahora tenemos que definir el componente _root_ o 
raíz de nuestra app y usando la función <inline-code>render()</inline-code> de ReactDOM, indicamos qué componente queremos montar en qué elemento del DOM:

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

Creemos entonces un archivo con nombre <inline-code>.gitignore</inline-code> (sí, tiene un punto al principio) en la raíz de nuestro proyecto, debería 
quedar a la misma altura que el <inline-code>package.json</inline-code> y adentro del archivo escribimos lo siguiente:

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