var $ = document.querySelector.bind(document);

$.hide = function (el) { el.style.display = 'none'; };
$.show = function (el) { el.style.display = 'block'; };

$.getJSON = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function () {
    var data = JSON.parse(request.responseText);
    callback(data);
  };
  request.send();
};

$.addClass = function (el, name) {
  if (el.classList) {
    el.classList.add(name);
  } else {
    el.className += ' ' + name;
  }
};

$.removeClass = function (el, name) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(
        new RegExp('(^| )' + className.split(' ').join('|') + '( |$)', 'gi'),
        ' '
    );
  }
};

$.each = function (elements, callback) {
  Array.prototype.forEach.call(elements, callback) ;
};

$.filter = function (elements, predicate) {
  return Array.prototype.filter.call(elements, predicate);
};

$.matches = function(el, selector) {
  return (

      el.matches 
   || el.matchesSelector 
   || el.msMatchesSelector 
   || el.mozMatchesSelector 
   || el.webkitMatchesSelector 
   || el.oMatchesSelector

  )(selector);
};

$.parseHTML = function (str) {
  var el = document.createElement('div');
  el.innerHTML = str;
  return el.children;
};

$.siblings = function (el) {
  var siblings = el.parentNode.children();
  for (var i = siblings.length; i--;) {
    if (siblings[i] === el) {
      siblings.splice(i, 1);
      break
    }
  }
  return siblings;
};

$.ready = function (callback) {
  document.addEventListener('DOMContentLoaded', callback);
};

$.trigger = function (el, name, data) {
  var event;
  if (window.CustomEvent) {
    event = new CustomEvent('my-event', {detail: data});
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(name, true, true, data);
  }
  el.dispatchEvent(event);
};

$.extend = function (out) {
  var key, i, obj;
  out = out || {}
  for (i = 1; i < arguments.length; i++) {
    obj = arguments[i]
    if (!obj) continue
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object')
          deepExtend(out[key], obj[key]);
        else
          out[key] = obj[key];
      }
    }
  }
  return out;
};
