(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('UploadTemplateController', UploadTemplateController);


    function UploadTemplateController(EkinerjaService, KontrakPegawaiService, $uibModalInstance, 
        $scope, $state, urtug, isDPA, API, $http, $uibModal) {
        var vm = this;
        vm.bulan = EkinerjaService.IndonesianMonth(new Date());
        vm.tahun = EkinerjaService.IndonesianYear(new Date());
        vm.loading = true;
        vm.item = {};
        vm.data = {};
        
        vm.urtug=urtug;
        vm.isDPA=isDPA;
        vm.data.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
        vm.data.nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
        vm.data.kdUrtug = vm.urtug.kdUrtug;
        vm.data.kdJenisUrtug = vm.urtug.kdJenisUrtug;
        vm.data.bulanUrtug = vm.urtug.bulanUrtug;
        vm.data.kdJabatan = $.parseJSON(sessionStorage.getItem('credential')).kdJabatan;
        vm.data.tahunUrtug = urtug.tahunUrtug;
        vm.data.daftarUrtugAtasan = [];

        $scope.uploadPic = function(files) {
            console.log(files[0].name);
            vm.data.namaFile = files[0].name;
            vm.data.keterangan = vm.item.keterangan;
            vm.data.durasiPengerjaan = vm.item.durasipenyelesaian;
            vm.extension = vm.data.namaFile.split('.');
            vm.extension = vm.extension[vm.extension.length - 1];
            vm.file = files[0];
        }

        getPegawaiAtasan();

        function getPegawaiAtasan(){
          KontrakPegawaiService.GetPejabatPenilai($.parseJSON(sessionStorage.getItem('credential')).kdJabatan).then(
            function(response){
              response.namaPegawai = response.nama;
              vm.penilai = response;
              getAtasanPenilai(response.kdJabatan);
            }, function(errResponse){

            })

        }

        function getAtasanPenilai(kdJabatan){
          KontrakPegawaiService.GetPejabatPenilai(kdJabatan).then(
            function(response){debugger
              response.namaPegawai = response.nama;
              vm.atasanPenilai = response;
            }, function(errResponse){

            })
        }

        vm.openUrtug = function(pegawai, parentSelector){
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/kontrakPegawai/urtug/urtug.html',
                controller: 'UrtugController',
                controllerAs: 'urtug',
                // windowClass: 'app-modal-window',
                // size: 'lg',
                appendTo: parentElem,
                resolve: {
                    pegawai: function () {
                        return pegawai;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                vm.data.daftarUrtugAtasan.push(data);
                debugger
            }, function () {

            });
        }
 
        vm.uploadTemplate = function () {debugger
            if(vm.item.keterangan == undefined || vm.item.keterangan.length == 0)
                EkinerjaService.showToastrError('Keterangan tidak boleh kosong');
            else if(vm.file == undefined) EkinerjaService.showToastrError('Pilih file terlebih dahulu');
            else
            KontrakPegawaiService.UploadTemplateData(vm.data).then(
                function(response){
                    var namaFile = response.message + '.' + vm.extension; debugger;
                    var formData = new FormData();
                    formData.append('file', vm.file, namaFile);

                    KontrakPegawaiService.UploadTemplateFile(formData).then(
                        function(response){debugger
                            EkinerjaService.showToastrSuccess("File Berhasil Diupload");
                            $uibModalInstance.close();
                        }, function(errResponse){

                        })
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