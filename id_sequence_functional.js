var IdGenerator = (function () {
 
    var defaultCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_-+=[]{};:?/.>,<|".split("");
 
    var IdGenerator = function IdGenerator(charset) {
        if (typeof charset === "undefined") {
            this._charset = defaultCharset;
        } else {
            this._charset = charset;
        }
        this.reset();
    };
 
    IdGenerator.prototype._str = function () {
        return this._perm.map(function (x) {
            return this._charset[x];
        }.bind(this)).join("");
    };
 
    IdGenerator.prototype._inc = function (perm, idx) {
        if (idx > perm.length - 1) {
            perm.push(0);
            return perm;
        } else {
            perm[idx]++;
            if (perm[idx] > this._charset.length - 1) {
                perm[idx] = 0;
                return this._inc(perm, idx + 1);
            } else {
                return perm;
            }
        }
    };
 
    IdGenerator.prototype.reset = function () {
        this._perm = [];
    };
 
    IdGenerator.prototype.next = function () {
        this._perm = this._inc(this._perm, 0);
        return this._str();
    };
 
    return IdGenerator;
}).call(null);
