(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('TeruskanTemplateController', TeruskanTemplateController);


    function TeruskanTemplateController(EkinerjaService, template, KontrakPegawaiService, $uibModalInstance) {
        var vm = this;
        template.kdTemplateLainBawahan = template.kdSurat;
        template.namaFileLaporanBawahan = template.namaFileTemplateLain + '.' + template.extensiFile;
        vm.template = angular.copy(template);
        vm.template.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
        vm.template.nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
        vm.template.kdJabatan = $.parseJSON(sessionStorage.getItem('credential')).kdJabatan;
        vm.save = function(){
            KontrakPegawaiService.UploadTemplateData(vm.template).then(
                function(response){
                    EkinerjaService.showToastrSuccess("Laporan Berhasil Diteruskan");
                    $uibModalInstance.close();
                }, function(errResponse){
                    if(errResponse.status == -1)
                        EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
                })
        }

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.reset = function(){
            vm.item = angular.copy(items);
        };
    }
})();