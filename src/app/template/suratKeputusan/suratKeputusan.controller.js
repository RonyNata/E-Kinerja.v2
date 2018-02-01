(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('SuratKeputusanController', SuratKeputusanController);

    
    function SuratKeputusanController(EkinerjaService,HakAksesService, SuratKeputusanService, $scope, $state, logo_bekasi, $uibModal, $document) {
      	var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.back =  function(){
            $state.go('kontrak');
        };

        if($state.current.name == 'suratkeputusan')
          vm.jenis = 'Non-Pejabat';
        else vm.jenis = 'Pejabat';

        vm.item.tahun = ((new Date()).getYear() + 1900);

        vm.keputusan = [{"id": new Date().getTime(), "deskripsi": ''}];
        vm.menimbang = [{"id": new Date().getTime(), "deskripsimenimbang": ''}];
        vm.mengingat = [{"id": new Date().getTime(), "deskripsimengingat": ''}];
        vm.target = [{"id": new Date().getTime()}];

        vm.addKeputusan = function(){
          var data = {"id": new Date().getTime(), "deskripsi": ''};
          vm.keputusan.push(data);
        };

        vm.addMenimbang = function(){
            var dataMenimbang = {"id": new Date().getTime(), "deskripsimenimbang": ''};
            vm.menimbang.push(dataMenimbang);
        };

        vm.addMengingat = function(){
            var dataMengingat = {"id": new Date().getTime(), "deskripsimengingat": ''};
            vm.mengingat.push(dataMengingat);
        };

        vm.addTarget = function(){
          var data = {"id": new Date().getTime()};
          vm.target.push(data);
        };

        if($.parseJSON(sessionStorage.getItem('pegawai')) != undefined){
            vm.list_pegawai = $.parseJSON(sessionStorage.getItem('pegawai'));
            vm.loading = false; 
        }
        else
        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    sessionStorage.setItem('pegawai', JSON.stringify(vm.list_pegawai));
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

        vm.save = function(){
          var data = {
            "kdSuratKeputusan":"",
            "nomorUrut":vm.item.nomorSurat,
            "nomorTahun":vm.item.tahun,
            "nipPenandatangan":vm.item.pegawaiPenandatangan.nipPegawai,
            "selaku":vm.item.selaku,
            "tentang":vm.item.tentang,
            "menimbang":[],
            "mengingat":[],
            "menetapkan":[],
            "tanggalSuratKeputusanMilis":vm.item.tanggal1.getTime(),
            "kotaPembuatanSurat":vm.item.tempat,
            "nipPembuatSurat":$.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            "kdUnitKerja":vm.item.pegawaiPenandatangan.kdUnitKerja,
            "durasiPengerjaan":vm.item.durasiPengerjaan,
            "kdSuratKeputusanBawahan":null,
            "kdNaskahPenugasan":$state.params.kdSurat,
            "jenisNaskahPenugasan":$state.params.jenisNaskahPenugasan,
            "statusPenilaian":0,
            "alasanPenolakan":""
          };

          for(var i = 0; i < vm.keputusan.length;i++)
            data.menetapkan.push(vm.keputusan[i].deskripsi);

            for(var i = 0; i < vm.menimbang.length; i++)
                data.menimbang.push(vm.menimbang[i].deskripsimenimbang);

            for(var i = 0; i < vm.mengingat.length; i++)
                data.mengingat.push(vm.mengingat[i].deskripsimengingat);

          console.log(data);
          SuratKeputusanService.save(data).then(
            function(response){
                EkinerjaService.showToastrSuccess("Data Berhasil Disimpan");
                $state.go('kontrak');
            }, function(errResponse){
                  EkinerjaService.showToastrError("Data Tidak Dapat Disimpan");
            })
        };

        vm.back =  function(){
          $state.go('kontrak');
        };


        // docDefinition.content[0].text = 'baka aweu';

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
                    text: 'KEPUTUSAN ' + vm.item.pegawaiPenandatangan.jabatan.toUpperCase() + '\n' + vm.item.pegawaiPenandatangan.unitKerja.toUpperCase()
                    +'\n' +
                    'Selaku\n' + vm.item.selaku.toUpperCase() + '\n', style: 'nama_judul'
                },
                {
                    text: 'NOMOR '+ vm.item.nomorSurat +' TAHUN ' + vm.item.tahun, style: 'judul_nomor', margin: [0,15,0,15]
                },

                {
                    text: 'TENTANG', style: 'nama_judul'
                },
                {
                    text: '' + vm.item.tentang.toUpperCase(), style: 'judul_nomor', margin:[0,0,0,15]
                },

                {
                    text: '' + vm.item.pegawaiPenandatangan.jabatan.toUpperCase(), style: 'judul_nomor', margin:[0,0,0,15]
                },

                {
                    style: 'demoTable', margin: [0,15,0,10],
                    table: {
                        widths: [80, 5, '*'],
                        body: [
                            [{text: 'Menimbang', fontSize: 12, bold:true},{text: ':'},
                                {
                                    type: 'lower-alpha',
                                    ol: []
                                }
                            ],
                            [{text: '',margin: [0,0,0,3], colSpan: 3}],
                            [{text: 'Mengingat', fontSize: 12, bold:true},{text: ':'},
                                {
                                    ol: []
                                }
                            ]
                        ]
                    },
                    layout: 'noBorders'
                },

                {
                    text: 'MEMUTUSKAN', alignment: 'center', fontSize: 12, bold:true
                },

                {
                    style: 'demoTable', margin: [0,15,0,10],
                    table: {
                        widths: [80, 5, '*'],
                        body: [
                            [
                                {text: 'Menetapkan', fontSize: 12, bold:true},{text: ':'},
                                {text:['KEPUTUSAN ','' + vm.item.pegawaiPenandatangan.jabatan + ' ' + vm.item.pegawaiPenandatangan.unitKerja.toUpperCase(), ' TENTANG ', '' + vm.item.tentang.toUpperCase()]}
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
                                    [{text: ['Ditetapkan di ', {text:'' + vm.item.tempat.toUpperCase(), bold:true}], alignment : 'left'}],
                                    [{text: ['pada tanggal ', {text:'' + EkinerjaService.IndonesianDateFormat(vm.item.tanggal1), bold:true}], alignment : 'left'}],
                                    [{text: '' + vm.item.pegawaiPenandatangan.jabatan + ',', alignment : 'left', bold: true}],
                                    [{text: ' ',margin: [0,20]}],
                                    [{text: '' + vm.item.pegawaiPenandatangan.nama, alignment : 'left', bold:true}],
                                    [{text: '' + vm.item.pegawaiPenandatangan.nipPegawai, alignment : 'left'}]
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
            }
        };

            for(var i = 0; i < vm.keputusan.length; i++){
                var style = [{text: '',margin: [0,0,0,3], colSpan: 3}];
                var body = [{text: '' + SuratKeputusanService.FindUrutan(i),fontSize: 12, bold:true},
                    {text: ':'},
                    {text: '' + vm.keputusan[i].deskripsi,fontSize: 12}];
                vm.docDefinition.content[8].table.body.push(style);
                vm.docDefinition.content[8].table.body.push(body);
            }

            for(var i = 0; i < vm.menimbang.length; i++)
                vm.docDefinition.content[6].table.body[0][2].ol.push(vm.menimbang[i].deskripsimenimbang);

            for(var i = 0; i < vm.mengingat.length; i++)
                vm.docDefinition.content[6].table.body[2][2].ol.push(vm.mengingat[i].deskripsimengingat);



          // for(var i = 0; i < vm.keputusan.length; i++){
          //   var style = [{text: '',margin: [0,0,0,3], colSpan: 3, border: [false, false, false, false]}];
          //   var body = [{text: '' + SuratKeputusanService.FindUrutan(i),
          //               style: 'header3', border: [false, false, false, false]},
          //               {text: ':', border: [false, false, false, false]},
          //               {text: '' + vm.keputusan[i].deskripsi, border: [false, false, false, false]}];
          //   vm.docDefinition.content[8].table.body.push(style);
          //   vm.docDefinition.content[8].table.body.push(body);
          // }
          //
          // var menimbang = vm.item.menimbang.split("\n");
          // for(var i = 0; i < menimbang.length; i++){
          //   var kata = '';
          //   for(var j = 1; j < (menimbang[i].split(" ")).length; j++)
          //     kata += (menimbang[i].split(" "))[j] + ' ';
          //   vm.docDefinition.content[11].table.body[0][2].ol.push(kata);
          // }
          //
          // var mengingat = vm.item.mengingat.split("\n");
          // for(var i = 0; i < mengingat.length; i++){
          //   var kata = '';
          //   for(var j = 1; j < (mengingat[i].split(" ")).length; j++)
          //     kata += (mengingat[i].split(" "))[j] + ' ';
          //   vm.docDefinition.content[11].table.body[2][2].ol.push(kata);
          // }
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