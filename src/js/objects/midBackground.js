'use strict'

import * as PIXI from 'pixi.js'

class MidBackground {
  constructor(game) {
    var texture = game.resources['/images/mid.png'].texture
    var sprite = new PIXI.TilingSprite(texture, texture.baseTexture.width, texture.baseTexture.height)

    sprite.position.x = 0
    sprite.position.y = 128
    sprite.tilePosition.x = 0
    sprite.tilePosition.y = -1
    sprite.DELTA_X = 0.32
    sprite.viewportX = 0

    sprite.setViewportX = this.setViewportX.bind(sprite)

    return sprite
  }

  setViewportX (newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX
    this.viewportX = newViewportX
    this.tilePosition.x -= (distanceTravelled * this.DELTA_X)
  }
}

export default MidBackground
