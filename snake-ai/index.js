import { vec } from 'vector';
import { range, random, randomPosition } from 'utils';
import { Engine } from 'engine';
import { CanvasRenderer } from 'renderer';
import { Snake } from 'snake';
import { Sight, OccipitalLobe, Navigator } from 'nervous-system';


const [ width, height ] = [ window.innerWidth, window.innerHeight ];
const canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

ctx.scale(1, -1);
ctx.translate(width / 2, -height / 2);

function aiSnake(size, position, environment) {
  return new Snake({
    size, color: 'rgba(250, 10, 100, 1)',
    tailSize: 10, position, velocity: vec(0, 5)
  })
  .plug(new Sight(environment), new OccipitalLobe(), new Navigator());
}

const engine = new Engine(
  new CanvasRenderer(ctx, { width, height })
);

range(10).forEach(() => engine.addToScene(
  aiSnake(random(0, 15), randomPosition(800), engine.scene)
));

(function animation() {
  engine
    .clear()
    .update()
    .render();

  window.requestAnimationFrame(animation);
})();
