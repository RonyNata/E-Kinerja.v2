(function() {
'use strict';
 
angular.
    module('eKinerja')
    .controller('KontrakPegawaiController', KontrakPegawaiController);

    function KontrakPegawaiController(KontrakPegawaiService, EkinerjaService, $scope, $document, $uibModal) {
      var vm = this;
      vm.loading = true;


      EkinerjaService.checkCredential();
      // EkinerjaService.checkRole($.parseJSON(sessionStorage.getItem('credential')).id);

      // vm.list_urtug = [];
      vm.pegawai = $.parseJSON(sessionStorage.getItem('credential'));

      getUrtugByJabatan();
      getPejabatPenilai();
      getUrtugKegiatanApproval();
      // getUrtugByJabatan();

      function getUrtugByJabatan(){
        KontrakPegawaiService.GetUrtugByNip(vm.pegawai.nipPegawai).then(
          function(response){
            vm.target = response;
            for(var i = 0; i<vm.target.length; i++)
              vm.target[i].biayaRp = EkinerjaService.FormatRupiah(vm.target[i].biaya);
            // vm.dataLook = response;
            // paging();
            vm.loading = false;
            // debugger
          }, function(errResponse){
            vm.loading = false;

          }
        )
      }

      function getPejabatPenilai(){
        KontrakPegawaiService.GetPejabatPenilai($.parseJSON(sessionStorage.getItem('credential')).kdJabatan).then(
          function(response){
            vm.penilai = response;
          }, function(errResponse){
            vm.penilai = "";
          })
      }

      function getUrtugKegiatanApproval(){
        KontrakPegawaiService.GetUrtugKegiatanApproval(
          $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
          $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
          function(response){
            vm.kegiatan = response;
            for(var i = 0; i < response.length; i++)
              vm.kegiatan[i].paguAnggaran = EkinerjaService.FormatRupiah(vm.kegiatan[i].paguAnggaran);
          }, function(errResponse){
            // vm.penilai = "";
          })
      }

      vm.openUrtug = function (parentSelector) {
        var parentElem = parentSelector ? 
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/kontrakPegawai/formPemilihanUrtugTahunan/formPemilihanUrtugTahunan.html',
        controller: 'FormPemilihanUrtugTahunanController',
        controllerAs: 'pilihurtug',
        // windowClass: 'app-modal-window',
        size: 'lg',
        appendTo: parentElem
        });

        modalInstance.result.then(function () {
          getUrtugKegiatanApproval();
          getUrtugByJabatan();
        }, function () {

        });
      };

      vm.openTemplate = function (parentSelector) {
        var parentElem = parentSelector ? 
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/kontrakPegawai/template/listTemplate.html',
        controller: 'TemplateController',
        controllerAs: 'temp',
        // windowClass: 'app-modal-window',
        // size: 'lg',
        appendTo: parentElem
        });

        modalInstance.result.then(function () {
        }, function () {

        });
      };

      vm.openHistory = function (parentSelector) {
        var parentElem = parentSelector ? 
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/kontrakPegawai/history/history.html',
        controller: 'HistoryController',
        controllerAs: 'history',
        // windowClass: 'app-modal-window',
        // size: 'lg',
        appendTo: parentElem
        });

        modalInstance.result.then(function () {

        }, function () {

        });
      };

      function paging(){ 
        $scope.filteredData = [];
        $scope.currentPage = 0;
        $scope.numPerPage = 10;
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
          , end = begin + $scope.numPerPage;

          $scope.filteredData = vm.dataLook.slice(begin, end);
        });
      }

      $scope.$watch('searchName', function(){
        if($scope.searchName != '')
          vm.dataLook = EkinerjaService.searchByDeskripsi($scope.searchName, vm.list_urtug);
        else vm.dataLook = vm.list_urtug;
        // debugger
        paging();
      })
   } 
})();