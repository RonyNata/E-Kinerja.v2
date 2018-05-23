(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('DetailKegiatanController', DetailKegiatanController);


    function DetailKegiatanController(kegiatan, $uibModalInstance) {
        var vm = this;

        vm.kegiatan = kegiatan;

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();