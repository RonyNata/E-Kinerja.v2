(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('AjuanKontrakController', AjuanKontrakController);

    
    function AjuanKontrakController(EkinerjaService, AjuanKontrakService, $document, $uibModal, $scope) {
      	var vm = this;
        vm.loading = true;

        getPegawaiPengaju();

        $scope.$watch('nipPegawai', function(){
          if($scope.nipPegawai != ''){
            vm.namaPegawai = EkinerjaService.searchByNip($scope.nipPegawai, vm.list_pegawai);
            vm.namaPegawai = vm.namaPegawai[0].namaPegawai;
            searchPegawaiByNip();
          }
        })

        function searchPegawaiByNip(pegawai){
          vm.list_ajuan = pegawai.uraianTugasDiajukan;
          vm.list_tidakdiajukan = pegawai.uraianTugasTidakDipilih;
          for(var i = 0; i < vm.list_ajuan.length; i++){
            vm.list_ajuan[i].biayaRp = EkinerjaService.FormatRupiah(vm.list_ajuan[i].biaya);
            vm.list_ajuan[i].terima = true;
          }
          for(var i = 0; i < vm.list_tidakdiajukan.length; i++)
            vm.list_tidakdiajukan[i].biayaRp = EkinerjaService.FormatRupiah(vm.list_tidakdiajukan[i].biaya);
        }

        vm.gantiStatusUrtug = function(urtug, terima){
          if(terima){
            urtug.terima = false;
            // var indexPush = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_tidakdiajukan);
            // var indexSplice = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_tidakdiajukan);
            // vm.list_ajuan.push(vm.list_tidakdiajukan[indexPush]);
            // vm.list_tidakdiajukan.splice(indexSplice, 1);
          }else{
            urtug.terima = true;
            // var indexPush = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_ajuan);
            // var indexSplice = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_ajuan);
            // vm.list_tidakdiajukan.push(angular.copy(vm.list_ajuan[indexPush]));
            // vm.list_ajuan.splice(indexSplice, 1);
          }
            console.log(urtug);
        }

        vm.tambahkan = function(kdUrtug){
          var indexPush = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_tidakdiajukan);
          var indexSplice = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_tidakdiajukan);
          vm.list_tidakdiajukan[indexPush].terima = true;
          vm.list_ajuan.push(vm.list_tidakdiajukan[indexPush]);
          vm.list_tidakdiajukan.splice(indexSplice, 1);
        }

        function getPegawaiPengaju(){
          AjuanKontrakService.GetPegawaiPengaju($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
            $.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){
              vm.list_pegawai = response;debugger
              vm.loading = false;
            }, function(errResponse){

            })
        }

        vm.approve = function(){
          var data = [];
          for(var i = 0; i < vm.list_ajuan.length; i++){
            if(vm.list_ajuan[i].terima){
              vm.list_ajuan[i].statusApproval = 1;debugger
            }
            else
              vm.list_ajuan[i].statusApproval = 2;
            vm.list_ajuan[i].nipPegawai = $scope.nipPegawai;
            data.push(vm.list_ajuan[i]);
          }
          for(var i = 0; i < vm.list_tidakdiajukan.length; i++){
            vm.list_tidakdiajukan[i].statusApproval = 2;
            vm.list_tidakdiajukan[i].nipPegawai = $scope.nipPegawai;
            data.push(vm.list_tidakdiajukan[i]);
          }console.log(JSON.stringify(data));

          AjuanKontrakService.ApproveKontrak(data).then(
            function(response){
              EkinerjaService.showToastrSuccess("Kontrak Tahunan Berhasil Disetujui");
            }, function(errResponse){
              EkinerjaService.showToastrError("Kontrak Tahunan Gagal Disetujui");
            })
        }

        vm.open = function (pegawai, parentSelector) {
          searchPegawaiByNip(pegawai);
          var eselon = pegawai.eselon.split('.')[0].toLowerCase();
          switch(eselon){
            case 'i' : case 'ii' : case 'iii' : vm.isEselon4 = false; break;
            default : vm.isEselon4 = true; break;
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
            windowClass: 'app-modal-windows',
            size: 'lg',
            appendTo: parentElem,
            resolve: {
              list_ajuan: function () {
                return vm.list_ajuan;
              },
              list_tidakdiajukan: function () {
                return vm.list_tidakdiajukan;
              },
              nama: function(){
                return pegawai.namaPegawai;
              },
              nip: function(){
                return pegawai.nipPegawai;
              },
              isEselon4: function(){
                return vm.isEselon4;
              },
              unit: function(){
                return pegawai.kdUnitKerja;
              }
            }
          });

          modalInstance.result.then(function () {
            // showToastrSuccess('ditambahkan');
            // getUrtugByJabatan();
            getPegawaiPengaju();
            EkinerjaService.showToastrSuccess('Ajuan Berhasil Disetujui');
            // vm.selected = selectedItem;
          }, function () {
            // showToastrFailed('menambahkan data');
            // $log.info('Modal dismissed at: ' + new Date());
          });
        };
   	} 
})();