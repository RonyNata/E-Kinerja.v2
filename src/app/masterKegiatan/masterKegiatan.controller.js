(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('MasterKegiatanController', MasterKegiatanController);

    
    function MasterKegiatanController(EkinerjaService, KontrakUrtugDpaService, $scope, $timeout, $uibModal, 
      $document, MasterKegiatanService, PengumpulanDataBebanKerjaService, SKPPKService) {
      	var vm = this;
        vm.loading = true;
        vm.kegiatan = true;
        var dataUrtug, dataKegiatan;
        getAllKegiatan()

        function getAllKegiatan(){
          PengumpulanDataBebanKerjaService.GetAllKegiatan($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
                function(response){
                  vm.list_kegiatan = response;debugger
                  vm.loading = false;
                    pagingListKegiatan();
                },
                function(errResponse){

                }
              )
        }

        vm.getSK = function(){
          SKPPKService.GetSKBarjas($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
            function(response){debugger
              var doc = SKPPKService.template(response);
              EkinerjaService.lihatPdf(doc, 'SK Barjas');
            }, function(errResponse){
              
            })
        }

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
          getAllKegiatan()
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
          // vm.kegiatanPj = kegiatan.statusPenanggungJawabList;debugger
          getAllStatusPJ(kegiatan);
          vm.dpa = kegiatan;
          dataKegiatan = kegiatan;debugger
          vm.kegiatan = false;
          $timeout(function() { vm.pj = true;}, 499);
        }

        function getAllStatusPJ(items){
          items.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
          items.kdBidang = items.kdBIdang;
          items.kdKeg = items.kdKegiatan;
          console.log(JSON.stringify(items));
          MasterKegiatanService.GetPJ(items).then(
            function(response){
              vm.kegiatanPj = response; debugger
                pagingKegiatanPj();
            }, function(errResponse){

            })
        }

        vm.hapusPj = function(pj){
          vm.dpa.nipPegawai = pj.penanggungJawab.nip;
          vm.dpa.kdStatusPenanggungJawab = pj.kdStatusPenanggungJawab;
          // console.log(vm.dpa);
          MasterKegiatanService.DeletePj(vm.dpa).then(
            function(response){
              EkinerjaService.showToastrSuccess("Berhasil Dihapus");
              getAllStatusPJ(vm.dpa);
            }, function(errResponse){
              EkinerjaService.showToastrError("Gagal Dihapus");
            })
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

        vm.salin = function (parentSelector) {
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/masterKegiatan/dataSalin/dataSalin.html',
          controller: 'DataSalinController',
          controllerAs: 'datasalin',
          size: 'lg',
          appendTo: parentElem,
          resolve: {
            pj: function () {
              return vm.kegiatanPj;
            }

          }
          });

          modalInstance.result.then(function () {

          }, function () {
            // showToastrFailed('menambahkan data');
          // $log.info('Modal dismissed at: ' + new Date());
          });
        };

        vm.addPJ = function (parentSelector) {
          var item = {
            "kdUrusan": dataKegiatan.kdUrusan,
            "kdBidang": dataKegiatan.kdBIdang,
            "kdUnit": dataKegiatan.kdUnit,
            "kdSub": dataKegiatan.kdSub,
            "tahun": dataKegiatan.tahun,
            "kdProg": dataKegiatan.kdProg,
            "idProg": dataKegiatan.idProg,
            "kdKeg": dataKegiatan.kdKegiatan,
            "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja
          }
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/pengadaanBarangJasa/formPenanggungJawab.html',
          controller: 'FormPenanggungJawabController',
          controllerAs: 'skform',
          size: 'lg',
          appendTo: parentElem,
          resolve: {
            items: function () {
              return item;
            },
            pegawai: function(){
              return vm.list_pegawai;
            },
            isEselon4: function(){
              return null;
            },
            isMaster: function(){
              return true;
            },
            ket: function(){
              return vm.dpa.ketKegiatan;
            }
          }
          });

          modalInstance.result.then(function () {
            // getPJ();
            getAllStatusPJ(dataKegiatan);
          }, function () {
            // showToastrFailed('menambahkan data');
          // $log.info('Modal dismissed at: ' + new Date());
          });
        };

        function pagingListKegiatan(){
            $scope.filteredDataListKegiatan = [];
            $scope.currentPageListKegiatan = 0;
            $scope.numPerPageListKegiatan = 25;
            $scope.maxSizeListKegiatan = Math.ceil(vm.list_kegiatan.length/$scope.numPerPageListKegiatan);
            function pageListKegiatan(){
                $scope.pageListKegiatan = [];
                for(var i = 0; i < vm.list_kegiatan.length/$scope.numPerPageListKegiatan; i++){
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

                $scope.filteredDataListKegiatan = vm.list_kegiatan.slice(begin, end);
            });
        }

        function pagingKegiatanPj(){
            $scope.filteredDataKegiatanPj = [];
            $scope.currentPageKegiatanPj = 0;
            $scope.numPerPageKegiatanPj = 15;
            $scope.maxSizeKegiatanPj = Math.ceil(vm.kegiatanPj.length/$scope.numPerPageKegiatanPj);
            function pageKegiatanPj(){
                $scope.pageKegiatanPj = [];
                for(var i = 0; i < vm.kegiatanPj.length/$scope.numPerPageKegiatanPj; i++){
                    $scope.pageKegiatanPj.push(i+1);
                }
            }
            pageKegiatanPj();
            $scope.padKegiatanPj = function(i){
                $scope.currentPageKegiatanPj += i;
            }

            $scope.maxKegiatanPj = function(){
                if($scope.currentPageKegiatanPj >= $scope.maxSizeKegiatanPj - 1)
                    return true;
                else return false;
            }

            $scope.$watch("currentPageKegiatanPj + numPerPageKegiatanPj", function() {
                var begin = (($scope.currentPageKegiatanPj) * $scope.numPerPageKegiatanPj)
                    , end = begin + $scope.numPerPageKegiatanPj;

                $scope.filteredDataKegiatanPj = vm.kegiatanPj.slice(begin, end);
            });
        }
   	} 
})();