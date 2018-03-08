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
                                        {text:['Fakta yang Mempegaruhi\n', {text:'' + data.faktaYangMemppengaruhi, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                                        {text:['Analisis\n', {text:'' + data.analisis, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                                        {text:['Simpulan\n', {text:'' + data.simpulan, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                                        {text:['Saran\n', {text:'' + data.saran, bold:false, alignment:'justify'}],margin:[0,0,0,5]}
                                    ]
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
                                                    [{text: '' + data.nipPenandatangan.jabatan + ',', alignment : 'left', bold: true}],
                                                    [{text: ' ',margin: [0,20]}],
                                                    [{text: '' + data.nipPenandatangan.glrDpn + data.nipPenandatangan.nama + data.nipPenandatangan.glrBlk, alignment : 'left', bold: true}],
                                                    [{text: '' + data.nipPenandatangan.pangkat, alignment : 'left', bold: true}],
                                                    [{text: 'NIP. ' + data.nipPenandatangan.nip, alignment : 'left'}]
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
                                }
                            },
                            footer: function(currentPage, pageCount) { var foot =  
                                {
                                    margin: 10,
                                    columns: [{text: currentPage.toString() + ' of ' + pageCount}]
                                }
                                if(data.barcodeImage != null)
                                    foot.columns.push({
                                        image: 'data:image/jpeg;base64,' + data.barcodeImage,
                                        width: 200
                                    })
                                return foot;
                            }
                        };

                        return docDefinition;
                    };

                    return service;
                }])
    /* jshint ignore:end */

})();
