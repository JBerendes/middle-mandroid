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
 * A small set of classes to define how we interact with databases that can
 * easily be implemented on top of HTML5 and Gears.  The classes in this file
 * should be extended to provide the missing method implementations and more
 * sophisticated constructors where applicable.
 *
 */
/**
 * Constructs a Statement object.  A Statement is an SQL statement paired
 * with the parameters needed to execute it.
 *
 * @constructor
 * @param {!string} sql The SQL statement.
 * @param {Array.<Object>?} opt_params The parameters for the SQL statement.
 */
google.wspl.Statement=function(e,t){this.sql=e,this.params=t||[]},google.wspl.Statement.prototype.createStatement=function(e){return new google.wspl.Statement(this.sql,e)},google.wspl.Transaction=function(){},google.wspl.Transaction.prototype.execute=function(e,t){this.executeAll([e],t)},google.wspl.Transaction.prototype.executeAll=function(e,t){throw Error("executeAll not implemented")},google.wspl.Database=function(){},google.wspl.Database.prototype.createTransaction=function(e,t){throw Error("createTransaction not implemented")},google.wspl.Database.prototype.execute=function(e,t,n){this.createTransaction(function(n){n.execute(e,t)},n)},google.wspl.Database.prototype.executeAll=function(e,t,n){this.createTransaction(function(n){n.executeAll(e,t)},n)},google.wspl.ResultSet=function(){},google.wspl.ResultSet.prototype.isValidRow=function(){throw Error("isValidRow not implemented")},google.wspl.ResultSet.prototype.next=function(){throw Error("next not implemented")},google.wspl.ResultSet.prototype.getRow=function(){throw Error("getRow not implemented")};