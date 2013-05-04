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
 * @fileoverview template.js contains the implementation for a simple template
 * scheme. Templates are fragments of HTML containing patterns into which
 * arguments will be substituted.
 */
google.wspl.simplenotes=google.wspl.simplenotes||{},google.wspl.simplenotes.Template=function(e){this.template_=e,this.res_=null},google.wspl.simplenotes.Template.prototype.process=function(e,t){var n=t||!1;if(n||this.res_==null){var r=[];this.res_=null;for(var i in e)r.push("%"+String(i)+"%");r.length>0&&(this.res_=new RegExp(r.join("|"),"g"))}return this.res_!=null?this.template_.replace(this.res_,function(t){var n=t.slice(1,-1);return e[n]}):this.template_};