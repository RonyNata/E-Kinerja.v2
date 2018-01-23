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
                    text: 'REPUBLIK INDONESIA', style: 'nama_judul', margin: [0,0,0,15]
                },

                {
                    text: 'INSTRUKSI', style: 'nama_judul'
                },
                {
                    text: '' + data.judulInstruksi.toUpperCase(), style: 'nama_judul', margin: [0,0,0,15]
                },

                {
                    style: 'judul_nomor', margin: [0,0,0,15],
                    text: ['NOMOR ' + data.nomor + ' TAHUN ' + data.tahun + '\n\n', 'TENTANG\n', data.tentang.toUpperCase() +'\n\n', '' + $.parseJSON(sessionStorage.getItem('credential')).jabatan.toUpperCase()]
                },

                {
                    text: ['Dalam rangka ', data.tentang, ' dengan ini memberi instruksi']
                },

                {
                    style: 'demoTable', margin: [0,10,0,15],
                    table: {
                        widths: [80, 5, '*'],
                        body: [
                            [{text: 'Kepada', style: 'header', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},

                                {   border: [false, false, false, false], bold:true,
                                    ol: []
                                }],
                            [{text: '',margin: [0,0,0,3], colSpan: 3, border: [false, false, false, false]}],
                            [{text: 'Untuk', style: 'header', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}
                            ]
                        ]
                    }
                },

                {
                    style: 'tandaTangan',
                    table: {
                        widths: [200],
                        body: [
                            [{text: ['Dikeluarkan di ', {text:'' + data.dikeluarkanDi, bold:true}], alignment : 'left', border: [false, false, false, false]}],
                            [{text: ['pada tanggal ', {text:'' + data.tanggalDibuat, bold:true}], alignment : 'left', border: [false, false, false, false]}],
                            [{text: '' + data.jabatanPenandaTangan + ',', alignment : 'left', bold: true, border: [false, false, false, false]}],
                            [{text: ' ',margin: [0,20], border: [false, false, false, false]}],
                            [{text: '' + data.namaPenandatangan, alignment : 'left', border: [false, false, false, false]}]
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
                    alignment:'right'
                }
            }
          };


          for(var i = 0; i < data.daftarIsiInstruksi.length; i++){
            var style = [{text: '',margin: [0,0,0,3], colSpan: 3, border: [false, false, false, false]}];
            var body = [{text: '' + InstruksiPejabatService.FindUrutan(i), 
                        style: 'header', border: [false, false, false, false]},
                        {text: ':', border: [false, false, false, false]}, 
                        {text: '' + data.daftarIsiInstruksi[i], border: [false, false, false, false]}];
            docDefinition.content[7].table.body.push(style);
            docDefinition.content[7].table.body.push(body);
          }

          var style = [{text: '',margin: [0,0,0,3], colSpan: 3, border: [false, false, false, false]}];
          var body = [{text: '' + InstruksiPejabatService.FindUrutan(data.daftarIsiInstruksi.length), style: 'header', border: [false, false, false, false]},
                      {text: ':', border: [false, false, false, false]}, 
                      {text: 'Melaksanakan instruksi ini dengan penuh tanggung jawab. Instruksi '+ data.judulInstruksi +' ini mulai berlaku pada tanggal dikeluarkan.', border: [false, false, false, false]}
                        ];
          docDefinition.content[7].table.body.push(style);
          docDefinition.content[7].table.body.push(body);

          for(var i = 0; i < data.targetPegawaiList.length; i++){
            debugger
            var dat = {
                widths: ['*', '*', '*'],
                table: {
                    body: [
                        [{text: 'Nama', bold: true , border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + data.targetPegawaiList[i].nama, border: [false, false, false, false]}],
                        [{text: 'NIP', bold: true, border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + data.targetPegawaiList[i].nipPegawai, border: [false, false, false, false]}],
                        [{text: 'Pangkat/Gol. Ruang', bold: true, border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + data.targetPegawaiList[i].golongan, border: [false, false, false, false]}],
                        [{text: 'Jabatan', bold: true, border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + data.targetPegawaiList[i].jabatan, border: [false, false, false, false]}]
                    ]
                }
            }
            docDefinition.content[7].table.body[0][2].ol.push(dat);
          }

          if(!data.suratPejabat){
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
                                text: '' + data.unitKerja.toUpperCase(),
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
          else docDefinition.content[1].text += data.jabatanPenandaTangan.toUpperCase();
          return docDefinition;
        }
 
        return service;
    }])
    /* jshint ignore:end */

})();
