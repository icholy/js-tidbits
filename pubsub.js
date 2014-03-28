var Hub = (function () {
 
  var Channel = function Channel () {
    this._subscribers = []; 
  };
 
  Channel.prototype.subscribe = function (callback) {
    this._subscribers.push(callback);
    return callback;
  };
 
  Channel.prototype.unsubscribe = function (callback) {
    var idx = this._subscribers.indexOf(callback);
    if (idx !== -1) {
      this._subscribers.splice(idx, 1);
    }
  };
 
  Channel.prototype.publish = function (payload) {
    this._subscribers.forEach(function (subscriber) {
      subscriber(payload);
    }); 
  };
 
  var Hub = function Hub (worker) {
    this._channels = {}; 
  };
  
  Hub.prototype._hasChannel = function (name) {
    return typeof this._channels[name] !== "undefined"
  };
 
  Hub.prototype.subscribe = function (name, callback) {
    if (this._hasChannel(name)) {
      this._channels[name] = new Channel();
    }   
    this._channels[name].subscribe(callback);
    return callback;
  };  
 
  Hub.prototype.unsubscribe = function (name, callback) {
    if (this._hasChannel(name)) {
      this._channels[name].subscribe(callback);
    }   
  };  
 
  Hub.prototype.publish = function (name, playload) {
    if (this._hasChannel(name)) {
      this._channels[name].publish(playload);
    }   
  };  
 
  return Hub;
 
}).call(null);
