---
title: Peticiones HTTP desde VSCode con REST Client
date: "2021-04-09"
tags:
  - VS Code
ogImage: "./peticiones-http-desde-vscode-con-rest-client.jpg"
description: "Haciendo peticiones HTTP sin salir de VSCode con REST Client"
---

Qué usan para hacer peticiones y probar endpoints? Veamos algunas opciones para esto:

- [Postman](https://www.postman.com): Es uno de los más populares, hay que instalarlo como programa aparte y a mi parecer es muy pesado. Soporta peticiones para APIs REST, GraphQL y SOAP. Tuve malas experiencias queriendo editar el JSON de configuración (muy lento) así que no lo recomiendo mucho. Es gratis para hasta 3 miembros de un equipo.
- [Insomnia](https://insomnia.rest): Una buena alternativa, bastante completa, también se instala como programa aparte y es menos pesado que Postman. Soporta peticiones para APIs REST, GraphQL, SOAP y gRPC. Lo usé poco cuando quise migrar de Postman pero la parte de Oauth 2.0 se me complicó y terminé desistiendo. Es gratis para uso personal.
- [Hoppscotch](https://hoppscotch.io): (Ex Postwoman) Ganó bastantes adeptos y creo que parte de su encanto es que no hay que instalar nada, puede usarse desde la web y consultar endpoints en nuestro entorno local. Soporta peticiones para APIs REST, GraphQL y WebSockets. Gratis y libre.

Pero en este post voy a enfocarme en otra alternativa para hacer peticiones HTTP simples a APIs REST sin tener que salir de VS Code, y algo que me parece muy bueno es que quedan los endpoints en un archivo que es fácilmente compartible con compañeros de equipo 😁 (los de la lista de arriba también soportan importar y exportar también, pero me gusta la simplicidad de compartir un archivo que hasta podría tenerse en un repo)
La alternativa de la que hablo es una extensión llamada [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) y, luego de instalarla, debemos crear un archivo con extensión <inline-code>.rest</inline-code> o <inline-code>.http</inline-code>. Un tip que me parece útil, se pueden crear un archivo por cada Entidad o Modelo de su proyecto para que quede todo más ordenado, por ejemplo un archivo <inline-code>Users.rest</inline-code>, otro <inline-code>Products.rest</inline-code>. (Como dije antes, pueden ser con extensión _.http_)

Ahora, hay algunas cosas fundamentales a tener en cuenta antes de empezar a generar y hacer nuestras peticiones, si ya te instalaste la extensión, podés crear el archivo, si no lo hiciste todavía, no sé qué estás esperando 😜
Hagamos primero un GET a la API de Rick and Morty, para ver cómo funciona y luego analizamos una petición un poco más compleja:

```
GET https://rickandmortyapi.com/api/character
```

Vamos a ver que nos aparece arriba de nuestro texto un <inline-code>Send Request</inline-code> al que podemos hacer click y vamos a ver en una ventana nueva el resultado de nuestra petición. Está bueno, no? 😉

Ahora vamos a ver la anatomía de una petición un poco más completa:

```
# POST User by id

POST http://localhost:5000/api/users/9428b6ef-9d37-4ed1-9caa-a622f3cfe74b HTTP/1.1
Content-Type: application/json
Authorization: Bearer -JWT token-

{
  "name": "Agustin Mulet",
  "email": "agustin.mulet@gmail.com"
}

###
```

Empecemos a analizar por partes cada línea:
- <inline-code># POST User by id</inline-code> Con el _hashtag_ (o doble barra <inline-code>//</inline-code>) podemos escribir comentarios, es descriptivo para nosotros programadores así que pueden escribir lo que quieran u obviarlo.
- <inline-code>POST htt<span>p://localho</span>st:5000/api/users/9428b6ef-9d37-4ed1-9caa-a622f3cfe74b HTTP/1.1</inline-code> Esta línea va a indicar, primero el [método HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Methods) de nuestra petición, luego la URL del endpoint al que queremos apuntar y por último el protocolo a utilizar (podemos obviarlo y va a utilizar HTTP/1.1 por defecto).
- <inline-code>Content-Type: application/json</inline-code> y <inline-code>Authorization: Bearer -JWT token-</inline-code> Corresponden a los [headers](https://developer.mozilla.org/es/docs/Web/HTTP/Headers) que vamos a enviar en nuestra petición, en donde dice *-JWT token-* debería ir el token de autenticación.
- <inline-code>{ "name": "Agustin Mulet", "email": "agustin.mulet@gmail.com" }</inline-code> Luego, dejando un espacio después de los headers, tenemos el *body* en formato JSON. Esto sería en el caso en el que necesitemos enviar data al backend en nuestra petición (con un POST, PUT, DELETE, etc.)
- <inline-code>###</inline-code> es para dividir las peticiones, si es la primera del archivo no es necesario, pero siempre recuerden ponerla entre petición y petición.

_Muy lindo todo Agustin pero los tokens tienen 8957345 caracteres, voy a tener que estar copiando y pegando todo el tiempo?_

No! Por suerte nuestro amigo [Huachao Mao](https://github.com/Huachao) (el creador de la extensión) nos permite usar variables en nuestros archivos, y hay diferentes tipos y formas de usarlas, con autocomplete y todo!

La forma más simple de utilizar las variables es, en el comienzo de nuestro archivo declararlas con una arroba al comienzo de su nombre. Estas serían variables de archivo.
Veamos un ejemplo:

```
@baseURL = https://rickandmortyapi.com/api

###

GET {{baseURL}}/character HTTP/1.1
```

Y así es como ya empezamos a tener dinamismo y podemos, por ejemplo, tener variables <inline-code>@devURL</inline-code> y <inline-code>@prodURL</inline-code> y si queremos probar endpoints en distintos ambientes, solamente cambiamos el uso de la variable entre dos llaves (tengan cuidado con probar cosas en prod 😝)

Pero qué pasa si tenemos distintos archivos y necesitamos compartir variables? Hay diferentes maneras de resolver esto, una es declarar en un archivo de variables de entorno <inline-code>.env</inline-code> por ejemplo y definimos ahí nuestra variable:

```
baseURL = https://rickandmortyapi.com/api
```

Luego para utilizar esta variable tenemos que anteponer al nombre de nuestra variable de entorno como palabra clave <inline-code>$dotenv</inline-code>, y su uso quedaría así:

```
GET {{$dotenv baseURL}}/character HTTP/1.1
```

Me parece una forma simple pero hay otras que pueden ser hasta mejores (usando <inline-code>$processEnv</inline-code> por ejemplo) pero para eso pueden ver la [docu de la extensión](https://github.com/Huachao/vscode-restclient) que pueden aprender mucho más, como por ejemplo generar un token al hacer un login y guardarlo en una variable (ver [Request Variables](https://github.com/Huachao/vscode-restclient#request-variables)).

Espero que se animen a probarla y si conocen alguna otra alternativa o saben que algo de lo que digo en el post se puede hacer mejor, escriban en los comentarios!

Nos vemos en el próximo post! 😁