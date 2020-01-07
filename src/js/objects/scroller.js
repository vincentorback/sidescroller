'use strict'

import MapBuilder from './mapBuilder'
import MidBackground from './midBackground'
import FarBackground from './farBackground'
import Walls from './walls'

class Scroller {
  constructor(game) {
    this.farBackground = new FarBackground(game)
    this.midBackground = new MidBackground(game)
    this.front = new Walls(game)

    game.stage.addChild(this.farBackground)
    game.stage.addChild(this.midBackground)
    game.stage.addChild(this.front.container)

    this.mapBuilder = new MapBuilder(this.front)

    this.viewportX = 0
  }

  setViewportX (viewportX) {
    this.viewportX = viewportX

    this.farBackground.setViewportX(viewportX)
    this.midBackground.setViewportX(viewportX)
    this.front.setViewportX(viewportX)
  }

  getViewportX () {
    return this.viewportX
  }

  moveViewportXBy (units) {
    var newViewportX = this.viewportX + units
    this.setViewportX(newViewportX)
  }
}

export default Scroller
