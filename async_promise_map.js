var map = function () {

  var isPromise = function (obj) {
    return typeof obj.then === "function";
  };

  var fakePromise = function (x) {
    return {
      then: function (fn) { fn(x); }
    };
  }

  var _map = function (array, accumulator, fn, deferred) {

    if (array.length === 0) {
      deferred.resolve(accumulator);
      return;
    }

    var head   = array.shift(),
        rest   = array;

    if (!isPromise(head)) {
      head = fakePromise(head);
    }

    head.then(function (data) {
      var retval = fn(head);

      if (!isPromise(retval)) {
        retval = fakePromise(retval);
      } 

      retval.then(function (data) {
        accumulator.push(data);
        _map(array, accumulator, fn, deferred);
      });
    });

  };

  return function (array, fn) {
    var deferred = Q.defer();
    _map(array, [], fn, deferred);
    return deferred.promise;
  };

}();
