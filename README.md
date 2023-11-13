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

3. **Despliegue del Sistema:**

   Ahora, puedes desplegar el sistema en Docker Swarm. Utiliza el siguiente comando:

   Recuerda tener el swarm iniciado:

   ```sh
   docker swarm init
   ```

   Y con el siguiente comando desplegamos los servicios.

   ```bash
   docker stack deploy -c docker-compose.yml tp4
   ```

   Esto iniciará la implementación de tu sistema en Docker Swarm. Ten en cuenta que la primera vez podría tardar 2 a 3 minutos para que todos los servicios y la conexión a la base de datos se establezcan.

## Uso del Sistema

1. **Acceder a la Aplicación Frontend:**

   Una vez que la implementación esté completa, puedes acceder a la aplicación frontend desde [http://localhost:3000](http://localhost:3000).

2. **Servicios Web:**

   - El servicio REST estará disponible en [http://localhost:8080/insertar_con_rest](http://localhost:8080/insertar_con_rest).
   - El servicio SOAP estará disponible en [http://localhost:8888/consultar_con_soap](http://localhost:8888/consultar_con_soap).

3. **Base de Datos MySQL:**

   - La base de datos MySQL está expuesta en el puerto 3306.
   - Puedes administrar la base de datos utilizando tu cliente MySQL preferido con las siguientes credenciales:
     - Usuario: root
     - Contraseña: root
     - Base de datos: personas

¡Listo! Ahora deberías tener tu sistema ejecutándose en Docker Swarm.
