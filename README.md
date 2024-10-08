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

Se ha decidido usar reactjs para el front-end como framework agregando también material ui, para acelerar el proceso de creación de las interfaces gráficas, se decidió usar axios para el manejo de las solicitudes a nuestro servidor, se ha usado zustand para el apartado del estado de la aplicación en donde ha sido necesario se ha usado customhooks para el manejo del usuario, y se han implementado algunas configuraciones especiales para almacenar información dentro del localstorage.
También se está usando como enrutador react router dom v6 y componentes reutilizables en la medida de lo posible.

# Guía para obtener las credenciales necesarias para las APIs utilizadas

En el front no es necesario colocar alguna configuración más con lo antes mencionado debería de ser capaz de funcionar.

# A tomar en cuenta

Para el historial, se sabe que tenemos que usar el componente de análisis de texto, pero debido a que si lo usábamos íbamos a tener muy pocas se tomó la consideración de configurarla de tal manera que pueda funcionar en 2 idiomas en español y en inglés y tomar las noticias que se eligen para poder revisar si han sido positivas negativas o neutras, al igual que al seleccionar una tendencia también lo hace pero ahora en inglés, esto es debido a que la api no permite cambiar el idioma de la response.
