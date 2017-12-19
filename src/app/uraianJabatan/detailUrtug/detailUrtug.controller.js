(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('DetailUrtugController', DetailUrtugController);


    function DetailUrtugController(EkinerjaService, $scope, urtug, PengumpulanDataBebanKerjaService, $uibModalInstance) {
        var vm = this;

        vm.urtug = urtug;
        vm.urtug.waktuDisplay = urtug.waktu + " Bulan";
        if(vm.urtug.biaya != undefined)
            vm.urtug.biayaDisplay = "Rp. " + urtug.biaya;
        else{
            vm.isEselon4 = true;
            vm.urtug.biayaDisplay = "Rp. " + EkinerjaService.FormatRupiah(urtug.paguAnggaran);
        } 

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();