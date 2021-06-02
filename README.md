<p align="center">
    <img
      alt="Node.js"
      src="https://nodejs.org/static/images/logo-light.svg"
      width="400"
    />
</p>

# albo-heroes 
Con el paso de los años la biblioteca albo de comics, necesita tener actualizado
todo el listado de escritores, editores y coloristas de cómics que han estado
involucrados en las historias de los siguientes integrantes de los Vengadores (Iron
Man, Captain America). Así como todos los demás héroes que a través de cada
cómic han interactuado con cada uno de ellos. Esto hay que actualizarlo diario, ya
que hay que pagarles regalías respectivas a los escritores, editores y coloristas.
Para esto escribiremos dos servicios:

## Servicio a)
Obtendremos los editores, escritores y coloristas que han estado involucrados en
los cómics del personaje.
Entrada (Alguna de las siguientes URL’s)
http://test.albo.mx/marvel/colaborators/ironman
http://test.albo.mx/marvel/colaborators/capamerica

Salida (De acuerdo al héroe los datos pueden cambiar
```js
{
  {
last_sync: “Fecha de la última sincronización en dd/mm/yyyy hh:mm:ss”, editors : [
“Wilson Moss”,”Andy Smidth”, ...
],
writers : [
“Ed Brubaker”,”Ryan North”, ...
],
colorists : [
“Rico Renzi”, ...
]
}
}
```

## Servicio b)
Obtendremos los otros héroes con los cuales nuestro personaje ha interactuado
en cada uno de los cómics.
Entrada (Alguna de las siguientes URL’s)
http://test.albo.mx/marvel/characters/ironman
http://test.albo.mx/marvel/characters/capamerica
Salida (De acuerdo al héroe los datos pueden cambiar)
```js
{
  {
last_sync: “Fecha de la última sincronización en dd/mm/yyyy hh:mm:ss”, characters :[
    {character: “Squirrel Girl”,
     Comics :[“The Unbeateable Squirrel Girl (2015) #38”,“The Unbeateable Squirrel Girl(2015) #39”]},
    {character: “Jocasta”,
    Comics :[“Tony Stark: Iron Man (2018) #2”,“Tony Stark: Iron Man (2018) #3”]},
]
}
}
```

### ¿Cómo ejecutar?

Modo desarrollo:
```zsh
$ npm install
$ npm run dev
```

A través de build:
```zsh
$ npm install
$ npm run build
$ npm run start
```


Ten en cuenta que debes generar un .env a partir del .env.example.

Las variables de entorno del API de Marvel Studios las puedes obtener [aquí](https://developer.marvel.com/).

Para crear tu db firebase puedes seguir sus [instrucciones](https://firebase.google.com/docs/firestore/quickstart?hl=es-419).


### Endopoints expuestos:
Relacionados con colaboradores:
```js
    /marvel/colaborators/ironman
    /marvel/colaborators/capamerica
```
Relacionados con personajes relacionados de los comics:
```js
    /marvel/characters/ironman
    /marvel/characters/capamerica
```
Para hacer update de la base de datos en caso de que sea necesario:
```js
    /update
```

### A tener en cuenta

- La API cuenta con un cron-job que se actualiza todos los días a la 1AM-CiudadDeMéxico
- Se pueden agregar mas personajes ademas de Iron Man y Capitan America modificando el archivo character.json. Agregando respectivamente el nombre como lo vamos a consultac como key y como aparece en marvel api como value:
```json
    {"wolverine":"Wolverine"}
```
- Se dejaron en el código console.time para loggear los tiempos de respuesta de las funciones que se encargan de hacer la migración de marvel api a la db local.

