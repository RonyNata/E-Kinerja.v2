(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('TelaahanStaffController', TelaahanStaffController);

    function TelaahanStaffController(EkinerjaService, TelaahanStaffService, HakAksesService, 
        $scope, $state, $uibModal, $document) {
        var vm = this;
        vm.loading = true;
        vm.item = {};

        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    vm.loading = false;
                }, function(errResponse){

                })
        }

        vm.openDari = function (parentSelector) {
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/template/dataPegawai/dataPegawai.html',
          controller: 'DataPegawaiController',
          controllerAs: 'datapegawai',
          // windowClass: 'app-modal-window',
          size: 'lg',
          appendTo: parentElem,
          resolve: {
            pegawai: function(){
              return vm.list_pegawai;
            },
            pegawaiPilihan: function(){
              return vm.item.pegawaiPenandatangan;
            },
            isPilihan: function(){
              return 2;
            }
          }
          });

          modalInstance.result.then(function (data) {
            vm.item.pegawaiPenandatangan = data;
          }, function () {

          });
        };

        $scope.$watch('pegawaipenandatangan', function(){
            if($scope.pegawaipenandatangan.length == 18)
                vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip($scope.pegawaipenandatangan,vm.list_pegawai);
            debugger
        });

        vm.save = function(){
            var data = {
                "kdTelaahanStaf": null,
                "tentang": vm.item.tentang,
                "persoalan": vm.item.persoalan,
                "praanggapan": vm.item.praanggapan,
                "faktaYangMempengaruhi": vm.item.faktayangmempengaruhi,
                "analisis": vm.item.analisis,
                "simpulan" : vm.item.simpulan,
                "saran": vm.item.saran,
                "nipPenandatangan": vm.item.pegawaiPenandatangan.nipPegawai,
                "tanggalTelaahanStafMilis": vm.item.tanggal.getTime(),
                "nipPembuatSurat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
                "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
                "durasiPengerjaan": vm.item.durasiPengerjaan,

                "kdTelaahanStafBawahan": null,
                "kdNaskahPenugasan": null,
                "jenisNaskahPenugasan": 14,
                "statusPenilaian": 0,
                "alasanPenolakan": null
            };

            console.log(data);
            TelaahanStaffService.save(data).then(
                function(response){
                    EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
                    $state.go('kontrak');
                }, function(errResponse){
                    EkinerjaService.showToastrError('Data Tidak Dapat Disimpan');
                });
        };

        vm.back =  function(){
            $state.go('kontrak');
        };

        vm.item.tahun = ((new Date()).getYear() + 1900);

        function template(){
            vm.docDefinition = {
                content: [
                    {
                        text: 'TELAAHAN STAF', style: 'nama_judul', margin: [0,15,0,0]
                    },
                    {
                        text: 'TENTANG', style: 'nama_judul', margin: [0,15,0,0]
                    },
                    {
                        text: '' +vm.item.tentang.toUpperCase(), style: 'judul_nomor'
                    },

                    {
                        type: 'upper-alpha', bold: true, margin:[0,20,0,20],
                        ol: [
                            {text:['Persoalan\n', {text:'' +vm.item.persoalan, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                            {text:['Praanggapan\n', {text:'' +vm.item.praanggapan, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                            {text:['Fakta yang Mempegaruhi\n', {text:'' +vm.item.faktayangmempengaruhi, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                            {text:['Analisis\n', {text:'' +vm.item.analisis, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                            {text:['Simpulan\n', {text:'' +vm.item.simpulan, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                            {text:['Saran\n', {text:'' +vm.item.saran, bold:false, alignment:'justify'}],margin:[0,0,0,5]}
                        ]
                    },

                    {
                        columns: [
                            {
                                width: '63%',
                                text: ''
                            },
                            {
                                style: 'tandaTangan',
                                table: {
                                    widths: [200],
                                    body: [
                                        [{text: '' + vm.item.pegawaiPenandatangan.jabatan + ',', alignment : 'left', bold: true}],
                                        [{text: ' ',margin: [0,20]}],
                                        [{text: '' + vm.item.pegawaiPenandatangan.nama, alignment : 'left', bold: true}],
                                        [{text: '' + vm.item.pegawaiPenandatangan.nipPegawai, alignment : 'left'}]
                                    ]
                                },
                                layout: 'noBorders'
                            }
                        ]
                    }
                ],
                styles: {
                    header: {
                        bold: true,
                        fontSize: 14,
                        alignment: 'center'
                    },
                    header2: {
                        fontSize: 12,
                        alignment: 'center'
                    },
                    header3: {
                        fontSize: 10,
                        alignment: 'center'
                    },
                    nama_judul: {
                        alignment : 'center',
                        bold: true,
                        fontSize: 12
                    },
                    judul_nomor: {
                        alignment : 'center',
                        bold: true,
                        fontSize: 12
                    },
                    demoTable: {
                        color: '#000',
                        fontSize: 12
                    },
                    tandaTangan: {
                        color: '#000',
                        fontSize: 12,
                        alignment:'right'
                    }
                }
            };
        }

        $scope.openPdf = function() {
            var blb;
            // pdfMake.createPdf(vm.docDefinition).getBuffer(function(buffer) {
            //     // turn buffer into blob
            //     blb = buffer;
            // });
            // blb = new Blob(blb);
            console.log(vm.item.pembukaSurat);
            template();
            pdfMake.createPdf(vm.docDefinition).open();
        };

        $scope.downloadPdf = function() {
            pdfMake.createPdf(vm.docDefinition).download();
        };

    }
})();