(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('PJController', PJController);

    
    function PJController(EkinerjaService, $scope, urtug, kegiatan, jabatan,$uibModal, $document, isEselon4,
      PengumpulanDataBebanKerjaService, $uibModalInstance, PengadaanBarangJasaService) {
      	var vm = this;

        vm.kegiatan = kegiatan;
        vm.isEselon4 = isEselon4;

        function getPegawaiJabatan(){
          PengumpulanDataBebanKerjaService.GetPegawaiByJabatan(jabatan)
            .then(function(response){
              vm.pegawai = response;
              debugger
            }, function(errResponse){

            })
        }

        console.log(urtug);

        var getPJ = function(){
          vm.loadData = true;
          var data = {
            "kdUrtug": urtug.kdUrtug,
            "kdJabatan": jabatan,
            "kdJenisUrtug": urtug.kdJenisUrtug,
            "tahunUrtug": urtug.tahunUrtug,
            "kdUrusan": kegiatan.kdUrusan,
            "kdBidang": kegiatan.kdBidang,
            "kdUnit": kegiatan.kdUnit,
            "kdSub": kegiatan.kdSub,
            "tahun": kegiatan.tahun,
            "kdProg": kegiatan.kdProg,
            "idProg": kegiatan.idProg,
            "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja
          }

          getPegawaiJabatan();
          if(vm.isEselon4){
            data.kdKeg = kegiatan.kdKeg;
            PengadaanBarangJasaService.GetUrtugKegiatanPenanggungjawab(data).then(
              function(response){
                vm.jabatanDpa = response;debugger
                vm.kegStat = false;
                vm.loadData = false;
              }, function(errResponse){
                vm.kegStat = true;
              })
          }
          else
            PengadaanBarangJasaService.GetUrtugProgramPenanggungjawab(data).then(
              function(response){
                vm.jabatanDpa = response;debugger
                vm.kegStat = false;
                vm.loadData = false;
              }, function(errResponse){
                vm.kegStat = true;
              })
        }
        getPJ();

        vm.addPJ = function (parentSelector) {
          var item = {
            "kdUrtug": urtug.kdUrtug,
            "kdJabatan": urtug.kdJabatan,
            "kdJenisUrtug": urtug.kdJenisUrtug,
            "tahunUrtug": urtug.tahunUrtug,
            "kdUrusan": kegiatan.kdUrusan,
            "kdBidang": kegiatan.kdBidang,
            "kdUnit": kegiatan.kdUnit,
            "kdSub": kegiatan.kdSub,
            "tahun": kegiatan.tahun,
            "kdProg": kegiatan.kdProg,
            "idProg": kegiatan.idProg,
          }
          if(isEselon4)
            item.kdKeg = kegiatan.kdKeg;
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/pengadaanBarangJasa/formPenanggungJawab.html',
          controller: 'FormPenanggungJawabController',
          controllerAs: 'skform',
          // windowClass: 'app-modal-window',
          // size: 'lg',
          appendTo: parentElem,
          resolve: {
            items: function () {
              return item;
            },
            pegawai: function(){
              return vm.pegawai;
            },
            isEselon4: function(){
              return isEselon4;
            }
          }
          });

          modalInstance.result.then(function () {
            getPJ();
          }, function () {
            // showToastrFailed('menambahkan data');
          // $log.info('Modal dismissed at: ' + new Date());
          });
        };

        vm.remove = function(data){
          var item = {
            "kdUrtug": urtug.kdUrtug,
            "kdJabatan": urtug.kdJabatan,
            "kdJenisUrtug": urtug.kdJenisUrtug,
            "tahunUrtug": urtug.tahunUrtug,
            "kdUrusan": kegiatan.kdUrusan,
            "kdBidang": kegiatan.kdBidang,
            "kdUnit": kegiatan.kdUnit,
            "kdSub": kegiatan.kdSub,
            "tahun": kegiatan.tahun,
            "kdProg": kegiatan.kdProg,
            "idProg": kegiatan.idProg,
            "nipPegawai": data.nipPegawai,
            "kdStatusPenanggungJawab": data.kdStatusPenanggungJawab
          }
          if(isEselon4){
            console.log(item);
            item.kdKeg = kegiatan.kdKeg;
            PengadaanBarangJasaService.RemovePJ(item).then(
              function(response){
                EkinerjaService.showToastrSuccess('Data Penanggungjawab berhasil dihapus dari kegiatan');
                getPJ();
              }, function(errResponse){
                EkinerjaService.showToastrError('Gagal Dihapus');
              })
          }
          else
            PengadaanBarangJasaService.RemovePJProgram(item).then(
              function(response){
                EkinerjaService.showToastrSuccess('Data Penanggungjawab berhasil dihapus dari program');
                getPJ();
              }, function(errResponse){
                EkinerjaService.showToastrError('Gagal Dihapus');
              })

        }

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }
   	} 
})();