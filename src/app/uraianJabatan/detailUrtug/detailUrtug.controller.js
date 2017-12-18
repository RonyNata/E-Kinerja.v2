(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('DetailUrtugController', DetailUrtugController);


    function DetailUrtugController(EkinerjaService, $scope, PengumpulanDataBebanKerjaService, $uibModalInstance) {
        var vm = this;

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();