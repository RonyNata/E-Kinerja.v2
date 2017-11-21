(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('PengumumanController', PengumumanController);

    function PengumumanController(EkinerjaService, PengumumanService, $scope, $state) {
        var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.judul = 'Pengumuman Penting';



    }
})();