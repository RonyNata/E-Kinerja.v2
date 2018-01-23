(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('HistoryController', HistoryController);

    
    function HistoryController(EkinerjaService, KontrakPegawaiService, $uibModalInstance, InstruksiPejabatService, $scope, logo_bekasi, logo_garuda) {
      	var vm = this;

        // getAllHistory();
        getHistoryInstruksi();
        // function getAllHistory(){
        //   KontrakPegawaiService.GetAllHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
        //     function(response){
        //       vm.dataHistory = response;debugger
        //     }, function(errResponse){

        //     })
        // }

        vm.getDocument = function(kdHistory){
          KontrakPegawaiService.GetHistory(kdHistory).then(
            function(response){
              debugger
            }, function(errResponse){

            })
        }

        vm.getDocumentInstruksi = function(kdHistory, idx){
          vm.dataHistory[idx].loading = true;
          KontrakPegawaiService.GetDataInstruksi(kdHistory).then(
            function(response){
              vm.data = response;
              template();
              vm.dataHistory[idx].loading = false;
              pdfMake.createPdf(vm.docDefinition).open();
            }, function(errResponse){

            })
        }

        function getHistoryInstruksi(){
          KontrakPegawaiService.GetHistoryInstruksi($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){
              debugger
              // vm.dataHistory = response;
              for(var i = 0; i < response.length;i++)
                response[i].nama = "Surat Instruksi";
              vm.dataHistory = response;
            }, function(errResponse){

            })
        }

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }

        function template(){
          vm.docDefinition = {
            content: [
                {
                    image: logo_garuda,
                    width: 50,
                    height: 50,
                    alignment: 'center',
                    margin: [0,0,0,5]
                },

                {
                    text: '' + vm.data.jabatanPenandaTangan.toUpperCase(), style: 'nama_judul'
                },
                {
                    text: 'REPUBLIK INDONESIA', style: 'nama_judul', margin: [0,0,0,15]
                },

                {
                    text: 'INSTRUKSI', style: 'nama_judul'
                },
                {
                    text: '' + vm.data.judulInstruksi.toUpperCase(), style: 'nama_judul', margin: [0,0,0,15]
                },

                {
                    style: 'judul_nomor', margin: [0,0,0,15],
                    text: ['NOMOR ' + vm.data.nomor + ' TAHUN ' + vm.data.tahun + '\n\n', 'TENTANG\n', vm.data.tentang.toUpperCase() +'\n\n', '' + $.parseJSON(sessionStorage.getItem('credential')).jabatan.toUpperCase()]
                },

                {
                    text: ['Dalam rangka ', vm.data.tentang, ' dengan ini memberi instruksi']
                },

                {
                    style: 'demoTable', margin: [0,10,0,15],
                    table: {
                        widths: [80, 5, '*'],
                        body: [
                            [{text: 'Kepada', style: 'header', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},

                                {   border: [false, false, false, false], bold:true,
                                    ol: []
                                }],
                            [{text: '',margin: [0,0,0,3], colSpan: 3, border: [false, false, false, false]}],
                            [{text: 'Untuk', style: 'header', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}
                            ]
                        ]
                    }
                },

                {
                    style: 'tandaTangan',
                    table: {
                        widths: [200],
                        body: [
                            [{text: ['Dikeluarkan di ', {text:'' + vm.data.dikeluarkanDi, bold:true}], alignment : 'left', border: [false, false, false, false]}],
                            [{text: ['pada tanggal ', {text:'' + vm.data.tanggalDibuat, bold:true}], alignment : 'left', border: [false, false, false, false]}],
                            [{text: '' + vm.data.jabatanPenandaTangan + ',', alignment : 'left', bold: true, border: [false, false, false, false]}],
                            [{text: ' ',margin: [0,20], border: [false, false, false, false]}],
                            [{text: '' + vm.data.namaPenandatangan, alignment : 'left', border: [false, false, false, false]}]
                        ]
                    }
                }

            ],

            styles: {
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
                header: {
                    bold: true,
                    color: '#000',
                    fontSize: 10
                },
                header1: {
                    bold: true,
                    fontSize: 15,
                    alignment: 'center'
                },
                header2: {
                    fontSize: 10,
                    alignment: 'center'
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
            }
          };


          for(var i = 0; i < vm.data.daftarIsiInstruksi.length; i++){
            var style = [{text: '',margin: [0,0,0,3], colSpan: 3, border: [false, false, false, false]}];
            var body = [{text: '' + InstruksiPejabatService.FindUrutan(i), 
                        style: 'header', border: [false, false, false, false]},
                        {text: ':', border: [false, false, false, false]}, 
                        {text: '' + vm.data.daftarIsiInstruksi[i], border: [false, false, false, false]}];
            vm.docDefinition.content[7].table.body.push(style);
            vm.docDefinition.content[7].table.body.push(body);
          }

          var style = [{text: '',margin: [0,0,0,3], colSpan: 3, border: [false, false, false, false]}];
          var body = [{text: '' + InstruksiPejabatService.FindUrutan(vm.data.daftarIsiInstruksi.length), style: 'header', border: [false, false, false, false]},
                      {text: ':', border: [false, false, false, false]}, 
                      {text: 'Melaksanakan instruksi ini dengan penuh tanggung jawab. Instruksi '+ vm.data.judulInstruksi +' ini mulai berlaku pada tanggal dikeluarkan.', border: [false, false, false, false]}
                        ];
          vm.docDefinition.content[7].table.body.push(style);
          vm.docDefinition.content[7].table.body.push(body);

          for(var i = 0; i < vm.data.targetPegawaiList.length; i++){
            debugger
            var data = {
                widths: ['*', '*', '*'],
                table: {
                    body: [
                        [{text: 'Nama', bold: true , border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + vm.data.targetPegawaiList[i].nama, border: [false, false, false, false]}],
                        [{text: 'NIP', bold: true, border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + vm.data.targetPegawaiList[i].nipPegawai, border: [false, false, false, false]}],
                        [{text: 'Pangkat/Gol. Ruang', bold: true, border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + vm.data.targetPegawaiList[i].golongan, border: [false, false, false, false]}],
                        [{text: 'Jabatan', bold: true, border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + vm.data.targetPegawaiList[i].jabatan, border: [false, false, false, false]}]
                    ]
                }
            }
            vm.docDefinition.content[7].table.body[0][2].ol.push(data);
          }

          if(!vm.data.suratPejabat){
            vm.docDefinition.content[2] = {
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

            vm.docDefinition.content[1] = {
                margin: [115, -5, 0, 0],
                table: {
                    widths: [90, 90, 150],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: 'Telp. (021) 89970696',
                                fontSize: 9,
                                alignment: 'right'
                            },{
                            border: [false, false, false, false],
                            text: 'Fax. (021) 89970064',
                            fontSize: 9,
                            alignment: 'center'
                        },{
                            border: [false, false, false, false],
                            text: 'email : diskominfo@bekasikab.go.id',
                            fontSize: 9,
                            alignment: 'left'
                        }
                        ]
                    ]
                }
            };

            vm.docDefinition.content[0] = {
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
            
            vm.docDefinition.content.unshift({
                margin: [90, -5, 0, 0],
                table: {
                    widths: [400],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: '' + vm.data.unitKerja.toUpperCase(),
                                style: 'header1'
                            }
                        ]
                    ]
                }
            });

            vm.docDefinition.content.unshift({
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

            vm.docDefinition.content.unshift({
                image: logo_bekasi,
                width: 90,
                height: 90
            });
          }
        }

        // $scope.openPdf = function(idSurat) {
        //   var blb;
        //   // pdfMake.createPdf(vm.docDefinition).getBuffer(function(buffer) {
        //   //     // turn buffer into blob
        //   //     blb = buffer;
        //   // });
        //   // blb = new Blob(blb);
        //   // console.log(vm.item.pembukaSurat);
        //   // template();
        //   vm.getDocumentInstruksi(idSurat);
        //   pdfMake.createPdf(vm.docDefinition).open();
        // };
   	} 
})();