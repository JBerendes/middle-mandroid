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
 * @fileoverview Global function implementations used for running the
 * web storage portability layer code outside of the Google internal
 * development environment.
 *
 * Include this file only once.
 *
 */
/**
 * Namespace object.
 * @type {Object}
 */
var google=google||{};google.wspl=google.wspl||{},google.wspl.gears=google.wspl.gears||{},google.inherits=function(e,t){function n(){}n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e},google.bind=function(e,t){return function(){return e.apply(t,arguments)}},google.nullFunction=function(){},google.logger=function(e){};