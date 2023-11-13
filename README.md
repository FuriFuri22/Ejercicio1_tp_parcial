# Instrucciones para la Implementación del Sistema - TP4

Este conjunto de instrucciones te guiará a través de la implementación del sistema utilizando Docker Swarm. Asegúrate de tener Docker instalado en tu sistema antes de comenzar, además cada comando que estaremos usando es estando parado desde la terminal en la carpeta donde hiciste git clone.

## Preparación del Entorno

1. **Clonar el Repositorio:**

   Antes de comenzar, clona el repositorio utilizando el siguiente comando:

```sh
   git clone https://github.com/alanBonnet/docker-swarm-tp-4.git
```

Luego, navega al directorio clonado:

```sh
   cd docker-swarm-tp-4
```

2. **Construir Imágenes:**

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

3. **Despliegue del Sistema:**

   Ahora, puedes desplegar el sistema en Docker Swarm. Utiliza el siguiente comando:

   Recuerda tener el swarm iniciado:

```sh
   docker swarm init
```

Luego, despliega los servicios con el siguiente comando:

```sh
   docker stack deploy -c docker-compose.yml tp4
```

Esto iniciará la implementación de tu sistema en Docker Swarm. Ten en cuenta que la primera vez podría tardar 2 a 3 minutos para que todos los servicios y la conexión a la base de datos se establezcan.

## Uso del Sistema

1. **Acceder a la Aplicación Frontend:**

   Una vez que la implementación esté completa, puedes acceder a la aplicación frontend desde [http://localhost:3000](http://localhost:3000).

   **Nota:**
   Es posible que necesites actualizar la página varias veces (F5) ya que algunas réplicas pueden no renderizar correctamente la página.

2. **Servicios Web:**

   - El servicio REST estará disponible en [http://localhost:8080/insertar_con_rest](http://localhost:8080/insertar_con_rest).
   - El servicio SOAP estará disponible en [http://localhost:8888/consultar_con_soap](http://localhost:8888/consultar_con_soap).

3. **Base de Datos MySQL:**

   - La base de datos MySQL está expuesta en el puerto 3306.
   - Puedes administrar la base de datos utilizando tu cliente MySQL preferido con las siguientes credenciales:
     - Usuario: root
     - Contraseña: root
     - Base de datos: personas

4. **Ajuste de Réplicas del Frontend:**

   Para mejorar la estabilidad y evitar problemas de rendimiento, reduce las réplicas del servicio `tp4_front` a 1 utilizando el siguiente comando:

```sh
   docker service scale tp4_front=1
```

## Detener y Limpiar el Sistema

Para detener y limpiar los servicios y recursos de Docker Swarm, puedes utilizar los siguientes comandos:

```sh
   docker stack rm tp4
```

```sh
   docker swarm leave --force
```

¡Listo! Ahora deberías tener tu sistema ejecutándose en Docker Swarm.
