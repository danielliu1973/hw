(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/header.html',
    '<div class="row header"><div class="label">Key/Value Pair</div><div class="row"><div class="left-area"><input id="kv-input" ng-keypress="kv_enter($event)" ng-model="kv_input" type="text"></div><div class="right-area"><button id="add-button" ng-click="add()">Add</button></div></div><div class="row" id="message">{{message}}</div></div>');
}]);
})();
