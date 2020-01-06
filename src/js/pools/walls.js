'use strict'

import * as PIXI from 'pixi.js'

class WallPool {
  constructor(game) {
    this.game = game

    this.createWindows()
    this.createDecorations()
    this.createFrontEdges()
    this.createBackEdges()
    this.createSteps()
  }

  /* Front edges */
  createFrontEdges () {
    this.frontEdges = []

    this.addFrontEdges(2, 'edge_01')
    this.addFrontEdges(2, 'edge_02')

    this.shuffle(this.frontEdges)
  }

  addFrontEdges (amount, frameId) {
    for (var i = 0; i < amount; i += 1) {
      var sprite = new PIXI.Sprite(this.game.sheet.textures[`Building/${frameId}.png`])
      this.frontEdges.push(sprite)
    }
  }

  borrowFrontEdge () {
    return this.frontEdges.shift()
  }

  returnFrontEdge (sprite) {
    this.frontEdges.push(sprite)
  }

  /* Back edges */
  createBackEdges () {
    this.backEdges = []

    this.addBackEdges(2, 'edge_01')
    this.addBackEdges(2, 'edge_02')

    this.shuffle(this.backEdges)
  }

  addBackEdges (amount, frameId) {
    for (var i = 0; i < amount; i += 1) {
      var sprite = new PIXI.Sprite(this.game.sheet.textures[`Building/${frameId}.png`])
      sprite.anchor.x = 1
      sprite.scale.x = -1
      this.backEdges.push(sprite)
    }
  }

  borrowBackEdge () {
    return this.backEdges.shift()
  }

  returnBackEdge (sprite) {
    this.backEdges.push(sprite)
  }

  /* Steps */

  createSteps () {
    this.steps = []
    this.addSteps(2, 'step_01')
  }

  addSteps (amount, frameId) {
    for (var i = 0; i < amount; i += 1) {
      var sprite = new PIXI.Sprite(this.game.sheet.textures[`Building/${frameId}.png`])
      sprite.anchor.y = 0.25
      this.steps.push(sprite)
    }
  }

  borrowStep () {
    return this.steps.shift()
  };

  returnStep (sprite) {
    this.steps.push(sprite)
  }

  /* Decorations */

  createDecorations () {
    this.decorations = []

    this.addDecorations(6, 'decoration_01')
    this.addDecorations(6, 'decoration_02')
    this.addDecorations(6, 'decoration_03')

    this.shuffle(this.decorations)
  }

  addDecorations (amount, frameId) {
    for (var i = 0; i < amount; i += 1) {
      var sprite = new PIXI.Sprite(this.game.sheet.textures[`Building/${frameId}.png`])
      this.decorations.push(sprite)
    }
  }

  borrowDecoration () {
    return this.decorations.shift()
  }

  returnDecoration (sprite) {
    this.decorations.push(sprite)
  }

  createWindows () {
    this.windows = []

    this.addWindows(6, 'window_01')
    this.addWindows(6, 'window_02')

    this.shuffle(this.windows)
  }

  addWindows (amount, frameId) {
    for (var i = 0; i < amount; i += 1) {
      var sprite = new PIXI.Sprite(this.game.sheet.textures[`Building/${frameId}.png`])
      this.windows.push(sprite)
    }
  }

  borrowWindow () {
    return this.windows.shift()
  }

  returnWindow (sprite) {
    this.windows.push(sprite)
  }

  shuffle (array) {
    var len = array.length
    var shuffles = len * 3
    for (var i = 0; i < shuffles; i += 1) {
      var wallSlice = array.pop()
      var pos = Math.floor(Math.random() * (len - 1))
      array.splice(pos, 0, wallSlice)
    }
  }
}

export default WallPool
