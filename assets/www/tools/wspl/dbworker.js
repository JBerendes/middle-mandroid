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
 * @fileoverview A worker thread that performs synchronous queries against a
 * Gears database on behalf of an asynchronous calling client.
 *
 * The worker replies to the sender with messages to pass results, errors, and
 * notifications about completed transactions. The type field of the message
 * body specifies the message type. For each successful statement, a RESULT
 * message is sent with a result attribute containing the Gears result set. For
 * the first unsuccessful statement, an ERROR message will be sent with details
 * stored in the error field. After the transaction has been committed, a COMMIT
 * message is sent. If the transaction is rolled back, a ROLLBACK message is
 * sent.
 *
 * NB: The worker must be served over http. Further, to operate successfully,
 * it requires the inclusion of global_functions.js and gearsutils.js.
 */
/**
 * Creates a DbWorker to handle incoming messages, execute queries, and return
 * results to the main thread.
 *
 * @param {GearsWorkerPool} wp The gears worker pool.
 * @constructor
 */
google.wspl.gears.DbWorker=function(e){this.transactions_=[],this.wp_=e,this.wp_.onmessage=google.bind(this.onMessage_,this),this.sendMessageToWorker_({type:google.wspl.gears.DbWorker.ReplyTypes.STARTED})},google.wspl.gears.DbWorker.prototype.db_,google.wspl.gears.DbWorker.instance_,google.wspl.gears.DbWorker.prototype.senderId_=0,google.wspl.gears.DbWorker.CommandTypes={OPEN:1,BEGIN:2,EXECUTE:3,COMMIT:4,ROLLBACK:5},google.wspl.gears.DbWorker.ReplyTypes={RESULT:1,FAILURE:2,COMMIT:3,ROLLBACK:4,STARTED:5,OPEN_SUCCESSFUL:6,OPEN_FAILED:7,LOG:8},google.wspl.gears.DbWorker.start=function(){var e=google.gears.workerPool;google.wspl.gears.DbWorker.instance_=new google.wspl.gears.DbWorker(e)},google.wspl.gears.DbWorker.prototype.handleOpen_=function(e,t){this.log_("Attempting to create Gears database: userId="+e+", name="+t);try{this.db_=google.gears.factory.create("beta.database","1.0"),google.wspl.GearsUtils.openDatabase(e,t,this.db_,this.log_),this.sendMessageToWorker_({type:google.wspl.gears.DbWorker.ReplyTypes.OPEN_SUCCESSFUL})}catch(n){this.sendMessageToWorker_({type:google.wspl.gears.DbWorker.ReplyTypes.OPEN_FAILED,error:n})}},google.wspl.gears.DbWorker.prototype.handleExecute_=function(e,t,n){var r=this;try{this.executeAll_(e,function(e){r.sendMessageToWorker_({type:google.wspl.gears.DbWorker.ReplyTypes.RESULT,results:e,callbackId:t,transactionId:n})})}catch(i){this.sendMessageToWorker_({type:google.wspl.gears.DbWorker.ReplyTypes.FAILURE,error:i,callbackId:t,transactionId:n})}},google.wspl.gears.DbWorker.prototype.executeAll_=function(e,t){var n=[];for(var r=0;r<e.length;r++){var i=this.db_.execute(e[r].sql,e[r].params),s=google.wspl.GearsUtils.resultSetToObjectArray(i);n.push(s)}t(n)},google.wspl.gears.DbWorker.prototype.handleBegin_=function(e){this.transactions_.push(e),this.db_.execute("BEGIN IMMEDIATE")},google.wspl.gears.DbWorker.prototype.handleCommit_=function(e){this.db_.execute("COMMIT"),this.postCommit_()},google.wspl.gears.DbWorker.prototype.handleRollback_=function(e){this.db_.execute("ROLLBACK"),this.postRollback_()},google.wspl.gears.DbWorker.prototype.postCommit_=function(){for(var e=this.transactions_.length-1;e>=0;e--)this.sendMessageToWorker_({type:google.wspl.gears.DbWorker.ReplyTypes.COMMIT,transactionId:this.transactions_[e]});this.transactions_=[]},google.wspl.gears.DbWorker.prototype.postRollback_=function(){for(var e=this.transactions_.length-1;e>=0;e--)this.sendMessageToWorker_({type:google.wspl.gears.DbWorker.ReplyTypes.ROLLBACK,transactionId:this.transactions_[e]});this.transactions_=[]},google.wspl.gears.DbWorker.prototype.onMessage_=function(e,t,n){this.senderId_=n.sender;var r=n.body,i=r.type,s=r.name,o=r.statements,u=r.callbackId,a=r.transactionId,f=r.userId;try{switch(i){case google.wspl.gears.DbWorker.CommandTypes.OPEN:this.handleOpen_(f,s);break;case google.wspl.gears.DbWorker.CommandTypes.EXECUTE:this.handleExecute_(o,u,a);break;case google.wspl.gears.DbWorker.CommandTypes.BEGIN:this.handleBegin_(a);break;case google.wspl.gears.DbWorker.CommandTypes.COMMIT:this.handleCommit_(a);break;case google.wspl.gears.DbWorker.CommandTypes.ROLLBACK:this.handleRollback_(a)}}catch(l){this.log_("Database worker failed: "+l.message)}},google.wspl.gears.DbWorker.prototype.log_=function(e){this.sendMessageToWorker_({type:google.wspl.gears.DbWorker.ReplyTypes.LOG,msg:e})},google.wspl.gears.DbWorker.prototype.sendMessageToWorker_=function(e){this.wp_.sendMessage(e,this.senderId_)};