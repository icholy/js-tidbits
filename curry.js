var curry = (function () {
  
  var slice = Array.prototype.slice;
 
  var makeFn = function (fn, arity, reverse, prevArgs) {
    return function () {
      var newArgs = slice.call(arguments, 0),
          args    = prevArgs.concat(newArgs);
      return args.length < arity 
        ? makeFn(fn, arity, reverse, args)
        : fn.apply(null, reverse ? args.reverse() : args);
    };
  };
 
  return function (fn, arity, reverse) {
    return makeFn(fn, arity || fn.length, reverse, []);
  };
 
}).call(null);
 
Function.prototype.c = function (arity, reverse) {
  return curry(this, arity, reverse);
};
