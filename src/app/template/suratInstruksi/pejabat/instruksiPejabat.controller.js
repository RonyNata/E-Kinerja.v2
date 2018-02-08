(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('InstruksiPejabatController', InstruksiPejabatController);

    
    function InstruksiPejabatController(EkinerjaService, InstruksiPejabatService, KontrakPegawaiService, 
      HakAksesService, $scope, $state, logo_bekasi, logo_garuda, $uibModal, $document) {
      	var vm = this;
        vm.loading = true;
        vm.item = {};
        if($state.current.name == 'instruksinonpejabat')
          vm.jenis = 'Non-Pejabat';
        else vm.jenis = 'Pejabat';
        
        vm.item.tahun = ((new Date()).getYear() + 1900);

        vm.maksud = [{"id": new Date().getTime(), "deskripsi": ''}];
        vm.target = [];

        vm.addMaksud = function(){
          var data = {"id": new Date().getTime(), "deskripsi": ''};
          vm.maksud.push(data);
        }

        vm.addTarget = function(){
          var data = {"id": new Date().getTime()};
          vm.target.push(data);
        }

        if($.parseJSON(sessionStorage.getItem('pegawai')) != undefined){
            vm.list_pegawai = $.parseJSON(sessionStorage.getItem('pegawai'));
            if($state.current.name != 'instruksinonpejabatterusan' || $state.current.name != 'instruksipejabatterusan')
              getDocumentInstruksi();
            vm.loading = false; 
        }
        else
        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    sessionStorage.setItem('pegawai', JSON.stringify(vm.list_pegawai));
                    if($state.current.name != 'instruksinonpejabatterusan' || $state.current.name != 'instruksipejabatterusan')
                      getDocumentInstruksi();
                    vm.loading = false;
                }, function(errResponse){

                })
        }

        vm.getPegawai = function(idx){
          if(vm.target[idx].pegawai.length == 18)
            vm.target[idx].pegawaiPembuat = EkinerjaService.findPegawaiByNip(vm.target[idx].pegawai,vm.list_pegawai);
        }        

        vm.getPegawaiPd = function(){
          if(vm.item.pegawai.length == 18){
            vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip(vm.item.pegawai,vm.list_pegawai);
            console.log(vm.item.pegawaiPenandatangan);
          }
        }  


        function getDocumentInstruksi(){
          KontrakPegawaiService.GetDataInstruksi($state.params.kdSurat).then(
            function(response){
              vm.item.judulInstruksi = response.judulInstruksi;
              vm.item.nomorSurat = response.nomor;
              vm.item.tempat = response.dikeluarkanDi;
              vm.item.tentang = response.tentang;
              vm.item.pegawai = response.nipPenandatangan;
              vm.getPegawaiPd();
              vm.maksud = [];
              for(var i = 0; i < response.daftarIsiInstruksi.length; i++)
                vm.maksud.push({
                  "id": new Date().getTime(),
                  "deskripsi": response.daftarIsiInstruksi[i]
                });
              debugger
            }, function(errResponse){

            })
        }      

        // $scope.$watch('pegawai', function(){
        //     vm.target.pegawaiPembuat = EkinerjaService.findPegawaiByNip($scope.pegawai,vm.list_pegawai);
        //   debugger
        // })

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

        vm.save = function(){
          var data = {
            "judulInstruksi": vm.item.judulInstruksi,
            "nomor": vm.item.nomorSurat,
            "tentang": vm.item.tentang,
            "alasan": "",
            "daftarIsiInstruksi": [],
            "dikeluarkanDi": vm.item.tempat,
            "tanggalDibuat": (new Date()).getTime(),
            "nipPembuat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            "nipPenandatangan": vm.item.pegawaiPenandatangan.nipPegawai,
            "targetPegawaiList": [],
            "targetJabatanList": [],
            "suratPejabat": false,
            "kdJabatanSuratPejabat": vm.item.pegawaiPenandatangan.kdJabatan,
            "kdUnitKerja": vm.item.pegawaiPenandatangan.kdUnitKerja,
            "durasiPengerjaan": vm.item.durasiPengerjaan,
          }
          debugger
          if($state.current.name != 'instruksinonpejabat')
            data.suratPejabat = true;
          if($state.current.name != 'instruksinonpejabatterusan' || $state.current.name != 'instruksipejabatterusan')
            data.kdSuratInstruksiParent = $state.params.kdSurat;
          for(var i = 0; i < vm.maksud.length; i++)
            data.daftarIsiInstruksi.push(vm.maksud[i].deskripsi);
          for(var i = 0; i < vm.target.length; i++)
            data.targetPegawaiList.push(vm.target[i].nipPegawai);
          console.log(data);
          InstruksiPejabatService.save(data).then(
            function(response){
              EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
            }, function(errResponse){

            })
            return $state.go('kontrak');
        };

        vm.back =  function(){
          $state.go('kontrak');
        };


        // docDefinition.content[0].text = 'baka aweu';

        function template(){
          vm.docDefinition = {
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
                    text: '' + $.parseJSON(sessionStorage.getItem('credential')).jabatan.toUpperCase(), style: 'nama_judul'
                },
                {
                    text: 'REPUBLIK INDONESIA', style: 'nama_judul', margin: [0,0,0,15]
                },

                {
                    text: 'INSTRUKSI', style: 'nama_judul'
                },
                {
                    text: '' + vm.item.judulInstruksi.toUpperCase(), style: 'nama_judul', margin: [0,0,0,15]
                },

                {
                    style: 'judul_nomor', margin: [0,0,0,15],
                    text: ['NOMOR ' + vm.item.nomorSurat + ' TAHUN ' + ((new Date()).getYear() + 1900) + '\n\n', 'TENTANG\n', vm.item.tentang.toUpperCase() +'\n\n', '' + $.parseJSON(sessionStorage.getItem('credential')).jabatan.toUpperCase()]
                },

                {
                    text: ['Dalam rangka ', {text: '' + vm.item.alasan, bold: true, fontSize: 12}, ' dengan ini memberi instruksi']
                },

                {
                    style: 'demoTable', margin: [0,10,0,15],
                    table: {
                        widths: [80, 5, '*'],
                        body: [
                            [{text: 'Kepada', bold: true, fontSize: 12},{text: ':', fontSize: 12},

                                {   bold:true,
                                    ol: []
                                }],
                            [{text: '',margin: [0,0,0,3], colSpan: 3}], 
                            [{text: 'Untuk', bold: true, fontSize: 12},{text: ':', fontSize: 12}, {text: ''}
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
                                    [{text: ['Dikeluarkan di ', {text:'' + vm.item.tempat, bold:true}], alignment : 'left'}],
                                    [{text: ['pada tanggal ', {text:'' + EkinerjaService.IndonesianDateFormat(new Date()), bold:true}], alignment : 'left'}],
                                    [{text: '' + vm.item.pegawaiPenandatangan.jabatan + ',', alignment : 'left', bold: true}],
                                    [{text: ' ',margin: [0,20]}],
                                    [{text: '' + vm.item.pegawaiPenandatangan.gelarDepan + vm.item.pegawaiPenandatangan.nama + vm.item.pegawaiPenandatangan.gelarBelakang, alignment : 'left', bold:true}],
                                    [{text: '' + vm.item.pegawaiPenandatangan.pangkat, alignment : 'left', bold:true}],
                                    [{text: 'NIP. ' + vm.item.pegawaiPenandatangan.nipPegawai, alignment : 'left'}]
                                ]
                            },
                            layout: 'noBorders'
                        }
                    ]
                },

                {
                    style: 'tandaTangan',
                    table: {
                        widths: [200],
                        body: [
                            [{text: ['Dikeluarkan di ', {text:'' + vm.item.tempat, bold:true}], alignment : 'left'}], 
                            [{text: ['pada tanggal ', {text:'' + EkinerjaService.IndonesianDateFormat(new Date()), bold:true}], alignment : 'left'}], 
                            [{text: '' + vm.item.pegawaiPenandatangan.jabatan + ',', alignment : 'left', bold: true}], 
                            [{text: ' ',margin: [0,20]}], 
                            [{text: '' + vm.item.pegawaiPenandatangan.nama, alignment : 'left'}]
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
                },
                header4: {
                    bold: true,
                    fontSize: 12
                },
                header5: {
                    fontSize: 12
                }
            }
          };


          for(var i = 0; i < vm.maksud.length; i++){
            var style = [{text: '',margin: [0,0,0,3], colSpan: 3}];
            var body = [{text: '' + InstruksiPejabatService.FindUrutan(i), bold: true, fontSize: 12},
                        {text: ':', fontSize: 12},
                        {text: '' + vm.maksud[i].deskripsi, fontSize: 12}];
            vm.docDefinition.content[7].table.body.push(style);
            vm.docDefinition.content[7].table.body.push(body);
          }

          var style = [{text: '',margin: [0,0,0,3], colSpan: 3}];
          var body = [{text: '' + InstruksiPejabatService.FindUrutan(vm.maksud.length), bold: true, fontSize: 12},
                      {text: ':', fontSize: 12},
                      {text: 'Melaksanakan instruksi ini dengan penuh tanggung jawab. Instruksi '+ vm.item.judulInstruksi +' ini mulai berlaku pada tanggal dikeluarkan.', fontSize: 12}
                        ];
          vm.docDefinition.content[7].table.body.push(style);
          vm.docDefinition.content[7].table.body.push(body);

          for(var i = 0; i < vm.target.length; i++){
            var data = {
                widths: ['*', '*', '*'],
                style: 'header5',
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
            vm.docDefinition.content[7].table.body[0][2].ol.push(data);
          }

          if($state.current.name == "instruksinonpejabat" || $state.current.name == "instruksinonpejabatterusan"){
            vm.docDefinition.content[0] = {
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
                                        {text: 'PEMERINTAHAN KABUPATEN BEKASI\n', alignment: 'center', style:'header1'},
                                        {text: ''+ vm.item.pegawaiPenandatangan.unitKerja.toUpperCase() +'\n', alignment: 'center', style:'header1'},
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
            }
          
            vm.docDefinition.content.splice(1,1);
            vm.docDefinition.content.splice(1,1);
          }
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