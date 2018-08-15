(function() {
'use strict';
 
angular.
  module('eKinerja')
  .controller('AjuanKontrakController', AjuanKontrakController);

    
    function AjuanKontrakController(EkinerjaService, KontrakPegawaiService, AjuanKontrakService, $document, $uibModal, $scope) {
        var vm = this;
        vm.loading = true;
        createSelfData();

        console.log("WebSocket" in window);

        function getPegawaiPengaju(){
          vm.list_pegawai = [];
          AjuanKontrakService.GetPegawaiPengaju($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
            $.parseJSON(sessionStorage.getItem('credential')).nipPegawai, (new Date()).getMonth()).then(
            function(response){
              for(var i = 0; i < response.length;i++){
                vm.list_pegawai.push(response[i]);
              }
              for(var i = 0; i < vm.list_pegawai.length;i++){
                if(vm.list_pegawai[i].jabatan){
                  getUrtug(vm.list_pegawai[i].nipPegawai, vm.list_pegawai[i].kdJabatan, vm.list_pegawai[i]);
                  getUrtugByJabatan(vm.list_pegawai[i].nipPegawai, vm.list_pegawai[i]);
                }
              }
              debugger
              vm.loading = false;
            }, function(errResponse){

            })
        }

        function getPegawaiAtasan(){
          vm.pegawai_atasan = [];
          KontrakPegawaiService.GetPejabatPenilai($.parseJSON(sessionStorage.getItem('credential')).kdJabatan).then(
            function(response){
              response.namaPegawai = response.nama;
              vm.pegawai_atasan.push(response);
              getAtasanPenilai(response.kdJabatan);
            }, function(errResponse){

            })

        }

        function getAtasanPenilai(kdJabatan){
          KontrakPegawaiService.GetPejabatPenilai(kdJabatan).then(
            function(response){
              response.namaPegawai = response.nama;
              vm.pegawai_atasan.push(response);
              for(var i = 0; i < vm.pegawai_atasan.length;i++){
                if(vm.pegawai_atasan[i].jabatan){
                  getUrtug(vm.pegawai_atasan[i].nipPegawai, vm.pegawai_atasan[i].kdJabatan, vm.pegawai_atasan[i]);
                  getUrtugByJabatan(vm.pegawai_atasan[i].nipPegawai, vm.pegawai_atasan[i]);
                }
              }
              getPegawaiPengaju();
            }, function(errResponse){

            })

        }

        function createSelfData(){
          vm.pegawai = {
            'nipPegawai': $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            'kdJabatan': $.parseJSON(sessionStorage.getItem('credential')).kdJabatan,
            'namaPegawai': $.parseJSON(sessionStorage.getItem('credential')).namaPegawai,
            'kdUnitKerja': $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
            'jabatan': $.parseJSON(sessionStorage.getItem('credential')).jabatan
          };
          getUrtug(vm.pegawai.nipPegawai, vm.pegawai.kdJabatan, vm.pegawai);
          getUrtugByJabatan(vm.pegawai.nipPegawai, vm.pegawai);
          getPegawaiAtasan();
        }

        function getUrtug(nipPegawai,kdJabatan, pegawai){
          KontrakPegawaiService.GetUrtugNonDPA(nipPegawai,kdJabatan).then(
            function(response){
              vm.urtugNonDpa = response.urtugTidakDipilihList; 
              for(var i = 0; i < vm.urtugNonDpa.length; i++){
                vm.urtugNonDpa[i].biayaRp = EkinerjaService.FormatRupiah(vm.urtugNonDpa[i].biaya);
                vm.urtugNonDpa[i].checked = false;
                vm.urtugNonDpa[i].targetKuantitas = vm.urtugNonDpa[i].kuantitas - vm.urtugNonDpa[i].totalRealisasi;
              }
              pegawai.urtugNonDpa = vm.urtugNonDpa;
            }, function(errResponse){

            }
          );

          KontrakPegawaiService.GetUrtugKegiatanApproval(
              nipPegawai,pegawai.kdUnitKerja,kdJabatan).then(
              function(response){
                vm.urtugDpa = response; debugger
                for(var i = 0; i < vm.urtugDpa.length; i++){ 
                  vm.urtugDpa[i].checked = false;
                  vm.urtugDpa[i].targetKuantitas = 0;
                  vm.urtugDpa[i].waktu = 0;
                  vm.urtugDpa[i].targetKualitas = 100;
                  vm.urtugDpa[i].biaya = vm.urtugDpa[i].paguAnggaran;
                  vm.urtugDpa[i].biayaRp = EkinerjaService.FormatRupiah(vm.urtugDpa[i].paguAnggaran);
                }
                pegawai.urtugDpa = vm.urtugDpa;
                  // pagingUrtugDpa();
              }, function(errResponse){

              }
            );
        }

        function getUrtugByJabatan(nipPegawai, pegawai){
          KontrakPegawaiService.GetUrtugByNip(nipPegawai, (new Date()).getMonth()).then(
            function(response){
              for(var i = 0; i<response.length; i++)
                response[i].biayaRp = EkinerjaService.FormatRupiah(response[i].biaya);
              pegawai.skp = response;
              getUrtugKegiatanApproval(pegawai);
              // vm.dataLook = response;
              // debugger
            }, function(errResponse){
              vm.loading = false;

            }
          )
        }

        function getUrtugKegiatanApproval(pegawai){
          // if(vm.isEselon4)
          KontrakPegawaiService.GetUrtugKegiatan(pegawai.nipPegawai,pegawai.kdUnitKerja,
            (new Date()).getMonth(), EkinerjaService.IndonesianYear(new Date())).then(
            function(response){
              pegawai.skpDpa = response;debugger
              for(var i = 0; i < response.length; i++)
                pegawai.skpDpa[i].biaya = EkinerjaService.FormatRupiah(pegawai.skpDpa[i].biaya);
            }, function(errResponse){
              // vm.penilai = "";
            })
        }

        vm.open = function (pegawai, isAjuan, parentSelector) {debugger
          if(isAjuan){
            var utg = pegawai.urtugNonDpa;
            var dpa = pegawai.urtugDpa;
          }
          else {
            var utg = pegawai.skp;
            var dpa = pegawai.skpDpa;
          }
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
              dpa: function(){
                return dpa;
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
            createSelfData();
            // vm.selected = selectedItem;
          }, function () {
            // showToastrFailed('menambahkan data');
            // $log.info('Modal dismissed at: ' + new Date());
          });
        };
   	} 
})();