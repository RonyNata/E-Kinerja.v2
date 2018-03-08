(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('PengumumanController', PengumumanController);

    function PengumumanController(EkinerjaService, HakAksesService, PengumumanService, $scope, 
        $state, logo_bekasi, $uibModal, $document, PenilaianService) {
        var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.back =  function(){
            $state.go('kontrak');
        };

        function getDocumentPengumuman(){
            PenilaianService.GetDataPengumuman($state.params.kdSuratBawahan).then(
                function(response){debugger
                    vm.item = {
                        "nomorUrusan": response.nomorUrusan,
                        "nomorPasanganUrut": response.nomorPasanganUrut,
                        "nomorUnit": response.nomorUnit,
                        "nomorUrut": response.nomorUrut,
                        "tahun": response.nomorTahun,

                        "tentang": response.tentang,
                        "isipengumuman": response.isiPengumuman,
                        "tempat": response.kotaPembuatanSurat,
                        "pegawaiPenandatangan": EkinerjaService.findPegawaiByNip(response.nipPenandatangan,vm.list_pegawai),
                        "tanggal": new Date(response.tanggalPembuatanMilis)
                    };
                }
                );
        }

        vm.save = function(){
            var data = {
                "kdPengumuman":null,
                "nomorUrusan":vm.item.nomorUrusan,
                "nomorPasanganUrut":vm.item.nomorPasanganUrut,
                "nomorUnit":vm.item.nomorUnit,
                "tentang":vm.item.tentang,
                "isiPengumuman":vm.item.isipengumuman,
                "nipPenandatangan":vm.item.pegawaiPenandatangan.nipPegawai,
                "kotaPembuatanPengumuman":vm.item.tempat,
                "tanggalPengumumanMilis":vm.item.tanggal.getTime(),
                "nipPembuatSurat":$.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
                "kdUnitKerja":vm.item.pegawaiPenandatangan.kdUnitKerja,
                "durasiPengerjaan":vm.item.durasiPengerjaan,
                "kdSuratEdaranBawahan":null,

                "kdNaskahPenugasan":$state.params.kdSurat,
                "jenisNaskahPenugasan":$state.params.jenisNaskahPenugasan,
                "statusPenilaian":0,
                "alasanPenolakan":"",

                "kotaPembuatanSurat":vm.item.tempat,
                "kdPengumumanBawahan":null
            }

            if($state.params.kdSuratBawahan != "")
                data.kdPengumumanBawahan = $state.params.kdSuratBawahan;

            PengumumanService.save(data).then(
                function(response){
                    EkinerjaService.showToastrSuccess("Data Berhasil Disimpan");
                    return $state.go('kontrak');
                },function(errResponse){
                    EkinerjaService.showToastrError("Data Tidak Berhasil Disimpan");
                })
        }

        vm.item.tahun = ((new Date()).getYear() + 1900);
        
        // vm.target = [{"id": new Date().getTime()}];
        
        // vm.addTarget = function(){
        //   var data = {"id": new Date().getTime()};
        //   vm.target.push(data);
        // } 
        
        if($.parseJSON(sessionStorage.getItem('pegawai')) != undefined){
            vm.list_pegawai = $.parseJSON(sessionStorage.getItem('pegawai'));
            if($state.params.kdSuratBawahan != undefined)
                getDocumentPengumuman();
            vm.loading = false; 
        }
        else
        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    sessionStorage.setItem('pegawai', JSON.stringify(vm.list_pegawai));
                    if($state.params.kdSuratBawahan != undefined)
                        getDocumentPengumuman();
                    vm.loading = false;
                }, function(errResponse){

                })
        }

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

        vm.getPegawaiPenandatangan = function(){
          if(vm.item.pegawaiPenandatanganSurat.length == 18){
            vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip(vm.item.pegawaiPenandatanganSurat,vm.list_pegawai);
            console.log(vm.item.pegawaiPenandatangan);
          }
        }

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
                        text: 'PENGUMUMAN', style: 'nama_judul'
                    },
                    {
                        margin:[0,0,0,15],
                        text: [{text : 'NOMOR ', style: 'judul_nomor'}, '' + vm.item.nomorUrusan + '/' + vm.item.nomorUrut + '/' + vm.item.nomorPasanganUrut + '/' + vm.item.nomorUnit + '/' + vm.item.tahun]
                    },

                    {
                        margin:[0,0,0,15],
                        text: [{text: 'TENTANG\n', style: 'nama_judul'}, {text: '' + vm.item.tentang.toUpperCase(), style: 'nama_judul'}]
                    },

                    {
                        text: '' + vm.item.isipengumuman,  margin: [0,20,0,30], fontSize: 12, alignment: 'justify'
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
                                        [{text: ['Dikeluarkan di ', {text:'' + vm.item.tempat.toUpperCase(), bold:true}], alignment : 'left'}],
                                        [{text: ['pada tanggal ', {text:'' + EkinerjaService.IndonesianDateFormat(vm.item.tanggal), bold:true}], alignment : 'left'}],
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

                images:{
                    logo: logo_bekasi
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
            EkinerjaService.lihatPdf(vm.docDefinition, 'Surat Pengumuman');
        };

        vm.back =  function(){
          $state.go('kontrak');
        }

        $scope.downloadPdf = function() {
            pdfMake.createPdf(vm.docDefinition).download();
        };



    }
})();