(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('ReportPegawaiController', ReportPegawaiController);


    function ReportPegawaiController(EkinerjaService, ReportPegawaiService, $document, $uibModal, $scope) {
        var vm = this;
        vm.loading = true;

        getPegawaiPengaju();

        $scope.$watch('nipPegawai', function(){
            if($scope.nipPegawai != ''){
                vm.namaPegawai = EkinerjaService.searchByNip($scope.nipPegawai, vm.list_pegawai);
                vm.namaPegawai = vm.namaPegawai[0].namaPegawai;
                searchPegawaiByNip();
            }
        });

        function searchPegawaiByNip(pegawai){
            vm.list_ajuan = pegawai.uraianTugasDiajukan;
            vm.list_tidakdiajukan = pegawai.uraianTugasTidakDipilih;
            for(var i = 0; i < vm.list_ajuan.length; i++){
                vm.list_ajuan[i].biayaRp = EkinerjaService.FormatRupiah(vm.list_ajuan[i].biaya);
                vm.list_ajuan[i].terima = true;
            }
            for(var i = 0; i < vm.list_tidakdiajukan.length; i++)
                vm.list_tidakdiajukan[i].biayaRp = EkinerjaService.FormatRupiah(vm.list_tidakdiajukan[i].biaya);
        }

        function getPegawaiPengaju(){
            ReportPegawaiService.GetPegawaiPengaju($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
                $.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
                function(response){
                    vm.list_pegawai = response;debugger
                    vm.loading = false;
                }, function(errResponse){

                })
        };

        vm.open = function (pegawai, parentSelector) {
            searchPegawaiByNip(pegawai);
            var eselon = pegawai.eselon.split('.')[0].toLowerCase();
            switch(eselon){
                case 'i' : case 'ii' : case 'iii' : vm.isEselon4 = false; break;
                default : vm.isEselon4 = true; break;
            }
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/reportPegawai/detailReportPegawai/detailReportPegawai.html',
                controller: 'DetailReportPegawaiController',
                controllerAs: 'detailReportPegawai',
                windowClass: 'app-modal-windows',
                appendTo: parentElem,
                resolve: {
                    list_ajuan: function () {
                        return vm.list_ajuan;
                    },
                    list_tidakdiajukan: function () {
                        return vm.list_tidakdiajukan;
                    },
                    nama: function(){
                        return pegawai.namaPegawai;
                    },
                    nip: function(){
                        return pegawai.nipPegawai;
                    },
                    isEselon4: function(){
                        return vm.isEselon4;
                    },
                    unit: function(){
                        return pegawai.kdUnitKerja;
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
    }
})();