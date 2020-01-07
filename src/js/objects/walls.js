import * as PIXI from 'pixi.js'
import SliceType from './sliceType'
import WallSlice from './wallSlice'
import WallPool from '../pools/walls'

class Walls {
  constructor (game) {
    this.container = new PIXI.Container()
    this.container.zIndex = 1

    this.pool = new WallPool(game)
    this.createLookupTables()

    this.slices = []
    this.viewportX = 0
    this.viewportSliceX = 0
  }

  addSlice (sliceType, y) {
    var slice = new WallSlice(sliceType, y)
    this.slices.push(slice)
  }

  createLookupTables () {
    this.borrowWallSpriteLookup = []
    this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge
    this.borrowWallSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge
    this.borrowWallSpriteLookup[SliceType.STEP] = this.pool.borrowStep
    this.borrowWallSpriteLookup[SliceType.DECORATION] = this.pool.borrowDecoration
    this.borrowWallSpriteLookup[SliceType.WINDOW] = this.pool.borrowWindow

    this.returnWallSpriteLookup = []
    this.returnWallSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge
    this.returnWallSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge
    this.returnWallSpriteLookup[SliceType.STEP] = this.pool.returnStep
    this.returnWallSpriteLookup[SliceType.DECORATION] = this.pool.returnDecoration
    this.returnWallSpriteLookup[SliceType.WINDOW] = this.pool.returnWindow
  }

  borrowWallSprite(sliceType) {
    return this.borrowWallSpriteLookup[sliceType].call(this.pool)
  }

  returnWallSprite(sliceType, sliceSprite) {
    return this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite)
  }

  setViewportX (viewportX) {
    this.viewportX = this.checkViewportXBounds(viewportX)

    var prevViewportSliceX = this.viewportSliceX
    this.viewportSliceX = Math.floor(this.viewportX / WallSlice.WIDTH)

    this.removeOldSlices(prevViewportSliceX)
    this.addNewSlices()
  }

  addNewSlices () {
    var firstX = -(this.viewportX % WallSlice.WIDTH)

    for (var i = this.viewportSliceX, sliceIndex = 0; i < this.viewportSliceX + Walls.VIEWPORT_NUM_SLICES; i++, sliceIndex++) {
      var slice = this.slices[i]
      if (slice.sprite === null && slice.type !== SliceType.GAP) {
        // Associate the slice with a sprite and update the sprite's position
        slice.sprite = this.borrowWallSprite(slice.type)
        slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH)
        slice.sprite.position.y = slice.y

        this.container.addChild(slice.sprite)
      } else if (slice.sprite !== null) {
        // The slice is already associated with a sprite. Just update its position
        slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH)
      }
    }
  }

  removeOldSlices (prevViewportSliceX) {
    var numOldSlices = this.viewportSliceX - prevViewportSliceX

    if (numOldSlices > Walls.VIEWPORT_NUM_SLICES) {
      numOldSlices = Walls.VIEWPORT_NUM_SLICES
    }

    for (var i = prevViewportSliceX; i < prevViewportSliceX + numOldSlices; i++) {
      var slice = this.slices[i]

      if (slice.sprite !== null) {
        this.returnWallSprite(slice.type, slice.sprite)
        this.container.removeChild(slice.sprite)
        slice.sprite = null
      }
    }
  }

  checkViewportXBounds (viewportX) {
    var maxViewportX = (this.slices.length - Walls.VIEWPORT_NUM_SLICES) * WallSlice.WIDTH

    if (viewportX < 0) {
      viewportX = 0
    } else if (viewportX >= maxViewportX) {
      viewportX = maxViewportX
    }

    return viewportX
  }
}

Walls.VIEWPORT_WIDTH = 512
Walls.VIEWPORT_NUM_SLICES = Math.ceil(Walls.VIEWPORT_WIDTH / WallSlice.WIDTH) + 1

export default Walls
