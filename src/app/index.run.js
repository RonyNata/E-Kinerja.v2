(function() {
  'use strict';

  angular
    .module('eKinerja')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
