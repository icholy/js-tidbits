function Harray(prop, insertMethod){
  this.keyProperty = prop;
  this.h = {};
  this.insertMethod = (insertMethod != null)
                      ? Array.prototype[insertMethod]
                      : Array.prototype.push;
};
 
Harray.prototype = new Array();
Harray.prototype.constructor = Harray;
 
Harray.prototype.add = function(value){
  this.h[value[this.keyProperty]] = value;
  this.insertMethod(value);
};
 
Harray.prototype.remove = function(value){
  delete this.h[value[this.keyProperty]];
  this.splice(this.indexOf(value), 1);
};
 
Harray.prototype.removeKey = function(key){
  this.splice(this.indexOf(this.h[key]), 1);
  delete this.h[key];
};
 
Harray.prototype.removeAt = function(idx){
  delete this.h[this[idx][this.keyProperty]];
  this.splice(idx, 1);
};
