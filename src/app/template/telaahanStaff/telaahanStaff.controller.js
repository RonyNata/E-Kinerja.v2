(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('TelaahanStaffController', TelaahanStaffController);

    function TelaahanStaffController(EkinerjaService, TelaahanStaffService,HakAksesService, $scope, $state) {
        var vm = this;
        vm.loading = true;
        vm.item = {};

        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    vm.loading = false;
                }, function(errResponse){

                })
        }

        $scope.$watch('pegawaipenandatangan', function(){
            if($scope.pegawaipenandatangan.length == 18)
                vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip($scope.pegawaipenandatangan,vm.list_pegawai);
            debugger
        });

        vm.save = function(){
            var data = {
                "kdTelaahanStaf": "",
                "tentang": vm.item.tentang,
                "persoalan": vm.item.persoalan,
                "praanggapan": vm.item.praanggapan,
                "faktaYangMempengaruhi": vm.item.faktayangmempengaruhi,
                "analisis": vm.item.analisis,
                "simpulan" : vm.item.simpulan,
                "saran": vm.item.saran,
                "nipPenandatangan": vm.item.pegawaiPenandatangan.nipPegawai,
                "tanggalTelaahanStafMilis": vm.item.tanggal.getTime(),
                "nipPembuatSurat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
                "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
                "durasiPengerjaan": vm.item.durasiPengerjaan
            };

            console.log(data);
            SuratKuasaService.save(data).then(
                function(response){
                    EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
                }, function(errResponse){

                });
            $state.go('kontrak');

        };

        vm.back =  function(){
            $state.go('kontrak');
        };

        vm.item.tahun = ((new Date()).getYear() + 1900);

        function template(){
            vm.docDefinition = {
                content: [
                    {
                        text: 'TELAAHAN STAF', style: 'nama_judul', margin: [0,15,0,0]
                    },
                    {
                        text: 'TENTANG', style: 'nama_judul', margin: [0,15,0,0]
                    },
                    {
                        text: '' +vm.item.tentang.toUpperCase(), style: 'judul_nomor'
                    },

                    {
                        type: 'upper-alpha', bold: true, margin:[0,20,0,20],
                        ol: [
                            {text:['Persoalan\n', {text:'' +vm.item.persoalan, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                            {text:['Praanggapan\n', {text:'' +vm.item.praanggapan, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                            {text:['Fakta yang Mempegaruhi\n', {text:'' +vm.item.faktayangmempengaruhi, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                            {text:['Analisis\n', {text:'' +vm.item.analisis, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                            {text:['Simpulan\n', {text:'' +vm.item.simpulan, bold:false, alignment:'justify'}],margin:[0,0,0,10]},
                            {text:['Saran\n', {text:'' +vm.item.saran, bold:false, alignment:'justify'}],margin:[0,0,0,5]}
                        ]
                    },

                    {
                        style: 'tandaTangan',
                        table: {
                            widths: [200],
                            body: [
                                [{text: '' + vm.item.pegawaiPenandatangan.jabatan.toUpperCase() + ',', alignment : 'left', bold: true}],
                                [{text: ' ',margin: [0,20]}],
                                [{text: '' +vm.item.pegawaiPenandatangan.nama, alignment : 'left', bold: true}],
                                [{text: '' +vm.item.pegawaiPenandatangan.nipPegawai, alignment : 'left'}]
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