(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('UploadTemplateController', UploadTemplateController);


    function UploadTemplateController(EkinerjaService, KontrakPegawaiService, $uibModalInstance, 
        $scope, $state, urtug, isDPA, isEselon4, API, $http, $uibModal) {
        var vm = this;
        vm.bulan = EkinerjaService.IndonesianMonth(new Date());
        vm.tahun = EkinerjaService.IndonesianYear(new Date());
        vm.loading = true;
        vm.isPenilai = false;
        vm.isEselon4 = isEselon4;
        vm.isAtasanPenilai = false;
        vm.item = {};
        vm.isProccess = false;
        vm.data = {};
        
        vm.urtug=urtug;
        vm.isDPA=isDPA;
        vm.data.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
        vm.data.nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
        if(vm.urtug.kdUrusan == undefined){
            vm.data.kdUrtug = vm.urtug.kdUrtug;
            vm.data.kdJenisUrtug = vm.urtug.kdJenisUrtug;
            vm.data.bulanUrtug = vm.urtug.bulanUrtug;
            vm.data.kdJabatan = $.parseJSON(sessionStorage.getItem('credential')).kdJabatan;
            vm.data.tahunUrtug = urtug.tahunUrtug;
        }else{
            vm.data.kdUrusan = vm.urtug.kdUrusan;
            vm.data.kdBidang = vm.urtug.kdBidang;
            vm.data.kdUnit = vm.urtug.kdUnit;
            vm.data.kdSub = vm.urtug.kdSub;
            vm.data.tahun = vm.urtug.tahun;
            vm.data.kdProg = vm.urtug.kdProg;
            vm.data.idProg = vm.urtug.idProg;
            vm.data.kdKeg = vm.urtug.kdKeg;
            vm.data.kdStatusPenanggungJawab = vm.urtug.kdStatusPenanggungJawab;
            vm.isDpa = true;
        }
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

        vm.openUrtug = function(pegawai, isPenilai, parentSelector){debugger
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
                    },
                    isPenilai: function(){
                        return isPenilai;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                if(data.penilai) vm.isPenilai = true;
                else vm.isAtasanPenilai = true;
                vm.data.daftarUrtugAtasan.push(data);
                debugger
            }, function () {

            });
        }
 
        vm.uploadTemplate = function () {debugger
            vm.isProccess = true;
            console.log(JSON.stringify(vm.data));
            if(vm.item.keterangan == undefined || vm.item.keterangan.length == 0){
                EkinerjaService.showToastrError('Keterangan tidak boleh kosong');
                vm.isProccess = false;     
            }
            else if(vm.file == undefined) {
                EkinerjaService.showToastrError('Pilih file terlebih dahulu');
                vm.isProccess = false;
            }
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
                            EkinerjaService.showToastrError("File Gagal Diupload");
                            vm.isProccess = false;

                        })
                }, function(errResponse){
                    EkinerjaService.showToastrError("File Gagal Diupload");
                    vm.isProccess = false;
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