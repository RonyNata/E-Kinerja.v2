(function(){
    'use strict';
    angular
        .module('eKinerja')
        .factory('TemplateLaporanSKPService',
            ['EkinerjaService', 'logo_bekasi', 'logo_garuda',
                function (EkinerjaService, logo_bekasi, logo_garuda) {
                    var service = {};

                    service.template = function (data, pegawai, penilai, bulan, tahun){
                        var docDefinition = {
                          pageSize: 'LETTER',
                          content: [
                            {
                              text: 'REALISASI SASARAN KERJA PEGAWAI', style: 'nama_judul'
                            },

                            {
                              style: 'demoTable', margin: [0,10,0,0],
                              table: {
                                body: [
                                  [{text: 'Jangka Waktu Penilaian', bold: true},{text: ':'},{text: '' + bulan + ' ' + tahun}]
                                ]
                              },
                                layout: 'noBorders'
                            },

                            {
                                margin: [0,5,0,0],
                                columns: [
                                    {
                                        style: 'demoTable', margin: [0,0,5,0],
                                        table: {
                                            body: [
                                              [{text: 'No', bold:true},{text: 'I. PEJABAT PENILAI', bold:true, colSpan:2},{text : ''}],
                                              [{text: '1'},{text: 'Nama'},{text : '' + penilai.nama}],
                                              [{text: '2'},{text: 'NIP'},{text : '' + penilai.nipPegawai}],
                                              [{text: '3'},{text: 'Pangkat/Gol. Ruang'},{text : '' + penilai.pangkat + '/' + penilai.golongan}],
                                              [{text: '4'},{text: 'Jabatan'},{text : '' + penilai.jabatan}],
                                              [{text: '5'},{text: 'Unit Kerja'},{text : '' + penilai.unitKerja}]
                                            ]
                                        }
                                    },
                                    {
                                        style: 'demoTable',
                                        table: {
                                            body: [
                                              [{text : 'No', bold:true},{text: 'II. PEGAWAI NEGERI SIPIL YANG DINILAI', bold:true, colSpan:2},{text : ''}],
                                              [{text : '1'},{text: 'Nama'},{text : '' + pegawai.namaPegawai}],
                                              [{text : '2'},{text: 'NIP'},{text : '' + pegawai.nipPegawai}],
                                              [{text : '3'},{text: 'Pangkat/Gol. Ruang'},{text : '' + pegawai.pangkat + '/' + pegawai.golongan}],
                                              [{text : '4'},{text: 'Jabatan'},{text : '' + pegawai.jabatan}],
                                              [{text : '5'},{text: 'Unit Kerja'},{text : '' + pegawai.unit}]
                                            ]
                                        }
                                    }
                                ]
                            },

                            // {
                            //   style: 'demoTable', margin: [0,5,0,0],
                            //   table: {
                            //     body: [
                            //       [{text: 'No', bold:true},{text: 'I. PEJABAT PENILAI', colSpan:2, bold:true},{text : ''},{text : 'No', bold:true},{text: 'II. PEGAWAI NEGERI SIPIL YANG DINILAI', bold:true, colSpan:2},{text : ''}],
                            //       [{text: '1'},{text: 'Nama'},{text : '' + penilai.nama},{text : '1'},{text: 'Nama'},{text : '' + pegawai.namaPegawai}],
                            //       [{text: '2'},{text: 'NIP'},{text : '' + penilai.nipPegawai},{text : '2'},{text: 'NIP'},{text : '' + pegawai.nipPegawai}],
                            //       [{text: '3'},{text: 'Pangkat/Gol. Ruang'},{text : '' + penilai.pangkat + '/' + penilai.golongan},{text : '3'},{text: 'Pangkat/Gol. Ruang'},{text : '' + pegawai.pangkat + '/' + pegawai.golongan}],
                            //       [{text: '4'},{text: 'Jabatan'},{text : '' + penilai.jabatan},{text : '4'},{text: 'Jabatan'},{text : '' + pegawai.jabatan}],
                            //       [{text: '5'},{text: 'Unit Kerja'},{text : '' + penilai.unit},{text : '5'},{text: 'Unit Kerja'},{text : '' + pegawai.unit}]
                            //     ]
                            //   }
                            // },

                              {
                                  style: 'demoTable', margin: [0,10,0,0], alignment: "center", 
                                  table: {
                                      headerRows:2,
                                      widths: [12, 126, 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                                      body: [
                                          [{text: 'No', rowSpan:2, bold:true},{text: 'III. KEGIATAN TUGAS JABATAN', rowSpan:2, bold:true},{text : 'TARGET', colSpan:4, bold:true},{text: ''},{text: ''},{text: ''},{text : 'REALISASI', colSpan:4, bold:true},{text: ''},{text: ''},{text: ''},{text: 'DATA', rowSpan:2, bold:true},{text : 'NILAI CAPAIAN SKP', rowSpan:2, bold:true}],
                                          [{text: ''},{text: ''},{text : 'Kuant/Output', bold:true},{text : 'Kualitas/Mutu', bold:true},{text: 'Waktu', bold:true},{text : 'Biaya(Rp.)', bold:true},{text : 'Kuant/Output', bold:true},{text : 'Kualitas/Mutu', bold:true},{text: 'Waktu', bold:true},{text : 'Biaya(Rp.)', bold:true},{text:''},{text:''}]

                                      ]
                                  }
                              },

                              {
                                  style: 'demoTable', margin: [0,10,0,0], alignment:'center',
                                  table: {
                                      headerRows:1,
                                      widths: [12, 400, '*'],
                                      body: [
                                          [{text: 'No', bold:true},{text: 'IV. TUGAS TAMBAHAN', bold:true},{text : 'NILAI', bold:true}]

                                      ]
                                  }
                              },
                              {
                                margin: [370,20,0,0],style: 'demoTable',
                                table: {
                                  widths: ['auto', 'auto'],
                                  body: [
                                    [
                                      {
                                        border: [false, false, false, false],
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: 'PEGAWAI NEGERI SIPIL YANG DINILAI'
                                      },{}
                                    ],
                                    [
                                      {
                                        border: [false, false, false, false],
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: 'tanda tangan\n\n'
                                      },{}
                                    ],
                                    [
                                      {
                                        border: [false, false, false, false],
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: '' + pegawai.namaPegawai,
                                      },{}
                                    ]
                                  ]
                                }
                              },
                              {
                                margin: [10,-55,0,0],style: 'demoTable',
                                table: {
                                  widths: ['auto', 'auto'],
                                  body: [
                                    [
                                      {
                                        border: [false, false, false, false],
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: 'PEGAWAI PENILAI'
                                      },{}
                                    ],
                                    [
                                      {
                                        border: [false, false, false, false],
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: 'tanda tangan\n\n'
                                      },{}
                                    ],
                                    [
                                      {
                                        border: [false, false, false, false],
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: '' + penilai.nama,
                                      },{}
                                    ]
                                  ]
                                }
                              }

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
                            demoTable: {
                              color: '#000',
                              fontSize: 8
                            },
                            tandaTangan: {
                              color: '#000',
                              fontSize: 10,
                              alignment:'right'
                            }
                          }
                        };

                        for (var i=0; i<data.length; i++){
                            docDefinition.content[3].table.body.push([{text: '' + (i +1)},{text: '' + data[i].urtug, alignment:'left'},{text : '' + data[i].targetkuantitas},{text : '100'},{text: ''},{text : ''},{text : '' + data[i].realisasiKuantitas},{text : '100'},{text: ''},{text : ''},{text:'1.0'},{text:'' + (100*data[i].realisasiKuantitas/data[i].targetkuantitas).toFixed(2)}]);
                        }

                        for (var i=1; i<1; i++){
                            docDefinition.content[4].table.body.push([{text: '' + i},{text: 'Nama Tugas'},{text : '10%'}]);
                        }

                        return docDefinition;
                    };

                    return service;
                }])
    /* jshint ignore:end */

})();
