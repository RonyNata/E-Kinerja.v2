(function(){
  'use strict';

  angular.
    module('eKinerja').
    controller('DataUrtugController', DataUrtugController);

    function DataUrtugController(EkinerjaService, $scope, items, instansi_urtug, jabatan, 
      $uibModalInstance, $uibModal, $document, PengumpulanDataBebanKerjaService){
      EkinerjaService.checkCredential();
      var vm = this;

      vm.item = angular.copy(items);
      // paging();
      vm.pilih = false;debugger
      vm.instansiJabatan = instansi_urtug;
      vm.unitKerja = '';
      vm.jabatanPilihan = '';
      $scope.searchName = '';
      $scope.searchUnit = '';
      vm.jabatan = jabatan;
      $scope.entries = 5;
      $scope.currentPage = 0;
      vm.urtugPilihan = [];
      // vm.isPilihan = isPilihan;
      var data;

      vm.getJabatanUnit = function(data){
        if(data.length > 10 || data == 'dummy')
          PengumpulanDataBebanKerjaService.GetJabatanUnit(vm.unitKerja).then(
            function(response){debugger
              vm.jabatanUrtug = response;
            }, function(errResponse){
              if(errResponse.status == -1)
                EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
            })
      }

      function getAllKegiatan(){debugger
          MasterKegiatanService.GetKegiatanSimda($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
              function(response){
                // var data = response;
                for(var i = 0; i < response.length; i++){
                  response[i].nama = response[i].ketKegiatan;
                  response[i].waktu = 12;
                  response[i].biaya = "Rp. " + EkinerjaService.FormatRupiah(response[i].paguAnggaran);
                  response[i].kualitas = 100;
                }
                data = response;
                vm.dataLook = response;
                paging();
              },
              function(errResponse){
                if(errResponse.status == -1)
                  EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
              }
            )
        }

      vm.getUrtug = function(){debugger
        PengumpulanDataBebanKerjaService.GetUrtugByJabatanInstansi(vm.jabatanPilihan, vm.unitKerja).then(
          function(response){debugger
            vm.dataLook = response;
            paging();
          }, function(errResponse){
            if(errResponse.status == -1)
              EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
          })
      }

      // if(kegiatan.length != 0){
      //   var data = kegiatan;
      //   vm.dataLook = kegiatan;
      //   paging();
      // } else getAllKegiatan();
      // vm.kegiatanPilihan = kegiatanPilihan;

      // getAllkegiatan();

      // function getAllkegiatan(){
      //   vm.loading = true;
      //   HakAksesService.GetAllkegiatan().then(
      //     function(response){
      //       // console.log(JSON.stringify(response));
      //       data = response;
      //       paging();
      //       vm.loading = false;
      //     }, function(errResponse){

      //     })
      // }

      // vm.openPilihan = function (parentSelector) {
      //   var parentElem = parentSelector ? 
      //   angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
      //   var modalInstance = $uibModal.open({
      //   animation: true,
      //   ariaLabelledBy: 'modal-title',
      //   ariaDescribedBy: 'modal-body',
      //   templateUrl: 'app/uraianJabatan/urtugDipilih/dataDipilih.html',
      //   controller: 'DataUrtugDipilihController',
      //   controllerAs: 'dataurtugdipilih',
      //   // windowClass: 'app-modal-window',
      //   size: 'lg',
      //   appendTo: parentElem,
      //   resolve: {
      //     urtug: function(){
      //       return vm.tempUrtug.kdUrtug;
      //     },
      //     urtugDipilih: function(){
      //       return vm.tempUrtug.kdUrtug;
      //     },
      //     isPilihan: function(){
      //       return 1;
      //     },
      //     urtug: function(){
      //       return 0;
      //     }
      //   }
      //   });

      //   modalInstance.result.then(function () {
      //   }, function () {

      //   });
      // };

      // vm.urtugDipilih = function(){
      //   var urtug = [];
      //   vm.tempUrtug;
      //   for(var i = 0; i < vm.urtugPilihan.length;i++){
      //     vm.tempUrtug = angular.copy(vm.item);
      //     vm.tempUrtug.kdUrtug = vm.urtugPilihan[i].kdUrtug;
      //   }
      // }

      vm.checkAll = function(){debugger
        for(var i = 0; i < vm.dataLook.length;i++){
          if(!vm.dataLook[i].checked){
            vm.dataLook[i].checked = true;
          }else {
            vm.dataLook[i].checked = false;
          }
            vm.check(vm.dataLook[i]);
        }
      }

      vm.pilihUrtug = function(){
        var urtug = [];
        var temp;
        for(var i = 0; i < vm.urtugPilihan.length;i++){
          temp = angular.copy(vm.item);
          temp.kdUrtug = vm.urtugPilihan[i].kdUrtug;
          urtug.push(temp);
        }
        console.log(urtug);
        PengumpulanDataBebanKerjaService.SetUrtugAndJabatan(urtug).then(
              function(response){
                $uibModalInstance.close();
              },function(errResponse){
                if(errResponse.status == -1)
                  EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
                else EkinerjaService.showToastrError('terjadi kesalahan');
              }
            )
      }

      vm.addKegiatan = function(){
        var items = angular.copy(urtug);
        for(var i = 0; i < vm.kegiatanPilihan.length;i++){
          vm.kegiatanPilihan[i].kdKeg = vm.kegiatanPilihan[i].kdKegiatan;
          vm.kegiatanPilihan[i].kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
          vm.kegiatanPilihan[i].kdBidang = vm.kegiatanPilihan[i].kdBIdang;
        }
        items.kegiatanList = vm.kegiatanPilihan;
        console.log(JSON.stringify(items));
        PengumpulanDataBebanKerjaService.CreateUrtugKegiatan(items).then(
              function(response){
                EkinerjaService.showToastrSuccess("Kegiatan Berhasil Ditambahkan");
                $uibModalInstance.close();
                // setPJ();
              }, function(errResponse){
                if(errResponse.status == -1)
                  EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
              })
      }

      vm.cancel = function () { 
        $uibModalInstance.dismiss('cancel'); 
      };

      vm.openPilihan = function (parentSelector) {
        var parentElem = parentSelector ? 
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/uraianJabatan/dataKegiatan/dataKegiatan.html',
        controller: 'DataUrtugController',
        controllerAs: 'datakegiatan',
        // windowClass: 'app-modal-window',
        size: 'lg',
        appendTo: parentElem,
        resolve: {
          kegiatan: function(){
            return vm.kegiatanPilihan;
          },
          kegiatanPilihan: function(){
            return vm.kegiatanPilihan;
          },
          isPilihan: function(){
            return 1;
          },
          urtug: function(){
            return 0;
          }
        }
        });

        modalInstance.result.then(function () {
        }, function () {

        });
      };

      function findUrtug(name, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                if (array[i].deskripsi.toLowerCase().search(name.toLowerCase()) != -1){
                    result.push(array[i]);
                } 
            }
            return result;
        }

      $scope.$watch('searchName', function(){
        if($scope.searchName != ''){
          $scope.currentPage = 0;debugger
          vm.dataLook = EkinerjaService.searchByJabatan($scope.searchJabatan, available_urtug);
          vm.dataLook = EkinerjaService.searchByUnitKerja($scope.searchUnit, vm.dataLook);
          vm.dataLook = findUrtug($scope.searchName, vm.dataLook);
        }else debugger;
        paging();
        // debugger
      })

      $scope.$watch('searchJabatan', function(){
        if($scope.searchJabatan != ''){
          $scope.currentPage = 0;
          vm.dataLook = findUrtug($scope.searchName, available_urtug);
          vm.dataLook = EkinerjaService.searchByUnitKerja($scope.searchUnit, vm.dataLook);
          vm.dataLook = EkinerjaService.searchByJabatan($scope.searchJabatan, vm.dataLook);
        }else debugger;
        paging();
        // debugger
      })

      $scope.$watch('searchUnit', function(){
        if($scope.searchUnit != ''){
          $scope.currentPage = 0;
          vm.dataLook = findUrtug($scope.searchName, available_urtug);
          vm.dataLook = EkinerjaService.searchByJabatan($scope.searchJabatan, vm.dataLook);
          vm.dataLook = EkinerjaService.searchByUnitKerja($scope.searchUnit, vm.dataLook);
        }else debugger;
        paging();
        // debugger
      })

      function findByKdUrtug(kdUrtug){
        for(var i = 0; i < vm.urtugPilihan; i++)
          if(kdUrtug == vm.urtugPilihan[i].kdUrtug){
            return i; break;
          }
      }

      vm.check = function(dat){
        if(dat.checked)
          vm.urtugPilihan.push(dat);
        else vm.urtugPilihan.splice(findByKdUrtug(dat.kdUrtug, vm.urtugPilihan),1);
      }

      function paging(){ 
            $scope.filteredData = [];
            // $scope.currentPage = 0;
            $scope.numPerPage = $scope.entries;
            $scope.maxSize = Math.ceil(vm.dataLook.length/$scope.numPerPage);
            function page(){
              $scope.page = [];
              for(var i = 0; i < vm.dataLook.length/$scope.numPerPage; i++){
                  $scope.page.push(i+1);
              }
            }
            page();
            $scope.pad = function(i){
              $scope.currentPage += i;
            }

            $scope.max = function(){
              if($scope.currentPage >= $scope.maxSize - 1)
                  return true;
              else return false;
            }

            $scope.$watch("currentPage + numPerPage", function() {
              var begin = (($scope.currentPage) * $scope.numPerPage)
              , end = begin + parseInt($scope.numPerPage);
              debugger
              $scope.filteredData = vm.dataLook.slice(begin, end);
            });
          }
    }
})();