# roommateuy


Instrucciones para correr la app
--------

Levantar servicios y cliente web en modo desarrollo:

Primero:

`docker-machine env` Copiar lo que devuelve y pegar

Luego:

`docker-machine start`

En la carpeta del proyecto:
`docker-compose up -d`


Consultar Ip del docker:

`docker-machine ip`


Formato rutas:

`ip:port/`


Hacer el build del cliente web y levantar el server en modo production (http://localhost:80):

`docker-compose -f docker-compose.prod.yml up -d`

Instrucciones para correr los test
----------

Server:

` `

Web:

` `

MONGO DATA BASE

Levantar server en modo desarrollo:

`mongod --dbpath "/Users/guzmy/data/db"` PC Guzman

Levantar mongo (otro terminal):

`mongo`

Checkear instancias de mongo corriendo:

`ps ax | grep mongod`

Matar intancias

`pkill mongod`
