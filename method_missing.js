var method_missing = function (o, callback) {
  try {
    return callback(o);
  } catch (e) {
    var method = e.arguments[0], fake = {}, retval;
    fake[method] = function (/* ... */) {
      retval = o.method_missing.call(o, method, arguments);
    };
    callback(fake);
    return retval
  }
};

var obj = {
  method_missing: function (method, arguments) {
    var args = [].slice.call(arguments).join(", ");
    console.log(method + "(" + args + ")");
  }
};

method_missing(obj, function (obj) {
  obj.this_is_a_test('kewl');
});

