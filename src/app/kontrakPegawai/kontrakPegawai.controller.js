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
      vm.tugasTambahan = [];

      var eselon = $.parseJSON(sessionStorage.getItem('credential')).eselon.split('.')[0].toLowerCase();
      switch(eselon){
        case 'i' : case 'ii' : case 'iii' : vm.isEselon4 = false; break;
        case 'xs': case 'xf': vm.isEselon4 = false; vm.laporan = true; break;
        default : vm.isEselon4 = true; vm.laporan = true; break;
      }
      EkinerjaService.checkCredential();
      // EkinerjaService.checkRole($.parseJSON(sessionStorage.getItem('credential')).id);

      // vm.list_urtug = [];
      vm.pegawai = $.parseJSON(sessionStorage.getItem('credential'));

      getUrtugKegiatanApproval();
      getUrtugByJabatan();
      getPejabatPenilai();
      getStatAjuan();
      // getUrtugByJabatan();

      vm.getSKP = function(){
        console.log(EkinerjaService.IndonesianMonth(new Date()));
        KontrakPegawaiService.GetUrtugKegiatan(
            $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
            (new Date()).getMonth(), EkinerjaService.IndonesianYear(new Date())).then(
            function(response){debugger
              for(var i = 0; i < response.length; i++)
                response[i].biayaRp = EkinerjaService.FormatRupiah(response[i].biaya);
              var data = response;
              KontrakPegawaiService.GetUrtugByNip(vm.pegawai.nipPegawai, (new Date()).getMonth()).then(
                function(response){
                  var doc = TemplateLaporanSKPService.template(response, data, vm.tugasTambahan, vm.pegawai, vm.penilai, EkinerjaService.IndonesianMonth(new Date()),
                    EkinerjaService.IndonesianYear(new Date()));
                  EkinerjaService.lihatPdf(doc, 'Laporan Kinerja Bulan ' + EkinerjaService.IndonesianMonth(new Date()));
                }, function(errResponse){
                  if(errResponse.status == -1)
                    EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
                })
            }, function(errResponse){
              if(errResponse.status == -1)
                EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
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
            if(errResponse.status == -1)
              EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
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
            // if(errResponse.status == -1)
            //   EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
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
            vm.target = response;
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
            if(errResponse.status == -1)
              EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
          }
        )
      }

      function getPejabatPenilai(){
        KontrakPegawaiService.GetPejabatPenilai($.parseJSON(sessionStorage.getItem('credential')).kdJabatan).then(
          function(response){
            vm.penilai = response;
          }, function(errResponse){
            vm.penilai = "";
            if(errResponse.status == -1)
              EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
          })
      }

      function getUrtugKegiatanApproval(){
        // if(vm.isEselon4)
          KontrakPegawaiService.GetUrtugKegiatan(
            $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
            (new Date()).getMonth(), EkinerjaService.IndonesianYear(new Date())).then(
            function(response){
              vm.kegiatan = response;debugger
              for(var i = 0; i < response.length; i++)
                // vm.kegiatan[i].biaya = EkinerjaService.FormatRupiah(vm.kegiatan[i].paguAnggaran);
                pagingKegiatan();
            }, function(errResponse){
              // vm.penilai = "";
              if(errResponse.status == -1)
                EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
            })
      }

      getTugasTambahan();
      function getTugasTambahan(){
        // if(vm.isEselon4)
          KontrakPegawaiService.GetTugasTambahan(
            $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            (new Date()).getMonth(), EkinerjaService.IndonesianYear(new Date())).then(
            function(response){
              vm.tugasTambahan = response;
            }, function(errResponse){
              // vm.penilai = "";
              if(errResponse.status == -1)
                EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
            })
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

        modalInstance.result.then(function () {debugger
        }, function () {
          getUrtugKegiatanApproval();
          getUrtugByJabatan();
          getStatAjuan();

        });
      };

      vm.progress = function (uraianTugas, parentSelector) {
        var parentElem = parentSelector ? 
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/kontrakPegawai/progress/progress.html',
        controller: 'ProgressController',
        controllerAs: 'progress',
        size: 'lg',
        // windowClass: 'app-modal-window',
        appendTo: parentElem,
            resolve: {
                urtug: function () {
                    return uraianTugas;
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
                  },
                  isEselon4:function(){
                    return vm.isEselon4;
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

      vm.openTugasTambahan = function (parentSelector) {
          var parentElem = parentSelector ?
              angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'app/kontrakPegawai/tugasTambahan/tugasTambahan.html',
              controller: 'TugasTambahanController',
              controllerAs: 'tambahan',
              appendTo: parentElem
              // windowClass: 'app-modal-window',
              // size: 'lg',
          });

          modalInstance.result.then(function () {
            getTugasTambahan();
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