(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('NotaDinasController', NotaDinasController);

    
    function NotaDinasController(EkinerjaService, NotaDinasService, $scope, $state) {
      	var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.tembusanSurat = [{"id": new Date().getTime(), "deskripsi": ''}];

        vm.addTembusan = function(){
          var data = {"id": new Date().getTime(), "deskripsi": ''};
          vm.tembusanSurat.push(data);
        }

        vm.save = function(){
          vm.item.tembusanSurat = [];
          vm.item.tanggal = vm.item.tanggal.getTime();
          vm.item.nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
          vm.item.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
          vm.item.nmInstansi = $.parseJSON(sessionStorage.getItem('credential')).unit;
          for(var i = 0; i < vm.tembusanSurat.length; i++)
            vm.item.tembusanSurat.push((i+1) + '. ' + vm.tembusanSurat[i].deskripsi);
          console.log(vm.item);
          NotaDinasService.save(vm.item).then(
            function(response){
              EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
            }, function(errResponse){

            })
        }

        vm.back =  function(){
          $state.go('kontrak');
        }
   	} 
})();