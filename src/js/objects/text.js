'use strict'

import * as PIXI from 'pixi.js'

class Text {
  constructor (game) {
    this.container = new PIXI.Container()
    this.container.position.x = 0
    this.container.position.y = 0
    this.width = this.container.width = game.options.width
    this.height = this.container.height = game.options.height
    this.container.zIndex = 2

    this.backgroundTexture = game.sheet.textures["BG/stars.jpg"]

    game.stage.addChild(this.container)
  }

  showIntro (game) {
    this.solid = new PIXI.Graphics()
    this.solid.beginFill(0x000000, 1);
    this.solid.drawRect(0, 0, this.width, this.height);
    this.solid.endFill()
    this.solid.setTransform(0, 0)


    this.triangle = new PIXI.Graphics()

    var triangleWidth = this.width / 2,
      triangleTopX = triangleWidth * 0.6,
      triangleHeight = triangleWidth / 2.5

    this.triangle.lineStyle(15, 0xFE09FD, .8)
    this.triangle.moveTo(triangleTopX, 0)
    this.triangle.lineTo(triangleWidth, triangleHeight)
    this.triangle.lineTo(0, triangleHeight)
    this.triangle.lineTo(triangleTopX, 0)
    this.triangle.closePath()
    this.triangle.setTransform(
      (this.width / 2) - this.triangle.width / 2,
      this.height + this.triangle.height,
      1,
      1,
      -.2
    )
    this.triangle.alpha = 0


    this.introText = new PIXI.Text('GAME TITLE', {
      fontFamily: 'arial',
      fontStyle: 'italic',
      fontSize: 48,
      padding: 10,
      fill: 'transparent',
      stroke: '#FEFD00',
      strokeThickness: 2,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 200
    })
    this.introText.alpha = 0
    this.introText.position.set(
      (this.width / 2) - this.introText.width / 2,
      this.introText.height * -1
    )


    this.playText = new PIXI.Text('PRESS TO PLAY', {
      fontFamily: 'arial',
      fontSize: 16,
      fontStyle: 'italic',
      padding: 10,
      fill: '#FEFD00',
      align: 'center'
    })
    this.playText.alpha = 0
    this.playText.position.set(
      (this.width / 2) - this.playText.width / 2,
      this.height * .75
    )


    this.container.addChild(this.solid)
    this.container.addChild(this.triangle)
    this.container.addChild(this.introText)
    this.container.addChild(this.playText)
  }

  removeIntro () {
    this.container.removeChild(this.solid)
    this.container.removeChild(this.triangle)
    this.container.removeChild(this.introText)
    this.container.removeChild(this.playText)
  }

  showText (text) {

  }

  hideText (text) {

  }
}

export default Text
