

  // Configuro Canvas
  var width = 1000;
  var height = 800;
  var center_x = width/2;
  var center_y = height/2;
  var canvas = document.getElementById("space");
  var ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  // Inicializo variables
  var speed = 100; // Velocidad en milisegundos que transcurre un día
  var day = 0;
  var sequia = -1; // Cantidad de Días con sequía
  var lluvia = 0; // Cantidad de Días con lluvia
  var pluviometro = [0]; // Cantidad de agua que cae cuando llueve
  var maxrain = 0; // Cantidad máxima de agua que cae
  var diapicomax = 0; // Número de día donde cayó máx agua
  var optima_condicion = 0; // Cantidad de Días con óptima condición
  var start; //inicia el intervalo que ejecuta TODO.
  var cron = false;

  //creo los 4 esferoides
  var sun = new Esferoidal(ctx, 0, 0, 20, "yellow", 0, 0);
  var ferengi = new Esferoidal(ctx, center_x - this.sun_dist, center_y, 10, "green", 1, 500);
  var vulcano = new Esferoidal(ctx, center_x - this.sun_dist, center_y, 10, "red", 5, 1000);
  var betasoide = new Esferoidal(ctx, center_x - this.sun_dist, center_y, 10, "blue", 3, 2000);

  var estado = "";
  var data = [];


  animate(); // Dibuja El Primer Frame del sistema solar



  /* ------------- BOTONES DE INTERFACE (LISTENERS) */
  //Botón PLAY
  document.querySelector("#play").addEventListener("click",function(){
    clearInterval(start);
    start = setInterval(animate, speed);
  })

  //Botón STOP
  document.querySelector("#stop").addEventListener("click",function(){
    clearInterval(start);
  })

  //Botón +
  document.querySelector("#speed_more").addEventListener("click",function(){
    speed = speed + 10;
    clearInterval(start);
    start = setInterval(animate, speed);
  })

  //Botón -
  document.querySelector("#speed_less").addEventListener("click",function(){
    speed = speed - 10;
    clearInterval(start);
    start = setInterval(animate, speed);
  })

  //Botón CALCULAR 10 AÑOS
  document.querySelector("#calc_tenyears").addEventListener("click",function(){
    speed = 0;
    clearInterval(start);
    start = setInterval(animate, speed);
    cron = true;
    document.querySelector("#calc_tenyears").innerText = "Calculando...";
    document.querySelector("#play").disabled = true;
    document.querySelector("#stop").disabled = true;
    document.querySelector("#speed_more").disabled = true;
    document.querySelector("#speed_less").disabled = true;
    document.querySelector("#replay").disabled = true;
    document.querySelector("#calc_tenyears").disabled = true;
  })

  //Botón REINICIAR
  document.querySelector("#replay").addEventListener("click",function(){

    // Inicializo variables
     speed = 100; // Velocidad en milisegundos que transcurre un día
     day = 0;
     sequia = -1; // Cantidad de Días con sequía
     lluvia = 0; // Cantidad de Días con lluvia
     pluviometro = [0]; // Cantidad de agua que cae cuando llueve
     maxrain = 0; // Cantidad máxima de agua que cae
     diapicomax = 0; // Número de día donde cayó máx agua
     optima_condicion = -1; // Cantidad de Días con óptima condición

    //creo los 4 esferoides
     sun = new Esferoidal(ctx, 0, 0, 20, "yellow", 0, 0);
     ferengi = new Esferoidal(ctx, center_x - this.sun_dist, center_y, 10, "green", 1, 500);
     vulcano = new Esferoidal(ctx, center_x - this.sun_dist, center_y, 10, "red", 5, 1000);
     betasoide = new Esferoidal(ctx, center_x - this.sun_dist, center_y, 10, "blue", 3, 2000);

    clearInterval(start);
    start = setInterval(animate, speed);
  })

  /* -------------  end */







/* ------------- REFERENCIAS ----------------------

De acá saqué la idea para la función circle
https://codepen.io/lioramsalem/pen/huFmB

// para hayar la ultima coordenada
// https://stackoverflow.com/questions/17047378/finding-coordinates-after-canvas-rotation

// triangle area by vertices
//https://www.mathopenref.com/coordtrianglearea.html

//para saber si un punto esta en un path
//https://www.w3schools.com/tags/canvas_ispointinpath.asp

//dibujar un triangulo
//https://www.kirupa.com/html5/drawing_triangles_on_the_canvas.htm

// creating figures different
//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath

*/
