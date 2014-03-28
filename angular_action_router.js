angular.module('App', []).run(function ($rootScope, $route) {
 
    var prevActionPathArray,
        prevActionPath;
 
    $rootScope.getActionPathArray = function () {
 
      if (!$route.current || !$route.current.action) {
        return [];
      }
 
      var actionPath = $route.current.action,
          actionPathArray;
 
      if (actionPath === prevActionPath) {
        actionPathArray = prevActionPathArray;
      } else {
        prevActionPathArray = actionPathArray = actionPath.split('.');
        prevActionPath = actionPath;
      }
 
      return actionPathArray;
    };
 
    $rootScope.getActionIndex = function () {
      if (!this.hasOwnProperty('_actionIndex')) {
        this._actionIndex = this._actionIndex + 1 || 0;
      }
 
      return this._actionIndex;
    };
 
    $rootScope.getAction = function (idx) {
 
      var actionPathArray = this.getActionPathArray(),
          actionIndex = this.getActionIndex();
 
      return actionPathArray[actionIndex];
    };
 
    $rootScope.onAction = function (callback) {
 
      var prevAction,
          scope = this;
 
      scope.$watch('actionArray', function () {
        var action = scope.getAction();
        if (action !== prevAction) {
          prevAction = action;
          callback.call(null, action);
        }
      });
 
      prevAction = scope.getAction();
      callback.call(null, prevAction);
    };
 
    $rootScope.setAction = function (name) {
      name = name || 'action';
      var scope = this;
      scope.onAction(function (action) { 
        scope[name] = action;
      });
    };
 
    $rootScope.$on('$routeChangeSuccess', function () {
       $rootScope.actionArray =  $rootScope.getActionPathArray();
    });
 
  });
