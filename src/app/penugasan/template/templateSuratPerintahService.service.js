 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('TemplateSuratPerintahService',
    ['$state', 'logo_bekasi', 'logo_garuda',
    function ($state, logo_bekasi, logo_garuda) {
        var service = {}; 

        service.template = function(data){
            var docDefinition = {
            pageSize: 'A4',
            content: [
              {
                image: logo_garuda,
                  width: 50,
                  height: 50,
                  alignment: 'center',
                  margin: [0,0,0,5]
              },

              {
                text: '' , style: ['nama_instansi', 'nama_judul']
              },

              {
                text: 'REPUBLIK INDONESIA', style: 'nama_judul', margin: [0,0,0,15]
              },

              {
                text: 'SURAT PERINTAH', style: 'nama_judul'
              },

              {
                text: 'NOMOR ' + data.nomorSurat , style: 'judul_nomor'
              },

              {
                style: 'demoTable', margin: [0,15,0,0],
                table: {
                  widths: [50, 5, '*'],
                  body: [
                    [{text: 'Nama', bold: true, border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},{text: '' + data.nmPenandatangan, border: [false, false, false, false]}],
                    [{text: 'Jabatan', bold: true, border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},{text: '' + data.nmJabatanPenandatangan, border: [false, false, false, false]}]
                  ]
                }
              },

              {
                style: 'demoTable', margin: [0,15,0,10],
                table: {
                  widths: [80, 5, '*'],
                  body: [
                    [{text: 'Menimbang', style: 'header', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},
                      { border: [false, false, false, false],
                        ol: data.menimbangList
                      }
                    ],
                    [{text: '',margin: [0,0,0,3], colSpan: 3, border: [false, false, false, false]}],
                    [{text: 'Dasar', style: 'header', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},
                        {   border: [false, false, false, false],
                            ol: data.dasarList
                        }
                    ]
                  ]
                }
              },

              {
                text: 'Memberi Perintah', alignment: 'center', fontSize: 11
              },

              {
                style: 'demoTable', margin: [0,10,0,15],
                table: {
                  widths: [80, 5, '*'],
                  body: [
                    [{text: 'Kepada', style: 'header', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},

                    {   border: [false, false, false, false],
                        ol: []
                    }],
                    [{text: '',margin: [0,0,0,3], colSpan: 3, border: [false, false, false, false]}],
                    [{text: 'Untuk', style: 'header', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},
                        {   border: [false, false, false, false],
                            ol : data.untukList
                        }
                    ]
                  ]
                }
              },

              {
                  style: 'tandaTangan',
                  table: {
                      widths: [250], 
                      body: [
                          [{text: '' + data.tempat + ', ' + data.tanggalDibuat, alignment : 'left', border: [false, false, false, false]}],
                          [{text: ''+ data.nmJabatanPenandatangan + ',', alignment : 'left', bold: true, border: [false, false, false, false]}],
                          [{text: ' ',margin: [0,20], border: [false, false, false, false]}],
                          [{text: '' + data.nmPenandatangan, alignment : 'left', border: [false, false, false, false]}]
                      ]
                  }
              },

              {text: 'Tembusan :'}

            ],

            styles: {
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
              header: {
                bold: true,
                color: '#000',
                fontSize: 10
              },
              header1: {
                  bold: true,
                  fontSize: 15,
                  alignment: 'center'
              },
              header2: {
                  fontSize: 10,
                  alignment: 'center'
              },
              demoTable: {
                color: '#000',
                fontSize: 10
              },
              tandaTangan: {
                color: '#000',
                fontSize: 10,
                alignment : 'right',
                margin: [300,0,0,20],
                border: [false, false, false, false]
              }
            }
          };

          for(var i = 0; i < data.daftarTargetPegawai.length; i++){
            var dat = {
                widths: ['*', '*', '*'],
                table: {
                    body: [
                        [{text: 'Nama', bold: true , border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + data.daftarTargetPegawai[i].nama, border: [false, false, false, false]}],
                        [{text: 'NIP', bold: true, border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + data.daftarTargetPegawai[i].nip, border: [false, false, false, false]}],
                        [{text: 'Pangkat/Gol. Ruang', bold: true, border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + data.daftarTargetPegawai[i].gol, border: [false, false, false, false]}],
                        [{text: 'Jabatan', bold: true, border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + data.daftarTargetPegawai[i].jabatan, border: [false, false, false, false]}]
                    ]
                }
            }
            docDefinition.content[8].table.body[0][2].ol.push(dat);
          }

          var tembusan = {
            ol: data.daftarTembusan
          }

          // for(var i = 0; i < data.daftarTembusan.length; i++)
          //   tembusan.ol.push(data.daftarTembusan[i].jabatan);
          docDefinition.content.push(tembusan);

          // for(var i = 0; i < data.menimbangList.length; i++){
          //   docDefinition.content[6].table.body[0][2].ol.push(data.menimbangList[i]);
          // }
          
          // for(var i = 0; i < data.dasarList.length; i++){
          //   docDefinition.content[6].table.body[2][2].ol.push(data.dasarList[i]);
          // }
            
          // for(var i = 0; i < data.untukList.length; i++){
          //   docDefinition.content[8].table.body[2][2].ol.push(data.untukList[i]);
          // }

          if($state.current.name == "suratperintahnonpejabat" || !data.suratPejabat){
            docDefinition.content[2] = {
                margin: [0, 10, 0, 15],
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
            };

            docDefinition.content[1] = {
                margin: [115, -5, 0, 0],
                table: {
                    widths: [90, 90, 150],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: 'Telp. (021) 89970696',
                                fontSize: 9,
                                alignment: 'right'
                            },{
                            border: [false, false, false, false],
                            text: 'Fax. (021) 89970064',
                            fontSize: 9,
                            alignment: 'center'
                        },{
                            border: [false, false, false, false],
                            text: 'email : diskominfo@bekasikab.go.id',
                            fontSize: 9,
                            alignment: 'left'
                        }
                        ]
                    ]
                }
            };

            docDefinition.content[0] = {
                margin: [175, -5, 0, 0],
                table: {
                    widths: [230],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: 'Komplek Perkantoran Pemerintah Kabupaten Bekasi Desa Sukamahi Kecamatan Cikarang Pusat',
                                style: 'header2'
                            }
                        ]
                    ]
                }
            };
            
            docDefinition.content.unshift({
                margin: [90, -5, 0, 0],
                table: {
                    widths: [400],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: '' + data.unitKerjaPenandatangan.toUpperCase(),
                                style: 'header1'
                            }
                        ]
                    ]
                }
            });

            docDefinition.content.unshift({
                margin: [90, -96, 0, 0],
                table: {
                    widths: [400],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: 'PEMERINTAHAN KABUPATEN BEKASI',
                                style: 'header1'
                            }
                        ]
                    ]
                }
            });

            docDefinition.content.unshift({
                image: logo_bekasi,
                width: 90,
                height: 90
            });
          }
          else docDefinition.content[1].text += data.jabatanPenandatangan.toUpperCase();
          debugger
          return docDefinition;
        }
 
        return service;
    }])
    /* jshint ignore:end */

})();
