(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('SuratEdaranController', SuratEdaranController);

    
    function SuratEdaranController(EkinerjaService, SuratEdaranService, HakAksesService, 
      $scope, $state, logo_bekasi, logo_garuda, $uibModal, $document, PenilaianService) {
      	var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.item.tahun = ((new Date()).getYear() + 1900);

        vm.back =  function(){
            $state.go('kontrak');
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

        if($state.current.name == 'suratedarannonpejabat')
          vm.jenis = 'Non-Pejabat';
        else vm.jenis = 'Pejabat';

        vm.subab = [
            {
              "nomor": "A",
              "judul": "Latar Belakang",
              "isi": ""
            },
            {
              "nomor": "B",
              "judul": "Maksud dan Tujuan",
              "isi": ""
            },
            {
              "nomor": "C",
              "judul": "Ruang Lingkup",
              "isi": ""
            },
            {
              "nomor": "D",
              "judul": "Dasar",
              "isi": ""
            }
        ];

        if($.parseJSON(sessionStorage.getItem('pegawai')) != undefined){
            vm.list_pegawai = $.parseJSON(sessionStorage.getItem('pegawai'));
            if($state.params.kdSuratBawahan != undefined)
                getDocumentEdaran();
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
                      getDocumentEdaran();
                    vm.loading = false;
                }, function(errResponse){

                })
        }

        $scope.$watch('pegawai', function(){
          if($scope.pegawai.length == 18)
            vm.item.pegawaiPembuat = EkinerjaService.findPegawaiByNip($scope.pegawai,vm.list_pegawai);
          debugger
        })

        vm.addSubab = function() {
          // var idx = vm.subab.length-1;
          // console.log(idx);
          var data = {
            "nomor": String.fromCharCode(65 + vm.subab.length),
            "judul": "",
            "isi": ""
          }
          vm.subab.push(data);
        }

        function getDocumentEdaran(){
            PenilaianService.GetDataEdaran($state.params.kdSuratBawahan).then(
                function(response){debugger
                    vm.item = {
                        "nomorUrut": response.nomorUrut,
                        "tahun": response.nomorTahun,
                        "ttgSuratEdaran": response.tentang,
                        "tempat": response.kotaPembuatanSurat,
                        "pegawaiPembuat": EkinerjaService.findPegawaiByNip(response.nipPenandatangan,vm.list_pegawai),
                        "tanggal": new Date(response.tanggalPembuatanMilis),
                    };
                    vm.subab = [
                            {
                              "nomor": "A",
                              "judul": "Latar Belakang",
                              "isi": response.latarBelakang
                            },
                            {
                              "nomor": "B",
                              "judul": "Maksud dan Tujuan",
                              "isi": response.maksudDanTujuan
                            },
                            {
                              "nomor": "C",
                              "judul": "Ruang Lingkup",
                              "isi": response.ruangLingkup
                            },
                            {
                              "nomor": "D",
                              "judul": "Dasar",
                              "isi": response.dasar
                            }
                        ]

                    for(var i = 0; i < response.subLain.length; i++)
                      vm.subab.push({
                        "nomor": String.fromCharCode(65 + vm.subab.length),
                        "judul": response.subLain[i].namaSub,
                        "isi": response.subLain[i].isiSub
                      });
                }
                );
        }

        vm.save = function(){
          var data = {
            "kdSuratEdaran": "",
            "nomorTahun": ((new Date()).getYear() + 1900),
            "nomorSurat": vm.item.nomorSurat,
            "tentang": vm.item.ttgSuratEdaran,
            "tempat": vm.item.tempat,
            "tanggalSuratEdaranMilis": vm.item.tanggal.getTime(),
            "tanggalPenetapan": vm.item.tanggal.getTime(),
            "nipPenandatangan": vm.item.pegawaiPenandatangan.nipPegawai,
            "latarBelakang": vm.subab[0].isi,
            "maksudDanTujuan": vm.subab[1].isi,
            "ruangLingkup": vm.subab[2].isi,
            "dasar": vm.subab[3].isi,
            "subLain": [],
            "suratPejabat": true,
            "nipPembuatSurat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            "kdUnitKerja": vm.item.pegawaiPenandatangan.kdUnitKerja,
            "durasiPengerjaan": vm.item.durasiPengerjaan,
            "kdSuratEdaranBawahan": null,
            "kdNaskahPenugasan": $state.params.kdSurat,
            "jenisNaskahPenugasan": $state.params.jenisNaskahPenugasan,
            "statusPenilaian": 0,
            "alasanPenolakan": "",
            "kdJabatanSuratPejabat": vm.item.pegawaiPenandatangan.kdJabatan
          };

          if($state.params.kdSuratBawahan != "")
                data.kdSuratEdaranBawahan = $state.params.kdSuratBawahan;

          for(var i = 4; i < vm.subab.length;i++)
            data.subLain.push({"namaSub": vm.subab[i].judul, "isiSub": vm.subab[i].isi});

          if($state.current.name == "suratedarannonpejabat")
            data.suratPejabat = false;

          SuratEdaranService.save(data).then(
            function(response){
              EkinerjaService.showToastrSuccess("Data Berhasil Disimpan");
              $state.go('kontrak');
            },function(errResponse){
              EkinerjaService.showToastrError("Data Tidak Berhasil Disimpan");
            })
        };

        vm.back =  function(){
          $state.go('kontrak');
        };

        vm.removeSubab = function(idx){
          vm.subab.splice(idx,1);
          for(var i = 0; i < vm.subab.length;i++)
            vm.subab[i].nomor = String.fromCharCode(65 + i);
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
                    text: '' + vm.item.pegawaiPenandatangan.jabatan.toUpperCase(), style: 'nama_judul'
                },
                {
                    text: 'REPUBLIK INDONESIA', style: 'nama_judul', margin: [0,0,0,15]
                },

                {
                    text: 'SURAT EDARAN', style: 'nama_judul'
                },
                {
                    text: 'NOMOR '+ vm.item.nomorSurat +' TAHUN ' + ((new Date()).getYear() + 1900), style: 'judul_nomor', margin: [0,0,0,15]
                },

                {
                    text: 'TENTANG', style: 'nama_judul'
                },
                {
                    text: '' + vm.item.ttgSuratEdaran.toUpperCase(), style: 'judul_nomor', margin:[0,0,0,15]
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

          var isi = {
            type: 'upper-alpha', bold: true, margin:[0,0,0,15],
            ol: []
          };
          for(var i = 0; i < vm.subab.length; i++){
              isi.ol.push({text:[''+ vm.subab[i].judul +'\n', {text:'' + vm.subab[i].isi, bold:false, fontSize: 12}],margin:[0,0,0,10], fontSize: 12});
          }  
          vm.docDefinition.content.push(isi);
          vm.docDefinition.content.push(
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
                                  [{text: ['pada tanggal ', {text:'' + EkinerjaService.IndonesianDateFormat(vm.item.tanggal), bold:true}], alignment : 'left'}],
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
              }
          );
          if($state.current.name == "suratedarannonpejabat"){
              vm.docDefinition.content[0] =
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
                  };

              vm.docDefinition.content[1] = {};
              vm.docDefinition.content[2] = {};
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
          EkinerjaService.lihatPdf(vm.docDefinition, 'Surat Edaran');
        };

        $scope.downloadPdf = function() {
          pdfMake.createPdf(vm.docDefinition).download();
        };
   	} 
})();