'use strict'

import * as PIXI from 'pixi.js'

class Controller {
  constructor(game) {
    this.container = new PIXI.Container()
    this.container.position.x = 0
    this.container.position.y = 0
    this.container.width = game.options.width
    this.container.height = game.options.height
    this.container.zIndex = 2
    this.container.interactive = true
    this.container.buttonMode = true

    game.app.stage.addChild(this.container)

    this.container.on('mousedown', () => {
      if (game.state.paused) {
        game.play()
      } else {
        game.hero.jump()
      }
    })

    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        console.log('shoot!')
        game.hero.shoot()
      }
    })
  }
}

export default Controller
