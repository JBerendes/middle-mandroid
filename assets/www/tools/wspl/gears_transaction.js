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
 * @fileoverview A Gears implementation of dbwrapperapi Transaction.
 */
/**
 * Creates a Gears Transaction object.
 * @see google.wspl.ResultSet#ResultSet
 *
 * @constructor
 * @extends google.wspl.Transaction
 *
 * @param {number} id The unique id for this transaction
 * @param {google.wspl.gears.Database} db The Gears implementation of the
 *    dbwrapperapi database
 */
google.wspl.gears.Transaction=function(e,t){google.wspl.Transaction.call(this),this.id_=e,this.db_=t,this.activeExecutes_={}},google.inherits(google.wspl.gears.Transaction,google.wspl.Transaction),google.wspl.gears.Transaction.prototype.numActiveExecutes_=0,google.wspl.gears.Transaction.prototype.nextCallbackId_=1,google.wspl.gears.Transaction.prototype.needsRollback_=!1,google.wspl.gears.Transaction.prototype.executeAll=function(e,t){if(e.length==0)throw Error("Possibly silly attempt to execute empty statement list.");this.numActiveExecutes_==0&&this.db_.doBegin(this.id_),this.numActiveExecutes_++;var n=this.nextCallbackId_++,r=t||{onSuccess:function(){},onFailure:function(){}};this.activeExecutes_[n]={statements:e,currentStatement:0,callback:r},this.db_.doExecute(e,n,this.id_)},google.wspl.gears.Transaction.prototype.success=function(e,t){if(!this.needsRollback_){var n=this.activeExecutes_[t];n.callback.onSuccess(this,e)}this.endStatement_(t)},google.wspl.gears.Transaction.prototype.failure=function(e,t){if(!this.needsRollback_){this.needsRollback_=!0;var n=this.activeExecutes_[t];n.callback.onFailure(e)}this.endStatement_(t)},google.wspl.gears.Transaction.prototype.endStatement_=function(e){var t=this.activeExecutes_[e],n=t.statements,r=++t.currentStatement;r==n.length&&this.endExecute_(e)},google.wspl.gears.Transaction.prototype.endExecute_=function(e){delete this.activeExecutes_[e],this.numActiveExecutes_--,this.isExecuting()||this.endTransaction_()},google.wspl.gears.Transaction.prototype.endTransaction_=function(){this.needsRollback_?this.db_.doRollback(this.id_):this.db_.doCommit(this.id_)},google.wspl.gears.Transaction.prototype.isExecuting=function(){return this.numActiveExecutes_>0};