(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('DetailReportPegawaiKegiatanController', DetailReportPegawaiKegiatanController);


    function DetailReportPegawaiKegiatanController(EkinerjaService, $uibModalInstance) {
        var vm = this;

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();