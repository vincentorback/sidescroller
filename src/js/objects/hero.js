'use strict'

import * as PIXI from 'pixi.js'
import Bullet from './bullet'

class Hero {
  constructor(game) {
    this.runSprites = game.sheet.animations["Hero/run/run"]
    this.shootSprites = game.sheet.animations["Hero/run-shoot/run-shoot"]
    this.jumpSprites = game.sheet.animations["Hero/jump/jump"]

    this.sprite = new PIXI.AnimatedSprite(this.runSprites)
    this.health = 100
    this.shooting = false

    this.vx = 0
    this.vy = 0

    this.sprite.x = 20
    this.sprite.y = 130
    this.sprite.zIndex = 2

    this.sprite.animationSpeed = 0.2
    this.sprite.play()

    this.bullet = new Bullet(
      this.sprite.x + 65,
      this.sprite.y + 30
    )

    game.stage.addChild(this.sprite)
    game.stage.addChild(this.bullet.sprite)
  }

  run () {
    this.sprite.textures = this.runSprites
    this.sprite.play()
  }

  shoot () {
    if (this.shooting) {
      return
    }

    var runSprites = this.runSprites

    this.sprite.textures = this.shootSprites
    this.sprite.play()
    this.bullet.shoot()
    this.shooting = true

    setTimeout(() => {
      this.bullet.reset()
      this.shooting = false

      this.sprite.textures = runSprites
      this.sprite.play()
    }, 500)
  }

  jump () {
    var runSprites = this.runSprites
    var shootSprites = this.shootSprites
    var jumpTime = 600

    this.sprite.textures = this.jumpSprites
    this.sprite.play()

    this.vy = -2

    // TODO: start when reach top instead, timing are tricky.
    setTimeout(() => {
      this.vy = 2
    }, jumpTime)

    // TODO: Reset when reach bottom instead, timing are tricky.
    setTimeout(() => {
      this.sprite.textures = this.shooting ? shootSprites : runSprites
      this.sprite.play()

      this.vy = 0
    }, jumpTime * 2)
  }
}

export default Hero
