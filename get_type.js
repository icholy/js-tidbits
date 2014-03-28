Object.getType = function (obj) {
   if (isNaN(obj)) return "nan";
   return toString.call(obj).slice(8, -1).toLowerCase();
};
 
Object.getType({})        // => 'object'
Object.getType([])        // => 'array'
Object.getType(12)        // => 'number'
Object.getType(NaN)       // => 'nan'
Object.getType(undefined) // => 'undefined'
Object.getType(null)      // => 'null'
