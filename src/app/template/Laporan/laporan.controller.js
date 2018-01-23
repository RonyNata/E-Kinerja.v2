(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('LaporanController', LaporanController);

    function LaporanController(EkinerjaService, LaporanService, $scope, $state, logo_bekasi) {
        var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.back =  function(){
            $state.go('kontrak');
        };

        function template(){
            vm.docDefinition = {
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
                                                {text: '' + $.parseJSON(sessionStorage.getItem('credential')).unit.toUpperCase() + '\n', alignment: 'center', style:'header'},
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
                        text: '' + vm.item.tentang.toUpperCase(), style: 'judul_nomor', margin:[0,0,0,15]
                    },

                    {
                        type: 'upper-alpha', bold: true, margin:[0,0,0,15],
                        ol: [[{text:'Pendahuluan', margin:[0,0,0,3]},
                            {margin:[0,0,0,10],
                                ol:[
                                    {text:['Umum\n', {text:'' + vm.item.isiumum, bold:false}], margin:[0,0,0,10]},
                                    {text:['Maksud dan Tujuan\n', {text:'' + vm.item.isimaksuddantujuan, bold:false}], margin:[0,0,0,10]},
                                    {text:['Ruang Lingkup\n', {text:'' + vm.item.isiruanglingkup, bold:false}], margin:[0,0,0,10]},
                                    {text:['Dasar\n', {text:'' + vm.item.isidasar, bold:false}], margin:[0,0,0,10]}
                                ]
                            }],
                            {text:['Kegiatan yang Dilaksanakan\n', {text:'' + vm.item.isikegiatan, bold:false}], margin:[0,0,0,10]},
                            {text:['Hasil yang Dicapai\n', {text:'' + vm.item.isihasil, bold:false}], margin:[0,0,0,10]},
                            {text:['Simpulan dan Saran\n', {text:'' + vm.item.isisimpulandansaran, bold:false}],margin:[0,0,0,10]},
                            {text:['Penutup\n', {text:'' + vm.item.isipenutup, bold:false}],margin:[0,0,0,10]}
                        ]
                    },
                    {
                        style: 'tandaTangan',
                        table: {
                            widths: [200],
                            body: [
                                [{text: ['Dikeluarkan di ', {text:'' + vm.item.tempat, bold:true}], alignment : 'left'}],
                                [{text: ['pada tanggal ', {text:'' + EkinerjaService.IndonesianDateFormat(new Date()), bold:true}], alignment : 'left'}],
                                [{text: '' + $.parseJSON(sessionStorage.getItem('credential')).jabatan.toUpperCase() + ',', alignment : 'left', bold: true}],
                                [{text: ' ',margin: [0,20]}],
                                [{text: '' + $.parseJSON(sessionStorage.getItem('credential')).namaPegawai, alignment : 'left'}]
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
        }

        vm.back =  function(){
          $state.go('kontrak');
        }

        $scope.openPdf = function() {
            var blb;
            // pdfMake.createPdf(vm.docDefinition).getBuffer(function(buffer) {
            //     // turn buffer into blob
            //     blb = buffer;
            // });
            // blb = new Blob(blb);
            console.log(vm.item.pembukaSurat);
            template();
            pdfMake.createPdf(vm.docDefinition).open();
        };

        $scope.downloadPdf = function() {
            pdfMake.createPdf(vm.docDefinition).download();
        };

    }
})();