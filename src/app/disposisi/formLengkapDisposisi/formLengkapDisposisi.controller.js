(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('FormLengkapDisposisiController', FormLengkapDisposisiController);


    function FormLengkapDisposisiController(EkinerjaService, $scope, AmbilDisposisiService, kdLembar, $uibModal, $uibModalInstance, DisposisiService) {
        var vm = this;
        vm.item = {};
        vm.target = [];

        vm.item.kdLembarDisposisi = kdLembar;

        if($.parseJSON(sessionStorage.getItem('credential')).eselon.split('.')[0].toLowerCase() == 'iv')
            vm.isEselon4 = true;
        else vm.isEselon4 = false;

        getAllPegawai();
        function getAllPegawai(){
            DisposisiService.GetPegawaiBawahan($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
                function(response){
                    vm.list_pegawai = response;
                    vm.loading = false;
                }, function(errResponse){

                })
        }

        vm.getPegawai = function(idx){
            if(vm.target[idx].pegawai.length == 18)
                vm.target[idx].pegawaiTarget = EkinerjaService.findPegawaiByNip(vm.target[idx].pegawai,vm.list_pegawai);
        };

        vm.getPegawaiDari = function(){
            if(vm.item.nipDari.length == 18)
                vm.item.dariSuratDisposisi = EkinerjaService.findPegawaiByNip(vm.item.nipDari,vm.list_pegawai);
            console.log(vm.item.dariSuratDisposisi);
        };

        vm.openPegawai = function (parentSelector) {debugger
            if(vm.isEselon4){
                var template = 'app/template/dataPegawai/dataPegawai.html';
                var ctrl = 'DataPegawaiController';
                var ctrlAs = 'datapegawai';
                var rlv = { pegawai: function(){ return vm.list_pegawai; },
                    pegawaiPilihan: function(){ return vm.target; },
                    isPilihan: function(){ return 0; }
                }
            } else{
                var template = 'app/template/dataJabatan/dataJabatan.html';
                var ctrl = 'DataJabatanController';
                var ctrlAs = 'datajabatan';
                var rlv = { jabatan: function(){ return vm.list_pegawai; },
                    jabatanPilihan: function(){ return vm.target; },
                    isPilihan: function(){ return 0; }
                }
            }
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: template,
                controller: ctrl,
                controllerAs: ctrlAs,
                // windowClass: 'app-modal-window',
                size: 'lg',
                appendTo: parentElem,
                resolve: rlv
            });

            modalInstance.result.then(function () {
            }, function () {

            });
        };

        vm.openPilihan = function (parentSelector) {
            if(vm.isEselon4){
                var template = 'app/template/dataPegawai/dataPegawai.html';
                var ctrl = 'DataPegawaiController';
                var ctrlAs = 'datapegawai';
                var rlv = { pegawai: function(){ return vm.target; },
                    pegawaiPilihan: function(){ return vm.target; },
                    isPilihan: function(){ return 1; }
                }
            } else{
                var template = 'app/template/dataJabatan/dataJabatan.html';
                var ctrl = 'DataJabatanController';
                var ctrlAs = 'datajabatan';
                var rlv = { jabatan: function(){ return vm.target; },
                    jabatanPilihan: function(){ return vm.target; },
                    isPilihan: function(){ return 1; }
                }
            }
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: template,
                controller: ctrl,
                controllerAs: ctrlAs,
                // windowClass: 'app-modal-window',
                size: 'lg',
                appendTo: parentElem,
                resolve: rlv
            });

            modalInstance.result.then(function () {
            }, function () {

            });
        };

        vm.complate = function(){
            var data = {
                "kdDraftLembarDisposisi" : kdLembar,
                "tktKeamanan": vm.item.tktKeamanan,
                "tglPenyelesaianMilis": vm.item.tglPenyelesaianMilis.getTime(),
                "daftarTargetJabatanLembarDisposisi": [],
                "isiDisposisi": vm.item.isiDisposisi,
                "durasiPengerjaan": vm.item.durasiPengerjaan
            };

            for(var i = 0; i < vm.target.length; i++)
                if(vm.isEselon4){
                    data.daftarTargetJabatanLembarDisposisi.push(vm.target[i].nipPegawai);
                    data.isTargetJabatan = false;
                }
                else {
                    data.daftarTargetJabatanLembarDisposisi.push(vm.target[i].kdJabatan);
                    data.isTargetJabatan = true;
                }
            console.log(data);

            AmbilDisposisiService.ComplateDisposisi(data).then(
                function(response){
                    EkinerjaService.showToastrSuccess("Disposisi Berhasil Dikirim");
                    vm.cancel();
                }, function(errResponse){

                })
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
