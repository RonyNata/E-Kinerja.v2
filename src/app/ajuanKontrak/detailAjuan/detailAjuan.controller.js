(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('DetailAjuanController', DetailAjuanController);

    
    function DetailAjuanController(list_ajuan, list_tidakdiajukan, nama, nip, EkinerjaService, AjuanKontrakService, $uibModalInstance) {
      	var vm = this;

            vm.list_ajuan = angular.copy(list_ajuan);
            vm.list_tidakdiajukan = angular.copy(list_tidakdiajukan);
            vm.nama = nama;

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

            vm.save = function(){
                  var data = [];
                  for(var i = 0; i < vm.list_ajuan.length; i++){
                        if(vm.list_ajuan[i].terima){
                              vm.list_ajuan[i].statusApproval = 1;debugger
                        }
                        else
                              vm.list_ajuan[i].statusApproval = 2;
                        vm.list_ajuan[i].nipPegawai = nip;
                        data.push(vm.list_ajuan[i]);
                  }
                  for(var i = 0; i < vm.list_tidakdiajukan.length; i++){
                        vm.list_tidakdiajukan[i].statusApproval = 2;
                        vm.list_tidakdiajukan[i].nipPegawai = nip;
                        data.push(vm.list_tidakdiajukan[i]);
                  }console.log(JSON.stringify(data));

                  AjuanKontrakService.ApproveKontrak(data).then(
                  function(response){
                        // EkinerjaService.showToastrSuccess("Kontrak Tahunan Berhasil Disetujui");
                        $uibModalInstance.close();
                  }, function(errResponse){
                    EkinerjaService.showToastrError("Kontrak Tahunan Gagal Disetujui");
                  })
            }

            vm.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
            };
   	} 
})();