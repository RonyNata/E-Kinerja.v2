(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('KegiatanListController', KegiatanListController);

    
    function KegiatanListController(EkinerjaService, $scope, urtug, jabatan, pegawai, isEselon4, $uibModal, $document, PengumpulanDataBebanKerjaService, $uibModalInstance) {
      	var vm = this;

        vm.urtug = urtug;
        vm.isEselon4 = isEselon4;
        getUrtugKegiatanByJabatan();

        function getUrtugKegiatanByJabatan(){
          vm.loadUrtug = true;
          var data = {
            "kdUrtug": urtug.kdUrtug,
            "kdJabatan": jabatan,
            "kdJenisUrtug": urtug.kdJenisUrtug,
            "tahunUrtug": urtug.tahunUrtug,
            "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja
          };
          // if(isEselon4)
            PengumpulanDataBebanKerjaService.GetUrtugKegiatanByJabatan(data).then(
              function(response){
                for(var i = 0; i < response.length; i++)
                  response[i].biaya = EkinerjaService.FormatRupiah(response[i].paguAnggaran);
                vm.kegiatan = response;debugger
                vm.loadUrtug = false;

                  pagingKegiatan();
              }, function(errResponse){
                if(errResponse.status == -1)
                  EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
              })
          // else 
          //   PengumpulanDataBebanKerjaService.GetUrtugProgramByJabatan(data).then(
          //     function(response){
          //       vm.kegiatan = response;debugger
          //       vm.loadUrtug = false;
          //     }, function(errResponse){

          //     })
        }

        vm.kegiatanadd = function (parentSelector) {
          var item = {
            "kdJabatan": jabatan,
            "kdUrtug": urtug.kdUrtug,
            "kdJenisUrtug": urtug.kdJenisUrtug,
            "tahunUrtug": urtug.tahunUrtug
          };
          console.log(item);
          var parentElem = parentSelector ? 
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'app/uraianJabatan/tambahKegiatan/tambahKegiatan.html',
            controller: 'KegiatanController',
            controllerAs: 'kegiatan',
            // windowClass: 'app-modal-window',
            size: 'lg',
            appendTo: parentElem,
            resolve: {
              items: function () {
                return item;
              }, 
              pegawai: function(){
                return pegawai;
              },
              isEselon4: function(){
                return isEselon4;
              }
            }
          });

          modalInstance.result.then(function () {
            // showToastrSuccess('ditambahkan');
            // getUrtugByJabatan();
            getUrtugKegiatanByJabatan();
            // vm.selected = selectedItem;
          }, function () {
            // showToastrFailed('menambahkan data');
            // $log.info('Modal dismissed at: ' + new Date());
          });
        };

        vm.openKegiatan = function (parentSelector) {
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/uraianJabatan/dataKegiatan/dataKegiatan.html',
          controller: 'DataKegiatanController',
          controllerAs: 'datakegiatan',
          // windowClass: 'app-modal-window',
          size: 'lg',
          appendTo: parentElem,
          resolve: {
            kegiatan: function(){
              return [];
            },
            kegiatanPilihan: function(){
              return [];
            },
            isPilihan: function(){
              return 0;
            },
            urtug: function(){
              urtug.kdJabatan = jabatan;
              return urtug;
            },
            jabatan: function(){
              return jabatan;
            }
          }
          });

          modalInstance.result.then(function () {
            getUrtugKegiatanByJabatan();
          }, function () {

          });
        };

        vm.openDetailKegiatan = function (item, parentSelector) {
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/uraianJabatan/detailKegiatan/detailKegiatan.html',
          controller: 'DetailKegiatanController',
          controllerAs: 'detailKegiatan',
          // windowClass: 'app-modal-window',
          size: 'lg',
          appendTo: parentElem,
          resolve: {
            kegiatan: function(){
              return item;
            }
          }
          });

          modalInstance.result.then(function () {
          }, function () {

          });
        };

        vm.pj = function (kegiatan, parentSelector) {
          var parentElem = parentSelector ? 
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'app/uraianJabatan/penanggungjawab/penanggungjawab.html',
            controller: 'PJController',
            controllerAs: 'pj',
            // windowClass: 'app-modal-window',
            size: 'lg',
            appendTo: parentElem,
            resolve: {
              urtug: function () {
                return urtug;
              }, 
              jabatan: function(){
                return jabatan;
              },
              kegiatan: function(){
                return kegiatan;
              },
              isEselon4: function(){
                return isEselon4;
              }
            }
          });

          modalInstance.result.then(function () {
            // showToastrSuccess('ditambahkan');
            // getUrtugByJabatan();
            getUrtugKegiatanByJabatan();
            // vm.selected = selectedItem;
          }, function () {
            // showToastrFailed('menambahkan data');
            // $log.info('Modal dismissed at: ' + new Date());
          });
        };

        vm.openDetailUrtug = function (urtug) {
          urtug.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
          PengumpulanDataBebanKerjaService.GetUrtugKegiatan(urtug).then(
            function(response){debugger
              var dataUrtug = response;
              console.log(response);
              var modalInstance = $uibModal.open({
                  animation: true,
                  ariaLabelledBy: 'modal-title',
                  ariaDescribedBy: 'modal-body',
                  templateUrl: 'app/uraianJabatan/detailUrtug/detailUrtug.html',
                  controller: 'DetailUrtugController',
                  controllerAs: 'detailUrtug',
                  resolve: {
                    urtug: function(){
                      return dataUrtug;
                    }
                  }
                  // windowClass: 'app-modal-window',
                  // size: 'lg',
              });

              modalInstance.result.then(function () {
              }, function () {

              });
            }, function(errResponse){
              if(errResponse.status == -1)
                EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
            })
        };

        vm.deleteKegiatanOrProgram = function(data){
            // if (isEselon4){
            data.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
                // console.log(data);
                PengumpulanDataBebanKerjaService.DeleteUrtugKegiatan(data)
                    .then(function(response){
                        EkinerjaService.showToastrSuccess('Kegiatan Berhasil Dihapus');
                        getUrtugKegiatanByJabatan();
                    },function(errResponse){
                        if(errResponse.status == -1)
                          EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
                        else EkinerjaService.showToastrError('Gagal Menghapus Urtug');
                    })
            // } else {
            //     console.log(data);
            //     PengumpulanDataBebanKerjaService.DeleteUrtugProgram(data)
            //         .then(function(response){
            //             EkinerjaService.showToastrSuccess('Program Berhasil Dihapus');
            //             getUrtugKegiatanByJabatan();
            //         },function(errResponse){
            //             EkinerjaService.showToastrError('Gagal Menghapus Urtug');
            //         })
            // }
        };

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }

        function pagingKegiatan(){
            $scope.filteredDataKegiatan = [];
            $scope.currentPageKegiatan = 0;
            $scope.numPerPageKegiatan = 5;
            $scope.maxSizeKegiatan = Math.ceil(vm.kegiatan.length/$scope.numPerPageKegiatan);
            function pageKegiatan(){
                $scope.pageKegiatan = [];
                for(var i = 0; i < vm.kegiatan.length/$scope.numPerPageKegiatan; i++){
                    $scope.pageKegiatan.push(i+1);
                }
            }
            pageKegiatan();
            $scope.padKegiatan = function(i){
                $scope.currentPageKegiatan += i;
            }

            $scope.maxKegiatan = function(){
                if($scope.currentPageKegiatan >= $scope.maxSizeKegiatan - 1)
                    return true;
                else return false;
            }

            $scope.$watch("currentPageKegiatan + numPerPageKegiatan", function() {
                var begin = (($scope.currentPageKegiatan) * $scope.numPerPageKegiatan)
                    , end = begin + $scope.numPerPageKegiatan;

                $scope.filteredDataKegiatan = vm.kegiatan.slice(begin, end);
            });
        }
   	} 
})();