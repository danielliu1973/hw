"use strict";var app=angular.module("app",[]);app.controller("HeaderCtrl",["$scope","model",function(e,t){e.kv_input="",e.message="",e.kv_enter=function(t){13===t.keyCode?e.add():""},e.add=function(){var n=e.kv_input,o=/\w+\s*=\s*\w+/g,i=/(^[a-zA-Z0-9\s*]*$)/g;o.test(n)&&i.test(n.replace("=",""))?(n=n.split("="),n[0]=n[0].trim(),n[1]=n[1].trim(),t.add(n[0],n[1]),e.kv_input=""):e.message="Invalid key/value pair"}}]),app.controller("BodyCtrl",["$scope","model",function(e,t){e.selected=-1,e.toggle_list=!0,e.kv_xml="",e.$watchCollection(t.get_data,function(t,n){e.kv_array=t}),e["delete"]=function(){t.remove()},e.change_selected=function(){t.set_selected(e.selected)},e.order_value=function(){t.sort_value()},e.order_key=function(){t.sort_key()},e.show_xml=function(){e.kv_xml=t.xml(),e.toggle_list=!1},e.show_list=function(){e.toggle_list=!0},e.load_json=function(){new Promise(function(e,t){var n=document.createElement("INPUT");n.setAttribute("type","file"),document.body.appendChild(n),n.style="visibility:hidden",n.addEventListener("change",e),n.click(),document.body.removeChild(n)}).then(function(e){return new Promise(function(t,n){var o=e.target.files[0];if(o){var i=new FileReader;i.onload=t,i.readAsText(o)}})},function(){console.log("Something wrong...")}).then(function(n){t.add_array(JSON.parse(n.target.result)),e.$digest()},function(){console.log("Something wrong...")})},e.save_json=function(){var e=document.createElement("a");e.href="data:text/json;charset=utf-8,"+JSON.stringify(t.get_data()),e.style="visibility:hidden",e.download="kv.json",document.body.appendChild(e),e.click(),document.body.removeChild(e)}}]),app.factory("model",[function(){var e=[],t=[];return{add:function(t,n){e.push({key:t,value:n})},add_array:function(t){e=e.concat(t)},set_selected:function(e){t=e},remove:function(){e=e.filter(function(e,n){return t.indexOf(n+"")<0})},sort_key:function(){return e.sort(function(e,t){var n=e.key,o=t.key;return o>n?-1:n>o?1:0}),e},sort_value:function(){return e.sort(function(e,t){var n=e.value,o=t.value;return o>n?-1:n>o?1:0}),e},xml:function(){var n="<!DOCTYPE html>\n";return n+="<html>\n<body>\n",n+="<select id='kv-list' size='10'>\n",e.map(function(e,o){n+="<option value='"+e.key+"'",n+=t===o?" selected":"",n+=">"+e.key+"="+e.value+"</option>\n"}),n+="</select>",n+="\n</body>\n</html>\n"},get_data:function(){return e}}}]),app.directive("headerPanel",function(){return{templateUrl:"templates/header.html"}}),app.directive("bodyPanel",function(){return{templateUrl:"templates/body.html"}}),function(e){try{e=angular.module("app")}catch(t){e=angular.module("app",[])}e.run(["$templateCache",function(e){e.put("templates/body.html",'<div class="row body"><div class="row label">Key/Value Pair List</div><div class="row"><div class="left-area"><select id="kv-list" size="10" ng-show="toggle_list" multiple="multiple" ng-model="selected" ng-change="change_selected()"><option ng-repeat="option in kv_array" value="{{$index}}">{{option.key + \'=\' + option.value}}</option></select><textarea readonly="readOnly" id="kv-xml" ng-model="kv_xml" ng-hide="toggle_list"></textarea></div><div class="right-area"><div class="row"><button id="order-value-button" ng-click="order_value()">OrderByValue</button></div><div class="row"><button id="order-key-button" ng-click="order_key()">OrderByKey</button></div><div class="row"><button id="delete-button" ng-click="delete()">Delete</button></div><div class="row"><button id="show-xml" ng-show="toggle_list" ng-click="show_xml()">ShowXML</button></div><div class="row"><button id="show-list" ng-hide="toggle_list" ng-click="show_list()">ShowList</button></div><div class="row"><button id="load-json" ng-click="load_json()">LoadData</button></div><div class="row"><button id="save-json" ng-click="save_json()">SaveData</button></div></div></div></div>')}])}(),function(e){try{e=angular.module("app")}catch(t){e=angular.module("app",[])}e.run(["$templateCache",function(e){e.put("templates/header.html",'<div class="row header"><div class="label">Key/Value Pair</div><div class="row"><div class="left-area"><input id="kv-input" ng-keypress="kv_enter($event)" ng-model="kv_input" type="text"></div><div class="right-area"><button id="add-button" ng-click="add()">Add</button></div></div><div class="row" id="message">{{message}}</div></div>')}])}();