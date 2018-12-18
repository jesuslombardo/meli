
// --------------- FUNCIONES ---------------

/* La funcion circle recibe un contexto, un radio, un color y una posición en x,y para dibujar un ciruclo*/
function circle(ctx, radius, color, x, y){
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x,y,radius,0,2*Math.PI,true); // Dibujo un círculo
  ctx.fill();
  ctx.closePath();
}

/* Esta funcion recibe un contexto, coordenadas de un punto, una longitud y un ángulo
Con esto calcula el par de coordenadas de un vértice del triángulo */
function lineToAngle(ctx, x1, y1, length, angle) {
  angle *= Math.PI / 180;

  var x2 = x1 + length * Math.cos(angle),
  y2 = y1 + length * Math.sin(angle);

  return {x: x2, y: y2};
}


/* Esta función construye el tríangulo entre los 3 planetas*/
function triangular(ctx, betasoide, vulcano, ferengi){

  ctx.translate(center_x,center_y); // primero voy al centro de ordenadas

  ctx.beginPath();
  ctx.moveTo(betasoide.pos[betasoide.pos.length-1][0], betasoide.pos[betasoide.pos.length-1][1]);
  ctx.lineTo(vulcano.pos[vulcano.pos.length-1][0], vulcano.pos[vulcano.pos.length-1][1]);
  ctx.lineTo(ferengi.pos[ferengi.pos.length-1][0], ferengi.pos[ferengi.pos.length-1][1]);
  isRain(ctx, betasoide, vulcano, ferengi); // Antes de terminar el triángulo chequeo si está cubriendo al sol

  ctx.closePath();
  ctx.fillStyle = "#FFCC00";
  ctx.fill();

  ctx.translate(-center_x,-center_y); // reinicializo la posición del contexto
}




/* Esta funcion Recibe 3 planetas y devuelve el area del triángulo que forman*/
function triangleArea(betasoide, vulcano, ferengi){
  // Contruyo los Vértices del triángulo
  var point_a = vulcano.pos[vulcano.pos.length-1];
  var point_b = betasoide.pos[betasoide.pos.length-1];
  var point_c = ferengi.pos[ferengi.pos.length-1];


  var area = Math.abs((point_a[0]*(point_b[1]-point_c[1])+point_b[0]*(point_c[1]-point_a[1])+point_c[0]*(point_a[1]-point_b[1]))/2);

  if(area == 0){
    sequia = sequia + 1;
    estado = "sequia";
  }

  return area;
}



/* Funcion que recibe un contexto y chequea si está lloviendo*/
function isRain(ctx, betasoide, vulcano, ferengi){
  // supongo que el sol es (0,0).
  //Si contemplaba el tamaño total del sol, debería haber preguntado en el if por las 4 cordenadas limitrofes del sol
  if(ctx.isPointInPath(center_x, center_y)){ //isPointInPath se fija si un punto está dentro de un contexto
    lluvia = lluvia + 1;
    var cantidad_lluvia = triangleArea(betasoide, vulcano, ferengi);

    pluviometro.push(cantidad_lluvia);
    estado = "lluvia"
    if(cantidad_lluvia >= Math.max(...pluviometro)){
      //pico maximo de lluvia
      maxrain = cantidad_lluvia;
      diapicomax = day;
      estado = "maxlluvioso"
    }

  }
  return true;
}



/* Esta función recibe 3 planetas y chequea si están alineados entre ellos devuelve o true o false*/
function isPlanetAlign(betasoide, vulcano, ferengi){
  var point_a = vulcano.pos[vulcano.pos.length-1];
  var point_b = betasoide.pos[betasoide.pos.length-1];
  var point_c = ferengi.pos[ferengi.pos.length-1];

  //Chequeo si la pendiente de las coordenadas tiene una diferencia baja (menor a mil), significa que los planetas están alineados
  if(Math.abs(((point_a[1] - point_b[1]) * (point_a[0] - point_c[0])) - ((point_a[1] - point_c[1]) * (point_a[0] - point_b[0]))) < 1000 && triangleArea(betasoide, vulcano, ferengi) != 0){
    optima_condicion = optima_condicion + 1;
    estado = "Optima presión y temperatura";
  }


}



