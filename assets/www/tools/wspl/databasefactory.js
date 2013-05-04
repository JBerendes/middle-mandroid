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
// Namespace.
google.wspl.DatabaseFactory=google.wspl.DatabaseFactory||{},google.wspl.DatabaseFactory.createDatabase=function(e,t){var n;if(window.openDatabase)n=new google.wspl.html5.Database(e);else{var r=goog.gears.getFactory().create("beta.database"),i=goog.gears.getFactory().create("beta.workerpool");n=new wireless.db.gears.Database,n.openDatabase("",e,r),i.onmessage=google.bind(n.onMessage_,n),n.startWorker(i,t,0)}return n};