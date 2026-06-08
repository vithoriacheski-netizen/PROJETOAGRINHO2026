// Agro Forte do Paraná com meta e esquilos

let jogador;
let pinhoes = [];
let esquilos = [];
let score = 0;
let gravidade = 0.8;
let meta = 10;
let ganhou = false;

function setup() {
  createCanvas(1000, 500);

  jogador = {
    x: 100,
    y: 380,
    w: 50,
    h: 70,
    vy: 0,
    noChao: true
  };

  for (let i = 0; i < 8; i++) {
    pinhoes.push(criarPinhao());
  }
}

function draw() {
  background(135, 206, 235);

  desenharChao();
  desenharPinheiros();

  fill(0);
  textSize(28);
  text("🌰 Pinhões coletados: " + score + " / " + meta, 20, 40);

  atualizarJogador();
  desenharJogador();

  // Atualiza pinhões
  for (let i = pinhoes.length - 1; i >= 0; i--) {
    let p = pinhoes[i];

    p.y += p.vel;
    desenharPinhao(p);

    if (
      p.x > jogador.x &&
      p.x < jogador.x + jogador.w &&
      p.y > jogador.y &&
      p.y < jogador.y + jogador.h
    ) {
      score++;
      pinhoes.splice(i, 1);
      pinhoes.push(criarPinhao());
      continue;
    }

    if (p.y > height - 40) {
      pinhoes.splice(i, 1);
      pinhoes.push(criarPinhao());
    }
  }

  // Checa meta
  if (!ganhou && score >= meta) {
    ganhou = true;
    criarEsquilos();
  }

  // Atualiza esquilos
  for (let i = esquilos.length - 1; i >= 0; i--) {
    let e = esquilos[i];
    e.y += e.vel;
    desenharEsquilo(e);

    if (e.y > height) {
      esquilos.splice(i, 1);
    }
  }

  // Mensagem de vitória
  if (ganhou) {
    fill(255, 215, 0);
    textSize(36);
    textAlign(CENTER);
    text("Parabéns! Você ganhou o prêmio!", width / 2, 80);
  }
}

// ---------------- FUNÇÕES ----------------

function criarPinhao() {
  return {
    x: random(80, width - 80),
    y: random(50, 180),
    vel: random(1, 3)
  };
}

function criarEsquilos() {
  for (let i = 0; i < 10; i++) {
    esquilos.push({
      x: random(50, width - 50),
      y: -random(50, 200),
      vel: random(3, 6)
    });
  }
}

function atualizarJogador() {
  if (keyIsDown(LEFT_ARROW)) jogador.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) jogador.x += 5;

  jogador.vy += gravidade;
  jogador.y += jogador.vy;

  if (jogador.y >= 380) {
    jogador.y = 380;
    jogador.vy = 0;
    jogador.noChao = true;
  }

  jogador.x = constrain(jogador.x, 0, width - jogador.w);
}

function keyPressed() {
  if (key === ' ' && jogador.noChao) {
    jogador.vy = -15;
    jogador.noChao = false;
  }
}

function desenharJogador() {
  fill(50, 100, 220);
  rect(jogador.x, jogador.y, jogador.w, jogador.h, 10);

  fill(255, 220, 180);
  ellipse(jogador.x + 25, jogador.y - 15, 30);

  fill(160, 100, 40);
  rect(jogador.x + 10, jogador.y + 20, 30, 20, 5);

  noFill();
  stroke(120, 70, 20);
  strokeWeight(2);
  arc(jogador.x + 25, jogador.y + 20, 25, 15, PI, TWO_PI);
  noStroke();
}

function desenharPinhao(p) {
  fill(120, 70, 20);
  ellipse(p.x, p.y, 18, 28);

  fill(80, 50, 10);
  ellipse(p.x, p.y - 8, 10, 10);
}

function desenharChao() {
  fill(70, 160, 70);
  rect(0, 450, width, 50);
}

function desenharPinheiros() {
  for (let x = 50; x < width; x += 120) {
    fill(120, 70, 30);
    rect(x + 20, 260, 20, 190);

    fill(20, 120, 40);
    triangle(x + 30, 140, x - 20, 260, x + 80, 260);
    triangle(x + 30, 100, x - 10, 210, x + 70, 210);
    triangle(x + 30, 60, x, 160, x + 60, 160);
  }
}

function desenharEsquilo(e) {
  fill(150, 75, 0);
  ellipse(e.x, e.y, 30, 20); // corpo
  ellipse(e.x + 12, e.y - 5, 10, 15); // cauda
  fill(0);
  ellipse(e.x + 5, e.y - 3, 5, 5); // olho
}

