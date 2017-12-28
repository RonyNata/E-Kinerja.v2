(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('DetailReportPegawaiKegiatanController', DetailReportPegawaiKegiatanController);


    function DetailReportPegawaiKegiatanController(list, tanggal, EkinerjaService, $uibModalInstance) {
        var vm = this;

        vm.list = list;
        vm.tanggal = tanggal;

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();