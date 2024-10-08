# Instrucciones de configuración y ejecución

Para la configuración es necesario tener en cuenta que tendrá que copiar y pegar en la misma ruta el archivo .env-template y colocarle el nombre .env en donde colocaremos la variable de entorno en este caso http://localhost:5000
npm run i
npm run dev
Y debería de estar activo nuestro servicio para poder ejecutarlo en nuestro navegador

# Documentación de la API

Se ha decidido usar axios
/users: Para poder hacer todas las acciones con el usuario, registrar loguear y pedir un nuevo token
/news: Para poder acceder a las noticias según el tema indicado
/trends: Para poder acceder a tendencias
/analyze: Para poder analizar un texto en inglés o en español
/history: Para poder ver el historial del usuario o de todos los usuarios en caso de ser administrador

# Explicación de la arquitectura y decisiones de diseño

Se ha decidido usar reactjs para el front-end como framework agregando también material ui, para acelerar el proceso de creación de las interfaces gráficas, se decidió usar axios para el manejo de las solicitudes a nuestro servidor, se ha usado zustand para el apartado del estado de la aplicación en donde ha sido necesario se ha usado customhooks para el manejo del usuario, y se han implementado algunas configuraciones especiales para almacenar información dentro del localstorage. React Hooks Form para el manejo de cada uno de los formularios de la aplicación.
También se está usando como enrutador react router dom v6 y componentes reutilizables en la medida de lo posible.
Se ha creado diferentes carpetas para tener un sistema mas legible

- api: En donde tendremos el api que son archivos de configuración con axios, estos archivos de configuración se dejan afuera para poder usarlos o ampliarlos más fácilmente, al configurarlos aquí tendrá repercusión en todas las partes en donde se manden a llamar.

- auth:Será la carpeta que contenga el módulo de autenticación de nuestra aplicación, notemos que tiene layout que será el contenedor padre de nuestra aplicación, continuando con las páginas, en este caso Login y Register, y las rutas que tendrá este módulo.

- NewsAndTrendApp:Sera la carpeta que contendrá toda nuestra aplicación separada como un módulo, esto pensando en que pueden existir más módulos, o aislar nuestra aplicación como un módulo de una aplicación mas grande, por lo cual hemos colocado diferentes carpetas hooks en donde tenemos un hook usado dentro de este modulo el que nos permite ver que usuario esta registrado desde cualquier lugar en donde sea invocado. Las paginas y las rutas a las que se podrá acceder.

- store:será el encargado de contener todos los store que necesitemos, al usar zustand usamos la forma más fácil posible, para poder quitar complejidad en el código, y usarla de una manera mas similar a como se usaría usando simplemente useState, por lo que tenemos los diferentes módulos y un archivo especial llamado store en el tendremos la llamada a una función, que es creadora de la parte de autenticación, se hizo de esta manera para representar la posibilidad de tener un store global, tal como funciona en otras librerías de control de estado.

- theme: contendra nuestro tema

- ui: contendrá componentes pensados en que se pueden usar en diferentes partes del sistema, aquí tendremos principalmente el history, ya que se puede ampliar, recordemos que el history tiene las posibilidades de poder verse como usuario y como administrador por lo cual hay dos componentes diferentes, haciendo cosas similares

# Guía para obtener las credenciales necesarias para las APIs utilizadas

En el front no es necesario colocar alguna configuración más con lo antes mencionado debería de ser capaz de funcionar.

# A tomar en cuenta

Para el historial, se sabe que tenemos que usar el componente de análisis de texto, pero debido a que si lo usábamos íbamos a tener muy pocas se tomó la consideración de configurarla de tal manera que pueda funcionar en 2 idiomas en español y en inglés y tomar las noticias que se eligen para poder revisar si han sido positivas negativas o neutras, al igual que al seleccionar una tendencia también lo hace pero ahora en inglés, esto es debido a que la api no permite cambiar el idioma de la response.
