(function() {
'use strict';
 
angular.
    module('eKinerja')
    .controller('KontrakPegawaiController', KontrakPegawaiController);

    function KontrakPegawaiController(KontrakPegawaiService, EkinerjaService, TemplateLaporanSKPService, $scope, $document, $uibModal) {
      var vm = this;
      vm.loading = true;
      vm.bulan = EkinerjaService.IndonesianMonth(new Date());
      vm.tahun = EkinerjaService.IndonesianYear(new Date());

      var eselon = $.parseJSON(sessionStorage.getItem('credential')).eselon.split('.')[0].toLowerCase();
      switch(eselon){
        case 'i' : case 'ii' : case 'iii' : vm.isEselon4 = false; break;
        default : vm.isEselon4 = true; break;
      }
      EkinerjaService.checkCredential();
      // EkinerjaService.checkRole($.parseJSON(sessionStorage.getItem('credential')).id);

      // vm.list_urtug = [];
      vm.pegawai = $.parseJSON(sessionStorage.getItem('credential'));

      getUrtugByJabatan();
      getPejabatPenilai();
      getUrtugKegiatanApproval();
      getStatAjuan();
      // getUrtugByJabatan();

      vm.getSKP = function(){
        KontrakPegawaiService.GetUrtugByNip(vm.pegawai.nipPegawai, (new Date()).getMonth()).then(
          function(response){debugger
            var doc = TemplateLaporanSKPService.template(response, vm.pegawai, vm.penilai, EkinerjaService.IndonesianMonth(new Date()),
              EkinerjaService.IndonesianYear(new Date()));
            EkinerjaService.lihatPdf(doc, 'Laporan SKP Bulan ' + EkinerjaService.IndonesianMonth(new Date()));
          }, function(errResponse){
            
          })
      }

      function getStatAjuan(){
        KontrakPegawaiService.GetUrtugNonDPA(
          $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
          $.parseJSON(sessionStorage.getItem('credential')).kdJabatan
          ).then(
          function(response){
            if(response.urtugTidakDipilihList.length == 0){
              vm.statusAjuanNonDpa = true;
            }
            else vm.statusAjuanNonDpa = false;
          }, function(errResponse){

          }
        );
      }

      // if(vm.isEselon4)  
        KontrakPegawaiService.GetUrtugDPA(
          $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
          $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
          function(response){
            if(response.length == 0)
              vm.statusAjuanDpa = false;
            else vm.statusAjuanDpa = true;
          }, function(errResponse){

          }
        );
      // else
      //   KontrakPegawaiService.GetUrtugProgram(
      //     $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
      //     $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
      //     function(response){
      //       if(response.length == 0)
      //         vm.statusAjuanDpa = false;
      //       else vm.statusAjuanDpa = true;
      //     }, function(errResponse){

      //     }
      //   );


      function getUrtugByJabatan(){
        KontrakPegawaiService.GetUrtugByNip(vm.pegawai.nipPegawai, (new Date()).getMonth()).then(
          function(response){
            vm.target = response;debugger
            if(response.length != 0)
              vm.statusKontrak = true;
            for(var i = 0; i<vm.target.length; i++)
              vm.target[i].biayaRp = EkinerjaService.FormatRupiah(vm.target[i].biaya);
            // vm.dataLook = response;
            pagingUrtug();
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
        // if(vm.isEselon4)
          KontrakPegawaiService.GetUrtugKegiatanApproval(
            $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
            $.parseJSON(sessionStorage.getItem('credential')).kdJabatan).then(
            function(response){
              vm.kegiatan = response;debugger
              for(var i = 0; i < response.length; i++)
                vm.kegiatan[i].paguAnggaran = EkinerjaService.FormatRupiah(vm.kegiatan[i].paguAnggaran);
                pagingKegiatan();
            }, function(errResponse){
              // vm.penilai = "";
            })
        // else
        //   KontrakPegawaiService.GetUrtugProgramApproval(
        //   $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
        //   $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
        //   function(response){
        //     vm.kegiatan = response;
        //     for(var i = 0; i < response.length; i++)
        //       vm.kegiatan[i].paguAnggaran = EkinerjaService.FormatRupiah(vm.kegiatan[i].biaya);
        //       pagingKegiatan();
        //   }, function(errResponse){
        //     // vm.penilai = "";
        //   })
      }

      vm.openUrtug = function (ajuan, parentSelector) {
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
        appendTo: parentElem,
        resolve: {
          isEselon4: function(){
            return vm.isEselon4;
          },
          isAjuan: function(){
            return ajuan;
          }
        }
        });

        modalInstance.result.then(function () {
          getUrtugKegiatanApproval();
          getUrtugByJabatan();
          getStatAjuan();
        }, function () {

        });
      };

      vm.openTemplate = function (uraianTugas, isDPA, parentSelector) {
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
        appendTo: parentElem,
            resolve: {
                urtug: function () {
                    return uraianTugas;
                },
                isDPA: function () {
                    return isDPA;
                }, 
                kdSurat: function(){ 
                    return null; 
                }, 
                jenisNaskahPenugasan: function(){ 
                    return 5; 
                } 
            }
        });

        modalInstance.result.then(function () {
        }, function () {

        });
      };

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
                  }
              }
          });

          modalInstance.result.then(function () {
          }, function () {

          });
      };

      function pagingUrtug(){ 
        $scope.filteredDataTarget = [];
        $scope.currentPageTarget = 0;
        $scope.numPerPageTarget = 5;
        $scope.maxSizeTarget = Math.ceil(vm.target.length/$scope.numPerPageTarget);
        function pageUrtug(){
          $scope.pageTarget = [];
          for(var i = 0; i < vm.target.length/$scope.numPerPageTarget; i++){
              $scope.pageTarget.push(i+1);
          }
        }
        pageUrtug();
        $scope.padTarget = function(i){
          $scope.currentPageTarget += i;
        }

        $scope.maxTarget = function(){
          if($scope.currentPageTarget >= $scope.maxSizeTarget - 1)
              return true;
          else return false;
        }

        $scope.$watch("currentPageTarget + numPerPageTarget", function() {
          var begin = (($scope.currentPageTarget) * $scope.numPerPageTarget)
          , end = begin + $scope.numPerPageTarget;

          $scope.filteredDataTarget = vm.target.slice(begin, end);
        });
      }

      function pagingKegiatan(){ 
        $scope.filteredDataKegiatan = [];
        $scope.currentPageKegiatan = 0;
        $scope.numPerPageKegiatan = 5;
        $scope.maxSizeKegiatan = Math.ceil(vm.kegiatan.length/$scope.numPerPageKegiatan);
        function pageKegiatan(){
          $scope.pageKegiatan = [];
          for(var i = 0; i < vm.kegiatan.length/$scope.numPerPage; i++){
              $scope.page.push(i+1);
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

      // $scope.$watch('searchUrtug', function(){
      //   if($scope.searchUrtug != '')
      //     vm.dataLook = EkinerjaService.searchByUrtug($scope.searchUrtug, vm.list_urtug);
      //   else vm.dataLook = vm.list_urtug;
      //   // debugger
      //   paging();
      // })

      $scope.$watch('urtug', function(){
      // console.log($scope.deskripsi.length)
      if($scope.urtug != undefined){
        vm.dataLook = EkinerjaService.searchByUrtug($scope.urtug, vm.list_urtug);
      }else {
        vm.dataLook = vm.list_urtug;
      }
      pagingUrtug();
    });
   } 
})();