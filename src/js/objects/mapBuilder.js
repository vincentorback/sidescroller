import SliceType from './sliceType'
import { randomBetween } from '../utilities'

class MapBuilder {
  constructor (walls) {
    this.walls = walls
    this.createMap()
  }

  createMap () {
    this.createWallSpan(3, 16, true)
    this.createGap(1)
    this.createWallSpan(3, randomBetween(5, 7))
    this.createGap(1)
    this.createWallSpan(randomBetween(2, 3), randomBetween(6, 8))
    this.createGap(1)
    // this.createSteppedWallSpan(2, 5, 11)
    // this.createGap(1)
    this.createWallSpan(randomBetween(2, 3), randomBetween(6, 8))
    this.createGap(1)
    this.createWallSpan(randomBetween(2, 3), randomBetween(6, 8))
    this.createGap(1)
    this.createSteppedWallSpan(randomBetween(2, 3), randomBetween(4, 7), randomBetween(4, 7))
    this.createGap(2)
    this.createWallSpan(randomBetween(2, 3), randomBetween(6, 8))
  }


  createGap (spanLength) {
    for (var i = 0; i < spanLength; i++) {
      this.walls.addSlice(SliceType.GAP)
    }
  }

  createWallSpan (heightIndex, spanLength, noFront = false, noBack = false) {
    if (noFront === false && spanLength > 0) {
      this.addWallFront(heightIndex)
      spanLength--
    }

    var midSpanLength = spanLength - (noBack ? 0 : 1)
    if (midSpanLength > 0) {
      this.addWallMid(heightIndex, midSpanLength)
      spanLength -= midSpanLength
    }

    if (noBack === false && spanLength > 0) {
      this.addWallBack(heightIndex)
    }
  }

  createSteppedWallSpan (heightIndex, spanALength, spanBLength) {
    if (heightIndex < 2) {
      heightIndex = 2
    }

    this.createWallSpan(heightIndex, spanALength, false, true)
    this.addWallStep(heightIndex - 2)
    this.createWallSpan(heightIndex - 2, spanBLength - 1, true, false)
  }

  addWallFront (heightIndex) {
    var y = MapBuilder.WALL_HEIGHTS[heightIndex]
    this.walls.addSlice(SliceType.FRONT, y)
  }

  addWallMid (heightIndex, spanLength) {
    var y = MapBuilder.WALL_HEIGHTS[heightIndex]

    for (var i = 0; i < spanLength; i++) {
      if (i % 2 === 0) {
        this.walls.addSlice(SliceType.WINDOW, y)
      } else {
        this.walls.addSlice(SliceType.DECORATION, y)
      }
    }
  }

  addWallStep (heightIndex) {
    var y = MapBuilder.WALL_HEIGHTS[heightIndex]
    this.walls.addSlice(SliceType.STEP, y)
  }

  addWallBack (heightIndex) {
    var y = MapBuilder.WALL_HEIGHTS[heightIndex]
    this.walls.addSlice(SliceType.BACK, y)
  }
}

MapBuilder.WALL_HEIGHTS = [
  256, // Lowest slice
  224,
  192,
  160,
  128  // Highest slice
]

export default MapBuilder
