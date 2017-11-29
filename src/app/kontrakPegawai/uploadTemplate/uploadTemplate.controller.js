(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('UploadTemplateController', UploadTemplateController);


    function UploadTemplateController(EkinerjaService, KontrakPegawaiService, $uibModalInstance, $state, urtug, isDPA) {
        var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.urtug=urtug;
        vm.isDPA=isDPA;

        vm.uploadTemplate = function () {
            var data = {
                "kdUrtug": vm.urtug.kdUrtug,
                "kdKegiatan": "",
                "durasiPengerjaan": vm.item.durasipenyelesaian,
                "keterangan": vm.item.keterangan,
                "file": "",
                "isDPA": isDPA
            }

            if(isDPA){
                data.kdKegiatan = vm.urtug.kdKegiatan;
            }

            KontrakPegawaiService.uploadTemplate(data).then(
                function(response){
                    EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
                }, function(errResponse){

                })
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.reset = function(){
            vm.item = angular.copy(items);
        };
    }
})();