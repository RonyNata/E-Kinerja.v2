(function(){
    'use strict';
    angular
        .module('eKinerja')
        .factory('TemplateLaporanService',
            ['LaporanService', 'logo_bekasi', 'logo_garuda',
                function (LaporanService, logo_bekasi, logo_garuda) {
                    var service = {};

                    service.template = function (data){
                        var docDefinition = {
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
                                                            {text: '' + data.unitKerjaPembuatSurat.toUpperCase() + '\n', alignment: 'center', style:'header'},
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
                                    text: 'LAPORAN', style: 'nama_judul', margin:[0,0,0,15]
                                },
                                {
                                    text: 'TENTANG', style: 'nama_judul'
                                },
                                {
                                    text: '' + data.tentang.toUpperCase(), style: 'judul_nomor', margin:[0,0,0,15]
                                },

                                {
                                    type: 'upper-alpha', bold: true, margin:[0,0,0,15],
                                    ol: [[{text:'Pendahuluan', margin:[0,0,0,3]},
                                        {margin:[0,0,0,10],
                                            ol:[
                                                {text:['Umum\n', {text:'' + data.umum, bold:false}], margin:[0,0,0,10]},
                                                {text:['Maksud dan Tujuan\n', {text:'' + data.maksudDanTujuan, bold:false}], margin:[0,0,0,10]},
                                                {text:['Ruang Lingkup\n', {text:'' + data.ruangLingkup, bold:false}], margin:[0,0,0,10]},
                                                {text:['Dasar\n', {text:'' + data.dasar, bold:false}], margin:[0,0,0,10]}
                                            ]
                                        }],
                                        {text:['Kegiatan yang Dilaksanakan\n', {text:'' + data.kegiatanYangDilaksanakan, bold:false}], margin:[0,0,0,10]},
                                        {text:['Hasil yang Dicapai\n', {text:'' + data.hasilYangDicapai, bold:false}], margin:[0,0,0,10]},
                                        {text:['Simpulan dan Saran\n', {text:'' + data.simpulanDanSaran, bold:false}],margin:[0,0,0,10]},
                                        {text:['Penutup\n', {text:'' + data.penutup, bold:false}],margin:[0,0,0,10]}
                                    ]
                                },
                                {
                                    style: 'tandaTangan',
                                    table: {
                                        widths: [200],
                                        body: [
                                            [{text: ['Dikeluarkan di ', {text:'' + data.kotaPembuatanSurat.toUpperCase(), bold:true}], alignment : 'left'}],
                                            [{text: ['pada tanggal ', {text:'' + EkinerjaService.IndonesianDateFormat(data.tanggalPembuatanMilis), bold:true}], alignment : 'left'}],
                                            [{text: '' + data.jabatanPenandatangan.toUpperCase() + ',', alignment : 'left', bold: true}],
                                            [{text: ' ',margin: [0,20]}],
                                            [{text: '' + data.namaPenandatangan, alignment : 'left'}],
                                            [{text: '' + data.nipPenandatangan, alignment : 'left'}]
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
                                    fontSize: 11
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
                            },

                            images:{
                                logo: logo_bekasi
                            }
                        };
                    };

                    return service;
                }])
    /* jshint ignore:end */

})();