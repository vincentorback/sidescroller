'use strict'

import * as PIXI from 'pixi.js'

class Hero {
  constructor(game) {
    this.sprite = new PIXI.AnimatedSprite(game.sheet.animations["Hero/run/run"])
    this.health = 100

    this.sprite.vx = 0
    this.sprite.vy = 0

    this.sprite.x = 60
    this.sprite.y = 66

    this.sprite.animationSpeed = 0.2
    this.sprite.play()

    game.app.stage.addChild(this.sprite)
  }
}

export default Hero
