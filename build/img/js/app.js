document.addEventListener('DOMContentLoaded', function() {
    scrollNav();

    navegacionFija();
});

function navegacionFija(){

    const barra = document.querySelector('.header');

    //Registrar el Intersection Observer(API)
    const observer = new IntersectionObserver(function(entries){//entries tendrá la informacion del elemento a observar
        // console.log(entries[0]);
        if(entries[0].isIntersecting){//Si los elementos de '.contendio-info' se ven en pantalla, entrar aquí
            // console.log("Es visible");
            barra.classList.remove('fijo');
        }else{
            // console.log("Not visible");
            barra.classList.add('fijo');//darle estilos a la barra que se creara cuando no sea visible el video
        }
    });

    //Elemento a observar
    observer.observe(document.querySelector('.contenido-video h2'))//Se observara a los elementos de la clase 'contenido-video'
}


function scrollNav() {

    const enlaces = document.querySelectorAll('.navegacion-principal a');//Seleccionamos todos los enlaces

    enlaces.forEach(function(enlace){
        enlace.addEventListener('click', function(evento){

            evento.preventDefault();//Para eliminar la accion por defecto de los enlaces

            console.log(evento.target.attributes.href.value);//Acceder href de los enlaces

            const seccion = document.querySelector(evento.target.attributes.href.value);

            seccion.scrollIntoView({//Accion que hace que cambia de una seccion a otra al darle click a un enlace
                behavior: 'smooth'//Para que sea lento el scroll
            });
        });
    });
}