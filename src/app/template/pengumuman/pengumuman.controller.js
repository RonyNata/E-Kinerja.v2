(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('PengumumanController', PengumumanController);

    function PengumumanController(EkinerjaService, HakAksesService, PengumumanService, $scope, 
        $state, logo_bekasi, $uibModal, $document) {
        var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.back =  function(){
            $state.go('kontrak');
        };

        vm.item.tahun = ((new Date()).getYear() + 1900);
        
        // vm.target = [{"id": new Date().getTime()}];
        
        // vm.addTarget = function(){
        //   var data = {"id": new Date().getTime()};
        //   vm.target.push(data);
        // } 
        
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

        vm.getPegawaiPenandatangan = function(){
          if(vm.item.pegawaiPenandatanganSurat.length == 18){
            vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip(vm.item.pegawaiPenandatanganSurat,vm.list_pegawai);
            console.log(vm.item.pegawaiPenandatangan);
          }
        }

        function template(){
            vm.docDefinition = {
                content: [
                    {
                        margin: [0, 0, 0, 15],
                        table:{
                            widths: [100,'*'],
                            body: [
                                [
                                    {
                                        image: 'logo',
                                        width: 90,
                                        height: 90,
                                        alignment: 'center'
                                    },
                                    [
                                        {
                                            text:[
                                                {text: 'PEMERINTAHAN KABUPATEN BEKASI\n', alignment: 'center', style:'header'},
                                                {text: '' + vm.item.pegawaiPenandatangan.unitKerja.toUpperCase() + '\n', alignment: 'center', style:'header'},
                                                {text: 'Komplek Perkantoran Pemerintah Kabupaten\nBekasi Desa Sukamahi Kecamatan Cikarang Pusat', style: 'header2'}
                                            ]
                                        },
                                        {
                                            margin: [15,0,0,0],
                                            table: {
                                                body: [
                                                    [
                                                        {text: 'Telp. (021) 89970696', style: 'header2'},
                                                        {text: 'Fax. (021) 89970064', style: 'header2'},
                                                        {text: 'email : diskominfo@bekasikab.go.id', style: 'header2'}
                                                    ]
                                                ]
                                            }, layout: 'noBorders'
                                        }
                                    ]
                                ],
                                [{text:'', colSpan: 2}],
                                [{text:'', fillColor: 'black', colSpan: 2}]
                            ]
                        },
                        layout: 'noBorders'
                    },

                    {
                        text: 'PENGUMUMAN', style: 'nama_judul'
                    },
                    {
                        margin:[0,0,0,15],
                        text: [{text : 'NOMOR ', style: 'judul_nomor'}, '' + vm.item.nomorSurat + '/' + vm.item.nomorSurat1 + '/' + vm.item.nomorSurat2 + '/' + ((new Date()).getYear() + 1900)]
                    },

                    {
                        margin:[0,0,0,15],
                        text: [{text: 'TENTANG\n', style: 'nama_judul'}, {text: '' + vm.item.tentang.toUpperCase(), style: 'nama_judul'}]
                    },

                    {
                        text: '' + vm.item.isipengumuman,  margin: [0,0,0,20]
                    },

                    {
                        style: 'tandaTangan',
                        table: {
                            widths: [200],
                            body: [
                                [{text: ['Dikeluarkan di ', {text:'' + vm.item.tempat, bold:true}], alignment : 'left'}],
                                [{text: ['pada tanggal ', {text:'' + EkinerjaService.IndonesianDateFormat(new Date()), bold:true}], alignment : 'left'}],
                                [{text: '' + vm.item.pegawaiPenandatangan.jabatan.toUpperCase() + ',', alignment : 'left', bold: true}],
                                [{text: ' ',margin: [0,20]}],
                                [{text: '' + vm.item.pegawaiPenandatangan.nama, alignment : 'left'}]
                            ]
                        },
                        layout: 'noBorders'
                    }
                ],
                styles: {
                    header: {
                        bold: true,
                        fontSize: 14,
                        alignment: 'center'
                    },
                    header2: {
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
                        fontSize: 11
                    },
                    header3: {
                        bold: true,
                        color: '#000',
                        fontSize: 10
                    },
                    demoTable: {
                        color: '#000',
                        fontSize: 10
                    },
                    tandaTangan: {
                        color: '#000',
                        fontSize: 10,
                        alignment:'right'
                    }
                },

                images:{
                    logo: logo_bekasi
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

        vm.back =  function(){
          $state.go('kontrak');
        }

        $scope.downloadPdf = function() {
            pdfMake.createPdf(vm.docDefinition).download();
        };



    }
})();