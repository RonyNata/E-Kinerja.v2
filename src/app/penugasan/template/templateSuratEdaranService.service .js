 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('TemplateSuratEdaranService',
    ['SuratEdaranService', 'EkinerjaService', 'logo_bekasi', 'logo_garuda',
    function (SuratEdaranService, EkinerjaService, logo_bekasi, logo_garuda) {
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

          var isi = {
            type: 'upper-alpha', bold: true, margin:[0,0,0,15],
            ol: [{text:['Latar Belakang\n', {text:'' + data.latarBelakang, bold:false, fontSize: 12}],margin:[0,0,0,10],fontSize: 12},
                  {text:['Maksud dan Tujuan\n', {text:'' + data.maksudDanTujuan, bold:false, fontSize: 12}],margin:[0,0,0,10],fontSize: 12},
                  {text:['Ruang Lingkup\n', {text:'' + data.ruangLingkup, bold:false, fontSize: 12}],margin:[0,0,0,10],fontSize: 12},
                  {text:['Dasar\n', {text:'' + data.dasar, bold:false, fontSize: 12}],margin:[0,0,0,10],fontSize: 12}]
          };
          for(var i = 0; i < data.subLain.length; i++){
              isi.ol.push({text:[''+ data.subLain[i].namaSub +'\n', {text:'' + data.subLain[i].isiSub, bold:false, fontSize: 12}],margin:[0,0,0,10],fontSize: 12});
          }  
          docDefinition.content.push(isi);
          docDefinition.content.push(
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
                                  [{text: ['Ditetapkan di ', {text:'' + data.kotaPembuatanSurat.toUpperCase(), bold:true}], alignment : 'left'}],
                                  [{text: ['pada tanggal ', {text:'' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalSuratEdaranMilis)), bold:true}], alignment : 'left'}],
                                  [{text: '' + data.jabatanPenandatangan + ',', alignment : 'left', bold: true}],
                                  [{text: ' ',margin: [0,20]}],
                                  [{text: '' + data.namaPenandatangan, alignment : 'left', bold:true}],
                                  [{text: '' + data.nipPenandatangan, alignment : 'left'}]
                              ]
                          },
                          layout: 'noBorders'
                      }
                  ]
              }
          );
          if(!data.isSuratPejabat){
              docDefinition.content[0] =
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
          return docDefinition;
        };
 
        return service;
    }])
    /* jshint ignore:end */

})();
