// modifying Object prototype ... oh the horror!
Object.prototype.partial = function (name) {
  var fn   = this[name].bind(this),
      args = [].splice.call(arguments, 1);
  return function () { return fn.apply(null, args); };
};
