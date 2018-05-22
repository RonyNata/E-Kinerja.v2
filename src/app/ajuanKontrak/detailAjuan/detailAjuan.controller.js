(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('DetailAjuanController', DetailAjuanController);

    
    function DetailAjuanController(list_ajuan, list_tidakdiajukan, $scope, nama, nip, jabatan, isEselon4, unit, EkinerjaService,
      KontrakPegawaiService, AjuanKontrakService, $uibModalInstance, $uibModal, $document) {
      	var vm = this;

            vm.list_ajuan = angular.copy(list_ajuan);
            for(var i = 0; i < vm.list_ajuan.length; i++){
              vm.list_ajuan[i].displayKuantitas = vm.list_ajuan[i].kuantitas + ' ' + vm.list_ajuan[i].satuanKuantitas;
              vm.list_ajuan[i].displayKualitas = vm.list_ajuan[i].kualitas + '%';
              vm.list_ajuan[i].displayWaktu = vm.list_ajuan[i].waktu + ' Bulan';
              vm.list_ajuan[i].displayBiaya = 'Rp. ' + vm.list_ajuan[i].biayaRp;
            }
            pagingListAjuan();

            vm.list_tidakdiajukan = angular.copy(list_tidakdiajukan);
            for(var i = 0; i < vm.list_tidakdiajukan.length; i++){
              vm.list_tidakdiajukan[i].displayKuantitas = vm.list_tidakdiajukan[i].kuantitas + ' ' + vm.list_tidakdiajukan[i].satuanKuantitas;
              vm.list_tidakdiajukan[i].displayKualitas = vm.list_tidakdiajukan[i].kualitas + '%';
              vm.list_tidakdiajukan[i].displayWaktu = vm.list_tidakdiajukan[i].waktu + ' Bulan';
              vm.list_tidakdiajukan[i].displayBiaya = 'Rp. ' + vm.list_tidakdiajukan[i].biayaRp;
            }
            pagingListTidakAjuan();

            vm.nama = nama;

            vm.isEselon4 = isEselon4;

            getUrtugKegiatanApproval();

            function getUrtugKegiatanApproval(){
              // if(vm.isEselon4)
                KontrakPegawaiService.GetUrtugKegiatanApproval(nip,unit, jabatan).then(
                  function(response){
                    for(var i = 0; i < response.length; i++){
                      response[i].paguAnggaran = EkinerjaService.FormatRupiah(response[i].paguAnggaran);
                    }
                    vm.kegiatan = response;debugger

                      pagingListKegiatan();
                  }, function(errResponse){
                    // vm.penilai = "";
                  })
              // else
              //   KontrakPegawaiService.GetUrtugProgramApproval(nip,unit).then(
              //   function(response){
              //     vm.kegiatan = response;debugger
              //     for(var i = 0; i < response.length; i++)
              //       vm.kegiatan[i].paguAnggaran = EkinerjaService.FormatRupiah(vm.kegiatan[i].biaya);
              //   }, function(errResponse){
              //     // vm.penilai = "";
              //   })
            }

            vm.gantiStatusUrtug = function(urtug, terima){
                if(terima){
                  urtug.terima = false;
                  // var indexPush = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_tidakdiajukan);
                  // var indexSplice = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_tidakdiajukan);
                  // vm.list_ajuan.push(vm.list_tidakdiajukan[indexPush]);
                  // vm.list_tidakdiajukan.splice(indexSplice, 1);
                }else{
                  urtug.terima = true;
                  // var indexPush = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_ajuan);
                  // var indexSplice = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_ajuan);
                  // vm.list_tidakdiajukan.push(angular.copy(vm.list_ajuan[indexPush]));
                  // vm.list_ajuan.splice(indexSplice, 1);
                }
                  console.log(urtug);
            }

            vm.tambahkan = function(kdUrtug){
                  var indexPush = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_tidakdiajukan);
                  var indexSplice = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_tidakdiajukan);
                  vm.list_tidakdiajukan[indexPush].terima = true;
                  vm.list_ajuan.push(vm.list_tidakdiajukan[indexPush]);
                  vm.list_tidakdiajukan.splice(indexSplice, 1);
                  pagingListAjuan();
                  pagingListTidakAjuan();
            }

            vm.save = function(){
                  var data = [];
                  for(var i = 0; i < vm.list_ajuan.length; i++){
                        if(vm.list_ajuan[i].terima){
                              vm.list_ajuan[i].statusApproval = 1;debugger
                        }
                        else
                              vm.list_ajuan[i].statusApproval = 2;
                        vm.list_ajuan[i].nipPegawai = nip;
                        data.push(vm.list_ajuan[i]);
                  }
                  for(var i = 0; i < vm.list_tidakdiajukan.length; i++){
                        vm.list_tidakdiajukan[i].statusApproval = 2;
                        vm.list_tidakdiajukan[i].nipPegawai = nip;
                        data.push(vm.list_tidakdiajukan[i]);
                  }console.log(JSON.stringify(data));

                  AjuanKontrakService.ApproveKontrak(data).then(
                  function(response){
                        // EkinerjaService.showToastrSuccess("Kontrak Tahunan Berhasil Disetujui");
                        $uibModalInstance.close();
                  }, function(errResponse){
                    EkinerjaService.showToastrError("Kontrak Tahunan Gagal Disetujui");
                  })
            }

            vm.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
            };

            vm.openDetailSkp = function (item, parentSelector) {debugger
              var parentElem = parentSelector ? 
              angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
              var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'app/ajuanKontrak/detailSKP/detailSKP.html',
              controller: 'DetailSKPController',
              controllerAs: 'detailskp',
              // windowClass: 'app-modal-window',
              size: 'lg',
              appendTo: parentElem,
              resolve: {
                data: function(){
                  return item;
                }
              }
              });

              modalInstance.result.then(function () {
              }, function () {

              });
            };

        function pagingListAjuan(){
            $scope.filteredDataListAjuan = [];
            $scope.currentPageListAjuan = 0;
            $scope.numPerPageListAjuan = 5;
            $scope.maxSizeListAjuan = Math.ceil(vm.list_ajuan.length/$scope.numPerPageListAjuan);
            function pageListAjuan(){
                $scope.pageListAjuan = [];
                for(var i = 0; i < vm.list_ajuan.length/$scope.numPerPageListAjuan; i++){
                    $scope.pageListAjuan.push(i+1);
                }
            }
            pageListAjuan();
            $scope.padListAjuan = function(i){
                $scope.currentPageListAjuan += i;
            }

            $scope.maxListAjuan = function(){
                if($scope.currentPageListAjuan >= $scope.maxSizeListAjuan - 1)
                    return true;
                else return false;
            }

            $scope.$watch("currentPageListAjuan + numPerPageListAjuan", function() {
                var begin = (($scope.currentPageListAjuan) * $scope.numPerPageListAjuan)
                    , end = begin + $scope.numPerPageListAjuan;

                $scope.filteredDataListAjuan = vm.list_ajuan.slice(begin, end);
            });
        }

        function pagingListTidakAjuan(){
            $scope.filteredDataListTidakAjuan = [];
            $scope.currentPageListTidakAjuan = 0;
            $scope.numPerPageListTidakAjuan = 5;
            $scope.maxSizeListTidakAjuan = Math.ceil(vm.list_tidakdiajukan.length/$scope.numPerPageListTidakAjuan);
            function pageListTidakAjuan(){
                $scope.pageListTidakAjuan = [];
                for(var i = 0; i < vm.list_tidakdiajukan.length/$scope.numPerPageListTidakAjuan; i++){
                    $scope.pageListTidakAjuan.push(i+1);
                }
            }
            pageListTidakAjuan();
            $scope.padListTidakAjuan = function(i){
                $scope.currentPageListTidakAjuan += i;
            }

            $scope.maxListTidakAjuan = function(){
                if($scope.currentPageListTidakAjuan >= $scope.maxSizeListTidakAjuan - 1)
                    return true;
                else return false;
            }

            $scope.$watch("currentPageListTidakAjuan + numPerPageListTidakAjuan", function() {
                var begin = (($scope.currentPageListTidakAjuan) * $scope.numPerPageListTidakAjuan)
                    , end = begin + $scope.numPerPageListTidakAjuan;

                $scope.filteredDataListTidakAjuan = vm.list_tidakdiajukan.slice(begin, end);
            });
        }

        function pagingListKegiatan(){
            $scope.filteredDataListKegiatan = [];
            $scope.currentPageListKegiatan = 0;
            $scope.numPerPageListKegiatan = 5;
            $scope.maxSizeListKegiatan = Math.ceil(vm.kegiatan.length/$scope.numPerPageListKegiatan);
            function pageListKegiatan(){
                $scope.pageListKegiatan = [];
                for(var i = 0; i < vm.kegiatan.length/$scope.numPerPageListKegiatan; i++){
                    $scope.pageListKegiatan.push(i+1);
                }
            }
            pageListKegiatan();
            $scope.padListKegiatan = function(i){
                $scope.currentPageListKegiatan += i;
            }

            $scope.maxListKegiatan = function(){
                if($scope.currentPageListKegiatan >= $scope.maxSizeListKegiatan - 1)
                    return true;
                else return false;
            }

            $scope.$watch("currentPageListKegiatan + numPerPageListKegiatan", function() {
                var begin = (($scope.currentPageListKegiatan) * $scope.numPerPageListKegiatan)
                    , end = begin + $scope.numPerPageListKegiatan;

                $scope.filteredDataListKegiatan = vm.kegiatan.slice(begin, end);
            });
        }
   	} 
})();