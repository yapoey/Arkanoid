import { CanvasView } from "./view/CanvasView";
import { Ball } from "./sprites/Balls";
import { Brick } from "./sprites/Bricks";
import { Paddle } from "./sprites/Paddle";
import { Collision } from "./Collision";

// images
import PADDLE_IMAGE from "./images/paddle.png";
import BALL_IMAGE from "./images/ball.png";

// Level & Colors
import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY,
} from "./setup";

// helper
import { createBricks } from "./helper";

let gameOver = false;
let score = 0;

function setGameOver(view: CanvasView) {
  view.drawInfo("Game Over!");
  gameOver = false;
}

function setGameWin(view: CanvasView) {
  view.drawInfo("Game Won!");
  gameOver = false;
}

function gameLoop(
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle,
  ball: Ball,
  collision: Collision
) {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball);

  // move ball
  ball.moveBall();

  // Move Paddle and chcek so it won't exit
  if (
    (paddle.isMovingLeft && paddle.pos.x > 0) ||
    (paddle.isMoveRight && paddle.pos.x < view.canvas.width - paddle.width)
  ) {
    paddle.movePaddle();
  }

  collision.checkBallCollision(ball, paddle, view);
  const collidingBrick = collision.isCollidingBricks(ball, bricks);

  if (collidingBrick) {
    score += 1;
    view.drawScore(score);
  }

  // game over when ball leave
  if (ball.pos.y > view.canvas.height) gameOver = true;

  // game won
  if (bricks.length === 0) return setGameWin(view);

  // stop animation
  if (gameOver) return setGameOver(view);

  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));
}

function startGame(view: CanvasView) {
  // reset display
  score = 0;
  view.drawInfo("");
  view.drawScore(0);

  //creat a collision
  const collision = new Collision();

  // create all bricks
  const bricks = createBricks();
  // create ball
  const ball = new Ball(
    BALL_SPEED,
    BALL_SIZE,
    { x: BALL_STARTX, y: BALL_STARTY },
    BALL_IMAGE
  );
  //create a paddle
  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    { x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5 },
    PADDLE_IMAGE
  );
  gameLoop(view, bricks, paddle, ball, collision);
}

// create a new view

const view = new CanvasView("#playField");
view.initStartButton(startGame);
