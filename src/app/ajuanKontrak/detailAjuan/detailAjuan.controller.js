(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('DetailAjuanController', DetailAjuanController);

    
    function DetailAjuanController(nipPegawai, isAjuan, urtug, $scope, EkinerjaService, nama, 
      KontrakPegawaiService, $uibModalInstance, $uibModal, $document) {
      	var vm = this;

        $scope.urtugnon = false;
        $scope.dpaurtug = false;
        vm.urtugNonDpa = angular.copy(urtug);
        pagingUrtugNonDpa();
        vm.nama = nama;
        vm.isAjuan = isAjuan;
        vm.bulan = EkinerjaService.IndonesianMonth(new Date()).toUpperCase();
        vm.tahun = EkinerjaService.IndonesianYear(new Date());

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

        vm.validation = function(qty, target, idx){debugger
          if(qty > target || qty == undefined) vm.urtugNonDpa[idx].targetKuantitas = target;
          if(qty < 1) vm.urtugNonDpa[idx].targetKuantitas = 1;
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
            }
          }
          });

          modalInstance.result.then(function () {

          }, function () {

          });
        };

        vm.save = function(){
          var data = [];
          var dpa = [];debugger
          var statDpa = false, statNon = false;
          for(var i = 0; i<vm.urtugNonDpa.length; i++){
            if(vm.urtugNonDpa[i].checked){
              data.push({
                "kdUrtug": vm.urtugNonDpa[i].kdUrtug,
                "kdJabatan": vm.urtugNonDpa[i].kdJabatan,
                "kdJenisUrtug": vm.urtugNonDpa[i].kdJenisUrtug,
                "tahunUrtug": vm.urtugNonDpa[i].tahunUrtug,
                "bulanUrtug": (new Date()).getMonth(),
                "nipPegawai": nipPegawai,
                "targetKuantitas": vm.urtugNonDpa[i].targetKuantitas,
                "satuanKuantitas": vm.urtugNonDpa[i].satuanKuantitas,
                "targetKualitas": vm.urtugNonDpa[i].kualitas,
                "waktu": vm.urtugNonDpa[i].waktu,
                "biaya": vm.urtugNonDpa[i].biaya,
                "alasan": "",
                "statusApproval": 0
              }); 
            }
          }


          // console.log(JSON.stringify(vm.urtugDpa));

          
          KontrakPegawaiService.ChooseUrtugBulanan(data).then(
            function(response){
              EkinerjaService.showToastrSuccess("Daftar Urtug Non-DPA Berhasil Diajukan");
              // statNon = true;
              // successChecker(statDpa, statNon);
              $uibModalInstance.close();
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