'use strict'

import * as PIXI from 'pixi.js'
import Controller from './controller'
import Scroller from './scroller'
import Hero from './hero'
import Sound from './sound'
import Text from './text'

class Game {
  constructor(options) {
    this.loader = new PIXI.Loader()
    this.options = Object.assign(options, {
      minScrollSpeed: 2,
      maxScrollSpeed: 10,
      scrollAcceleration: 0.0005
    }, {})

    this.state = {
      playing: false,
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

    this.stage = this.app.stage

    this.controller = new Controller(this)
    this.innerStage = this.controller.container

    this.sound = new Sound(this)

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
    this.text = new Text(this)

    this.text.showIntro()

    var startScale = 1.9
    var endScale = 1
    var scaleIntro = false
    var introVisible = false
    var introTextYGoal = (this.options.height / 3)
    var hideSolid = false
    var startMoving = false

    this.innerStage.scale.set(startScale)

    this.app.ticker
      .add((delta) => {
        if (startMoving) {
          this.scroller.moveViewportXBy(this.state.scrollSpeed)
          this.state.scrollSpeed += this.options.scrollAcceleration
          if (this.state.scrollSpeed > this.options.maxScrollSpeed) {
            this.state.scrollSpeed = this.options.maxScrollSpeed
          }
        }

        if (this.state.playing) {
          this.hero.sprite.position.x += this.hero.vx
          this.hero.sprite.position.y += this.hero.vy

          if (this.hero.shooting) {
            this.hero.bullet.sprite.position.x += this.hero.bullet.vx
            this.hero.bullet.sprite.position.y += this.hero.bullet.vy
          }
        }

        if (!introVisible) {
          this.text.triangle.alpha = this.text.triangle.alpha + .1
          this.text.introText.alpha = this.text.introText.alpha + .1
          this.text.triangle.y -= 2.5
          this.text.introText.y += 1.5

          if (this.text.introText.y >= introTextYGoal) {
            this.text.triangle.alpha = 1
            this.text.introText.alpha = 1
            introVisible = true

            this.sound.play('success')

            window.setTimeout(() => {
              this.text.playText.alpha = 1

              var playTextBlink = window.setInterval(() => {
                this.text.playText.alpha = this.text.playText.alpha === 1 ? 0 : 1
              }, 500)

              this.controller.onClick(() => {
                clearInterval(playTextBlink)
                hideSolid = true
              })
            }, 1500)
          }
        }

        if (hideSolid) {
          startMoving = true

          this.text.solid.alpha = this.text.solid.alpha - .01

          if (this.text.introText.alpha >= 0) {
            this.text.triangle.alpha = this.text.triangle.alpha - .15
            this.text.introText.alpha = this.text.introText.alpha - .15
            this.text.playText.alpha = this.text.playText.alpha - .15

            this.text.triangle.y -= 1.5
            this.text.introText.y += 1.5
            this.text.playText.y += 1.5
          }

          // this.sound.play('play')

          if (this.text.solid.alpha <= 0) {
            window.setTimeout(() => {
              this.text.removeIntro()
              scaleIntro = true
            }, 1500)
          }
        }

        if (scaleIntro) {
          this.innerStage.scale.set(this.innerStage.scale.x - .005)

          if (this.innerStage.scale.x <= endScale) {
            this.innerStage.scale.set(1)
            scaleIntro = false
            this.state.playing = true
          }
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
      this.innerStage.addChild(sprite)
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
