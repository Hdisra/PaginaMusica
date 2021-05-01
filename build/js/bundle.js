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
document.addEventListener('DOMContentLoaded', function(){
   crearGaleria(); 
});

function crearGaleria(){

    const galeria = document.querySelector('.galeria-imagenes');//Seleccionamos al clase donde se colocaran las imagenes
   
    for(let i = 1; i<=12; i++){//Recorrer todas las imagenes ya que estan enumeradas
        const imagen = document.createElement('IMG')//Creamos las etiquetas img
        imagen.src = `build/img/thumb/${i}.webp`;//Seleccionamos las imagenes pequeñas

        //Agregando un atributo personalizado de HTML que servira para identificar cada imagen de acuerdo a la iteracion actual
        imagen.dataset.imagenId = i;//Se vera en HTML como data-imagen-id 
        
        //Añaniendo la funcion para agrandar la imagen, que se activara al hacer click en ella
        imagen.onclick = mostrarImagenAgrandada;



        const lista = document.createElement('LI');//Generamos el <li> y le agregamos la imagen
        lista.appendChild(imagen);
        
        galeria.appendChild(lista);
    }
}

function mostrarImagenAgrandada(evento){
    
    const body = document.querySelector('body');//Para agregar el div que se creara
    // console.log("Se di click en la imagen")
    // console.log(evento.target)//Imprimira a qué le di click(será la imagen)
    // console.log(evento.target.dataset.imagenId)//Imprimira su identificador que se creo en la iteracion
    const id = parseInt(evento.target.dataset.imagenId);

    const imagen = document.createElement('IMG')//Creando la imagen grande
    imagen.src = "build/img/grande/"+id+".webp";

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen)//Metemos la imagen al div, el cual tendra un degradado negro de fondo
    overlay.classList.add("overlay")//Para darle estilos al div que se genere
    
    /* Boton para cerrar la imagen */
    const boton = document.createElement('P');
    boton.textContent = "X";
    boton.classList.add('boton-cerrar');
    //Para que cuando se presione el boton se cierre la imagen
    boton.onclick = function(){
        overlay.remove();//Para que desaparezca la imagen
        body.classList.remove("fijar-body");//Para que ya se puedad dar scroll
    }
    //Para cuando se da click fuera de la imagen tambien se cierre
    overlay.onclick = function() {
        overlay.remove();
        body.classList.remove("fijar-body")
    }

    overlay.appendChild(boton);//Agregando el boton con la imagen

    
    body.appendChild(overlay);
    body.classList.add("fijar-body");//Para que cuando se quiera hacer scroll con la imagen abierta, no se mueva el body
    
}