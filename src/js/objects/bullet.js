'use strict'

import * as PIXI from 'pixi.js'

class Bullet {
  constructor (x, y) {
    this.x = x
    this.y = y

    this.sprite = new PIXI.Graphics()

    this.sprite.lineStyle(2, 0xff3300, 1)
    this.sprite.moveTo(10, 0)
    this.sprite.lineTo(0, 0)
    this.sprite.alpha = 0

    this.sprite.x = x
    this.sprite.y = y

    this.vy = 0
    this.vx = 0
  }

  shoot () {
    this.sprite.alpha = .9
    this.vx = 15
  }

  reset () {
    this.vx = 0

    this.sprite.clear()
    this.sprite.lineStyle(2, 0xff3300, 1)
    this.sprite.moveTo(10, 0)
    this.sprite.lineTo(0, 0)
    this.sprite.alpha = 0
    this.sprite.x = this.x
    this.sprite.y = this.y
  }
}

export default Bullet
