(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('DetailReportPegawaiController', DetailReportPegawaiController);


    function DetailReportPegawaiController(pegawai, EkinerjaService,$document,
                                   KontrakPegawaiService, ReportPegawaiService, $uibModalInstance, $uibModal) {
        var vm = this;
        vm.nama = pegawai.namaPegawai;

        vm.report = function(){
            ReportPegawaiService.GetReport(pegawai.nipPegawai, vm.bulan, vm.tahun).then(
                function(response){
                    if(response.length == 0){
                        EkinerjaService.showToastrError("TIDAK ADA DATA");
                    } else {
                        vm.rekap = response;
                    }
                }, function(errResponse){

                })
        };

        vm.open = function (list,tanggal, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/reportPegawai/detailReportPegawaiKegiatan/detailReportPegawaiKegiatan.html',
                controller: 'DetailReportPegawaiKegiatanController',
                controllerAs: 'detailReportPegawaiKegiatan',
                windowClass: 'app-modal-windows',
                appendTo: parentElem,
                resolve: {
                    list: function () {
                        return list;
                    },
                    tanggal: function () {
                        return tanggal;
                    }
                }
            });

            modalInstance.result.then(function () {
                // showToastrSuccess('ditambahkan');
                // getUrtugByJabatan();
                getPegawaiPengaju();
                EkinerjaService.showToastrSuccess('Ajuan Berhasil Disetujui');
                // vm.selected = selectedItem;
            }, function () {
                // showToastrFailed('menambahkan data');
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();