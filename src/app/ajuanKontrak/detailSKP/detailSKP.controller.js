(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('DetailSKPController', DetailSKPController);


    function DetailSKPController(data, $uibModalInstance) {
        var vm = this;

        vm.skp = data;

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();