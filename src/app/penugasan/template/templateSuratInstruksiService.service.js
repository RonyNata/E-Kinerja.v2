 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('TemplateSuratInstruksiService',
    ['InstruksiPejabatService', 'logo_bekasi', 'logo_garuda',
    function (InstruksiPejabatService, logo_bekasi, logo_garuda) {
        var service = {}; 

        service.template = function(data){
            var docDefinition = {
            content: [
                {
                    image: logo_garuda,
                    width: 50,
                    height: 50,
                    alignment: 'center',
                    margin: [0,0,0,5]
                },

                {
                    text: '', style: 'nama_judul'
                },
                {
                    text: 'REPUBLIK INDONESIA', style: 'nama_judul'
                },

                {
                    text: 'INSTRUKSI', style: 'nama_judul', margin: [0,15,0,0]
                },
                {
                    text: '' + data.judulInstruksi.toUpperCase(), style: 'nama_judul', margin: [0,0,0,15]
                },

                {
                    style: 'judul_nomor', margin: [0,0,0,15],
                    text: ['NOMOR ' + data.nomor + ' TAHUN ' + data.tahun + '\n\n', 'TENTANG\n', data.tentang.toUpperCase() +'\n\n', '' + $.parseJSON(sessionStorage.getItem('credential')).jabatan.toUpperCase()]
                },

                {
                    text: ['Dalam rangka ',{text: '' + data.tentang, bold: true, fontSize: 12}, ' dengan ini memberi instruksi'], fontSize: 12
                },

                {
                    style: 'demoTable', margin: [0,10,0,15],
                    table: {
                        widths: [80, 5, '*'],
                        body: [
                            [{text: 'Kepada', bold: true, fontSize: 12},{text: ':', fontSize: 12},

                                {   bold:true,
                                    ol: []
                                }],
                            [{text: '',margin: [0,0,0,3], colSpan: 3}],
                            [{text: 'Untuk', bold: true, fontSize: 12},{text: ':', fontSize: 12}, {text: ''}
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
                                    [{text: ['Dikeluarkan di ', {text:'' + data.dikeluarkanDi.toUpperCase(), bold:true}], alignment : 'left'}],
                                    [{text: ['pada tanggal ', {text:'' + data.tanggalDibuat, bold:true}], alignment : 'left'}],
                                    [{text: '' + data.jabatanPenandatangan + ',', alignment : 'left', bold: true}],
                                    [{text: ' ',margin: [0,20]}],
                                    [{text: '' + data.gelarDepanPenandatangan + data.namaPenandatangan + data.gelarBelakangPenandantangan, alignment : 'left', bold:true}],
                                    [{text: '' + data.pangkatPenandatangan, alignment : 'left', bold:true}],
                                    [{text: 'NIP. ' + data.nipPenandatangan, alignment : 'left'}]
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


          for(var i = 0; i < data.daftarIsiInstruksi.length; i++){
            var style = [{text: '',margin: [0,0,0,3], colSpan: 3}];
            var body = [{text: '' + InstruksiPejabatService.FindUrutan(i), bold: true, fontSize: 12},
                        {text: ':', fontSize: 12},
                        {text: '' + data.daftarIsiInstruksi[i], fontSize: 12}];
            docDefinition.content[7].table.body.push(style);
            docDefinition.content[7].table.body.push(body);
          }

          var style = [{text: '',margin: [0,0,0,3], colSpan: 3}];
          var body = [{text: '' + InstruksiPejabatService.FindUrutan(data.daftarIsiInstruksi.length), bold: true, fontSize: 12},
                      {text: ':', fontSize: 12},
                      {text: 'Melaksanakan instruksi ini dengan penuh tanggung jawab. Instruksi '+ data.judulInstruksi +' ini mulai berlaku pada tanggal dikeluarkan.', fontSize: 12}
                        ];
          docDefinition.content[7].table.body.push(style);
          docDefinition.content[7].table.body.push(body);

          for(var i = 0; i < data.targetPegawaiList.length; i++){
            debugger
            var dat = {
                widths: ['*', '*', '*'],
                style: 'header5',
                table: {
                    body: [
                        [{text: 'Nama', bold: true}, {text: ':'}, {text: '' + data.targetPegawaiList[i].gelarDepan + data.targetPegawaiList[i].nama + data.targetPegawaiList[i].gelarBelakang}],
                        [{text: 'NIP', bold: true}, {text: ':'}, {text: '' + data.targetPegawaiList[i].nipPegawai}],
                        [{text: 'Pangkat/Gol. Ruang', bold: true}, {text: ':'}, {text: '' + data.targetPegawaiList[i].pangkat + ' - ' + data.targetPegawaiList[i].golongan}],
                        [{text: 'Jabatan', bold: true}, {text: ':'}, {text: '' + data.targetPegawaiList[i].jabatan}]
                    ]
                },
                layout: 'noBorders'
            };
            docDefinition.content[7].table.body[0][2].ol.push(dat);
          }

          if(!data.suratPejabat){docDefinition.content[0] =
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
                                          {text: '' + data.unitKerja.toUpperCase() + '\n', alignment: 'center', style:'header'},
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
          else docDefinition.content[1].text += data.jabatanPenandaTangan.toUpperCase();
          return docDefinition;
        }
 
        return service;
    }])
    /* jshint ignore:end */

})();
