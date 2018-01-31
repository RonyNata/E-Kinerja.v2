 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('TemplateSuratEdaranService',
    ['SuratEdaranService', 'logo_bekasi', 'logo_garuda',
    function (SuratEdaranService, logo_bekasi, logo_garuda) {
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
                    text: '' + data.jabatanPenandatangan.toUpperCase(), style: 'nama_judul'
                },
                {
                    text: 'REPUBLIK INDONESIA', style: 'nama_judul', margin: [0,0,0,15]
                },

                {
                    text: 'SURAT EDARAN', style: 'nama_judul'
                },
                {
                    text: 'NOMOR '+ data.nomorUrut +' TAHUN ' + data.nomorTahun, style: 'judul_nomor', margin: [0,0,0,15]
                },

                {
                    text: 'TENTANG', style: 'nama_judul'
                },
                {
                    text: '' + data.tentang.toUpperCase(), style: 'judul_nomor', margin:[0,0,0,15]
                }

            ],

            styles: {
                nama_judul: {
                    alignment : 'center',
                    bold: true,
                    fontSize: 12
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
                judul_nomor: {
                    alignment : 'center',
                    bold: true,
                    fontSize: 11
                },
                tandaTangan: {
                    color: '#000',
                    fontSize: 10,
                    alignment:'right'
                }
            }
        };

          var isi = {
            type: 'upper-alpha', bold: true, margin:[0,0,0,15],
            ol: [{text:['Latar Belakang\n', {text:'' + data.latarNelakang, bold:false}],margin:[0,0,0,10]},
                  {text:['Maksud dan Tujuan\n', {text:'' + data.maksudDanTujuan, bold:false}],margin:[0,0,0,10]},
                  {text:['Ruang Lingkup\n', {text:'' + data.ruangLingkup, bold:false}],margin:[0,0,0,10]},
                  {text:['Dasar\n', {text:'' + data.dasar, bold:false}],margin:[0,0,0,10]}]
          };
          for(var i = 0; i < data.subLain.length; i++){
              isi.ol.push({text:[''+ data.subLain[i].namaSub +'\n', {text:'' + data.subLain[i].isiSub, bold:false}],margin:[0,0,0,10]});
          }  
          docDefinition.content.push(isi);
          docDefinition.content.push({
              style: 'tandaTangan',
              table: {
                  widths: [100],
                  body: [
                      [{text: ''+data.jabatanPenandatangan+',', alignment : 'left', bold: true, border: [false, false, false, false]}],
                      [{text: ' ',margin: [0,20], border: [false, false, false, false]}],
                      [{text: '' + data.namaPenandatangan, alignment : 'left', border: [false, false, false, false]}]
                  ]
              }
          });
          if($state.current.name == "suratedarannonpejabat"){
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
        }
 
        return service;
    }])
    /* jshint ignore:end */

})();
