var IdGenerator = (function () {
 
    var defaultCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_-+=[]{};:?/.>,<|".split("");
 
    var IdGenerator = function IdGenerator(charset) {
        this._charset = (typeof charset === "undefined") ? defaultCharset : charset;
        this.reset();
    };
 
    IdGenerator.prototype._str = function () {
        var str = "",
            perm = this._perm,
            chars = this._charset,
            len = perm.length,
            i;
        for (i = 0; i < len; i++) {
            str += chars[perm[i]];
        }
        return str;
    };
 
    IdGenerator.prototype._inc = function () {
        var perm = this._perm,
            max = this._charset.length - 1,
            i;
        for (i = 0; true; i++) {
            if (i > perm.length - 1) {
                perm.push(0);
                return;
            } else {
                perm[i]++;
                if (perm[i] > max) {
                    perm[i] = 0;
                } else {
                    return;
                }
            }
        }
    };
 
    IdGenerator.prototype.reset = function () {
        this._perm = [];
    };
 
    IdGenerator.prototype.next = function () {
        this._inc();
        return this._str();
    };
 
    return IdGenerator;
}).call(null);
