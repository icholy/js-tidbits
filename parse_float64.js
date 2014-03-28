var hexFloat64 = "000000000000F03F";
 
var makeByteStream = function (hex) {
  return function (n)  {
    var i, bytes = [];
    for (i = 0; i < n; i++) {
      bytes.push(hex.slice(0, 2));
      hex = hex.substr(2);
    }
    return bytes;
  };
};
 
var makeBitStream = function (allbits) {
  return function (n) {
    var bits = allbits.slice(0, n);
    allbits = allbits.substr(n);
    return bits;
  };
};
 
var take = makeByteStream(hexFloat64);
 
var pad = function (nibble) {
  switch (nibble.length) {
    case 1: return "000" + nibble;
    case 2: return "00"  + nibble;
    case 3: return "0"   + nibble;
    default: return nibble;
  }
  return nibble;
}
 
var bits = take(8).map(function (byte) {
  return pad(parseInt(byte[0], 16).toString(2))
       + pad(parseInt(byte[1], 16).toString(2));
}).reverse().reduce(function (acc, bits) { return acc + bits; });
 
take = makeBitStream(bits);
 
var sign = parseInt(take(1), 10);
var bias = 1023;
var e = parseInt(take(11), 2);
var E = e - bias;
var mantissa = parseInt(take(52), 2);
 
console.log(
  Math.pow(-1, sign) * (1 + mantissa) * Math.pow(2, E)
);
