'use strict'

import * as PIXI from 'pixi.js'
import PixiSound from 'pixi-sound'

class Sound {
  constructor (game) {
    this.library = {}

    PixiSound.sound.Sound.from({
        url: 'audio/start.mp3',
        preload: true,
        autoPlay: false,
        loaded: (err, sound) => {
          if (err) console.error(err)

          this.library.success = sound
        }
    })

    PixiSound.sound.Sound.from({
      url: 'audio/theme-play.ogg',
      preload: true,
      autoPlay: false,
      loaded: (err, sound) => {
        if (err) console.error(err)

        this.library.play = sound
      }
  })
  }

  play (sound) {
    if (this.library[sound]) {
      this.library[sound].play()
    } else {
      console.error(`Sound: "${sound}" not found!`)
    }
  }
}

export default Sound
