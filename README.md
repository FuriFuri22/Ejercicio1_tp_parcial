
# Ejercicio 1 - Trabajo que se calificara como 2do parcial

1. **Construir Imágenes:**

   Antes de desplegar el sistema, necesitamos construir las imágenes para cada servicio.

   Imagen de MySQL:

```sh
   docker build -t db_mysql ./mysql
```

Imagen del servicio REST:

```sh
   docker build -t rest_nodejs ./rest
```

Imagen del servicio SOAP:

```sh
   docker build -t soap_nodejs ./soap
```

Imagen del servicio para visualizar y consumir los anteriores:

```sh
   docker build -t front_react ./front
```

**Nota:**
La construcción de las imágenes puede tardar aproximadamente 10 minutos.

2. **Despliegue del Sistema:**

   Ahora, puedes desplegar el sistema en Docker Swarm. Utiliza el siguiente comando:

```sh
   docker stack deploy -c docker-compose.yml serviceTP4
```

Esto iniciará la implementación de tu sistema en Docker Swarm. Ten en cuenta que la primera vez podría tardar 2 a 3 minutos para que todos los servicios y la conexión a la base de datos se establezcan.

## Uso del Sistema

 **Acceder a la Aplicación Frontend:**

   Una vez que la implementación esté completa, puedes acceder a la aplicación frontend desde http://localhost:3000


**Si el servicio de mysql se rompe, hay que borrar el contenido de la carpeta "C:\Users\Franco\Desktop\docker-swarm-tp-4\mysql\datos" y desplegar los servicios nuevamente**

  Para detenes el servicio: 
  ```sh
  docker service rm serviceTP4
  ```

  Para volver a desplegarlo:

  ```sh
  docker stack deploy -c docker-compose.yml serviceTP4
  ```







