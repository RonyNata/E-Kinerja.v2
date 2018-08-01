(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('AjuanKontrakController', AjuanKontrakController);

    
    function AjuanKontrakController(EkinerjaService, KontrakPegawaiService, AjuanKontrakService, $document, $uibModal, $scope) {
      	var vm = this;
        vm.loading = true;

        getPegawaiPengaju();

        function getPegawaiPengaju(){
          AjuanKontrakService.GetPegawaiPengaju($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
            $.parseJSON(sessionStorage.getItem('credential')).nipPegawai, (new Date()).getMonth()).then(
            function(response){
              vm.list_pegawai = response;
              getPegawaiAtasan();
              vm.loading = false;
            }, function(errResponse){

            })
        }

        function getPegawaiAtasan(){
          KontrakPegawaiService.GetPejabatPenilai($.parseJSON(sessionStorage.getItem('credential')).kdJabatan).then(
            function(response){
              response.namaPegawai = response.nama;
              vm.list_pegawai.push(response);
              getAtasanPenilai(response.kdJabatan);
            }, function(errResponse){

            })

        }

        function getAtasanPenilai(kdJabatan){
          KontrakPegawaiService.GetPejabatPenilai(kdJabatan).then(
            function(response){debugger
              response.namaPegawai = response.nama;
              vm.list_pegawai.push(response);
              createSelfData();
              for(var i = 0; i < vm.list_pegawai.length;i++){
                getUrtug(vm.list_pegawai[i].nipPegawai, vm.list_pegawai[i].kdJabatan, vm.list_pegawai[i]);
                getUrtugByJabatan(vm.list_pegawai[i].nipPegawai, vm.list_pegawai[i]);
              }
              debugger
            }, function(errResponse){

            })

        }

        function createSelfData(){
          vm.list_pegawai.push({
            'nipPegawai': $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            'kdJabatan': $.parseJSON(sessionStorage.getItem('credential')).kdJabatan,
            'namaPegawai': $.parseJSON(sessionStorage.getItem('credential')).namaPegawai,
            'jabatan': $.parseJSON(sessionStorage.getItem('credential')).jabatan
          })
        }

        function getUrtug(nipPegawai,kdJabatan, pegawai){
          KontrakPegawaiService.GetUrtugNonDPA(nipPegawai,kdJabatan).then(
            function(response){
              vm.urtugNonDpa = response.urtugTidakDipilihList; debugger
              for(var i = 0; i < vm.urtugNonDpa.length; i++){
                vm.urtugNonDpa[i].biayaRp = EkinerjaService.FormatRupiah(vm.urtugNonDpa[i].biaya);
                vm.urtugNonDpa[i].checked = false;
                vm.urtugNonDpa[i].targetKuantitas = vm.urtugNonDpa[i].kuantitas - vm.urtugNonDpa[i].totalRealisasi;
              }
              pegawai.urtugNonDpa = vm.urtugNonDpa;
            }, function(errResponse){

            }
          );

          // if(isEselon4)
            // KontrakPegawaiService.GetUrtugDPA(nipPegawai,
            //   $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,kdJabatan).then(
            //   function(response){
            //     vm.urtugDpa = response; debugger
            //     for(var i = 0; i < response.length; i++){ 
            //       vm.urtugDpa[i].checked = false;
            //       vm.urtugDpa[i].biayaRp = EkinerjaService.FormatRupiah(vm.urtugDpa[i].biaya);
            //     }
            //       pagingUrtugDpa();
            //   }, function(errResponse){

            //   }
            // );
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

        function getUrtugByJabatan(nipPegawai, pegawai){
          KontrakPegawaiService.GetUrtugByNip(nipPegawai, (new Date()).getMonth()).then(
            function(response){
              for(var i = 0; i<response.length; i++)
                response[i].biayaRp = EkinerjaService.FormatRupiah(response[i].biaya);
              pegawai.skp = response;
              // vm.dataLook = response;
              // debugger
            }, function(errResponse){
              vm.loading = false;

            }
          )
        }

        vm.open = function (pegawai, isAjuan, parentSelector) {
          if(isAjuan)
            var utg = pegawai.urtugNonDpa;
          else var utg = pegawai.skp;
          var parentElem = parentSelector ? 
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'app/ajuanKontrak/detailAjuan/detailAjuan.html',
            controller: 'DetailAjuanController',
            controllerAs: 'ajuan',
            size: 'lg',
            appendTo: parentElem,
            resolve: {
              nama: function () {
                return pegawai.namaPegawai;
              },
              isAjuan: function(){
                return isAjuan;
              },
              urtug: function(){
                return utg;
              },
              nipPegawai: function(){
                return pegawai.nipPegawai;
              }
            }
          });

          modalInstance.result.then(function () {
            // showToastrSuccess('ditambahkan');
            // getUrtugByJabatan();
            getPegawaiPengaju();
            // vm.selected = selectedItem;
          }, function () {
            // showToastrFailed('menambahkan data');
            // $log.info('Modal dismissed at: ' + new Date());
          });
        };
   	} 
})();