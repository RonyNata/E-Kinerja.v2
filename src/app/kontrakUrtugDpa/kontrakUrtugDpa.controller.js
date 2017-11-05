(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('KontrakUrtugDpaController', KontrakUrtugDpaController);

    
    function KontrakUrtugDpaController(EkinerjaService, KontrakUrtugDpaService, $scope, $timeout) {
      	var vm = this;
        vm.loading = true;
        vm.urtug = true;
        vm.kegiatan = false;

        getUrtugDpa();

        function getUrtugDpa(){
          KontrakUrtugDpaService.GetUrtugDpa($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
            function(response){
              vm.urtugDpa = response;debugger
              count();
              vm.loading = false;
            }, function(errResponse){

            })
        }

        vm.gotoKegiatan = function(dpa){
          vm.urtugKegiatan = dpa.urtugKegiatanApprovalList;
          vm.urtug = false;
          $timeout(function() { vm.kegiatan = true;}, 499);
        }

        function count(){
          for(var i = 0; i < vm.urtugDpa.length;i++){
            vm.urtugDpa[i].pending = 0;
            vm.urtugDpa[i].terima = 0;
            vm.urtugDpa[i].tolak = 0;
            for(var j = 0; j < vm.urtugDpa[i].urtugKegiatanApprovalList.length; j++){
                vm.urtugDpa[i].urtugKegiatanApprovalList[j].pending = 0;
                vm.urtugDpa[i].urtugKegiatanApprovalList[j].terima = 0;
                vm.urtugDpa[i].urtugKegiatanApprovalList[j].tolak = 0;
              for(var k = 0; k < vm.urtugDpa[i].urtugKegiatanApprovalList[j].statusPenanggungJawabList.length; k++){
                switch(vm.urtugDpa[i].urtugKegiatanApprovalList[j].statusPenanggungJawabList[k].statusApproval){
                  case 0 :  vm.urtugDpa[i].pending +=1;
                            vm.urtugDpa[i].urtugKegiatanApprovalList[j].pending += 1; break;
                  case 1 :  vm.urtugDpa[i].terima +=1;
                            vm.urtugDpa[i].urtugKegiatanApprovalList[j].terima += 1; break;
                  case 2 :  vm.urtugDpa[i].tolak +=1;
                            vm.urtugDpa[i].urtugKegiatanApprovalList[j].tolak += 1; break;
                }
              }
            }
          }
        }

        vm.gotoPj = function(kegiatan){
          vm.kegiatanPj = kegiatan.statusPenanggungJawabList;debugger
          vm.kegiatan = false;
          $timeout(function() { vm.pj = true;}, 499);
        }
   	} 
})();