'use strict'

import * as PIXI from 'pixi.js'

class FarBackground {
  constructor(game) {
    var texture = game.resources['/images/far.png'].texture
    var sprite = new PIXI.TilingSprite(texture, texture.baseTexture.width, texture.baseTexture.height)

    sprite.position.x = 0
    sprite.position.y = 0
    sprite.tilePosition.x = 0
    sprite.tilePosition.y = 0
    sprite.DELTA_X = 0.128
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

export default FarBackground
