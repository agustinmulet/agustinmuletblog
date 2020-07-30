---
title: Usando componentes custom en Markdown con Gatsby
date: "2020-07-29"
tags:
  - Gatsby
ogImage: "./componentes-custom-markdown-gatsby.jpg"
description: "Cómo usar un componente personalizado en Gatsby con Markdown"
---

Hoy vamos con un tema quizás bastante específico pero que me gustó mucho haberlo encontrado mientras buscaba otro 
plugin que nada que ver con lo que voy a escribir hoy: crear componentes personalizados y utilizarlos en 
un blog como este (o como el que pueden hacerse si hacen el [workshop que cree yo](https://gatsby-workshop.netlify.app) 😉). Este sería un ejemplo de componente personalizado, un simple cara 😁 o cruz 😛:

<cara-o-cruz></cara-o-cruz>

En un principio siempre creí que **sí o sí** se necesitaba usar [MDX](https://mdxjs.com/) para usar componentes personalizados con Markdown pero usarlo me trajo muchas complicaciones con Gatsby y muchos dolores de cabeza, algo siempre fallaba al querer meter componentes en mis archivos <inline-code>.mdx</inline-code>. Pero casualmente me crucé con [este plugin](https://www.gatsbyjs.org/packages/gatsby-remark-component/), el cual me mandó a [este post](https://using-remark.gatsbyjs.org/custom-components/) donde básicamente se explica todo lo que voy a explicar acá, pero sin mis agregados jajaja.

Lo que indica ese post es que usando el paquete [<inline-code>rehype-react</inline-code>](https://github.com/rehypejs/rehype-react) podemos manipular el html generado de nuestros archivos Markdown y cambiar elementos nativos de HTML por otros (como yo hago en este blog con los componentes de [chakra-ui](https://chakra-ui.com), una lib de componentes que se las recomiendo mucho) o sino pueden directamente hacer componentes personalizados propios de ustedes. Presten atención en su <inline-code>package.json</inline-code> que tienen que tener como mínimo la versión **1.7.31** del plugin <inline-code>gatsby-transformer-remark</inline-code>.

Empecemos entonces instalando <inline-code>rehype-react</inline-code>:

- Con Yarn: <inline-code>yarn add rehype-react</inline-code>
- Con NPM: <inline-code>npm i rehype-react</inline-code>

Una vez instalado, tenemos que hacer algunos cambios en el template que usamos para mostrar cada post individualmente, en mi workshop sería el archivo <inline-code>/templates/blog-post.js</inline-code>. Lo primero que debemos hacer es modificar la query de GraphQL y en vez de traernos el <inline-code>html</inline-code> debemos traer otra data llamada <inline-code>htmlAst</inline-code>, debería quedarnos algo así:

```jsx
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
      }
    }
  }
`
```

Ahora que tenemos disponible ese campo en la data que recibe nuestro template, podemos empezar a usar <inline-code>rehype-react</inline-code>, lo importamos en el mismo componente y lo vamos a utilizar creando una instancia y pasándole un objeto con opciones, lo cual nos va a proporcionar una función a la que vamos a mandarle nuestro <inline-code>htmlAst</inline-code>:

```jsx
//Acá arriba deberían estar los demás imports
import rehypeReact from 'rehype-react'

const renderAst = new rehypeReact({
  createElement: React.createElement,
  Fragment: React.Fragment,
  components: {
    h1: NuevoH1,
    'componente-custom': MiComponente
  },
}).Compiler

//Acá abajo debería estar nuestro componente
```

Como vemos, <inline-code>rehype-react</inline-code> requiere que le pasemos el campo <inline-code>createElement</inline-code> al cual le pasamos como valor la función de React para crear elementos, también le estamos pasando un valor **opcional** que es <inline-code>Fragment</inline-code>, que es para evitar que genere un div nuevo que _wrappea_ nuestro HTML del post y luego un objeto <inline-code>components</inline-code> donde le indicamos qué tipo de elemento (propios de HTML o personalizados) queremos reemplazar y con qué. En este caso antes deberíamos definir estos componentes que estamos queriendo usar (_NuevoH1_ y _MiComponente_) para que no explote todo por los aires, pueden crear uno nuevo y exportarlo, traer uno de chakra-ui y meterlo sin modificaciones o también pueden utilizar <inline-code>styled-components</inline-code> que parece ser un buen fit para este caso.

En el caso de mi blog personal, si chequean el código en mi github pueden ver que creo un archivo nuevo y exporto un objeto components para quitar algunas líneas del template del blog post. Si están usando <inline-code>chakra-ui</inline-code> pueden hacer uso de las props creando los componentes así:

```jsx
const NuevoH1 = ({children}) => <Heading as="h1" size="lg" color="tomato">{children}</Heading>
```

Y luego para _MiComponente_ pueden hacer algún componente como el cara o cruz que hice al principio de este post. Dentro del markdown de su post pueden utilizarlo escribiendo <inline-code>\<componente-custom><\/componente-custom></inline-code> donde quieran utilizarlo.

Como último detalle nos falta utilizar todo esto, así que en donde figura nuestro div donde queremos mostrar el cuerpo de nuestro post convertido de Markdown a HTML:

```jsx
<div dangerouslySetInnerHTML={{ __html: post.html }} />
```

Debemos cambiarlo por lo que generamos recién, para que nos quede así:

```jsx
<div>
  {renderAst(data.markdownRemark.htmlAst)}
</div>
```

Quedando este _div_ como opcional, ya que nuestra función <inline-code>renderAst</inline-code> puede generarnos uno si **no** utilizamos el campo _Fragment_ al instanciar <inline-code>rehypeReact</inline-code>. Si estamos haciendo uso de alguna clase o id de css que queremos mantener, podemos quedarnos con este _div_ mientras usemos _Fragment_.

Y listo! Es medio tarde a la hora de escribir esto así que es muy probable que hayan cosas mal explicadas, toda corrección o sugerencia es bienvenida 😄

### Cosas a tener en cuenta para usar correctamente nuestros componentes personalizados:

Si bien parece que usamos componentes **de React**, no es estrictamente lo que estamos haciendo, sino que estamos utilizando elementos HTML personalizados (_custom HTML Elements_) que luego se reemplazan por componentes de React, por lo cual hay que tener los siguientes recaudos:

- Siempre usar las tags para cerrar nuestros componentes, no pueden ser _self-closing_ tags como en React. (Ejemplo: Sí hacer esto -> <inline-code>\<componente-custom><\/componente-custom></inline-code> ✔. Pero **no** hacer esto <inline-code>\<componente-custom \/></inline-code> ❌)
- Nuestros componentes aceptan "_props_" (son atributos en realidad) y los nombres de atributos HTML no son case-sensitive. El plugin <inline-code>gatsby-transformer-remark</inline-code> se encarga de pasar todos los nombres de atributos a **lower-case** así que si pasamos un atributo que sea _unAtributoMuyUtil_, vamos a recibirlo como _prop_ en nuestro componente con el nombre _unatributomuyutil_.
- Los atributos que reciben nuestros componentes, **siempre son strings**, así que si tenemos un componente creado <inline-code>\<componente-custom numero=42><\/componente-custom></inline-code> vamos a recibir como _prop_ en nuestro componente <inline-code>"42"</inline-code>, el cual debemos _castear_ a number para poder utilizarlo.
- React nos permite enviar props "sin valor" (_isEnabled_ por ejemplo), lo que puede considerarse como un flag y nos llega una prop con el booleano <inline-code>true</inline-code>. En este caso si hacemos algo parecido nos va a llegar a nuestro componente un string vacío <inline-code>""</inline-code>.
- Si queremos enviar objetos como atributos es posible, solamente hay que acordarse de utilizar <inline-code>JSON.parse()</inline-code> dentro de nuestro componente.
- Si utilizan componentes para estilar texto (en mi caso, uso para estilar el código _inline_), es posible que tengan que "escapar" algunos caracteres como ser el guión bajo <inline-code>\_</inline-code> o alguna barra o llave angular si quieren mostrar nombres de componentes <inline-code>\<\/</inline-code>, esto lo hacen con la barra invertida + el caracter a escapar así: <inline-code>\\\_ \\\< \\\/</inline-code>
- Es posible que vean muchos warnings de <inline-code>validateDOMNesting(...)</inline-code>, pueden corregir las descendencias que estén mal en el HTML o pueden "solucionarlo" utilizando el plugin que nombro al principio: [gatsby-remark-component](https://www.gatsbyjs.org/packages/gatsby-remark-component/) que convierte todo a _div_ 🤷‍♂️

Ahora pueden mostrar componentes con markdown común, en el post sugiere un carrousel de imágenes, un playground para mostrar live-code, en fin, como siempre dejen volar su imaginación 😁

Y recién me doy cuenta que el post al que hago referencia es de ENERO DE 2018, no entiendo cómo tardé tanto en encontrarlo... 🤦‍♂️🤦‍♂️🤦‍♂️

Nos vemos en el próximo post!