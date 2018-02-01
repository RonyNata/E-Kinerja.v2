(function(){
    'use strict';
    angular
        .module('eKinerja')
        .factory('TemplateTelaahanStaffService',
            ['TelaahanStaffService', 'EkinerjaService', 'logo_bekasi', 'logo_garuda',
                function (TelaahanStaffService, EkinerjaService, logo_bekasi, logo_garuda) {
                    var service = {};

                    service.template = function (data){
                        var docDefinition = {
                            content: [
                                {
                                    text: 'TELAAHAN STAF', style: 'nama_judul', margin: [0,15,0,0]
                                },
                                {
                                    text: 'TENTANG', style: 'nama_judul', margin: [0,15,0,0]
                                },
                                {
                                    text: '' + data.tentang.toUpperCase(), style: 'judul_nomor'
                                },

                                {
                                    type: 'upper-alpha', bold: true, margin:[0,20,0,20],
                                    ol: [
                                        {text:['Persoalan\n', {text:'' + data.persoalan, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                                        {text:['Praanggapan\n', {text:'' + data.praanggapan, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                                        {text:['Fakta yang Mempegaruhi\n', {text:'' + data.faktaYangMempengaruhi, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                                        {text:['Analisis\n', {text:'' + data.analisis, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                                        {text:['Simpulan\n', {text:'' + data.simpulan, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                                        {text:['Saran\n', {text:'' + data.saran, bold:false, alignment:'justify'}],margin:[0,0,0,5]}
                                    ]
                                },

                                {
                                    style: 'tandaTangan',
                                    table: {
                                        widths: [200],
                                        body: [
                                            [{text: '' + data.nipPenandatangan.jabatan.toUpperCase() + ',', alignment : 'left', bold: true}],
                                            [{text: ' ',margin: [0,20]}],
                                            [{text: '' + data.nipPenandatangan.nama, alignment : 'left', bold: true}],
                                            [{text: '' + data.nipPenandatangan.nip, alignment : 'left'}]
                                        ]
                                    },
                                    layout: 'noBorders'
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
                                tandaTangan: {
                                    color: '#000',
                                    fontSize: 10,
                                    alignment:'right'
                                }
                            }
                        };

                        return docDefinition;
                    };

                    return service;
                }])
    /* jshint ignore:end */

})();
