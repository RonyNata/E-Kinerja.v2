(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormPemilihanUrtugTahunanController', FormPemilihanUrtugTahunanController);

    
    function FormPemilihanUrtugTahunanController($scope, EkinerjaService, KontrakPegawaiService, isEselon4, $uibModalInstance, $document, $uibModal) {
      	var vm = this;
        $scope.urtugnon = false;
        $scope.dpaurtug = false;
        vm.isEselon4 = isEselon4;

        getUrtug();

        $scope.$watch('urtugnon', function(){
          checkAll($scope.urtugnon, vm.urtugNonDpa);
        });

        $scope.$watch('dpaurtug', function(){
          debugger
          checkAll($scope.dpaurtug, vm.urtugDpa);
        });

        function checkAll(status, array){
          for(var i = 0; i < array.length; i++)
            array[i].checked = angular.copy(status);
        }

        function getUrtug(){
          KontrakPegawaiService.GetUrtugNonDPA(
            $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            $.parseJSON(sessionStorage.getItem('credential')).kdJabatan
            ).then(
            function(response){
              vm.urtugNonDpa = response.urtugTidakDipilihList; debugger
              for(var i = 0; i < vm.urtugNonDpa.length; i++){
                vm.urtugNonDpa[i].biayaRp = EkinerjaService.FormatRupiah(vm.urtugNonDpa[i].biaya);
                vm.urtugNonDpa[i].checked = false;
              }
                pagingUrtugNonDpa();
            }, function(errResponse){

            }
          );

          // if(isEselon4)
            KontrakPegawaiService.GetUrtugDPA(
              $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
              $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
              $.parseJSON(sessionStorage.getItem('credential')).kdJabatan).then(
              function(response){
                vm.urtugDpa = response; debugger
                for(var i = 0; i < response.length; i++){ 
                  vm.urtugDpa[i].checked = false;
                  vm.urtugDpa[i].biayaRp = EkinerjaService.FormatRupiah(vm.urtugDpa[i].biaya);
                }
                  pagingUrtugDpa();
              }, function(errResponse){

              }
            );
          // else
          //   KontrakPegawaiService.GetUrtugProgram(
          //     $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
          //     $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
          //     function(response){
          //       vm.urtugDpa = response; debugger
          //       for(var i = 0; i < response.length; i++){ 
          //         vm.urtugDpa[i].checked = false;
          //         vm.urtugDpa[i].biayaRp = EkinerjaService.FormatRupiah(vm.urtugDpa[i].biaya);
          //       }
          //     }, function(errResponse){

          //     }
          //   );
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
          var data = [];
          var dpa = [];
          var statDpa = false, statNon = false;
          for(var i = 0; i<vm.urtugNonDpa.length; i++){
            if(vm.urtugNonDpa[i].checked){
              vm.urtugNonDpa[i].statusApproval = 0;
            } else vm.urtugNonDpa[i].statusApproval = 3;
            vm.urtugNonDpa[i].alasan = "";
            vm.urtugNonDpa[i].nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
            data.push(vm.urtugNonDpa[i]);
          }

          for(var i = 0; i < vm.urtugDpa.length; i++){
            if(vm.urtugDpa[i].checked)
              vm.urtugDpa[i].statusApproval = 1;
            else vm.urtugDpa[i].statusApproval = 2;
            vm.urtugDpa[i].nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
            dpa.push(vm.urtugDpa[i]);
          }

          console.log(JSON.stringify(vm.urtugDpa));

          if(vm.urtugDpa.length != 0)
          KontrakPegawaiService.ApproveKegiatan(dpa).then(
            function(response){
              EkinerjaService.showToastrSuccess("Penerimaan Urtug DPA Berhasil");
              statDpa = true;
              successChecker(statDpa, statNon);
            }, function(errResponse){
              EkinerjaService.showToastrError("Penerimaan Urtug DPA Gagal");
            })
          else statDpa = true;

          KontrakPegawaiService.ChooseUrtug(data).then(
            function(response){
              EkinerjaService.showToastrSuccess("Daftar Urtug Non-DPA Berhasil Diajukan");
              statNon = true;
              successChecker(statDpa, statNon);
              // $uibModalInstance.close();
            }, function(errResponse){
              EkinerjaService.showToastrError("Daftar Urtug Non-DPA Gagal Diajukan");
            })
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