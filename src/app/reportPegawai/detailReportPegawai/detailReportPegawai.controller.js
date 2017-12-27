(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('DetailReportPegawaiController', DetailReportPegawaiController);


    function DetailReportPegawaiController(list_ajuan, list_tidakdiajukan, nama, nip, isEselon4, unit, EkinerjaService,
                                   KontrakPegawaiService, AjuanKontrakService, $uibModalInstance) {
        var vm = this;

        vm.list_ajuan = angular.copy(list_ajuan);
        vm.list_tidakdiajukan = angular.copy(list_tidakdiajukan);
        vm.nama = nama;

        vm.isEselon4 = isEselon4;

        getUrtugKegiatanApproval();

        function getUrtugKegiatanApproval(){
            if(vm.isEselon4)
                KontrakPegawaiService.GetUrtugKegiatanApproval(nip,unit).then(
                    function(response){
                        vm.kegiatan = response;debugger
                        for(var i = 0; i < response.length; i++)
                            vm.kegiatan[i].paguAnggaran = EkinerjaService.FormatRupiah(vm.kegiatan[i].paguAnggaran);
                    }, function(errResponse){
                        // vm.penilai = "";
                    })
            else
                KontrakPegawaiService.GetUrtugProgramApproval(nip,unit).then(
                    function(response){
                        vm.kegiatan = response;debugger
                        for(var i = 0; i < response.length; i++)
                            vm.kegiatan[i].paguAnggaran = EkinerjaService.FormatRupiah(vm.kegiatan[i].biaya);
                    }, function(errResponse){
                        // vm.penilai = "";
                    })
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
        };

        vm.open = function (parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/reportPegawai/detailReportPegawaiKegiatan/detailReportPegawaiKegiatan.html',
                controller: 'DetailReportPegawaiKegiatanController',
                controllerAs: 'detailReportPegawaiKegiatan',
                windowClass: 'app-modal-windows',
                appendTo: parentElem
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

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();