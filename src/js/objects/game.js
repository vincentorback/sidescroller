'use strict'

import * as PIXI from 'pixi.js'
import Controller from './controller'
import Scroller from './scroller'
import Hero from './hero'

class Game {
  constructor(options) {
    this.loader = new PIXI.Loader()
    this.options = Object.assign(options, {
      minScrollSpeed: 2,
      maxScrollSpeed: 10,
      scrollAcceleration: 0.0005
    }, {})

    this.state = {
      paused: false,
      health: 100,
      score: 0,
      scrollSpeed: this.options.minScrollSpeed
    }

    this.app = new PIXI.Application({
      autoStart: true,
      width: this.options.width,
      height: this.options.height,
      autoResize: true,
      resolution: window.devicePixelRatio,
      forceFXAA: true
    })

    this.controller = new Controller(this)
    this.stage = this.controller.container

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

  play () {
    this.state.paused = false
    this.app.start()
  }

  pause () {
    this.state.paused = true
    this.app.stop()
  }

  start () {
    this.scroller = new Scroller(this)
    this.hero = new Hero(this)

    var startScale = 2
    var endScale = 1
    var scaleIntro = false

    setTimeout(() => {
      scaleIntro = true
    }, 3000)

    this.stage.scale.set(startScale)

    this.app.ticker
      .add((delta) => {
        this.hero.sprite.position.x += this.hero.vx
        this.hero.sprite.position.y += this.hero.vy

        if (this.hero.shooting) {
          this.hero.bullet.sprite.position.x += this.hero.bullet.vx
          this.hero.bullet.sprite.position.y += this.hero.bullet.vy
        }

        if (scaleIntro) {
          this.stage.scale.set(this.stage.scale.x - .006)
          if (this.stage.scale.x <= endScale) {
            scaleIntro = false
          }
        }

        this.scroller.moveViewportXBy(this.state.scrollSpeed)
        this.state.scrollSpeed += this.options.scrollAcceleration
        if (this.state.scrollSpeed > this.options.maxScrollSpeed) {
          this.state.scrollSpeed = this.options.maxScrollSpeed
        }
      })
  }

  borrowWallSprites (num) {
    for (var i = 0; i < num; i += 1) {
      if (i % 2 === 0) {
        this.wallpool.borrowWindow()
      } else {
        this.wallpool.borrowDecoration()
      }

      sprite.x = -32 + (i * 64)
      sprite.y = 128

      this.wallSlices.push(sprite)
      this.stage.addChild(sprite)
    }
  }

  returnWallSprites () {
    for (var i = 0; i < this.wallSlices.length; i += 1) {
      var sprite = this.wallSlices[i]

      this.app.stage.removeChild(sprite)

      if (i % 2 === 0) {
        this.wallpool.returnWindow(sprite)
      } else {
        this.wallpool.returnDecoration(sprite)
      }
    }

    this.wallSlices = []
  }
}

export default Game
