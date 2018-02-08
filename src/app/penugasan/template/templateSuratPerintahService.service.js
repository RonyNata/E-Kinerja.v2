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
                    [{text: 'Nama', bold: true},{text: ':'},{text: '' + data.gelarDepanPenandatangan + data.nmPenandatangan + data.gelarBelakangPenandantangan}],
                    [{text: 'Jabatan', bold: true},{text: ':'},{text: '' + data.nmJabatanPenandatangan}]
                  ]
                },
                  layout: 'noBorders'
              },

              {
                style: 'demoTable', margin: [0,15,0,10],
                table: {
                  widths: [80, 5, '*'],
                  body: [
                    [{text: 'Menimbang', style:'header4'},{text: ':', style:'header5'},
                      {
                          ol: []
                      }
                    ],
                    [{text: '',margin: [0,0,0,3], colSpan: 3}],
                    [{text: 'Dasar', style:'header4'},{text: ':', style:'header5'},
                        {
                            ol: []
                        }
                    ]
                  ]
                },
                  layout: 'noBorders'
              },

              {
                text: 'Memberi Perintah', alignment: 'center', fontSize: 12
              },

              {
                style: 'demoTable', margin: [0,10,0,15],
                table: {
                  widths: [80, 5, '*'],
                  body: [
                    [{text: 'Kepada', style:'header4'},{text: ':', style:'header5'},

                    {
                        ol: []
                    }],
                    [{text: '',margin: [0,0,0,3], colSpan: 3}],
                    [{text: 'Untuk', style:'header4'},{text: ':', style:'header5'},
                        {
                            ol : []
                        }
                    ]
                  ]
                },
                  layout: 'noBorders'
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
                                    [{text: '' + data.tempat.toUpperCase() + ', ' + data.tanggalDibuat, alignment : 'left'}],
                                    [{text: '' + data.nmJabatanPenandatangan + ',', alignment : 'left', bold: true}],
                                    [{text: ' ',margin: [0,20]}],
                                    [{text: '' + data.gelarDepanPenandatangan + data.nmPenandatangan + data.gelarBelakangPenandantangan, alignment : 'left', bold:true}],
                                    [{text: '' + data.pangkatPenandatangan, alignment : 'left', bold:true}],
                                    [{text: 'NIP. ' + data.nipPenandatangan, alignment : 'left'}]
                                ]
                            },
                            layout: 'noBorders'
                        }
                    ]
                },

              {text: 'Tembusan :'}

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
                },
                header4: {
                    bold: true,
                    fontSize: 12
                },
                header5: {
                    fontSize: 12
                }
            }
          };

          for(var i = 0; i < data.daftarTargetPegawai.length; i++){
            var dat = {
                widths: ['*', '*', '*'],
                table: {
                    body: [
                        [{text: 'Nama', bold: true}, {text: ':'}, {text: '' + data.daftarTargetPegawai[i].glrDpn + data.daftarTargetPegawai[i].nama + data.daftarTargetPegawai[i].glrBlk}],
                        [{text: 'NIP', bold: true}, {text: ':'}, {text: '' + data.daftarTargetPegawai[i].nip}],
                        [{text: 'Pangkat/Gol. Ruang', bold: true}, {text: ':'}, {text: '' + data.daftarTargetPegawai[i].pangkat + ' - ' + data.daftarTargetPegawai[i].gol}],
                        [{text: 'Jabatan', bold: true}, {text: ':'}, {text: '' + data.daftarTargetPegawai[i].jabatan}]
                    ]
                },
                layout: 'noBorders'
            };
            docDefinition.content[8].table.body[0][2].ol.push(dat);
          }

          var tembusan = {
            ol: []
          };

          for(var i = 0; i < data.daftarTembusan.length; i++)
            tembusan.ol.push(data.daftarTembusan[i].jabatan);
          docDefinition.content.push(tembusan);

          for(var i = 0; i < data.menimbangList.length; i++){
            docDefinition.content[6].table.body[0][2].ol.push(data.menimbangList[i]);
          }
          
          for(var i = 0; i < data.dasarList.length; i++){
            docDefinition.content[6].table.body[2][2].ol.push(data.dasarList[i]);
          }
            
          for(var i = 0; i < data.untukList.length; i++){
            docDefinition.content[8].table.body[2][2].ol.push(data.untukList[i]);
          }

          if($state.current.name == "suratperintahnonpejabat" || !data.suratPejabat){
            docDefinition.content[0] = {
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
                                        {text: '' + data.unitKerjaPenandatangan.toUpperCase() + '\n', alignment: 'center', style:'header'},
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
            };

            docDefinition.content[1] = {};

            docDefinition.content[2] = {};
          }
          else docDefinition.content[1].text += data.jabatanPenandatangan.toUpperCase();
          debugger
          return docDefinition;
        }
 
        return service;
    }])
    /* jshint ignore:end */

})();
