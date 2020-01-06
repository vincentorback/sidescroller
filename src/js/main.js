import Game from './objects/game'

document.addEventListener('DOMContentLoaded', start)

function start () {
	var game = new Game({
    width: 512,
    height: 384,
    onLoad: () => {
      game.start()
    }
  })
}

/*
function setup () {
  // var dust = new Dust(PIXI)
  GAME.resources = loader.resources
  var sheet = GAME.resources['/images/sprite.json'].spritesheet

  var app = new PIXI.Application({
		width: GAME.width,
    height: GAME.height,
    backgroundColor: 0x031B70,
    autoResize: true,
    resolution: window.devicePixelRatio
  })

  GAME.app = app

  document.body.appendChild(app.view)

  var scroller = new Scroller(GAME)

  app.ticker
    .add(() => {
      scroller.moveViewportXBy(1)
    })

  window.setTimeout(() => {
    app.ticker.stop()
  }, 1000)
}
*/
  /*
  // Bullet
	var bullet = new PIXI.Graphics()
	bullet.lineStyle(2, 0xff3300, 1)
	bullet.moveTo(0, 0)
  bullet.lineTo(300, 0)
  bullet.x = 0
  bullet.y = 0
  bullet.alpha = 0
  gameScene.addChild(bullet)


	// Hero
	var hero = new PIXI.AnimatedSprite(sheet.animations["Hero/run/run"])
	hero.vx = 0
	hero.vy = 0
  hero.x = 0
  hero.y = GAME.height - hero.height - 20
	hero.animationSpeed = 0.2
  hero.play()
  gameScene.addChild(hero)


  // Enemy
  var numberOfEnemies = 6
  var spacing = 120
  var xOffset = GAME.width / 3
  var speed = 2
  var direction = 1
	// enemy.position.set(420, gameScene.height - hero.height - 100)

  var enemies = []
  for (var i = 0; i < numberOfEnemies; i += 1) {
    var enemy = new PIXI.Sprite(sheet.textures[`Enemy/${randomInt(1, 3)}.png`])

    let x = spacing * i + xOffset
    let y = randomInt(0, GAME.height - enemy.height)

    enemy.x = x
    enemy.y = y
    enemy.alpha = 1

    //Set the enemy's vertical velocity. `direction` will be either `1` or
    //`-1`. `1` means the enemy will move down and `-1` means the enemy will
    //move up. Multiplying `direction` by `speed` determines the enemy's
    //vertical direction
    enemy.vy = speed * direction

    //Reverse the direction for the next enemy
    direction *= -1

    //Push the enemy into the `enemys` array
    enemies.push(enemy)

    //Add the enemy to the `gameScene`
    gameScene.addChild(enemy)
  }


  // Health bar
  var healthBar = new PIXI.Container()
  healthBar.position.set(4, 4)
  gameScene.addChild(healthBar)

  //Create the black background rectangle
  var innerBar = new PIXI.Graphics()
  innerBar.beginFill(0x000000)
  innerBar.drawRect(0, 0, 128, 8)
  innerBar.endFill()
  healthBar.addChild(innerBar)

  //Create the front red rectangle
  var outerBar = new PIXI.Graphics()
  outerBar.beginFill(0xFF3300)
  outerBar.drawRect(0, 0, 128, 8)
  outerBar.endFill()
  healthBar.addChild(outerBar)

  healthBar.outer = outerBar




	//Capture the keyboard arrow keys
  let up = keyboard("ArrowUp"),
		space = keyboard(" ")

  up.press = () => {
    hero.vy = -5;
    hero.vx = 0;
	};

  up.release = () => {
    hero.vy = 0;
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

  /*
  app.ticker.add(() => {
    dust.update()
  })*/

  /*
  let stars = dust.create(
    hero.x + hero.width,                     //x start position
    hero.y,                                       //y start position
    () => new PIXI.Sprite(sheet.textures["Particle/star.png"]),
    app.stage,                                         //Container for particles
    50                                                 //Number of particles
  )
  */

  // gameScene.addChild(stars)

  /*
  function play (delta) {
    var heroHit = false

    hero.x += hero.vx
    hero.y += hero.vy

    contain(hero, {
      x: 15 + (hero.width / 2),
      y: 5,
      width: GAME.width,
      height: GAME.height
    })

    for (var j = 0; j < enemies.length; j += 1) {
      var blob = enemies[j]

      if (blob.alpha > 0) {
        //Move the blob
        blob.y += blob.vy;

        //Check the blob's screen boundaries
        let blobHitsWall = contain(blob, {
          x: 15 + (blob.width / 2),
          y: 5,
          width: GAME.width,
          height: GAME.height
        })

        //If the blob hits the top or bottom of the stage, reverse
        //its direction
        if (blobHitsWall === "top" || blobHitsWall === "bottom") {
          blob.vy *= -1;
        }

        //Test for a collision. If any of the enemies are touching
        //the explorer, set `heroHit` to `true`
        if (hitTestRectangle(hero, blob)) {
          heroHit = true;
        }

        if (hitTestRectangle(bullet, blob)) {
          blob.alpha = 0
        }
      }
    }

    if (heroHit) {
      //Make the explorer semi-transparent
      hero.alpha = 0.5;

      //Reduce the width of the health bar's inner rectangle by 1 pixel
      healthBar.outer.width -= 1;
    } else {
      //Make the hero fully opaque (non-transparent) if it hasn't been hit
      hero.alpha = 1;
    }




    //Move the explorer and contain it inside the dungeon
    //Move the blob monsters
    //Check for a collision between the blobs and the explorer
    //Check for a collision between the explorer and the treasure
    //Check for a collision between the treasure and the door
    //Decide whether the game has been won or lost
    //Change the game `state` to `end` when the game is finished
  }

  // Listen for window resize events
  window.addEventListener('resize', function () {
    const parent = app.view.parentNode;

    app.renderer.resize(parent.clientWidth, parent.offsetHeight);

    // You can use the 'screen' property as the renderer visible
    // area, this is more useful than view.width/height because
    // it handles resolution
    // rect.position.set(app.screen.width, app.screen.height);
  })
}



function keyboard (value) {
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

function contain(sprite, container) {

  let collision = undefined;

  //Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }

  //Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }

  //Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = "right";
  }

  //Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = "bottom";
  }

  //Return the `collision` value
  return collision;
}

function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
*/
