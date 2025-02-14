# Sales-CRM-ADDI

Frontend Software Engineer -
Technical Challenge

# Diseño inicial y planteamiento

Se busca la creación de un  sistemas de ventas CRM el cual  permita manejar los Leads y Prospects que maneja actualmente la empresa y permita al equipo hacer las validaciones de manera automatica para que el Lead pase a ser prospect, teniendo esto en cuenta el primer enfoque es realizar una aplicación sencilla que permita al usuario realizar las funcionalidades de manera rapida y fácil sin funcionalidades extra por lo que teniendo en   
cuenta el enfoque de mobile first se propuso el siguiente diseño básico, una card que permita mostrar la información relevante del Lead y del Prospect, la opcion que permita validar de manera automatica los leads  y  que estos pasen a la categoria de prospects y una lista con los prospects ya validados.

![alt text](image.png)

El primer enfoque en el desarrollo es realizar una aplicación básica de  React con Next.js para la realización del proyecto, se busca aplicar los principios de atomicidad y POO con los patrones de composición que son utilizados  en React que permitiria la facil escalabilidad del proyecto a futuro,  asi como realizar  una aplicación reactiva en HTML y CSS que permita la realizacion de una pagina básica pero con todas  las necesidades del  usuario y el correcto manejo  de UI limpia y minimalista comun en proyectos empresariales como un CRM.


# Frameworks y librerias relevantes: 

Next
Preferencia personal

Jest
Preferencia personal y buena compatibilidad con Next.Js

Style Component
Se utilizó Style Component porque se prefiere el HTML Semántico que ayuda a la legibilidad y mantenimiento del código de modo que los bloques de codigo quedan lo que realmente representan lo que hace el HTML mucho mas legible y trabajable

ReactQuery
Se utilizó para la simulación de las peticiones web y el correcto funcionamiento de la lógica detras de las validaciones

# Estructura del proyecto: 

Los test se realizaron es la carpeta conjunta para su facil acceso  y legibilidad __test__
/src/app
    ├── _data: simulación básica de una base de datos en un archivo json
    ├── (landing) :simulación de ruta falsa para mejor organización
        ├──_components: Elementos reutilizables dentro del código
            ├──atoms: contiene lo elementos más basicos que pueden ser reutilizados varias veces
            ├──hooks:  Contienes la funcionalidad detras de la logica, la validacion del usuario y un debounce para no sobrecarga la pagina en caso de funcionamiento incorrecto
            ├──icons: Contiene los iconos utilizados en la aplicacion en formato SVG pasado a JSX para su facil importación
            ├──molecules: Contiene los  elementos que con la utilizacion de "los atomos" crea elemento mas grandes reutilizables 
            ├──providers: Crea el contexto para que React maneje los leads y prospects en la pagina
        ├──page.tsx: Crea la pagina final con el esqueleto en HTML y la utilización de "las moleculas" como elementos ya  construidos para la carga final de la página
        ├──types:interfaces para su reutilización

# Instalación y ejecucion

1.  Clonación 
git clone https://github.com/Steven-Rodriguez-git/Sales-CRM-ADDI.git
cd CRM ADDI SALES

2.
npm install

3./// Para correr  la aplicación
npm run dev

4./// Para correr  los test
npm test 

# Funcionalidades e implementación

-  Se visualiza correctamente los Leads y los Prospectos en la apliación
-  Se muestra la información mas relevante de los leads y los prostectos de manera rapida y resumida
-  Se agrega el boton de validación que permite validar de manera automatica los leads para confirmar si cumples los requerimientos para ser prospects
    -   Se realiza la validacion en paralelo del registro y la identidad
    -   Se realiza la validación de score de manera aleatoria en caso de cumplir las dos primeras en caso contrario falla  de una vez
    -   Por ultimo en caso de que las 3 validaciones sean exitosas pasa el Lead a la sección de prospectos 
-  Se agrego la funcionalidad de busqueda extra al considerarla fundamental en una aplicación del estilo.

# UI, UX y desiciones de diseño

- Se optó por UI bien estructurada que permitiera una sección clara para los leads a la izquierda y otra para los prospects a la derecha cosa que funciona ante la reactividad del usuario al entender que un prospect es un avance del lead, por el contrario en la aplicación mobil se optó por que los prospect quedarán de primeras ya que al posiblemente ser menores y ser  estos la base central del uso de la apliacion permite su facil acceso en dispositivos pequeños.

- Se utilizaron tarjetas que buscan una interfaz moderna y amigable  sin información no necesaria, se eligió el feedback con hovers y sombras para mejorar visualmente la experiencia de usuario.

-Se utilizó los botones como una manera de indicar al usuario que este puede interactuar con los leads automatizando el proceso, tambien se incluyeron decisiones para el feeedback del usuario al utilizar el boton.

-Se utilizaron 3 estados distintos para que el usuario pueda identificar plenamente el estado actual de la validación, un estado en gris con un icono de carga, un estado en verde con un icono de check y un estado en rojo con un icono de error, aparte se agregó hover con un tool-tip que permite de varias maneras indicar al ususario visualmente cuales fueron los que  fallaron y cuales fueron exitosos.

-Se agrego un filtro en la parte superior de la pagina para mejorar la experiencia del usuario en caso de necesitar un lead especifico o en caso de tener muchos leads

- Se tomaron decisiones de diseño extras como una Tipografia clara y uniforme y un manejo de padding y margenes permitiendo  que la UI se logre ver espaciada, sea facil de visualizar y la información se vea clara y de manera sencilla.

-Se tomó la decisión de hacer que la aplicación sea más minimalista y amigable, sin incluir elementos extra que puedan sobrecargar el contenido, contenido innecesario o funcionalidades extra que no aporten a la funcionalidad básica que necesita el usuario.

/// Diseño final aplicación de escritorio
![alt text](image-1.png)

/// Diseño final aplicación movil
![alt text](image-2.png)

# Test

npm test

- Covertura
    -  Validación de los datos
    -  Manejo de estados y cambio
    -  Renderizado de los elementos  mas relevantes


# Posibles mejores y aspectos

- Paginación para un mejor manejo en caso de que los leads y prospects sean una cantidad grande
- Tabs en movil que permitan alternar entre Leads y Prospects de una mejor manera
- Separación más clara entre Leads y Prospects
- Suponiendo que el usuario tenga esta posibilidad,  poder eliminar, archivar o agregar leads, o en caso de que no la tenga y de ser util que el sistema archive los leads que no pasaron las pruebas
- Test mucho mas extensivos
