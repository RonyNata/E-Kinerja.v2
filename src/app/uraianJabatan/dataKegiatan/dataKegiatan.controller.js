(function(){
  'use strict';

  angular.
    module('eKinerja').
    controller('DataKegiatanController', DataKegiatanController);

    function DataKegiatanController(EkinerjaService, $scope, kegiatan, kegiatanPilihan, isPilihan, urtug, jabatan, HakAksesService, 
      $uibModalInstance, $uibModal, $document, PengumpulanDataBebanKerjaService, MasterKegiatanService){
      EkinerjaService.checkCredential();
      var vm = this;
      $scope.kegiatandpa = false;
      $scope.searchName = '';
      $scope.searchJabatan = '';
      $scope.entries = 5;
      $scope.currentPage = 0;
      vm.isPilihan = isPilihan;
      var data;

      function getAllKegiatan(){
          MasterKegiatanService.GetKegiatanSimdaJabatan(jabatan).then(
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

      if(kegiatan.length != 0){
        var data = kegiatan;
        vm.dataLook = kegiatan;
        paging();
      } else getAllKegiatan();
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

      $scope.$watch('kegiatandpa', function(){
        checkAll($scope.kegiatandpa, vm.dataLook);
      });

      function checkAll(status, array){
        for(var i = 0; i < array.length; i++)
          array[i].checked = angular.copy(status);
      }

      vm.addKegiatan = function(){
        // var items = angular.copy(urtug);
        // for(var i = 0; i < vm.kegiatanPilihan.length;i++){
        //   vm.kegiatanPilihan[i].kdKeg = vm.kegiatanPilihan[i].kdKegiatan;
        //   vm.kegiatanPilihan[i].kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
        //   vm.kegiatanPilihan[i].kdBidang = vm.kegiatanPilihan[i].kdBIdang;
        // }
        // items.kegiatanList = vm.kegiatanPilihan;
        // console.log(JSON.stringify(items));
        // PengumpulanDataBebanKerjaService.CreateUrtugKegiatan(items).then(
        //       function(response){
        //         EkinerjaService.showToastrSuccess("Kegiatan Berhasil Ditambahkan");
        //         $uibModalInstance.close();
        //         // setPJ();
        //       }, function(errResponse){

        //       })

        var items = angular.copy(urtug);
        items.kegiatanList = [];
        for(var i = 0; i < vm.dataLook.length;i++){
          if(vm.dataLook[i].checked){
            vm.dataLook[i].kdKeg = vm.dataLook[i].kdKegiatan;
            vm.dataLook[i].kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
            vm.dataLook[i].kdBidang = vm.dataLook[i].kdBIdang;
            items.kegiatanList.push(vm.dataLook[i])
          }
        }
        console.log(items);
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
        controller: 'DataKegiatanController',
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

      function findkegiatanByNip(nip, array){
            for(var i = 0; i<array.length; i++){
                if (array[i].nipkegiatan.search(nip) != -1){
                    return i; break;
                } 
            }
        }

      $scope.$watch('searchName', function(){
        if($scope.searchName != ''){
          $scope.currentPage = 0;debugger
          vm.dataLook = EkinerjaService.searchByName($scope.searchName, data);
        }
        paging();
        debugger
      })

      $scope.$watch('searchJabatan', function(){
        if($scope.searchJabatan != ''){
          $scope.currentPage = 0;
          vm.dataLook = EkinerjaService.searchByJabatan($scope.searchJabatan, data);
        }
        paging();
        debugger
      })

      // vm.check = function(dat){debugger
      //   if(dat.checked)
      //     vm.kegiatanPilihan.push(dat);
      //   else vm.kegiatanPilihan.splice(findkegiatanByNip(dat.nipkegiatan, vm.kegiatanPilihan),1);
      // }

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