var loop = function (fn) {
  var recur = function () { fn(next); };
  var next  = function () { setTimeout(recur, 0); };
  recur();
};
