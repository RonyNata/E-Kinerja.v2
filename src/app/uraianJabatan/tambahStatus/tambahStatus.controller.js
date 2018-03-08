(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('TambahStatusController', TambahStatusController);

    
    function TambahStatusController(EkinerjaService, $scope, items, used_urtug, PengumpulanDataBebanKerjaService, $uibModalInstance) {
      	var vm = this;

        debugger
        vm.item = angular.copy(items);
        vm.target = {
          "kuantitas": 1,
          "satuanKuantitas": "",
          "kualitas": 100,
          "kualitasDisplay": "100%",
          "waktu": 12,
          "waktuDisplay": "12 Bulan",
          "biaya": 0,
          "biayaDisplay": "Rp. 0"
        };
        $scope.statusUrtug = "";
        getJenisUrtug();
        getUrtugJabatan();

        function getJenisUrtug(){
          PengumpulanDataBebanKerjaService.GetJenisUrtug().then(
              function(response){
                vm.jenis_urtug = response;
                // debugger
              },
              function(errResponse){

              }
            )
        }

        vm.getUrtug = function(){
          if(vm.item.kdUrtug.length == 8){debugger
            vm.urtug = PengumpulanDataBebanKerjaService.GetUrtugByyId(vm.used_urtug, vm.item.kdUrtug);
            vm.item.kdUrtug = vm.urtug.kdUrtug;
          }
        }

        function getUrtugJabatan(){
          PengumpulanDataBebanKerjaService.GetUrtugForStatus(items.kdJabatan).then(
            function(response){
              vm.used_urtug = response;
            }, function(errResponse){

            })
        }

        $scope.$watch('statusUrtug', function(){
          console.log($scope.statusUrtug);
          if($scope.statusUrtug == "KJU001" || $scope.statusUrtug == "" )
            vm.isDpa = true;
          else {
            vm.isDpa = false
            vm.target = {
              "kuantitas": 1,
              "satuanKuantitas": "",
              "kualitas": 100,
              "kualitasDisplay": "100%",
              "waktu": 12,
              "waktuDisplay": "12 Bulan",
              "biaya": 0,
              "biayaDisplay": "Rp. 0"
            }
          };
        });

        vm.save = function setUrtugAndJabatan(){
            // vm.item.kdUrtug = PengumpulanDataBebanKerjaService.GetUrtugId(used_urtug, vm.item.kdUrtug);
            vm.item.kuantitas = vm.target.kuantitas;
            vm.item.satuanKuantitas = vm.target.satuanKuantitas;
            vm.item.kualitas = vm.target.kualitas;
            vm.item.waktu = vm.target.waktu;
            vm.item.biaya = vm.target.biaya;
            vm.item.kdJenisUrtug = $scope.statusUrtug;
            console.log(vm.item);
            PengumpulanDataBebanKerjaService.SetJenisUrtugJabatan(vm.item).then(
              function(response){
                $uibModalInstance.close();
              },function(errResponse){
                EkinerjaService.showToastrError('terjadi kesalahan');
              }
            )
          }

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }

        vm.calculateBeban = function(){
          vm.item.bebanKerja = vm.item.volumeKerja * vm.item.normaWaktu;
        }
   	} 
})();