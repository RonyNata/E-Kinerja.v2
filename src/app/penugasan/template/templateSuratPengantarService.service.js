 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('TemplateSuratPengantarService',
    ['SuratPengantarService', 'logo_bekasi', 'logo_garuda',
    function (SuratPengantarService, logo_bekasi, logo_garuda) {
        var service = {}; 

        service.template = function(data){
          var docDefinition = {
            content: [
              {
                image: logo_bekasi,
                width: 90,
                height: 90
              },
              {
                margin: [90, -96, 0, 0],
                table: {
                  widths: [400],
                  body: [
                    [
                      {
                        text: 'PEMERINTAHAN KABUPATEN BEKASI',
                        style: 'header'
                      }
                    ]
                  ]
                },
                  layout: 'noBorders'
              },
              {
                margin: [90, -5, 0, 0],
                table: {
                  widths: [400],
                  body: [
                    [
                      {
                        text: '' + data.jabatanPemberiSuratPengantar.toUpperCase(),
                        style: 'header'
                      }
                    ]
                  ]
                },
                  layout: 'noBorders'
              },
              {
                margin: [175, -5, 0, 0],
                table: {
                  widths: [230],
                  body: [
                    [
                      {
                        text: 'Komplek Perkantoran Pemerintah Kabupaten Bekasi Desa Sukamahi Kecamatan Cikarang Pusat',
                        style: 'header2'
                      }
                    ]
                  ]
                },
                  layout: 'noBorders'
              },
              {
                margin: [115, -5, 0, 0],
                table: {
                  widths: [90, 90, 150],
                  body: [
                    [
                      {
                        text: 'Telp. (021) 89970696',
                        fontSize: 9,
                        alignment: 'right'
                      },{
                        text: 'Fax. (021) 89970064',
                        fontSize: 9,
                        alignment: 'center'
                      },{
                        text: 'email : diskominfo@bekasikab.go.id',
                        fontSize: 9,
                        alignment: 'left'
                      }
                    ]
                  ]
                },
                  layout: 'noBorders'
              },
              {
                margin: [0, 10, 0, 0],
                table: {
                  widths: ['*'],
                  body: [
                    [
                      {
                      }
                    ]
                  ]
                },
                layout: {
                  fillColor: 'Black'
                }
              },
              {
                text: '' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalPembuatanMilis)),
                margin: [0,20,0,0],
                alignment: 'right',
                fontSize: 10
              },
              {
                margin: [0, 10, 0, 0],
                table: {
                  widths: [100],
                  body: [
                    [
                      {
                        rowSpan: 3,
                        text: 'Yth. ' + data.pegawaiPenerima.nama,
                        fontSize: 10
                      }
                    ],
                    [
                      {
                      }
                    ],
                    [
                      {
                      }
                    ]
                  ]
                },
                  layout: 'noBorders'
              },
              {
                margin: [0,30,0,0],
                text: 'SURAT PENGANTAR',
                style: 'header'
              },
              {
                margin: [0,0,0,0],
                text: 'NOMOR : '+ data.nomorUrusan +'/' + data.nomorUrut + '/'+ data.nomorPasanganUrut + '/'+ data.nomorUnit + '/' + data.nomorTahun,
                fontSize: 10,
                alignment: 'center'
              },
              {
                margin: [0, 20, 0, 0],
                table:{
                  widths: ['auto', 205, 130, 130],
                  body: [
                    [
                      {
                        text: 'No.',
                        fontSize: 10,
                        alignment: 'center'
                      },
                      {
                        text: 'Naskah Dinas yang Dikirimkan',
                        fontSize: 10,
                        alignment: 'center'
                      },
                      {
                        text: 'Banyaknya',
                        fontSize: 10,
                        alignment: 'center'
                      },
                      {
                        text: 'Keterangan',
                        fontSize: 10,
                        alignment: 'center'
                      }
                    ]
                  ]
                }
              },
              {
                margin: [0, 40, 0, 0],
                text: 'Di Terima Tanggal  :',
                fontSize: 10
              },
              {
                margin: [92, -11.5, 0 ,0],
                text: '' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalDiterimaSuratPengantar)),
                fontSize: 10
              },
              {
                margin: [0, 30, 0 , 0],
                text: 'Penerima',
                fontSize: 10
              },
              {
                text: '' + data.pegawaiPenerima.jabatan,
                fontSize: 10
              },
              {
                margin: [0, 50, 0, 0],
                text: '' + data.pegawaiPenerima.nama,
                fontSize: 10
              },
              {
                text: '' + data.pegawaiPenerima.nipPegawai,
                fontSize: 10
              },
              {
                margin: [300, -94, 0 , 0],
                text: 'Pengirim',
                fontSize: 10
              },
              {
                margin: [300, 0, 0, 0],
                text: '' + data.pegawaiPembuat.jabatan,
                fontSize: 10
              },
              {
                margin: [300, 54, 0, 0],
                text: '' + data.pegawaiPembuat.nama,
                fontSize: 10
              },
              {
                margin: [300, 0, 0, 0],
                text: ''+ data.pegawaiPembuat.nipPegawai,
                fontSize: 10
              },
              {
                margin: [0, 40, 0, 0],
                text: 'No. Telephone  :',
                fontSize: 10
              },
              {
                margin: [78, -11.5, 0 ,0],
                text: '' + data.nomorTeleponPemberi,
                fontSize: 10
              }
            ],
            styles: {
              header: {
                bold: true,
                fontSize: 15,
                alignment: 'center'
              },
              header2: {
                fontSize: 10,
                alignment: 'center'
              }
            }
          };
          for(var i = 0; i < vm.isi.length; i++)
            docDefinition.content[10].table.body.push([
                      {
                        text: '' + (i+1),
                        fontSize: 10,
                        alignment: 'center'
                      },
                      {
                        text: '' + vm.isi[i].naskah,
                        fontSize: 10
                      },
                      {
                        text: '' + vm.isi[i].qty,
                        fontSize: 10
                      },
                      {
                        text: '' + vm.isi[i].keterangan,
                        fontSize: 10
                      }
                    ]);
          console.log(docDefinition.content[10]);

        }
 
        return service;
    }])
    /* jshint ignore:end */

})();