//defino constructor para hacer orbitas
function Esferoidal(ctx, xpos, ypos, radius, color, angular_velocity, sun_dist) {
  this.ctx = ctx;
  this.xpos = xpos;
  this.ypos = ypos;
  this.radius = radius; // radio interno para dibujar la esfera
  this.color = color;
  this.pos = []; // array que guarda las coordenadas (x,y) donde estuvo el planeta
  this.angular_velocity = angular_velocity; // velocidad angular
  this.sun_dist = sun_dist/10; // distancia al sol, divido por 10 para achicar el sistema planetario

  this.draw = function(ctx){ //dibujo el planeta
    circle(this.ctx, this.radius, this.color, 0, 0);
  }

  this.drawOrbit = function(){ //dibujo la órbita del planeta
    this.ctx.beginPath();
    this.ctx.arc(center_x, center_y, this.sun_dist, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  this.saveCoords = function(day){
    var pos = lineToAngle(ctx, 0, 0, this.sun_dist, day*this.angular_velocity);
    this.pos.push([pos.x.toFixed(0), pos.y.toFixed(0)]);
  }

  this.move = function(ctx, day){
    ctx.save();
    ctx.rotate( (day*this.angular_velocity)*Math.PI/180 );
    ctx.translate(this.sun_dist,0);
    this.draw(ctx); //dibuja al planeta
    this.saveCoords(day); //guarda las coordenadas pasandole el día actual
    ctx.translate(-this.sun_dist,0);
    ctx.restore();
  }

}



/* La funcion panelController recibe toda la data y la refleja en el form de la página*/
function panelController(ctx, day, betasoide, vulcano, ferengi, sequia, lluvia, pluviometro, maxrain, diapicomax, speed, estado){
  document.querySelector("#form_days").value = day;
  document.querySelector("#form_years").value = day/365; //no fueron contemplados los años biciestos
  document.querySelector("#betasoide_pos").value = "[ " + betasoide.pos[betasoide.pos.length-1] + " ] ";
  document.querySelector("#vulcano_pos").value = "[ " + vulcano.pos[vulcano.pos.length-1] + " ] ";
  document.querySelector("#ferengi_pos").value = "[ " + ferengi.pos[ferengi.pos.length-1] + " ] ";
  document.querySelector("#triangle_area").value = triangleArea(betasoide, vulcano, ferengi);
  document.querySelector("#sequia").value = sequia;
  document.querySelector("#lluvia").value = lluvia;
  document.querySelector("#pluviometro").value = pluviometro[pluviometro.length-1];
  document.querySelector("#maxrain").value = maxrain;
  document.querySelector("#diapicomax").value = diapicomax;
  document.querySelector("#speed_input").value = speed;
  document.querySelector("#pendiente").value = optima_condicion;
  document.querySelector("#estado").value = estado;
}



/* La funcion animate crea frame a frame el sistema planetario, es decir, se encarga de darle vida y movimiento al sistema solar */
function animate(){
  estado = "normal";

  tenYears(day); //chequea si pasaron 10 años

  ctx.save();

  //creo fondo
  ctx.beginPath();
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);
  ctx.closePath();

  //Dibujo Las Órbitas
  betasoide.drawOrbit();
  vulcano.drawOrbit();
  ferengi.drawOrbit();

  ctx.translate(center_x,center_y); //me posiciono en el centro

  //traslacion de los planetas
  sun.move(ctx, day);
  betasoide.move(ctx, day);
  vulcano.move(ctx, -day);
  ferengi.move(ctx, day);

  ctx.restore();

  //dibujo el triangulo de los planetas
  triangular(ctx, betasoide, vulcano, ferengi);

  //calcular si esta alineado
  isPlanetAlign(betasoide, vulcano, ferengi)

  //reflejo resultados en el panel front end
  panelController(ctx, day, betasoide, vulcano, ferengi, sequia, lluvia, pluviometro, maxrain, diapicomax, speed, estado);

  //voy agregando a la variable data un array con el dia y el estado de ese dia
  data.push([day, estado])

  day++; // Suma 1 día

}




/* Esta función recibe el day actual y en caso de cumplirse 10 años detiene la animación*/
function tenYears(day){
  if(day/365 == 10 && cron == true){
    data.push([day, estado]) // inserto ultimo dia
    clearInterval(start); // Detiene la animación
    storeData(data);
    document.querySelector("#calc_tenyears").innerText = "Calculado OK";
    document.querySelector("#play").disabled = false;
    document.querySelector("#stop").disabled = false;
    document.querySelector("#speed_more").disabled = false;
    document.querySelector("#speed_less").disabled = false;
    document.querySelector("#replay").disabled = false;
    document.querySelector("#calc_tenyears").disabled = true;
    cron = false;
  }
}

/* Esta función envia via post la data acumulada de todos los dias*/
function storeData(data){
  $.post('cron.php', {
    data: data
  }, function(response) {
    console.log(response);
  });

}
