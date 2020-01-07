import Game from './objects/game'

document.addEventListener('DOMContentLoaded', start)

function start () {
	var game = new Game({
    width: 512,
    height: 384,
    onLoad: () => {
      game.start()
    }
  })
}
