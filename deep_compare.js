var compare = (function() {
  var cmp, cmpObject, cmpArray;
  cmpObject = function (v1, v2) {
    var v1keys = Object.keys(v1),
        v2keys = Object.keys(v2);
    if (v2keys.length !== v1keys.length) return false;
    return v1keys.every(function(key) { return cmp(v1[key], v2[key]); });
  };
  cmpArray = function (v1, v2) {
    if (v1.length !== v2.length) return false;
    var i = 0, len = v1.length;
    for (; i < len; i++) { if (!cmp(v1[i], v2[i])) return false; }
    return true;
  };
  cmp = function (v1, v2) {
    var v1Type = Object.prototype.toString.call(v1),
        v2Type = Object.prototype.toString.call(v1);
    if (v1Type !== v2Type) return false;
    switch (v1Type) {
      case "[object Array]" : return cmpArray(v1, v2);
      case "[object Object]": return cmpObject(v1, v2);
                    default : return v1 === v2;
    }
  };
  return cmp;
}());
