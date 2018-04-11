(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('SuratTugasController', SuratTugasController);


    function SuratTugasController(EkinerjaService, SuratTugasService, $scope, $state, HakAksesService,
                                     PengumpulanDataBebanKerjaService, PenugasanService, logo_bekasi, logo_garuda, 
                                     $document, $uibModal, PenilaianService) {
        var vm = this;
        vm.loading = true;
        vm.item = {};
        if($state.current.name == 'suratperintahnonpejabat' || $state.current.name == 'perintahnonpejabatterusan')
            vm.jenis = 'Non-Pejabat';
        else vm.jenis = 'Pejabat';

        vm.item.tahun = ((new Date()).getYear() + 1900);

        vm.tembusanSurat = [];
        vm.untuk = [{"id": new Date().getTime(), "deskripsiuntuk": ''}];
        vm.dasar = [{"id": new Date().getTime(), "deskripsidasar": ''}];
        vm.menimbang = [{"id": new Date().getTime(), "deskripsimenimbang": ''}];
        vm.target = [];

        vm.back =  function(){
            $state.go('penugasan');
        };

        vm.addTembusan = function(){
            var data = {"id": new Date().getTime(), "deskripsi": ''};
            vm.tembusanSurat.push(data);
        };

        vm.addMenimbang = function(){
            var dataMenimbang = {"id": new Date().getTime(), "deskripsimenimbang": ''};
            vm.menimbang.push(dataMenimbang);
        };

        vm.addDasar = function(){
            var dataDasar = {"id": new Date().getTime(), "deskripsidasar": ''};
            vm.dasar.push(dataDasar);
        };

        vm.addUntuk = function(){
            var dataUntuk = {"id": new Date().getTime(), "deskripsiuntuk": ''};
            vm.untuk.push(dataUntuk);
        };

        vm.addTarget = function(){
            var data = {"id": new Date().getTime()};
            vm.target.push(data);
        };

        function getJabatan(){
            PengumpulanDataBebanKerjaService.GetAllJabatan().then(
                function(response){
                    vm.list_jabatan = response;
                    vm.loading = false;
                }, function(errResponse){

                });
        }

        if($.parseJSON(sessionStorage.getItem('pegawai')) != undefined){
            vm.list_pegawai = $.parseJSON(sessionStorage.getItem('pegawai'));
            if($state.params.kdSuratBawahan != undefined)
                getDocumentTugas();
            getJabatan();
        }
        else
        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    sessionStorage.setItem('pegawai', JSON.stringify(vm.list_pegawai));
                    if($state.params.kdSuratBawahan != undefined)
                        getDocumentTugas();
                    vm.loading = false;
                }, function(errResponse){

                })
        }

        vm.findJabatan = function(idx){
            if(vm.tembusanSurat[idx].jabat.length == 7 || vm.tembusanSurat[idx].jabat.length == 8)
                vm.tembusanSurat[idx].jabatan = EkinerjaService.findJabatanByKdJabatan(vm.tembusanSurat[idx].jabat, vm.list_jabatan);
        };

        vm.findPegawai = function(idx){
            if(vm.target[idx].pgw.length == 18)
                vm.target[idx].pegawai = EkinerjaService.findPegawaiByNip(vm.target[idx].pgw,vm.list_pegawai);
        };

        vm.getPegawai = function(){
            if($scope.pegawai.length == 18)
                vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip($scope.pegawai,vm.list_pegawai);
            debugger
        };

        vm.openPilihan = function (parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/template/dataPegawai/dataPegawai.html',
                controller: 'DataPegawaiController',
                controllerAs: 'datapegawai',
                // windowClass: 'app-modal-window',
                size: 'lg',
                appendTo: parentElem,
                resolve: {
                    pegawai: function(){
                        return vm.target;
                    },
                    pegawaiPilihan: function(){
                        return vm.target;
                    },
                    isPilihan: function(){
                        return 1;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {

            });
        };

        vm.openPegawai = function (parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/template/dataPegawai/dataPegawai.html',
                controller: 'DataPegawaiController',
                controllerAs: 'datapegawai',
                // windowClass: 'app-modal-window',
                size: 'lg',
                appendTo: parentElem,
                resolve: {
                    pegawai: function(){
                        return vm.list_pegawai;
                    },
                    pegawaiPilihan: function(){
                        return vm.target;
                    },
                    isPilihan: function(){
                        return 0;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {

            });
        };

        vm.openDari = function (parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/template/dataPegawai/dataPegawai.html',
                controller: 'DataPegawaiController',
                controllerAs: 'datapegawai',
                // windowClass: 'app-modal-window',
                size: 'lg',
                appendTo: parentElem,
                resolve: {
                    pegawai: function(){
                        return vm.list_pegawai;
                    },
                    pegawaiPilihan: function(){
                        return vm.item.pegawaiPenandatangan;
                    },
                    isPilihan: function(){
                        return 2;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                vm.item.pegawaiPenandatangan = data;
            }, function () {

            });
        };

        vm.openTembusan = function (jabatan, parentSelector) {
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/template/dataJabatan/dataJabatan.html',
          controller: 'DataJabatanController',
          controllerAs: 'datajabatan',
          // windowClass: 'app-modal-window',
          size: 'lg',
          appendTo: parentElem,
          resolve: {
            jabatan: function(){
              return vm.list_jabatan;
            },
            jabatanPilihan: function(){
              return vm.tembusanSurat;
            },
            isPilihan: function(){
              return 0;
            }
          }
          });

          modalInstance.result.then(function () {
          }, function () {

          });
        };

        vm.openPilihanTembusan = function (parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/template/dataJabatan/dataJabatan.html',
                controller: 'DataPegawaiController',
                controllerAs: 'datajabatan',
                // windowClass: 'app-modal-window',
                size: 'lg',
                appendTo: parentElem,
                resolve: {
                    pegawai: function(){
                        return vm.tembusanSurat;
                    },
                    pegawaiPilihan: function(){
                        return vm.tembusanSurat;
                    },
                    isPilihan: function(){
                        return 1;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {

            });
        };

        function getDocumentTugas(){
            PenilaianService.GetDataSuratTugas($state.params.kdSuratBawahan).then(
                function(response){debugger
                    vm.item = {
                        "nomorUrusan": response.nomorUrusan,
                        "nomorUnit": response.nomorUnit,
                        "nomorUrut": response.nomorUrut,
                        "nomorPasanganUrut": response.nomorPasanganUrut,
                        "tahun": response.nomorTahun,
                        "tempat": response.tempat,
                        "pegawaiPenandatangan": EkinerjaService.findPegawaiByNip(response.nipPenandatangan.nip, vm.list_pegawai),
                        "tanggal1": new Date(response.tanggalTugasMilis)
                    }
                    vm.menimbang = [];
                    for(var i = 0; i < response.menimbangList.length; i++)
                        vm.menimbang.push({"id": (new Date()).getTime(), "deskripsimenimbang": response.menimbangList[i]});

                    vm.dasar = [];
                    for(var i = 0; i < response.dasarList.length; i++)
                        vm.dasar.push({"id": (new Date()).getTime(), "deskripsidasar": response.dasarList[i]});

                    vm.untuk = [];
                    for(var i = 0; i < response.untukList.length; i++)
                        vm.untuk.push({"id": (new Date()).getTime(), "deskripsiuntuk": response.untukList[i]});

                    vm.target = [];
                    for(var i = 0; i < response.targetSuratTugasPegawaiSet.length; i++){
                        var pgw = EkinerjaService.findPegawaiByNip(response.targetSuratTugasPegawaiSet[i].nip, vm.list_pegawai);
                        pgw.checked = true;
                        vm.target.push(pgw);
                    }

                    vm.tembusanSurat = [];
                    var tembus;
                    for(var i = 0; i < response.tembusanSuratTugasSet.length; i++){
                      tembus = EkinerjaService.findJabatanByKdJabatan(response.tembusanSuratTugasSet[i].kdJabatan, vm.list_jabatan);
                      tembus.checked = true;
                      vm.tembusanSurat.push(tembus);
                    }
                }, function(errResponse){

                })
        }

        vm.save = function(){
            var data = {
                "nipPembuat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
                "nipPenandatangan": vm.item.pegawaiPenandatangan.nipPegawai,

                "nomorUrusan": vm.item.nomorUrusan,
                "nomorUnit": vm.item.nomorUnit,
                "nomorPasanganUrut": vm.item.nomorPasanganUrut,

                "menimbang": [],
                "dasar": [],
                "untuk": [],
                "tempat": vm.item.tempat,
                "durasiPengerjaan": vm.item.durasiPengerjaan,
                "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,

                "targetSuratTugasPegawaiSet": [],
                "targetSuratTugasPejabatSet": [],
                "tembusanSuratTugasSet": [],

                "isSuratPejabat": false,
                "kdJabatanSuratPejabat": vm.item.pegawaiPenandatangan.kdJabatan,

                "kdSuratTugasBawahan": null,
                "tanggalSuratTugasMilis": vm.item.tanggal1.getTime()
            };

            if($state.params.kdSuratBawahan != "")
                data.kdSuratTugasBawahan = $state.params.kdSuratBawahan;


            for(var i = 0; i < vm.target.length; i++)
                data.targetSuratTugasPegawaiSet.push(vm.target[i].nipPegawai);

            for(var i = 0; i < vm.tembusanSurat.length; i++)
                data.tembusanSuratTugasSet.push(vm.tembusanSurat[i].kdJabatan);

            for(var i = 0; i < vm.untuk.length; i++)
                data.untuk.push(vm.untuk[i].deskripsiuntuk);

            for(var i = 0; i < vm.dasar.length; i++)
                data.dasar.push(vm.dasar[i].deskripsidasar);

            for(var i = 0; i < vm.menimbang.length; i++)
                data.menimbang.push(vm.menimbang[i].deskripsimenimbang);

            console.log(data);
            SuratTugasService.save(data).then(
                function(response){
                    EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
                    $state.go('penugasan');
                }, function(errResponse){
                    EkinerjaService.showToastrError('Data Tidak Dapat Disimpan');
                })
        };

        vm.back =  function(){
            $state.go('penugasan');
        };


        function template(){
            vm.docDefinition = {
                pageSize: 'A4',
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
                                                {text: '' + vm.item.pegawaiPenandatangan.unitKerja.toUpperCase() + '\n', alignment: 'center', style:'header'},
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
                    },

                    {
                        text: 'SURAT TUGAS', style: 'nama_judul'
                    },

                    {
                        text: 'NOMOR ' + vm.item.nomorUrusan + '/' + vm.item.nomorUrut + '/' + vm.item.nomorPasanganUrut + '/' + vm.item.nomorUnit + '/'+ ((new Date()).getYear() + 1900), style: 'judul_nomor'
                    },

                    {
                        style: 'demoTable', margin: [0,15,0,0],
                        table: {
                            widths: [50, 5, '*'],
                            body: [
                                [{text: 'Nama', bold: true},{text: ':'},{text: '' + vm.item.pegawaiPenandatangan.gelarDepan + vm.item.pegawaiPenandatangan.nama + vm.item.pegawaiPenandatangan.gelarBelakang}],
                                [{text: 'Jabatan', bold: true},{text: ':'},{text: '' + vm.item.pegawaiPenandatangan.jabatan}]
                            ]
                        },
                        layout: 'noBorders'
                    },

                    {
                        style: 'demoTable', margin: [0,15,0,10],
                        table: {
                            widths: [80, 5, '*'],
                            body: [
                                [{text: 'Menimbang', fontSize: 12, bold:true},{text: ':'},
                                    {
                                        ol: []
                                    }
                                ],
                                [{text: '',margin: [0,0,0,3], colSpan: 3}],
                                [{text: 'Dasar', fontSize: 12, bold:true},{text: ':'},
                                    {
                                        ol: []
                                    }
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    },

                    {
                        text: 'Memberi Tugas', alignment: 'center', fontSize: 12
                    },

                    {
                        style: 'demoTable', margin: [0,10,0,15],
                        table: {
                            widths: [80, 5, '*'],
                            body: [
                                [{text: 'Kepada', fontSize: 12, bold:true},{text: ':'},

                                    {
                                        ol: []
                                    }],
                                [{text: '',margin: [0,0,0,3], colSpan: 3}],
                                [{text: 'Untuk', fontSize: 12, bold:true},{text: ':'},
                                    {
                                        ol : []
                                    }
                                ]
                            ]
                        },
                        layout: 'noBorders'
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
                                        [{text: '' + vm.item.tempat.toUpperCase() + ', ' + EkinerjaService.IndonesianDateFormat(vm.item.tanggal1), alignment : 'left'}],
                                        [{text: '' + vm.item.pegawaiPenandatangan.jabatan + ',', alignment : 'left', bold: true}],
                                        [{text: ' ',margin: [0,20]}],
                                        [{text: '' + vm.item.pegawaiPenandatangan.gelarDepan + vm.item.pegawaiPenandatangan.nama + vm.item.pegawaiPenandatangan.gelarBelakang, alignment : 'left', bold: true}],
                                        [{text: '' + vm.item.pegawaiPenandatangan.pangkat, alignment : 'left', bold: true}],
                                        [{text: 'NIP. ' + vm.item.pegawaiPenandatangan.nipPegawai, alignment : 'left'}]
                                    ]
                                },
                                layout: 'noBorders'
                            }
                        ]
                    },

                    {text: 'Tembusan :'}

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

            for(var i = 0; i < vm.target.length; i++){
                var data = {
                    widths: ['*', '*', '*'],
                    table: {
                        body: [
                            [{text: 'Nama', bold: true}, {text: ':'}, {text: '' + vm.target[i].gelarDepan + vm.target[i].nama + vm.target[i].gelarBelakang}],
                            [{text: 'NIP', bold: true}, {text: ':'}, {text: '' + vm.target[i].nipPegawai}],
                            [{text: 'Pangkat/Gol. Ruang', bold: true}, {text: ':'}, {text: '' + vm.target[i].pangkat + ' - ' + vm.target[i].golongan}],
                            [{text: 'Jabatan', bold: true}, {text: ':'}, {text: '' + vm.target[i].jabatan}]
                        ]
                    },
                    layout: 'noBorders'
                };
                vm.docDefinition.content[6].table.body[0][2].ol.push(data);
            }

            var tembusan = {
                ol:[]
            };

            for(var i = 0; i < vm.tembusanSurat.length; i++)
                tembusan.ol.push(vm.tembusanSurat[i].jabatan);
            vm.docDefinition.content.push(tembusan);

            for(var i = 0; i < vm.menimbang.length; i++)
                vm.docDefinition.content[4].table.body[0][2].ol.push(vm.menimbang[i].deskripsimenimbang);

            for(var i = 0; i < vm.dasar.length; i++)
                vm.docDefinition.content[4].table.body[2][2].ol.push(vm.dasar[i].deskripsidasar);

            for(var i = 0; i < vm.untuk.length; i++)
                vm.docDefinition.content[6].table.body[2][2].ol.push(vm.untuk[i].deskripsiuntuk);
        };

        $scope.openPdf = function() {
            var blb;
            // pdfMake.createPdf(vm.docDefinition).getBuffer(function(buffer) {
            //     // turn buffer into blob
            //     blb = buffer;
            // });
            // blb = new Blob(blb);
            console.log(vm.item.pembukaSurat);
            template();
            EkinerjaService.lihatPdf(vm.docDefinition, 'Surat Tugas');
        };

        $scope.downloadPdf = function() {
            pdfMake.createPdf(vm.docDefinition).download();
        };
    }
})();