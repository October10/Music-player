// Oct10.js
var log = console.log.bind(console)

var e = function(selector) {
    var element = document.querySelector(selector)
    if (element == null) {
        var s = `没有找到元素，选择器${selector}没有找到或者 JS 没有放在 <body> 前面`
    } else {
        return element
    }
}

var es = function(selector) {
    var elements = document.querySelectorAll(selector)
    if (elements.length == 0) {
        var s = `没有找到元素，选择器${selector}没有找到或者 JS 没有放在 <body> 前面`
    } else {
        return elements
    }
}

var appendHTML = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName,callback)
}

var bindAll = function(selector, eventName, callback) {
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = es(selector)
    if (elements != undefined) {
        for (var i = 0; i < elements.length; i++) {
            var e = elements[i]
            e.classList.remove(className)
        }
    }

}
