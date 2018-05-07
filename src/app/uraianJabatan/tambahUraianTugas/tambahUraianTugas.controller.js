(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('TambahUraianController', TambahUraianController);

    
    function TambahUraianController(EkinerjaService, $scope, items, available_urtug, jabatan, PengumpulanDataBebanKerjaService, $uibModalInstance) {
      	var vm = this;

      	vm.available_urtug = angular.copy(available_urtug);
        vm.item = angular.copy(items);debugger
        vm.jabatan = jabatan;
        // getJenisUrtug();

        // function getJenisUrtug(){
        //   PengumpulanDataBebanKerjaService.GetJenisUrtug().then(
        //       function(response){
        //         vm.jenis_urtug = response;
        //         // debugger
        //       },
        //       function(errResponse){

        //       }
        //     )
        // }

        vm.getUrtug = function(){
          if(vm.item.kdUrtug.length != 0){
            vm.urtug = PengumpulanDataBebanKerjaService.GetUrtugByyId(vm.available_urtug, vm.item.kdUrtug);
            vm.item.kdUrtug = vm.urtug.kdUrtug;debugger
          }
        }

      	vm.save = function setUrtugAndJabatan(){
          console.log(JSON.stringify(vm.item));
          // if(status == 'create'){
            // vm.item.kdUrtug = PengumpulanDataBebanKerjaService.GetUrtugId(vm.available_urtug, vm.item.kdUrtug);
            // console.log('true');
        		PengumpulanDataBebanKerjaService.SetUrtugAndJabatan(vm.item).then(
        			function(response){
        				$uibModalInstance.close();
        			},function(errResponse){
                EkinerjaService.showToastrError('terjadi kesalahan');
        			}
        		)
          // }
          // else {
          //   vm.item.kdUrtug = PengumpulanDataBebanKerjaService.GetUrtugId(used_urtug, vm.item.kdUrtug);
          //   console.log(used_urtug);
          //   PengumpulanDataBebanKerjaService.UpdateUrtugAndJabatan(vm.item).then(
          //     function(response){
          //       $uibModalInstance.close();
          //     },function(errResponse){
          //       EkinerjaService.showToastrError('terjadi kesalahan');
          //     }
          //   )
          // }
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