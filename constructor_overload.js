// jsBin  => http://jsbin.com/eqipuk/1/edit
// jsPerf => http://jsperf.com/constructor-overloading
var Module = (function() {
 
  var _ctors = {}, _ctor_count = 0, ctor, Proto,
      constructor = function(fn) {
        _ctors[fn.length] = fn;
        switch (_ctor_count++) { 
          case 0: ctor = fn; break;
          case 1: ctor = function() {_ctors[arguments.length].apply(this, arguments);};}
        Proto = ctor.prototype; };
 
  constructor(function(a) {
    this.constructor(a, 'world');
  });
 
  constructor(function(a, b) {
    this.a = a;
    this.b = b;
  });
  
  Proto.method = function() {
    return this.a + ' ' + this.b;
  };
 
  return ctor;
 
}());
