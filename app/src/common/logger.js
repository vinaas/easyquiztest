'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.ConsoleAppender = exports.Logger = exports.logLevel = undefined

var _createClass = (function () { function defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

exports.getLogger = getLogger
exports.addAppender = addAppender
exports.removeAppender = removeAppender
exports.setLevel = setLevel
exports.getLevel = getLevel

var _application = require('../../application.json')

var _application2 = _interopRequireDefault(_application)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _toConsumableArray (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i] } return arr2 } else { return Array.from(arr) } }

var logLevel = exports.logLevel = {
  none: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4
}

var loggers = {}
var appenders = []
var globalDefaultLevel = logLevel.none

function appendArgs () {
  return [this].concat(Array.prototype.slice.call(arguments))
}

function logFactory (level) {
  var threshold = logLevel[level]
  return function () {
    if (this.level < threshold) {
      return
    }

    var args = appendArgs.apply(this, arguments)
    var i = appenders.length
    while (i--) {
      var _appenders$i;

      (_appenders$i = appenders[i])[level].apply(_appenders$i, _toConsumableArray(args))
    }
  }
}

function connectLoggers () {
  var proto = Logger.prototype
  proto.debug = logFactory('debug')
  proto.info = logFactory('info')
  proto.warn = logFactory('warn')
  proto.error = logFactory('error')
}

function getLogger (id) {
  return loggers[id] || new Logger(id)
}

function addAppender (appender) {
  if (appenders.push(appender) === 1) {
    connectLoggers()
  }
}

function removeAppender (appender) {
  appenders = appenders.filter(function (a) {
    return a !== appender
  })
}

function setLevel (level) {
  globalDefaultLevel = level
  for (var key in loggers) {
    loggers[key].setLevel(level)
  }
}

function getLevel () {
  return globalDefaultLevel
}

var Logger = exports.Logger = (function () {
  function Logger (id) {
    _classCallCheck(this, Logger)

    var cached = loggers[id]
    if (cached) {
      return cached
    }

    loggers[id] = this
    this.id = id
    this.level = globalDefaultLevel
  }

  _createClass(Logger, [{
    key: 'debug',
    value: function debug (message) {}
  }, {
    key: 'info',
    value: function info (message) {}
  }, {
    key: 'warn',
    value: function warn (message) {}
  }, {
    key: 'error',
    value: function error (message) {}
  }, {
    key: 'setLevel',
    value: function setLevel (level) {
      this.level = level
    }
  }])

  return Logger
}())

var ConsoleAppender = exports.ConsoleAppender = (function () {
  function ConsoleAppender () {
    _classCallCheck(this, ConsoleAppender)
  }

  _createClass(ConsoleAppender, [{
    key: 'debug',
    value: function debug (logger) {
      var _console

      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key]
      }

      (_console = console).debug.apply(_console, ['DEBUG [' + logger.id + ']'].concat(rest))
    }
  }, {
    key: 'info',
    value: function info (logger) {
      var _console2

      for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2]
      }

      (_console2 = console).info.apply(_console2, ['INFO [' + logger.id + ']'].concat(rest))
    }
  }, {
    key: 'warn',
    value: function warn (logger) {
      var _console3

      for (var _len3 = arguments.length, rest = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        rest[_key3 - 1] = arguments[_key3]
      }

      (_console3 = console).warn.apply(_console3, ['WARN [' + logger.id + ']'].concat(rest))
    }
  }, {
    key: 'error',
    value: function error (logger) {
      var _console4

      for (var _len4 = arguments.length, rest = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        rest[_key4 - 1] = arguments[_key4]
      }

      (_console4 = console).error.apply(_console4, ['ERROR [' + logger.id + ']'].concat(rest))
    }
  }])

  return ConsoleAppender
}())

globalDefaultLevel = logLevel[_application2.default.logLevel]
var TheLogManager = getLogger
addAppender(new ConsoleAppender())
exports.default = TheLogManager
