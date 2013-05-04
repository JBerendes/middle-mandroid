/*
  Copyright 2009 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
/**
 * @fileoverview Generic Database API.
 *
 * A small set of classes to define how we interact with databases that
 * can easily be implemented on top of HTML5.
 */
google.wspl.html5=google.wspl.html5||{},google.wspl.LARGEST_SUPPORTED_DATABASE=4194304,google.wspl.html5.Transaction=function(e){this.tx_=e},google.inherits(google.wspl.html5.Transaction,google.wspl.Transaction),google.wspl.html5.Transaction.prototype.executeAll=function(e,t){if(e.length==0)throw Error("Possibly silly attempt to execute empty statement list.");var n=this;for(var r=0;r<e.length;++r){var i=e[r];google.logger("SQL: "+i.sql+" PARAMS: "+i.params),this.tx_.executeSql(i.sql,i.params,function(e,r){if(t&&t.onSuccess){var i=new google.wspl.html5.ResultSet(r);t.onSuccess(n,i)}},function(e,n){return t&&t.onFailure&&t.onFailure(n),!0})}},google.wspl.html5.Database=function(e,t){this.sequenceNum_=1,this.inflightTransactions_={};var n=t||window;this.db_=n.openDatabase(e,"",e,google.wspl.LARGEST_SUPPORTED_DATABASE);if(this.db_==null)throw Error("The returned database was null.")},google.inherits(google.wspl.html5.Database,google.wspl.Database),google.wspl.html5.Database.prototype.createTransaction=function(e,t){var n=t||{onSuccess:function(){},onFailure:function(){}},r=this.sequenceNum_++,i=this.inflightTransactions_;i[r]=this.getCurrentTime(),this.db_.transaction(function(t){delete i[r],e(new google.wspl.html5.Transaction(t))},function(e){n.onFailure(e)},function(){n.onSuccess()})},google.wspl.html5.Database.prototype.hasInflightTransactions=function(e){for(var t in this.inflightTransactions_){var n=this.inflightTransactions_[t];if(this.getCurrentTime()-n>e)return!0}return!1},google.wspl.html5.Database.prototype.getCurrentTime=function(){var e=new Date;return e.getTime()},google.wspl.html5.ResultSet=function(e){this.result_=e,this.index_=0},google.inherits(google.wspl.html5.ResultSet,google.wspl.ResultSet),google.wspl.html5.ResultSet.prototype.isValidRow=function(){return this.index_>=0&&this.index_<this.result_.rows.length},google.wspl.html5.ResultSet.prototype.next=function(){this.index_++},google.wspl.html5.ResultSet.prototype.getRow=function(){return this.result_.rows.item(this.index_)};