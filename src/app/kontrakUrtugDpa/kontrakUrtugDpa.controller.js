(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('KontrakUrtugDpaController', KontrakUrtugDpaController);

    
    function KontrakUrtugDpaController(EkinerjaService, KontrakUrtugDpaService, $scope, $timeout, $uibModal, $document, PengadaanBarangJasaService) {
      	var vm = this;
        vm.loading = true;
        vm.urtug = true;
        vm.kegiatan = false;
        var dataUrtug, dataKegiatan;

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
          dataUrtug = dpa;
          vm.urtug = false;
          $timeout(function() { vm.kegiatan = true;}, 499);
        }

        vm.kembali = function(){
          if(vm.kegiatan){
            vm.kegiatan = false;
            $timeout(function() { vm.urtug = true;}, 499);
          }else if(vm.pj){
            vm.pj = false;
            $timeout(function() { vm.kegiatan = true;}, 499);
          }
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
          dataKegiatan = kegiatan;
          vm.kegiatan = false;
          $timeout(function() { vm.pj = true;}, 499);
        }

        vm.editPJ = function (pj, parentSelector) {
          var item = {
            "kdUrtug": dataUrtug.kdUrtug,
            "kdJabatan": dataUrtug.kdJabatan,
            "kdJenisUrtug": dataUrtug.kdJenisUrtug,
            "tahunUrtug": dataUrtug.tahunUrtug,
            "kdUrusan": dataKegiatan.kdUrusan,
            "kdBidang": dataKegiatan.kdBidang,
            "kdUnit": dataKegiatan.kdUnit,
            "kdSub": dataKegiatan.kdSub,
            "tahun": dataKegiatan.tahun,
            "kdProg": dataKegiatan.kdProg,
            "idProg": dataKegiatan.idProg,
            "kdKeg": dataKegiatan.kdKeg,
            "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
            "kdStatusPenanggungJawab": pj.kdStatusPenanggungJawab
          }

          console.log(item);
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/kontrakUrtugDpa/formGantiPj/formGantiPj.html',
          controller: 'FormGantiPjController',
          controllerAs: 'formpj',
          size: 'lg',
          appendTo: parentElem,
          resolve: {
            items: function () {
              return item;
            }

          }
          });

          modalInstance.result.then(function () {

          }, function () {
            // showToastrFailed('menambahkan data');
          // $log.info('Modal dismissed at: ' + new Date());
          });
        };
   	} 
})();