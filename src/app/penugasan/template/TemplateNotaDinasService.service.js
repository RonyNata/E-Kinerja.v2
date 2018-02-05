 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('TemplateNotaDinasService',
    ['NotaDinasService', 'logo_bekasi', 'logo_garuda',
    function (NotaDinasService, logo_bekasi, logo_garuda) {
        var service = {}; 

        service.template = function(data){
          var docDefinition = {
            content: [
                {
                    margin:[0,0,0,15],
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
                                            {text: '' + data.unitKerjaPenandatangan.toUpperCase() + '\n', alignment: 'center', style:'header'},
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
                text: 'NOTA DINAS', style: 'nota_dinas'
              },

              {
                text: [{text : 'NOMOR ', style: 'judul_nomor'}, '' + data.nomorUrusan + '/' + data.nomorUrut + '/' + data.nomorPasanganUrut + '/' + data.nomorUnit + '/' + data.nomorTahun]
              },

              {
                style: 'demoTable',
                table: {
                  widths: [50, 5, 150],
                  body: [
                    [{text: 'Yth', bold: true},{text:':'}, {text: '' + data.jabatanPenerimaNotaDinas}],
                    [{text: 'Dari', bold: true},{text:':'}, {text: '' + data.pemberiNotaDinas.jabatan}],
                    [{text: 'Hal', bold: true},{text:':'}, {text: '' + data.hal}],
                    [{text: 'Tanggal', bold: true},{text:':'}, {text: ''+ EkinerjaService.IndonesianDay(new Date(data.tanggalPembuatanMilis)) + ', ' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalPembuatanMilis))}]
                  ]
                },
                  layout: 'noBorders'
              },
              {
                  style: 'garis',
                  table: {
                      widths: ["*"],
                      body: [
                          [{text: ''}]]
                  }
              },

              {
                text: '' + data.isiNotaDinas, style : 'isi_paragraf'
              },

              {
                  style: 'tandaTangan',
                  table: {
                      widths: [200],
                      body: [
                          [{text: 'Tanda Tangan,', alignment : 'center', bold: true}],
                          [{text: ' ',margin: [0,20]}],
                          [{text: '' + data.penandatangan.glrDpn + data.penandatangan.nama + data.penandatangan.glrBlk, alignment : 'center'}],
                          [{text: '' + data.penandatangan.pangkat, alignment : 'center'}]
                          [{text: '' + data.penandatangan.nip, alignment : 'center'}]
                      ]
                  },
                  layout: 'noBorders'
              },

              {text: 'Tembusan :', style: 'tembusan'}

            ],

            styles: {
              nama_instansi: {
                alignment : 'center',
                bold: true,
                fontSize: 14,
                margin: [0,0,0,30]
              },
              nota_dinas : {
                alignment : 'center',
                bold: true,
                fontSize: 14
              },
              judul_nomor: {
                  alignment : 'center',
                  bold: true,
                  fontSize: 11
              },
              garis: {
                  fillColor: 'black'
              },
              isi_paragraf: {
                alignment : 'justify',
                margin: [0,20,0,30]
              },
                header: {
                    bold: true,
                    fontSize: 14,
                    alignment: 'center'
                },
                header3: {
                    fontSize: 10,
                    alignment: 'center'
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
                fontSize: 10,
                margin: [0,20,0,10]
              },
              tandaTangan: {
                color: '#000',
                alignment : 'right',
                margin: [300,0,0,20]
              }
            },

              images:{
                  logo: logo_bekasi
              }
          };

          var tembusanSurat = {
            ol:[]
          };

            for(var i = 0; i < data.tembusanSurat.length; i++)
                tembusanSurat.ol.push(data.tembusanSurat[i].jabatan.jabatan);
            docDefinition.content.push(tembusanSurat);
        }
        return service;
    }])
    /* jshint ignore:end */

})();
