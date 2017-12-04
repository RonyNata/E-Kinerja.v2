(function() {
'use strict';

angular.module('eKinerja').controller('DisposisiController', DisposisiController);

function DisposisiController(EkinerjaService, HakAksesService, DisposisiService, $scope, $state) {
	var vm = this;
	vm.loading = true;
	vm.item = {};

	vm.maksud = [{"id": new Date().getTime(), "deskripsi": ''}];
    vm.target = [{"id": new Date().getTime()}];

    vm.addMaksud = function(){
          var data = {"id": new Date().getTime(), "deskripsi": ''};
          vm.maksud.push(data);
        }

    vm.addTarget = function(){
      var data = {"id": new Date().getTime()};
      vm.target.push(data);
    }

    getAllPegawai();

    function getAllPegawai(){
      HakAksesService.GetAllPegawai().then(
        function(response){
          vm.list_pegawai = response;
          vm.loading = false;
        }, function(errResponse){

        })
    }

    vm.getPegawai = function(idx){
      if(vm.target[idx].pegawai.length == 18)
        vm.target[idx].pegawaiTarget = EkinerjaService.findPegawaiByNip(vm.target[idx].pegawai,vm.list_pegawai);
    } 

    vm.getPegawaiDari = function(){
    debugger
      if(vm.nipDari.length == 18)
        vm.item.dariSuratDisposisi = EkinerjaService.findPegawaiByNip(vm.nipDari,vm.list_pegawai);
    } 
    vm.save = function(){
      var data = {
        "tktKeamanan": vm.item.tktKeamanan,
        "tanggalPenerimaanMilis": vm.item.tanggalPenerimaanMilis.getTime(),
        "kdLembarDisposisiParent": "",
        "noSuratDisposisi": vm.item.noSuratDisposisi,
        "tglPenyelesaianMilis": vm.item.tglPenyelesaianMilis.getTime(),
        "lampiran": vm.item.lampiran,
        "dariSuratDisposisi": vm.item.dariSuratDisposisi.nama,
        "ringkasanIsiSuratDisposisi": vm.item.ringkasanIsiSuratDisposisi,
        "tanggalSuratDisposisiMilis": (new Date()).getTime(),
        "nipPembuat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
        "daftarTargetLembarDisposisi": [],
        "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja
    }

    if($state.current.name != undefined)
    	vm.item.kdLembarDisposisiParent = $state.params.kdSurat;

    if(vm.item.kdLembarDisposisiParent == undefined){
    	data.kdLembarDisposisiParent = null;
    }else{
    	data.kdLembarDisposisiParent = vm.item.kdLembarDisposisiParent;
    }

    for(var i = 0; i < vm.target.length; i++)
      data.daftarTargetLembarDisposisi.push(vm.target[i].pegawaiTarget.nipPegawai);
      console.log(data);
      DisposisiService.save(data).then(
        function(response){
          EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
        }, function(errResponse){

        })
    }

    vm.back =  function(){
      $state.go('perpindahan');
    }

    function template(){
    	vm.docDefinition = {
    		pageSize: 'A4',
    		content: [
    			{
		          table: {
		            widths: [120, 120, 120, 120],
		            body: [
		              [
		                {
		                  border: [true, true, true, false],
		                  text: 'PEMERINTAH KABUPATEN BEKASI',
		                  style: 'header',
		                  colSpan: 4
		                },{},{},{}
		              ],
		              [
		                {
		                  border: [true, false, true, false],
		                  text: 'DINAS KOMUNIKASI DAN INFORMATIKA PERSANDIAN DAN STATISTIK',
		                  style: 'header',
		                  colSpan: 4
		                },{},{},{}
		              ],
		              [
		                {
		                  colSpan:4,
		                  margin: [130,-5,0,0],
		                  border: [true, false, true, false],
		                  table: {
		                    widths: [240],
		                    body:[
		                      [
		                        {
		                          border: [false, false, false, false],
		                          text: 'Komplek Perkantoran Pemerintah Kabupaten Bekasi Desa Sukamahi Kecamatan Cikarang Pusat',
		                          style: 'header2'
		                        }
		                      ]
		                    ]
		                  }
		                }
		              ],
		              [
		                {
		                  colSpan:4,
		                  margin: [70,-5,0,0],
		                  border: [true, false, true, true],
		                  table: {
		                    widths: [90, 90, 180],
		                    body:[
		                      [
		                        {
		                          border: [false, false, false, false],
		                          text: 'Telp. (021) 89970696',
		                          fontSize: 9,
		                          alignment: 'right'
		                        },
		                        {
		                          border: [false, false, false, false],
		                          text: 'Fax. (021) 89970064',
		                          fontSize: 9,
		                          alignment: 'center'
		                        },
		                        {
		                          border: [false, false, false, false],
		                          text: 'email : diskominfo@bekasikab.go.id',
		                          fontSize: 9,
		                          alignment: 'left'
		                        }
		                      ]
		                    ]
		                  }
		                }
		              ],
		              [
		                {
		                  colSpan: 4,
		                  text: 'LEMBAR DISPOSISI',
		                  fontSize: 15,
		                  alignment: 'center'
		                },{},{},{}
		              ],
		              [
		                {
		                  colSpan: 2,
		                  table: {
		                    widths: [110, 110],
		                    body: [
		                      [
		                        {
		                          border: [false, false, false, false],
		                          text: 'Nomor Agenda/Registrasi :',
		                          fontSize: 9
		                        },
		                        {
		                          border: [false, false, false, false],
		                          text: '',
		                          fontSize: 9
		                        }
		                      ]
		                    ]
		                  }
		                },{},
		                {
		                  colSpan: 2,
		                  table: {
		                    widths: [65, 110],
		                    body: [
		                      [
		                        {
		                          border: [false, false, false, false],
		                          text: 'Tkt.Keamanan :',
		                          fontSize: 9
		                        },
		                        {
		                          border: [false, false, false, false],
		                          text: ['' + vm.item.tktKeamanan],
		                          fontSize: 9
		                        }
		                      ]
		                    ]
		                  }
		                },{}
		              ],
		              [
		                {
		                  colSpan: 2,
		                  table: {
		                    widths: [90, 110],
		                    body: [
		                      [
		                        {
		                          border: [false, false, false, false],
		                          text: 'Tanggal Penerimaan :',
		                          fontSize: 9
		                        },
		                        {
		                          border: [false, false, false, false],
		                          text: ['' + vm.item.tanggalPenerimaanMilis],
		                          fontSize: 9
		                        }
		                      ]
		                    ]
		                  }
		                },{},
		                {
		                  colSpan: 2,
		                  table: {
		                    widths: [95, 110],
		                    body: [
		                      [
		                        {
		                          border: [false, false, false, false],
		                          text: 'Tanggal Penyelesaian :',
		                          fontSize: 9
		                        },
		                        {
		                          border: [false, false, false, false],
		                          text: ['' + vm.item.tglPenyelesaianMilis],
		                          fontSize: 9
		                        }
		                      ]
		                    ]
		                  }
		                },{}
		              ],
		              [
		                {
		                  colSpan: 4,
		                  table: {
		                    widths: [107, 2, 370],
		                    body: [
		                      [
		                        {
		                          border: [false, false, false, false],
		                          text: 'Tanggal dan Nomor Surat',
		                          fontSize: 9
		                        },
		                        {
		                          border: [false, false, false, false],
		                          text: ':',
		                          fontSize: 9
		                        },
		                        {
		                          border: [false, false, false, false],
		                          text: ['' + vm.item.tanggalSuratDisposisiMilis + ' dan ' + vm.item.noSuratDisposisi],
		                          fontSize: 9
		                        }
		                      ],
		                      [
		                        {
		                          border: [false, false, false, false],
		                          text: 'Dari',
		                          fontSize: 9
		                        },
		                        {
		                          border: [false, false, false, false],
		                          text: ':',
		                          fontSize: 9
		                        },
		                        {
		                          border: [false, false, false, false],
		                          text: ['' + vm.item.dariSuratDisposisi.nama],
		                          fontSize: 9
		                        }
		                      ],
		                      [
		                        {
		                          border: [false, false, false, false],
		                          text: 'Ringkasan Isi',
		                          fontSize: 9
		                        },
		                        {
		                          border: [false, false, false, false],
		                          text: ':',
		                          fontSize: 9
		                        },
		                        {
		                          border: [false, false, false, false],
		                          text: ['' + vm.item.ringkasanIsiSuratDisposisi],
		                          fontSize: 9
		                        }
		                      ],
		                      [
		                        {
		                          border: [false, false, false, false],
		                          text: 'Lampiran',
		                          fontSize: 9
		                        },
		                        {
		                          border: [false, false, false, false],
		                          text: ':',
		                          fontSize: 9
		                        },
		                        {
		                          border: [false, false, false, false],
		                          text: ['' + vm.item.lampiran],
		                          fontSize: 9
		                        }
		                      ]
		                    ]
		                  }
		                }
		              ],
		              [
		                {
		                  fontSize: 12,
		                  colSpan: 2,
		                  text: 'Disposisi',
		                  alignment: 'center'
		                },
		                {
		                  
		                },
		                {
		                  fontSize: 12,
		                  text: 'Diteruskan Kepada',
		                  alignment: 'center'
		                },
		                {
		                  fontSize: 12,
		                  text: 'Paraf',
		                  alignment: 'center'
		                }
		              ],
		              [
		                {
		                  fontSize:9,
		                  colSpan: 2,
		                  text: 'Disposisi Surat Perintah Mengembangkan Diri'
		                },
		                {
		                  
		                },
		                {
		                  fontSize: 9,
		                  ol: []
		                },
		                {
		                  fontSize: 9,
		                  ul: [
		                    'Sudah Ditandatangan',
		                    'Sudah Ditandatangan',
		                    'Sudah Ditandatangan'
		                  ]
		                }
		              ]
		            ]
		          }
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
		        }
		      }
		  }
	    	for(var i = 0; i < vm.target.length; i++){
	            vm.docDefinition.content[0].table.body[9][2].ol.push(vm.target[i].pegawaiTarget.nama);
	        }
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
          pdfMake.createPdf(vm.docDefinition).open();
        };

        $scope.downloadPdf = function() {
          pdfMake.createPdf(vm.docDefinition).download();
        };
    }

})();