(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('ReportPegawaiController', ReportPegawaiController);


    function ReportPegawaiController(EkinerjaService, ReportPegawaiService, $document, $uibModal, $scope) {
        var vm = this;
        vm.loading = true;
        vm.kehadiran = 0;
        vm.kinerja = 0;
        vm.serapan = 5;

        getPegawaiPengaju();
        kehadiran();

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

        function kehadiran(){
            var date = new Date();
            console.log(EkinerjaService.IndonesianDay(new Date(date.getYear(), date.getMonth()+1, 2)));
            var tgl = new Date(date.getYear(), date.getMonth()+1, 0);
            var hariKerja = 0;
            for(var i = 1; i <= date.getDate(); i++){
                if(((new Date(date.getYear(), date.getMonth()+1, i)).getDay()) != 0 && 
                    ((new Date(date.getYear(), date.getMonth()+1, i)).getDay()) != 6)
                hariKerja += 1;
            }
            ReportPegawaiService.GetReport($.parseJSON(sessionStorage.getItem('credential')).nipPegawai, 
                date.getMonth()+1, date.getYear() + 1900).then(
                function(response){debugger
                    vm.kehadiran = (response.length/hariKerja)*85;
                    kinerja(response, hariKerja);
                }, function(errResponse){

                })
            console.log(hariKerja);
        }

        function kinerja(data, hariKerja){
            var kinerja = 0;debugger
            for(var i = 0; i < data.length; i++)
                if(data[i].daftarKinerjaPegawaiWrapper.length)
                    kinerja += 1;
            vm.kinerja = (kinerja/hariKerja)*10;
        }

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();