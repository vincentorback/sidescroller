'use strict'

import MidBackground from './midBackground'
import FarBackground from './farBackground'
import Walls from './walls'

class Scroller {
  constructor(game) {
    this.farBackground = new FarBackground(game)
    this.midBackground = new MidBackground(game)
    this.front = new Walls(game)

    game.app.stage.addChild(this.farBackground)
    game.app.stage.addChild(this.midBackground)
    console.log(this.front)
    game.app.stage.addChild(this.front.container)

    this.viewportX = 0
  }

  setViewportX (viewportX) {
    this.viewportX = viewportX

    this.farBackground.setViewportX(viewportX)
    this.midBackground.setViewportX(viewportX)
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
