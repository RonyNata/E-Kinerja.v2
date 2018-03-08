(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('ReportPegawaiController', ReportPegawaiController);


    function ReportPegawaiController(EkinerjaService, ReportPegawaiService, $document, $uibModal, $scope) {
        var vm = this;
        vm.loading = true;

        getPegawaiPengaju();

        function getPegawaiPengaju(){
            ReportPegawaiService.GetPegawaiPengaju($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
                $.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
                function(response){
                    vm.list_pegawai = response;
                    vm.loading = false;
                }, function(errResponse){

                })
        };

        vm.open = function (pegawai, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/reportPegawai/detailReportPegawai/detailReportPegawai.html',
                controller: 'DetailReportPegawaiController',
                controllerAs: 'detailReportPegawai',
                size: 'lg',
                appendTo: parentElem,
                resolve: {
                    pegawai: function () {
                        return pegawai;
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