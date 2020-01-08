const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * max) + min
}

function getViewportWidth () {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
}

function getViewportHeight () {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
}

function getDocumentHeight () {
  return Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
}

function isUndefined (obj) {
  return (typeof obj === 'undefined')
}

 function debounce (fn, wait) {
  var timeout
  return () => {
    clearTimeout(timeout)
    timeout = window.setTimeout(() => fn.apply(this, arguments), (wait || 1))
  }
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
const saveData = connection ? (connection.saveData === true || ['slow-2g', '2g', '3g'].includes(connection.effectiveType) || document.documentElement.classList.contains('save-data')) : false

function ieCheck () {
  var ua = window.navigator.userAgent
  var msie = ua.indexOf('MSIE ')

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
    document.documentElement.classList.add('is-ie')

    var version = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)))
    if (!isNaN(version)) {
      document.documentElement.classList.add(`is-ie${version}`)
    } else {
      console.log('Could not detect ie version', msie + 5, ua)
    }
  }
}


module.exports = {
  debounce,
  getDocumentHeight,
  getViewportWidth,
  getViewportHeight,
  isEmpty,
  ieCheck,
  isUndefined,
  prefersReducedMotion,
  randomBetween,
  saveData
}
