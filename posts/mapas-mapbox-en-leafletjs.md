---
title: Usando mapas de Mapbox en LeafletJS
date: "2020-06-26"
tags:
  - React
  - Parcel
  - LeafletJS
  - Mapbox
ogImage: "./mapas-mapbox-en-leafletjs.png"
description: "Usando mapas de Mapbox en LeafletJS"
---

En el post anterior [Usando mapas de LeafletJS con react](/posts/mapas-leafletjs-en-react/) vimos cómo usar varios mapas de LeafletJS, hoy 
vamos a ver cómo usar mapas de Mapbox en LeafletJS, que hay que tener en cuenta un par de cosas.

Vamos a ver cómo usarlos con LeafletJS, porque en su momento al cambiar únicamente la URL al menos a mi no me funcionó 😛

Empecemos por crearnos una cuenta [en la página de Mapbox](https://www.mapbox.com) y luego en la parte de nuestra cuenta 
podemos ver nuestro Access token (también conocida como API KEY 😋). 

Veremos que para lograr usar los mapas de Mapbox no es necesario cambiar la **estructura** del código del anterior, 
solamente cambiar y agregar algunas props a nuestro componente Map:

```js
<Map center={position} zoom={13} style={{height: '400px'}}>
  <TileLayer
    url='https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=<API_KEY>'
    attribution='© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © 
      <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    tileSize={512}
    zoomOffset={-1}
  />
  <Marker position={position}>
    <Popup>
      Este es un popup. <br /> Y escribo lo que quiero.
    </Popup>
  </Marker>
</Map>
```

En la <inline-code>url</inline-code>, donde dice <inline-code><API\_KEY></inline-code> pongan su token de usuario, que les recomiendo que la guarden en una variable de entorno. 
Ven también que agregamos las atribuciones correspondientes y las props agregadas 
fueron <inline-code>tileSize</inline-code> y <inline-code>zoomOffset</inline-code>. <inline-code>tileSize</inline-code> es para indicar el tamaño de _mosaicos_ de mapas que queremos cargar, en mi caso utilicé de 512x512 
pero pueden ser de 256x256. En el caso del <inline-code>zoomOffset</inline-code>, encontré que si no indicaba -1 en el valor, no eran legibles los nombres de las cosas (calles, 
estaciones, etc.)

Otra cosa que se puede cambiar en estos mapas son los tipos de mosaicos. Si ven en la URL, luego de <inline-code>/v1/mapbox/</inline-code> se indica tipo y versión de mosaicos a usar.

En la [documentación de Mapbox](https://docs.mapbox.com/api/maps/#styles) se indican otros, al momento de escribir este post estos son los que hay disponibles:

- <inline-code>/mapbox/streets-v11</inline-code>
- <inline-code>/mapbox/outdoors-v11</inline-code>
- <inline-code>/mapbox/light-v10</inline-code>
- <inline-code>/mapbox/dark-v10</inline-code>
- <inline-code>/mapbox/satellite-v9</inline-code>
- <inline-code>/mapbox/satellite-streets-v11</inline-code>

Este post fue más cortito pero me pareció interesante mostrar que existen otras integraciones con LeafletJS, y encima los mapas de Mapbox están 
muy buenos.

En el próximo usamos Mapbox con un componente que aprovecha el GPU del dispositivo para renderizado, con WebGL. Stay tuned! 📺