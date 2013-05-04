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
 * @fileoverview Some simple utilities for supporting Gears usage.
 */
google.wspl.GearsUtils=google.wspl.GearsUtils||{},google.wspl.GearsUtils.resultSetToObjectArray=function(e){var t=[];if(e){var n=e.fieldCount(),r=[];for(var i=0;i<n;i++)r.push(e.fieldName(i));while(e.isValidRow()){var s={};for(var i=0;i<n;i++)s[r[i]]=e.field(i);t.push(s),e.next()}}return t},google.wspl.GearsUtils.MAX_FILE_NAME_LENGTH_=64,google.wspl.GearsUtils.makeSafeFileName_=function(e){var t=e.replace(/[^a-zA-Z0-9\.\-@_]/g,"");return t.length<=google.wspl.GearsUtils.MAX_FILE_NAME_LENGTH_?t:t.substring(0,google.wspl.GearsUtils.MAX_FILE_NAME_LENGTH_)},google.wspl.GearsUtils.openDatabase=function(e,t,n,r){var i=e+"-"+t,s=google.wspl.GearsUtils.makeSafeFileName_(i);return r&&i!=s&&r("database name "+i+"->"+s),n.open(s),n};