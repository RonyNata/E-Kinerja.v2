 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('TemplateSuratUndanganService',
    ['$state', 'logo_bekasi', 'logo_garuda',
    function ($state, logo_bekasi, logo_garuda) {
        var service = {}; 

        service.template = function(data){
            var docDefinition = {
                content: [
                    {
                        image: 'pejabat',
                        width: 50,
                        height: 50,
                        alignment: 'center',
                        margin: [0,0,0,5]
                    },

                    {
                        margin:[80,0,80,0],
                        text: '' + data.unitKerjaPenandatangan.toUpperCase(), style: 'header'
                    },

                    {
                        text: 'REPUBLIK INDONESIA', style: 'header', margin: [0,0,0,15]
                    },
                    {
                        table: {
                            widths: [40, 3, 200],
                            body: [
                                [
                                    {
                                        text: 'Nomor',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        text: '' + data.nomorUrusan + '/' + data.nomorUrut + '/' + data.nomorPasanganUrut + '/' + data.nomorUnit + '/' + data.nomorTahun,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'Sifat',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        text: '' + data.sifat,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'Hal',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        text: '' + data.hal,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'Lampiran',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        text: '' + data.lampiran + ' Halaman',
                                        fontSize: 12
                                    }
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        margin: [0, -60, 0 , 0],
                        alignment: 'right',
                        text: '' + data.kotaPembuatanSurat.toUpperCase() + ', ' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalPembuatanSurat)),
                        fontSize: 12
                    },
                    {
                        margin: [0, 70, 0, 0],
                        table: {
                            widths: [150],
                            body: [
                                [
                                    {
                                        border: [false, false, false, false],
                                        rowSpan: 3,
                                        text: 'Yth. '+''+ data.pegawaiPenerima.nama,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                    }
                                ],
                                [
                                    {
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        margin: [0, 20, 0, 0],
                        table: {
                            width: [400],
                            body: [
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: ''+ data.bagianPembukaSuratUndangan,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        margin: [50, 0, 0 ,0],
                                        border: [false, false, false, false],
                                        table: {
                                            widths: [107, 2, 300],
                                            body: [
                                                [
                                                    {
                                                        border: [false, false, false, false],
                                                        text: 'tanggal',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ':',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ''+ data.bagianIsiHariSuratUndangan + ', ' + EkinerjaService.IndonesianDateFormat(new date(data.bagianIsiTanggalSuratUndangan)),
                                                        fontSize: 12
                                                    }
                                                ],
                                                [
                                                    {
                                                        border: [false, false, false, false],
                                                        text: 'waktu',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ':',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ''+ data.bagianIsiWaktuSuratUndangan,
                                                        fontSize: 12
                                                    }
                                                ],
                                                [
                                                    {
                                                        border: [false, false, false, false],
                                                        text: 'tempat',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ':',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ''+ data.bagianIsiTempatSuratUndangan,
                                                        fontSize: 12
                                                    }
                                                ],
                                                [
                                                    {
                                                        border: [false, false, false, false],
                                                        text: 'acara',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ':',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ''+ data.bagianIsiAcaraSuratUndangan,
                                                        fontSize: 12
                                                    }
                                                ]
                                            ]
                                        }
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: ''+ data.bagianPenutupSuratUndangan,
                                        fontSize: 12
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        margin: [350, 20, 0, 0],
                        text: '' + data.pegawaiPenandatangan.jabatan + ',',
                        fontSize: 12
                    },
                    {
                        margin: [350, 20, 0, 0],
                        text: 'Tanda Tangan dan Cap Instansi',
                        fontSize: 12
                    },
                    {
                        margin: [350, 20, 0, 0],
                        text: '' + data.pegawaiPenandatangan.nama,
                        fontSize: 12
                    },

                    {fontSize: 12, text: 'Tembusan :'}
                ],
                styles: {
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
                    }
                },

                images:{
                    pejabat: logo_garuda
                }
            };

            // var tembusan = {
            //     ol:[]
            // };

            // for(var i = 0; i < vm.tembusanSurat.length; i++)
            //     tembusan.ol.push(vm.tembusanSurat[i].jabatan.jabatan);
            // docDefinition.content.push(tembusan);

            if($state.current.name == "suratundangannonpejabat"){
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
                                    fontSize: 12,
                                    alignment: 'right'
                                },{
                                border: [false, false, false, false],
                                text: 'Fax. (021) 89970064',
                                fontSize: 12,
                                alignment: 'center'
                            },{
                                border: [false, false, false, false],
                                text: 'email : diskominfo@bekasikab.go.id',
                                fontSize: 12,
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
