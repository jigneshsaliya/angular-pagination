'use strict';
/*global angular*/
/**
 * extends
 *
 * @module f7
 * @submodule factories
 * @class extends
 * @author Ashvin-iMac
 * @date Thu Dec 24 2015 14:11:52 GMT+0530 (IST)
 */

esWebApp.factory('extends', [
  function() {
    return {
      isolatedScope : function(from, to) {
        for (var iterate in from.$$isolateBindings) {
          if (from[iterate] !== undefined) {
            to[iterate] = from[iterate];
          }
        }
      }
    };
  }
]);
