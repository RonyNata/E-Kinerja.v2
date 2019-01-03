(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormPenanggungJawabController', FormPenanggungJawabController);

    
    function FormPenanggungJawabController(EkinerjaService, items, pegawai, isEselon4, isMaster, ket, PengadaanBarangJasaService, 
      $uibModalInstance, MasterKegiatanService) {
      	var vm = this;
        vm.loading = true;
        vm.pj = {};
        vm.ket = ket;
        MasterKegiatanService.GetPegawaiKegiatan(items).then(
        function(response){
          vm.list_pegawai = response;
          vm.loading = false;
        }, function(errResponse){
          if(errResponse.status == -1)
            EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
        })
        // vm.list_pegawai = pegawai;
        getAllStatusPJ();

        function getAllStatusPJ(){
          PengadaanBarangJasaService.GetStatusPJ(items).then(
            function(response){
              vm.datajabatan = response; debugger
            }, function(errResponse){
              if(errResponse.status == -1)
                EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
            })
        }

        vm.save = function(){
          items.nipPegawai = vm.pj.nipPegawai;
          items.kdStatusPenanggungJawab = vm.pj.jabatan;
          console.log(items);
          if(isMaster)
            MasterKegiatanService.CreatePJ(items).then(
              function(response){
                EkinerjaService.showToastrSuccess("Data Penanggung Jawab Berhasil Disimpan");
                $uibModalInstance.close();
              }, function(errResponse){
                if(errResponse.status == -1)
                  EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
                else EkinerjaService.showToastrError("Data Penanggung Jawab Gagal Disimpan");
              })
          else
            if(isEselon4)
              PengadaanBarangJasaService.AddPJ(items).then(
                function(response){
                  EkinerjaService.showToastrSuccess("Data Penanggung Jawab Berhasil Disimpan");
                  $uibModalInstance.close();
                }, function(errResponse){
                  if(errResponse.status == -1)
                    EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
                  else EkinerjaService.showToastrError("Data Penanggung Jawab Gagal Disimpan");
                })
            else 
              PengadaanBarangJasaService.AddPJProgram(items).then(
              function(response){
                EkinerjaService.showToastrSuccess("Data Penanggung Jawab Berhasil Disimpan");
                $uibModalInstance.close();
              }, function(errResponse){
                if(errResponse.status == -1)
                  EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
                else EkinerjaService.showToastrError("Data Penanggung Jawab Gagal Disimpan");
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