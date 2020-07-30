---
title: Usando mapas de LeafletJS en React
date: "2020-06-14"
tags:
  - React
  - Parcel
  - LeafletJS
ogImage: "./mapas-leafletjs-en-react.jpg"
description: "Usando mapas de LeafletJS con React"
---

Siempre nos toca usar algún mapa, ya sea porque un cliente quiere indicar su dirección por el footer de la página o 
porque necesitamos indicar direcciones por otra cosa.

Hoy vamos a ver cómo integrar mapas de [LeafletJS](https://leafletjs.com) usando el paquete [react-leaflet](https://react-leaflet.js.org).

Para comenzar, usaremos como base el proyecto de mi post anterior [Up and running con Parcel.js](/posts/up-and-running-con-parceljs/), con 
lo cual ya deberíamos tener nuestro proyecto preparado para desarrollo. Empecemos entonces por abrir el proyecto en nuestro editor
favorito e instalamos los paquetes que vamos a necesitar: 

- Con Yarn: <inline-code>yarn add leaflet react-leaflet</inline-code>
- Con NPM: <inline-code>npm i leaflet react-leaflet</inline-code>

Una vez que terminen de instalarse, ponemos a correr nuestro entorno de desarrollo con <inline-code>yarn start</inline-code> o <inline-code>npm start</inline-code> y abrimos el archivo 
principal de entrada de nuestro proyecto <inline-code>src/index.js</inline-code>, el cual tiene un componente simple que retorna solamente un header <inline-code>h1</inline-code>. 
Cambiemos eso usando la sintaxis más moderna de [React Fragments](https://reactjs.org/docs/fragments.html) para poder retornar más 
elementos dentro de nuestro componente:

```jsx
const App = () => {
  return (
    <>
      <h1>Hola desde React!!!</h1>
    </>
  )
}
```

Ahora vayamos a la documentación de <inline-code>react-leaflet</inline-code>, o mejor dicho, al **Getting started** donde en la sección **Examples** veremos 
un ejemplo de un _Simple Marker con Popup_, pero el código en el ejemplo usa clases de JS y nosotros estamos usando funciones 🤔 
Adaptemos ese código entonces a nuestras necesidades (yo vivo en Buenos Aires, Argentina, así que voy a usar esas coordenadas):

```jsx
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

const App = () => {
  const position = {
    lat: -34.6037,
    lng: -58.3816
  }
  return (
    <>
      <h1>Hola desde React!!!</h1>
      <Map center={position} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Este es un popup. <br /> Y escribo lo que quiero.
          </Popup>
        </Marker>
      </Map>
    </>
  )
}
```

Y ahora si grabamos nuestro archivo, vamos a ver que está todo roto 😵 eso en parte es por Parcel pero tranquis, que vamos a 
usar unos workarounds para los problemas que tenemos (a veces usar cosas _zero-config_ trae estas complicaciones, pero está 
bueno lograr que funcione jajaja 😛).

Si lo notaron, una cosa que falta, además de ver _tiles_ de los mapas volando, son los estilos. Así que vamos a agregar en los imports 
el CSS de leaflet y además es **necesario** que al <inline-code>Map</inline-code> le indiquemos una altura, en este caso podemos ponerle <inline-code>400px</inline-code>:

```jsx
//Agregamos el import
import 'leaflet/dist/leaflet.css'

//Indicamos altura del Map con inline styling por practicidad
<Map center={position} zoom={13} style={{height: '400px'}}>
```

Grabemos y vemos que debería funcionar nuestro mapa pero: dónde está el bendito <inline-code>Marker</inline-code>? Ahora es cuando usamos otro workaround, 
gracias gente de stackoverflow y los issues de Github! 🤣
Este es el workaround que encontré y me funcionó: importar de <inline-code>leaflet</inline-code> el Marker (al que vamos a darle un alias), icon y 
los íconos que se usan para los markers para luego configurar este Marker con todo esto que importamos (más algunos tamaños que 
indicaremos) y listo. Piensen que <inline-code>react-leaflet</inline-code> sería un wrapper sobre <inline-code>leaflet</inline-code>, así que si configuramos el Marker de "base", 
cuando lo use <inline-code>react-leaflet</inline-code> debería funcionar bien. **Bueno**, menos bla bla y más código:

```jsx
import { Marker as LeafletMarker, icon } from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

//Configuramos el icon a usar en Marker fuera de la función App
LeafletMarker.prototype.options.icon = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const App ...
```

Y ya deberías poder ver y jugar con el mapa! En la [documentación de <inline-code>react-leaflet</inline-code>](react-leaflet.js.org/docs/en/components) pueden 
encontrar props para pasarle al Map como para evitar que el usuario lo mueva (<inline-code>dragging={false}</inline-code>) y varias cosas más. Además les recomiendo 
visitar [esta página](https://leaflet-extras.github.io/leaflet-providers/preview/) para ver distintos tipos de mapas que pueden 
utilizar. Presten atención de copiar la URL en la prop <inline-code>url</inline-code> de su Map y la <inline-code>attribution</inline-code> para dar los créditos correspondientes a los 
proveedores de los mapas. **En algunos casos es posible que tengan que hacerse una cuenta y generar una API KEY y tengan que agregarla 
a la url donde diga authToken o algo por el estilo**. Les dejo por ejemplo cómo usar los mapas Stamen Watercolor y de paso ven cómo 
debería quedarles el archivo <inline-code>index.js</inline-code> en el siguiente código:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Marker as LeafletMarker, icon } from 'leaflet'

import 'leaflet/dist/leaflet.css'

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

LeafletMarker.prototype.options.icon = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
}); 


const App = () => {
  const position = {
    lat: -34.6037,
    lng: -58.3816
  }
  return (
    <>
      <h1>Hola desde React!!!</h1>
      <Map center={position} zoom={13} style={{height: '400px'}}>
        <TileLayer
          attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, 
          <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; 
          <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
        />
        <Marker position={position}>
          <Popup>
            Este es un popup. <br /> Y escribo lo que quiero.
          </Popup>
        </Marker>
      </Map>
    </>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
```

Listo! Ya deberían tener funcional el mapa y pueden jugar agregando/cambiando Markers, usando distintos mapas, alternando la posición 
inicial cambiando <inline-code>lat</inline-code> y <inline-code>lng</inline-code>, el <inline-code>zoom</inline-code> también, en fin... Que su imaginación vuele 😌🚀

Espero que les sirva y nos vemos en el próximo post!