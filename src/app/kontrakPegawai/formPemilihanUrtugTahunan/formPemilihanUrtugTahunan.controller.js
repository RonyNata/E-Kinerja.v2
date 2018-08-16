(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormPemilihanUrtugTahunanController', FormPemilihanUrtugTahunanController);

    
    function FormPemilihanUrtugTahunanController($scope, isAjuan, EkinerjaService, KontrakPegawaiService, isEselon4, $uibModalInstance, $document, $uibModal) {
      	var vm = this;
        $scope.urtugnon = false;
        $scope.dpaurtug = false;
        vm.isEselon4 = isEselon4;
        vm.isAjuan = isAjuan;
        vm.bulan = EkinerjaService.IndonesianMonth(new Date()).toUpperCase();
        vm.tahun = EkinerjaService.IndonesianYear(new Date());

        getUrtug();

        $scope.$watch('urtugnon', function(){
          checkAll($scope.urtugnon, vm.urtugNonDpa);
        });

        $scope.$watch('dpaurtug', function(){
          
          checkAll($scope.dpaurtug, vm.urtugDpa);
        });

        function checkAll(status, array){
          for(var i = 0; i < array.length; i++)
            array[i].checked = angular.copy(status);
        }

        vm.validation = function(qty, target, idx){
          if(qty > target || qty == undefined) vm.urtugNonDpa[idx].targetKuantitas = target;
          if(qty < 1) vm.urtugNonDpa[idx].targetKuantitas = 1;
        }

        function getUrtug(){
          KontrakPegawaiService.GetUrtugNonDPA(
            $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            $.parseJSON(sessionStorage.getItem('credential')).kdJabatan
            ).then(
            function(response){
              vm.urtugNonDpa = response.urtugTidakDipilihList; 
              for(var i = 0; i < vm.urtugNonDpa.length; i++){
                vm.urtugNonDpa[i].biayaRp = EkinerjaService.FormatRupiah(vm.urtugNonDpa[i].biaya);
                vm.urtugNonDpa[i].checked = false;
                vm.urtugNonDpa[i].targetKuantitas = vm.urtugNonDpa[i].kuantitas - vm.urtugNonDpa[i].totalRealisasi;
              }
                pagingUrtugNonDpa();
            }, function(errResponse){

            }
          );

          // if(isEselon4)
            KontrakPegawaiService.GetUrtugKegiatanApproval(
              $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
              $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja, 
              $.parseJSON(sessionStorage.getItem('credential')).kdJabatan).then(
              function(response){
                vm.urtugDpa = response; debugger
                for(var i = 0; i < response.length; i++){ 
                  for(var i = 0; i < vm.urtugDpa.length; i++){ 
                    vm.urtugDpa[i].checked = false;
                    vm.urtugDpa[i].targetKuantitas = 0;
                    vm.urtugDpa[i].waktu = 0;
                    vm.urtugDpa[i].targetKualitas = 100;
                    vm.urtugDpa[i].biaya = vm.urtugDpa[i].paguAnggaran;
                    vm.urtugDpa[i].biayaRp = EkinerjaService.FormatRupiah(vm.urtugDpa[i].paguAnggaran);
                  }
                }
                  pagingUrtugDpa();
              }, function(errResponse){

              }
            );
        }

        vm.openKegiatan = function (item, parentSelector) {
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/kontrakPegawai/detailUrtugDpa/detailUrtugDpa.html',
          controller: 'DetailUrtugDpaController',
          controllerAs: 'urtugkegiatan',
          // windowClass: 'app-modal-window',
          size: 'lg',
          appendTo: parentElem,
          resolve: {
            urtug: function () {
              return item;
            },
            isEselon4: function(){
              return isEselon4;
            }
          }
          });

          modalInstance.result.then(function () {

          }, function () {

          });
        };

        vm.save = function(){
          // var data = [];
          // var dpa = [];
          // var statDpa = false, statNon = false;
          // for(var i = 0; i<vm.urtugNonDpa.length; i++){
          //   if(vm.urtugNonDpa[i].checked){
          //     data.push({
          //       "kdUrtug": vm.urtugNonDpa[i].kdUrtug,
          //       "kdJabatan": vm.urtugNonDpa[i].kdJabatan,
          //       "kdJenisUrtug": vm.urtugNonDpa[i].kdJenisUrtug,
          //       "tahunUrtug": vm.urtugNonDpa[i].tahunUrtug,
          //       "bulanUrtug": (new Date()).getMonth(),
          //       "nipPegawai": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
          //       "targetKuantitas": vm.urtugNonDpa[i].targetKuantitas,
          //       "satuanKuantitas": vm.urtugNonDpa[i].satuanKuantitas,
          //       "targetKualitas": vm.urtugNonDpa[i].kualitas,
          //       "waktu": vm.urtugNonDpa[i].waktu,
          //       "biaya": vm.urtugNonDpa[i].biaya,
          //       "alasan": "",
          //       "statusApproval": 0
          //     }); 
          //   }
          // }


          // console.log(JSON.stringify(vm.urtugDpa));

          var dpa = [];

          if(vm.urtugDpa.length != 0 || vm.urtugDpa == undefined){
            for(var i = 0; i < vm.urtugDpa.length; i++){
              if(vm.urtugDpa[i].checked){
                vm.urtugDpa[i].bulan = (new Date()).getMonth();
                dpa.push(vm.urtugDpa[i]);
              }
            }
            KontrakPegawaiService.ApproveKegiatan(dpa).then(
              function(response){
                EkinerjaService.showToastrSuccess("Kegiatan Berhasil Ditambahkan");
                $uibModalInstance.close();          
                successChecker(statDpa, statNon);
              }, function(errResponse){
                EkinerjaService.showToastrError("Penerimaan Urtug DPA Gagal");
            })
          }
        }

        function successChecker(dpa,non){
          if(dpa && non)
            $uibModalInstance.close();          
        }

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }

        vm.openUploadTemplate = function (urtug, isDPA, parentSelector) {
          var parentElem = parentSelector ?
              angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'app/kontrakPegawai/uploadTemplate/uploadTemplate.html',
              controller: 'UploadTemplateController',
              controllerAs: 'uptemp',
              // windowClass: 'app-modal-window',
              // size: 'lg',
              appendTo: parentElem,
              resolve: {
                  urtug: function () {
                      return urtug;
                  },
                  isDPA: function () {
                      return isDPA;
                  },
                  isEselon4:function(){
                    return vm.isEselon4;
                  }
              }
          });

          modalInstance.result.then(function () {
          }, function () {

          });
        };

        function pagingUrtugNonDpa(){
            $scope.filteredDataUrtugNonDpa = [];
            $scope.currentPageUrtugNonDpa = 0;
            $scope.numPerPageUrtugNonDpa = 5;
            $scope.maxSizeUrtugNonDpa = Math.ceil(vm.urtugNonDpa.length/$scope.numPerPageUrtugNonDpa);
            function pageUrtugNonDpa(){
                $scope.pageUrtugNonDpa = [];
                for(var i = 0; i < vm.urtugNonDpa.length/$scope.numPerPageUrtugNonDpa; i++){
                    $scope.pageUrtugNonDpa.push(i+1);
                }
            }
            pageUrtugNonDpa();
            $scope.padUrtugNonDpa = function(i){
                $scope.currentPageUrtugNonDpa += i;
            }

            $scope.maxUrtugNonDpa = function(){
                if($scope.currentPageUrtugNonDpa >= $scope.maxSizeUrtugNonDpa - 1)
                    return true;
                else return false;
            }

            $scope.$watch("currentPageUrtugNonDpa + numPerPageUrtugNonDpa", function() {
                var begin = (($scope.currentPageUrtugNonDpa) * $scope.numPerPageUrtugNonDpa)
                    , end = begin + $scope.numPerPageUrtugNonDpa;

                $scope.filteredDataUrtugNonDpa = vm.urtugNonDpa.slice(begin, end);
            });
        }

        function pagingUrtugDpa(){
            $scope.filteredDataUrtugDpa = [];
            $scope.currentPageUrtugDpa = 0;
            $scope.numPerPageUrtugDpa = 5;
            $scope.maxSizeUrtugDpa = Math.ceil(vm.urtugDpa.length/$scope.numPerPageUrtugDpa);
            function pageUrtugDpa(){
                $scope.pageUrtugDpa = [];
                for(var i = 0; i < vm.urtugDpa.length/$scope.numPerPageUrtugDpa; i++){
                    $scope.pageUrtugDpa.push(i+1);
                }
            }
            pageUrtugDpa();
            $scope.padUrtugDpa = function(i){
                $scope.currentPageUrtugDpa += i;
            }

            $scope.maxUrtugDpa = function(){
                if($scope.currentPageUrtugDpa >= $scope.maxSizeUrtugDpa - 1)
                    return true;
                else return false;
            }

            $scope.$watch("currentPageUrtugDpa + numPerPageUrtugDpa", function() {
                var begin = (($scope.currentPageUrtugDpa) * $scope.numPerPageUrtugDpa)
                    , end = begin + $scope.numPerPageUrtugDpa;

                $scope.filteredDataUrtugDpa = vm.urtugDpa.slice(begin, end);
            });
        }
   	} 
})();