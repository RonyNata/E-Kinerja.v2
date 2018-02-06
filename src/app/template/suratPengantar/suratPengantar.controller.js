(function() {
'use strict';
 
angular.
  module('eKinerja')
  .controller('SuratPengantarController', SuratPengantarController);

    
    function SuratPengantarController(EkinerjaService, SuratPengantarService, HakAksesService, 
      $scope, $state, logo_bekasi, $uibModal, $document) {
        var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.item.tahun = ((new Date()).getYear() + 1900);

        vm.back =  function(){
            $state.go('kontrak');
        };

        vm.isi = [{"id": new Date().getTime()}];

        if($.parseJSON(sessionStorage.getItem('pegawai')) != undefined){
            vm.list_pegawai = $.parseJSON(sessionStorage.getItem('pegawai'));
            vm.loading = false; 
        }
        else
        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    sessionStorage.setItem('pegawai', JSON.stringify(vm.list_pegawai));
                    vm.loading = false;
                }, function(errResponse){

                })
        }

        vm.openDari = function (pegawai, parentSelector) {
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
              return pegawai;
            },
            isPilihan: function(){
              return 2;
            }
          }
          });

          modalInstance.result.then(function (data) {
            if(pegawai == 1)
                vm.item.pegawaiPenerima = data;
            else vm.item.pegawaiPembuat = data;
          }, function () {

          });
        };

        $scope.$watch('pegawai', function(){
          if($scope.pegawai.length == 18)
            vm.item.pegawaiPembuat = EkinerjaService.findPegawaiByNip($scope.pegawai,vm.list_pegawai);
          debugger
        })

        $scope.$watch('pegawaiPenerima', function(){
          if($scope.pegawaiPenerima.length == 18)
            vm.item.pegawaiPenerima = EkinerjaService.findPegawaiByNip($scope.pegawaiPenerima,vm.list_pegawai);
          debugger
        })

        vm.addIsi = function(){
          var data = {"id": new Date().getTime()};
          vm.isi.push(data);
        }

        vm.save = function(){
          var data = {
            "nomorUrusan":vm.item.nomorUrusan,
            "nomorPasanganUrut":vm.item.nomorPasanganUrut,
            "nomorUnit":vm.item.nomorUnit,
            "tanggalPembuatanMilis":vm.item.tanggal.getTime(),
            "tanggalDiterimaSuratPengantar":vm.item.tanggal.getTime(),
            "kdJabatanPenerimaSuratPengantar":vm.item.pegawaiPenerima.kdJabatan,
            "nipPenerimaSuratPengantar":vm.item.pegawaiPenerima.nipPegawai,
            "nipPemberiSuratPengantar":vm.item.pegawaiPembuat.nipPegawai,
            "nomorTeleponPemberi":vm.item.telepon,
            "nipPembuatSurat":$.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            "kdUnitKerja":$.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
            "kdNaskahPenugasan":$state.params.kdSurat,
            "jenisNaskahPenugasan":$state.params.jenisNaskahPenugasan,
            "durasiPengerjaan": vm.item.durasiPengerjaan,
            "kdSuratPengantarBawahan":null,
            "suratPengantarIsiList":[]
          }

          for(var i=0; i < vm.isi.length; i++)
            data.suratPengantarIsiList.push({
              "naskahDinasYangDikirim":vm.isi[i].naskah,
              "banyakNaskah":vm.isi[i].qty,
              "keterangan":vm.isi[i].keterangan
            });

          SuratPengantarService.save(data).then(
            function(response){
              EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
              $state.go('kontrak');
            }, function(errResponse){

            })
        }

        vm.back =  function(){
          $state.go('kontrak');
        }


        // docDefinition.content[0].text = 'baka aweu';

        function template(){
          vm.docDefinition = {
            content: [
                {
                    margin:[0,0,0,15],
                    table:{
                        widths: [100,'*'],
                        body: [
                            [
                                {
                                    image: logo_bekasi,
                                    width: 90,
                                    height: 90,
                                    alignment: 'center'
                                },
                                [
                                    {
                                        text:[
                                            {text: 'PEMERINTAHAN KABUPATEN BEKASI\n', alignment: 'center', style:'header'},
                                            {text: '' + vm.item.pegawaiPembuat.unitKerja.toUpperCase() + '\n', alignment: 'center', style:'header'},
                                            {text: 'Komplek Perkantoran Pemerintah Kabupaten\nBekasi Desa Sukamahi Kecamatan Cikarang Pusat', style: 'header2'}
                                        ]
                                    },
                                    {
                                        margin: [15,0,0,0],
                                        table: {
                                            body: [
                                                [
                                                    {text: 'Telp. (021) 89970696', style: 'header3'},
                                                    {text: 'Fax. (021) 89970064', style: 'header3'},
                                                    {text: 'email : diskominfo@bekasikab.go.id', style: 'header3'}
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
                    margin: [0,15,0,0],
                    text: '' + EkinerjaService.IndonesianDateFormat(vm.item.tanggal),
                    alignment: 'right',
                    fontSize: 12
                },
                {
                  margin: [0, 10, 0, 0],
                  table: {
                    widths: [150],
                    body: [
                      [{text:[{text: 'Yth. ', fontSize: 12}, {text: '' + vm.item.pegawaiPenerima.jabatan.toUpperCase(), fontSize: 12, bold:true}]}]
                    ]
                  },
                    layout: 'noBorders'
                },
                {
                    margin: [0,30,0,0],
                    text: 'SURAT PENGANTAR',
                    fontSize: 12,
                    alignment: 'center',
                    bold: true
                },
                {
                    margin: [0,0,0,0],
                    text: 'NOMOR : '+ vm.item.nomorUrusan +'/' + vm.item.nomorUrut + '/'+ vm.item.nomorPasanganUrut + '/'+ vm.item.nomorUnit + '/' + vm.item.tahun,
                    fontSize: 12,
                    alignment: 'center',
                    bold: true
                },
                {
                    margin: [0, 20, 0, 0],
                    table:{
                    widths: ['auto', 205, 130, 130],
                    body: [
                      [
                        {
                          text: 'No.',
                          fontSize: 12,
                          alignment: 'center'
                        },
                        {
                          text: 'Naskah Dinas yang Dikirimkan',
                          fontSize: 12,
                          alignment: 'center'
                        },
                        {
                          text: 'Banyaknya',
                          fontSize: 12,
                          alignment: 'center'
                        },
                        {
                          text: 'Keterangan',
                          fontSize: 12,
                          alignment: 'center'
                        }
                      ]
                    ]
                  }
                },


                {
                    margin: [0, 40, 0, 10],
                    table:{
                        widths: [100, 5, '*'],
                        body: [
                            [
                                {text: 'Di Terima Tanggal', fontSize: 12},
                                {text: ':', fontSize: 12},
                                {text: '' + EkinerjaService.IndonesianDateFormat(vm.item.tanggal), fontSize: 12}
                            ]
                        ]
                    },
                    layout: 'noBorders'
                },


                {
                    margin: [0, 30, 0, 0],
                    columns: [
                        {
                            style: 'tandaTangan',
                            table: {
                                widths: ['*'],
                                body: [
                                    [{text: ['Penerima,'], alignment : 'left'}],
                                    [{text: '' + vm.item.pegawaiPenerima.jabatan + ',', alignment : 'left', bold: true}],
                                    [{text: ' ',margin: [0,20]}],
                                    [{text: '' + vm.item.pegawaiPenerima.gelarDepan + vm.item.pegawaiPenerima.nama + vm.item.pegawaiPenerima.gelarBelakang, alignment : 'left', bold: true}],
                                    [{text: '' + vm.item.pegawaiPenerima.pangkat, alignment : 'left', bold: true}],
                                    [{text: 'NIP. ' + vm.item.pegawaiPenerima.nipPegawai, alignment : 'left'}]
                                ]
                            },
                            layout: 'noBorders'
                        },
                        {
                            style: 'tandaTangan',
                            table: {
                                widths: ['*'],
                                body: [
                                    [{text: ['Pengirim,'], alignment : 'left'}],
                                    [{text: '' + vm.item.pegawaiPembuat.jabatan + ',', alignment : 'left', bold: true}],
                                    [{text: ' ',margin: [0,20]}],
                                    [{text: '' + vm.item.pegawaiPembuat.gelarDepan + vm.item.pegawaiPembuat.nama + vm.item.pegawaiPembuat.gelarBelakang, alignment : 'left', bold: true}],
                                    [{text: '' + vm.item.pegawaiPembuat.pangkat, alignment : 'left', bold: true}],
                                    [{text: 'NIP. ' + vm.item.pegawaiPembuat.nipPegawai, alignment : 'left'}]
                                ]
                            },
                            layout: 'noBorders'
                        }
                    ]
                },

                {
                    margin: [0, 30, 0, 0],
                    table:{
                        widths: [100, 5, '*'],
                        body: [
                            [
                                {text: 'No. Telephone', fontSize: 12},
                                {text: ':', fontSize: 12},
                                {text: '' + vm.item.telepon, fontSize: 12}
                            ]
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
          for(var i = 0; i < vm.isi.length; i++)
            vm.docDefinition.content[5].table.body.push([
                {
                    text: '' + (i+1),
                    fontSize: 12,
                    alignment: 'center'
                },
                {
                    text: '' + vm.isi[i].naskah,
                    fontSize: 12
                },
                {
                    text: '' + vm.isi[i].qty,
                    fontSize: 12,
                    alignment: 'center'
                },
                {
                    text: '' + vm.isi[i].keterangan,
                    fontSize: 12,
                    alignment: 'center'
                }
            ]);
          console.log(vm.docDefinition.content[5]);

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