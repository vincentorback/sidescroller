'use strict'

import * as PIXI from 'pixi.js'
import Scroller from './scroller'
import Hero from './hero'
import WallPool from '../pools/walls'

var SCROLL_SPEED = 1

class Game {
  constructor(options) {
    this.loader = new PIXI.Loader()
    this.options = options
    this.state = {
      health: 100,
      score: 0
    }

    this.app = new PIXI.Application({
      width: this.options.width,
      height: this.options.height,
      backgroundColor: 0x000000,
      autoResize: true,
      resolution: window.devicePixelRatio
    })

    document.body.appendChild(this.app.view)

    this.load()
  }

  load () {
    this.loader
      .add('/images/sprite.json')
      .add('/images/far.png')
      .add('/images/mid.png')
      .load(() => {
        this.resources = this.loader.resources
        this.sheet = this.resources['/images/sprite.json'].spritesheet
        if (this.options.onLoad) this.options.onLoad()
      })
  }

  start () {
    this.scroller = new Scroller(this)
    this.hero = new Hero(this)

    this.app.ticker
      .add(() => {
        this.scroller.moveViewportXBy(SCROLL_SPEED)
      })

    window.setTimeout(() => {
      this.app.ticker.stop()
    }, 20000)
  }

  borrowWallSprites (num) {
    for (var i = 0; i < num; i += 1) {
      if (i % 2 == 0) {
        this.wallpool.borrowWindow()
      } else {
        this.wallpool.borrowDecoration()
      }

      sprite.x = -32 + (i * 64)
      sprite.y = 128

      this.wallSlices.push(sprite)
      this.app.stage.addChild(sprite)
    }
  }

  returnWallSprites () {
    for (var i = 0; i < this.wallSlices.length; i += 1) {
      var sprite = this.wallSlices[i]

      this.app.stage.removeChild(sprite)

      if (i % 2 == 0) {
        this.wallpool.returnWindow(sprite)
      } else {
        this.wallpool.returnDecoration(sprite)
      }
    }

    this.wallSlices = []
  }
}

export default Game
