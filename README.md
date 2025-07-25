# Nalanda's Challenge

Este repositorio está desplegado en _Vercel_, usted puede comprobar el despliegue _[aquí](https://nalanda-challenge.vercel.app/)_.

## Descripción

El proyecto se puede probar ejecutando con ```npm install``` y ```npm start```, o en _[Vercel](https://nalanda-challenge.vercel.app/)_.

Cuenta con las siguientes buenas prácticas.

1. Integración continua con _pipelines_ de _GitHub_ (_GitHub Actions_), tanto cuando se hace una _pull request_ como un _push_ en _main_.
2. Despliegue continuo gracias a _Vercel_.
3. Comprobación de que el código está listo para ser subido gracias _Husky_, _ESLInt_ y _Prettier_, que se ejecutan en el _hook_ _precommit_.
4. Comprobación del formato de código con _Prettier_.
5. Comprobación de buenas prácticas y posibles mejoras con _ESLint_, comprobando hasta cosas como el orden de los _imports_ y los prefijos de los componentes.
6. División de la carpeta _app_ en carpetas y módulos que mejoran la escalabilidad (en cada carpeta hay un README.md) que explica la responsabilidad de cada sección. 
Esta es una división que a mí me gusta pero que no es el único enfoque.
7. Se ha usado por facilidad de uso y rapidez _TailwindCSS_ con _DaysiUI_, con un un sistema de configuración programática de los componentes de este último, todo en su carpeta correspondiente _shared_.
8. El enfoque utilizado ha sido crear un servicio _TaskService_ encargado de simular llamadas a _endpoints_ para manejar la reactividad.
9. Testing de los componentes.
10. En _PageSpeed Insights_ obtengo una puntuación de 99 (_Performance_) 100 (B_est Practices_) 100 (_SEO_) 100 (_Accesibility_). No me ha dado tiempo a mejorar la _performance_ para obtener un 100.

Disculpen si hay algún error, he intentado ir la más rápido posible compaginándolo con el trabajo.

Muchas gracias.
