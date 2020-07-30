---
title: Usando mapas de Mapbox en React
date: "2020-06-27"
tags:
  - React
  - Parcel
  - Mapbox
ogImage: "./mapas-mapbox-en-react.jpg"
description: "Usando mapas de Mapbox con React"
---

Muchos posts sobre mapas, pero ahora vamos a ver cómo usar mapas de Mapbox con un componente que puede aprovechar cosas como el GPU
del dispositivo donde se esté visualizando nuestro mapa.

Estos mismos mapas se pueden usar con un paquete hecho por el equipo de Uber: [react-map-gl](https://visgl.github.io/react-map-gl/)

Empecemos por crearnos una cuenta [en la página de Mapbox](https://www.mapbox.com) y luego en la parte de nuestra cuenta 
podemos ver nuestro Access token para poder utilizar los mapas.

Si quieren arrancar desde cero pueden seguir los pasos de mi post [Up and running con ParcelJS](/posts/up-and-running-con-parceljs/), o sino 
cree [un repo en Github](https://github.com/agustinmulet/minimal-parcel-react) con los pasos del post ya realizados 😁

Una vez que tengamos el proyecto base preparado, podemos usar la magia ✨ de ParcelJS y hacer el <inline-code>import MapGL from 'react-map-gl'</inline-code> al principio 
de nuestro archivo y guardar (siempre y cuando tengamos nuestro servidor de desarrollo corriendo), o podemos frenar el servidor de desarrollo si es que 
lo tenemos corriendo e instalamos el paquete <inline-code>react-map-gl</inline-code>:

- Con Yarn: <inline-code>yarn add react-map-gl</inline-code>
- Con NPM: <inline-code>npm i react-map-gl</inline-code>

Y volvemos a levantar el servidor con <inline-code>yarn start</inline-code> o <inline-code>npm start</inline-code>.

Una vez hecho eso, tengamos nuestro Access token preferentemente guardado en una variable de entorno <inline-code>MAPBOX\_TOKEN</inline-code>, para eso creamos en la raíz de nuestro 
proyecto un archivo que se llame <inline-code>.env</inline-code> y dentro ponemos lo siguiente: 

```js
MAPBOX_TOKEN=pk.eyJ1IjoiYWd1c3Rpbm11bGV0IiwiYSI6ImNrOW9reHF0ZXXXXXXXXXXXXXXXXXXXXXXXXX
```

Obviamente con un token **real**. Luego en el frontend podemos acceder a este valor usando <inline-code>process.env.MAPBOX\_TOKEN</inline-code>, aunque al momento de usarlo si ven que 
no lo toma, no desesperen: frenen y vuelvan a correr el servidor de desarrollo y si eso no les funciona, **borren la carpeta <inline-code>.cache</inline-code>** y vuelvan a levantar el servidor.

Ahora vamos a nuestro front a usar nuestro paquete recién instalado, que acepta algunas props:

```js
  <MapGL
    {...viewport}
    width="100vw"
    height="50vh"
    mapStyle="mapbox://styles/mapbox/dark-v10"
    onViewportChange={nextViewport => setViewport(nextViewport)}
    mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
  />
```

Mmmm pero qué es ese viewport y onViewportChange? 🤔 viewport son los valores que debería tener como inicial nuestro mapa (latitud, longitud, etc.) y onViewportChange 
es lo que nos permite ir moviéndonos en el mapa, lo que nos da a entender que necesitamos usar State en nuestro componente, ya que tenemos unas variables que van a 
ir cambiando con el tiempo, importemos entonces <inline-code>useState</inline-code> y creemos el viewport (yo lo voy a crear con las coordenadas de Buenos Aires, Argentina, ya que 
ahí es donde vivo):

```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MapGL from 'react-map-gl';

const App = () => {
  const [viewport, setViewport] = useState({
    latitude: -34.6037,
    longitude: -58.3816,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });
    
  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="50vh"
      mapStyle="mapbox://styles/mapbox/dark-v10"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
    />
  );
}

ReactDOM.render(<App/>, document.getElementById('root'))
```

Y con eso debería func-... Cómo que no funciona? <inline-code>\_typeof</inline-code> qué? Que falta un archivo CSS? 😭😭😭😭

En el post de ParcelJS les dije que las soluciones "zero configuration" pueden traer algunas contras o complicaciones, así que vamos a ir tacleando estos dos problemas:

### Falta un archivo CSS 

Este archivo lo podemos encontrar en la carpeta <inline-code>node_modules</inline-code> dentro del paquete <inline-code>mapbox-gl</inline-code>, que es una dependencia del que instalamos antes. 
Para importarlo, debemos agregar <inline-code>import 'mapbox-gl/dist/mapbox-gl.css</inline-code> junto a nuestros imports.

### Error _typeof is not defined

Este error me trajo muchos dolores de cabeza a mí y a muchas otras personas más, estuve recorriendo muchos issues de github hasta que encontré [este issue](https://github.com/facebook/create-react-app/issues/5277)
de Dan Abramov diciendo que hay que desactivar el <inline-code>plugin-transform-typeof-symbol</inline-code> porque básicamente _secuestra_ los <inline-code>typeof</inline-code> del código y los cambia por otro.
Ahora, cómo podemos desactivarlo? Para eso encontré que en ParcelJS se puede instalar y configurar [Babel 7](https://babeljs.io/docs/en/v7-migration#babel-preset-env) 
para usar <inline-code>loose</inline-code> mode con el <inline-code>babel-preset-env</inline-code>. No me expliqué muy bien pero creo que se va a entender mejor si ponemos manos a la obra:

Instalemos Babel como dependencia de desarrollo en nuestro proyecto:

- Con Yarn: <inline-code>yarn add -D @babel/core @babel/cli</inline-code>
- Con NPM: <inline-code>npm i --save-dev @babel/core @babel/cli</inline-code>

Y ahora creemos un archivo en la raíz de nuestro proyecto que se llame <inline-code>.babelrc</inline-code>, con la siguiente configuración:

```md
{
  "presets": [
    [
      "@babel/env", 
      {
        "loose": true,
        "targets": {
          "browsers": [
          ">2%",
          "last 1 Edge version",
          "last 2 Safari version",
          "last 1 Firefox version"
          ]
        },
      }
    ]
  ]
}
```

Qué estamos haciendo en este archivo? Configurando <inline-code>babel-preset-env</inline-code> para usar el modo <inline-code>loose</inline-code> y evitar que el plugin <inline-code>transform-typeof-symbol</inline-code> corra. Con 
<inline-code>targets</inline-code> indicamos sobre qué navegadores queremos que suceda esto, pero eso queda para otra historia. Espero igual que se haya entendido mejor la explicación de antes.

Ahora corremos nuestro proyecto (tarda un poco más ya que tiene que crear todo con la config nueva) y deberíamos tener nuestro mapa funcionando correctamente 😀

No sé si notaron pero hay una prop que es <inline-code>mapStyle</inline-code>, lo que indica que podemos cambiar los estilos de nuestro mapa, pueden cambiarlos por cualquiera de los que 
están [acá en la documentación de Mapbox](https://docs.mapbox.com/api/maps/?q=marker&size=n_10_n#styles).

Invito a que investiguen qué se puede hacer con <inline-code>react-map-gl</inline-code>, poner [Markers](https://visgl.github.io/react-map-gl/docs/api-reference/marker) creo que es más fácil que 
con LeafletJS y pueden también ver la [parte de Ejemplos](https://visgl.github.io/react-map-gl/examples) donde se hace uso de los Layers y se aprovecha el GPU.

Espero que todo esto les sirva y que los mapas no les hagan doler la cabeza como a mí, nos vemos en el próximo post!