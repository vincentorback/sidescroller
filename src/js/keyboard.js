'use strict'

import * as PIXI from "pixi.js";

class Game {
  constructor(options, app) {
    var loader = new PIXI.Loader()

    this.options = options
    this.sheet = loader.resources["images/sprite.json"].spritesheet
  }

  setup () {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };

    //The `upHandler`
    key.upHandler = event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );

    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };

    return key;
  }
}

export default Game



/*

	//Capture the keyboard arrow keys
  let left = keyboard("ArrowLeft"),
		up = keyboard("ArrowUp"),
		right = keyboard("ArrowRight"),
		down = keyboard("ArrowDown"),
		space = keyboard(" ")

  //Left arrow key `press` method
  left.press = () => {
    //Change the cat's velocity when the key is pressed
    hero.vx = -5;
		hero.vy = 0;
    hero.scale.x = -1
  };

  //Left arrow key `release` method
  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!right.isDown && hero.vy === 0) {
      hero.vx = 0;
		}
  };

  //Up
  up.press = () => {
    hero.vy = -5;
    hero.vx = 0;
	};

  up.release = () => {
    if (!down.isDown && hero.vx === 0) {
      hero.vy = 0;
    }
  };

  //Right
  right.press = () => {
    hero.vx = 5;
		hero.vy = 0;
    hero.scale.x = 1
  };
  right.release = () => {
    if (!left.isDown && hero.vy === 0) {
      hero.vx = 0;
    }
  };

  //Down
  down.press = () => {
    hero.vy = 5;
    hero.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && hero.vx === 0) {
      hero.vy = 0;
    }
	}

	space.press = () => {
		bullet.alpha = 1
		bullet.x = hero.position.x + hero.width
    bullet.y = hero.position.y + hero.height / 2

    window.setTimeout(() => {
      bullet.alpha = 0
		  bullet.x = 0
      bullet.y = 0
    }, 100)
  }
  */
