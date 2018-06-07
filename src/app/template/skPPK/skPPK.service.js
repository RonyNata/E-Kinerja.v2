(function(){
    'use strict';

    angular.module('eKinerja')
        .service('SKPPKService', SKPPKService);

    function SKPPKService(API, $http, $q, EkinerjaService, logo_bekasi){
        var service = {};

        service.GetSKBarjas = function(kdUnit){
            var deferred = $q.defer();
            $http.get(API + 'get-sk-barjas/' + kdUnit).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        service.template = function(data){
            var docDefinition = {
              pageSize: 'FOLIO',
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
                                              {text: 'DINAS KOMUNIKASI INFORMATIKA PERSANDIAN DAN STATISTIK\n', alignment: 'center', style:'header'},
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
                      text: 'KEPUTUSAN KEPALA DINAS\nKOMUNIKASI INFORMATIKA PERSANDIAN DAN STATISTIK\n' +
                      'Selaku\nPENGGUNA ANGGARAN\n', style: 'nama_judul'
                  },
                  {
                      text: 'NOMOR : 800/546 - Kep/Diskominfo.1/2018', fontSize: 12, alignment: 'center', margin: [0,0,0,20]
                  },

                  {
                      text: 'TENTANG', style: 'nama_judul'
                  },
                  {
                      text: 'PERUBAHAN ATAS KEPUTUSAN KEPALA DINAS KOMUNIKASI INFORMATIKA PERSANDIAN DAN STATISTIK NOMOR 800/006-Kep.Diskominfo.1/2018 TANGGAL 02 Januari 2018 PENUNJUKAN DAN PERANGKATAN PEJABAT PENATAUSAHAAN KEUANGAN (PPK-SKPD), PEJABAT PEMBUAT KOMITMEN (PPK) DAN PEJABAT PELAKSANA TEKNIS KEGIATAN (PPTK) DILINGKUNGAN DINAS KOMUNIKASI INFORMATIKA PERSANDIAN DAN STATISTIK KABUPATEN BEKASI TAHUN ANGGARAN 2018', style: 'judul_nomor', margin:[0,0,0,15]
                  },

                  {
                      text: 'KEPALA DINAS KOMUNIKASI INFORMATIKA PERSANDIAN DAN STATISTIK\nKABUPATEN BEKASI', style: 'judul_nomor', margin:[0,0,0,15]
                  },

                  {
                      style: 'demoTable', margin: [0,15,0,10],
                      table: {
                          widths: [80, 5, '*'],
                          body: [
                              [{text: 'Menimbang', fontSize: 12, bold:true},{text: ':'},
                                  {
                                      separator: ')',
                                      type: 'lower-alpha',
                                      alignment: 'justify',
                                      ol: [
                                          {margin: [0,0,0,10], text: 'Bahwa sehubungan dengan Surat Keputusan Bupati Bekasi Nomor: 821.2/Kep.300-BKPPD/2018 tanggal 23 Februari 2018 Perihal Alih Tugas/Alih Jabatan Pimpinan Tinggi Pratama, Administratur dan Pengawasan di Lingkungan Pemerintah Kabupaten Bekasi, untuk tertib administrasi pengelolaan keuangan daerah, dipandang perlu untuk segera mengganti Pejabar Pelaksana Teknis Kegiatan, maka Keputusan Kepala Dinas Komunikasi Informatika Persandian dan Statistik Kabupaten Bekasi Nomor: 800/006-KepDiskominfo.1/2018 tanggal 02 Januari 2018 tentang Penunjuk Pejabat Penatausahaan Keuangan (PPK SKPD), Pejabat Pembuat Komitmen (PPK), Pejabat Pelaksana Teknis Kegiatan (PPTK) dilingkungan Dinas Komunikasi Informatika Persandian dan Statistik Kabupaten Bekasi Tahun Anggaran 2018 perlu diubah dan disesuaikan;'},
                                          {margin: [0,0,0,10], text: 'bahwa atas dasar pertimbangan sebagaimana dimamksud pada huruf a) diatas, dipandang perlu ditetapkan Keputusan Kepala Dinas Komunikasi Informatika Persandian dan Statistik Kabupaten Bekasi selaku Pengguna Anggaran.'}
                                      ]
                                  }
                              ],
                              [{text: '',margin: [0,0,0,3], colSpan: 3}],
                              [{text: 'Mengingat', fontSize: 12, bold:true},{text: ':'},
                                  {
                                      alignment: 'justify',
                                      ol: [
                                          {margin: [0,0,0,10], text: 'Undang-Undang Nomor 14 Tahun 1950 tentang Pembentukan Daerah-Daerah Kabupaten Dalam Lingkungan Provinsi Jawa Barat (Berita Negara Tahun 1950);'},
                                          {margin: [0,0,0,10], text: 'Keputusan Presiden Nomor 17 Tahun 2003 tentang Keuangan Negara (Lembaran Negara Republik Indonesia Tahun 2013 Nomor 47, Tambahan Lembaran Negara Republik Indonesia Nomor 4286);'},
                                          {margin: [0,0,0,10], text: 'Undang-Undang Nomor 1 Tahun 2004 tentang Perbendaharaan Negara (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 5, Tambahan Lembaran Negara Republik Indonesia Nomor 4355);'},
                                          {margin: [0,0,0,10], text: 'Undang-Undang Nomor 15 Tahun 2004 tentang Pemeriksa Pengelolaan dan Pertanggungjawaban Keuangan Negara (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 66, Tambahan Lembaga Republik Indonesia Nomor 4400);'},
                                          {margin: [0,0,0,10], text: 'Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintah Daerah (Lembaran Negara Republik Indonesia Tahun 2014 Nomor 244, tambahan Lebaran Negara Republik Indonesia Nomor 5587);'},
                                          {margin: [0,0,0,10], text: 'Peraturan Pemerintah Nomor 58 Tahun 2005 tentang Pengelolaan Keuangan Daerah (Lembaraan Negara Republik Indonesia Tahun 2005 Nomor 140, Tambahan Lembaran Negara Nomor 4578);'},
                                          {margin: [0,0,0,10], text: 'Peraturan Menteri Dalam Negeri Nomor 13 Tahun 2006 tentang Pedoman Pengelolaan Keuangan Daerah sebagaimana telah diubah dengan Peraturan Menteri Dalam Negeri Nomor 59 Tahun 2007 tentang Perubahan Atas Peraturan Menteri Dalam Negeri Nomor 13 Tahun 2006 tentang Pedoman Pengelolaan Keuangan Daerah;'},
                                          {margin: [0,0,0,10], text: 'Peraturan Dalam Negeri Nomor 55 Tahun 2008 tentang Tatacara Penatausahaan dan Penyusunan Laporan Pertanggungjawaban Bendahara serta penyampaiannya;'},
                                          {margin: [0,0,0,10], text: 'Peraturan Daerah Kabupaten Bekasi Nomor 6 Tahun 2016 tentang Pembentukan dan Susunan Perangkat Daerah Kabupaten Bekasi;'},
                                          {margin: [0,0,0,10], text: 'Peraturan Presiden Nomor 4 Tahun 2015 tentang Perubahan Keempat atas Peraturan Presiden Nomor 54 Tahun 2010 tentang Pengadaan Barang/Jasa Pemerintah'},
                                          {margin: [0,0,0,10], text: 'Peraturan Bupati Bekasi Nomor 64 Tahun 2016 tanggal 17 Oktober 2017 tentang Kedudukan, Susunan Organisasi, Tugas dan Fungsi serta Tata Kerja Dinas Komunikasi Informatika Persandian dan Statistik Kabupaten Bekasi;'},
                                          {margin: [0,0,0,10], text: 'Keputusan Bupati Bekasi Nomor: 915.4/Kep.721-Adm Pemb/2017 tanggal 29 Desember 2017 tentang Pengesahan Dokumen Pelaksanaan Anggaran (DPA) APBD Kabupaten Bekasi Tahun Anggaran 2018.'}
                                      ]
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
                              [{text: 'Menetapkan', fontSize: 12, bold:true},{text: ':'}, {}],
                              [{text: 'Pertama', fontSize: 12, bold:true},{text: ':'}, {margin: [0,0,0,10], alignment: 'justify', text: 'Perubahan atas Keputusan Kepala Dinas KKomunikasi Informatika Persandian dan Statistik selaku Pengguna Anggaran Nomor: 800/006-Kep/Diskominfo.1/2018 tanggal 02 Januari 2018 tentang Penunjukan dan Pengangkatan Pejabat Penatausahaan Keuangan (PPK-SKPD), Pejabat Pembuat Komitmen (PPK), Pejabat Pelaksanaan Teknis Kegiatan (PPTK) dilingkungan Dinas Komunikasi Informatika Persandian dan Statistik Kabupaten Bekasi Tahun Anggaran 2018.'}],
                              [{text: 'Kedua', fontSize: 12, bold:true}, {text: ':'},
                                  {
                                      margin: [0,0,0,10],
                                      stack: [
                                          'Perubahan sebagaimana dimaksud pada diktum PERTAMA adalah merubah ketentuan lampiran:',
                                          {
                                              alignment: 'justify',
                                              ul: [
                                                  'Nomor Urut 3 Kolom 5 yang semula Nama HASRI ENGEL ALFRET TAEBUNU, S.Si.T NIP. 19801201 200212 1 003 Jabatan Plt. Kasubbag. Umum dan Kepegawaian diubah sehingga harus dibaca Nama FITRI NURUL HIDAYANTI, SE, M.Si, NIP. 19770913 200901 2 002 Jabatan Kasubbag. Umum dan Kepegawaian.',
                                                  'Nomor Urut 4 Kolom 5 yang semula Nama HASRI ENGEL ALFRET TAEBUNU, S.Si.T NIP. 19801201 200212 1 003 Jabatan Kasubbag. Perencanaan diubah sehingga harus dibaca Nama SYAFRUDIN, SE, M.Si, NIP. 19750223 200501 1 004 Jabatan Kasubbag. Perencanaan.',
                                                  'Nomor Urut 17 Kolom 5 yang semula Nama ARY SAKTIANSYAH, S.Kom NIP. 19781001 200212 1 002 Jabatan Kepala UPTD LPSE diubah sehingga harus dibaca Nama SUTRISNA, SE, M.Si, NIP. 19650520 198703 1 001 Jabatan Kasi. Infrastruktur TIK.'
                                              ]
                                          }
                                      ]
                                  }],
                              [{text: 'Ketiga', fontSize: 12, bold:true}, {text: ':'}, {margin: [0,0,0,10], alignment: 'justify', text: 'Keputusan ini merupakan bagian yang tidak terpisahkan dengan keputusan Kepala Dinas Komunikasi Informatika Persandian dan Statistik selaku Pengguna Anggaran Nomor: 800/006-Kep/Diskominfo.1/2018 tanggal 02 Januari 2018, tentang Penunjukan dan Pengangkatan Pejabat Penatausahaan Keuangan (PPK-SKPD), Pejabat Pembuat Komitmen (PPK), Pejabat Pelaksanaan Teknis Kegiatan (PPTK) dilingkungan Dinas Komunikasi Informatika Persandian dan Statistik Kabupaten Bekasi Tahun Anggaran 2018.'}],
                              [{text: 'Keempat', fontSize: 12, bold:true}, {text: ':'},{margin: [0,0,0,10], alignment: 'justify', text: 'Dalam Pelaksanaan Tugas Pejabat Penatausahaan Keuangan (PPK-SKPD), Pejabat Pembuat Komitmen (PPK) dan Pejabat Pelaksana Teknis Kegiatan (PPTK) harus berpedoman pada ketentuan peraturan perundang-undangan yang berlaku sebagaimana telah diatur dalam Peraturan Presiden Nomor 4 Tahun 2015 tentang Perubahan Keempat atas Peraturan Presiden Nomor 54 Tahun 2010 tentang Pengadaan Barang/Jasa Pemerintah'}],
                              [{text: 'Keenam', fontSize: 12, bold:true}, {text: ':'},{margin: [0,0,0,10], alignment: 'justify', text: 'Hal-Hal yang belum cukup diatur dalam keputusan ini sepanjang mengenai teknis pelaksanaanya, akan diatur kemudian dan keputusan ini berlaku sejak ditetapkan dengan ketentuan akan diadakan perbaikan sebagaimana mestinya apabila terjadi kekeliruan dan kekurangan didalamnya.'}]
                          ]
                      },
                      layout: 'noBorders'
                  },

                  {
                      columns: [
                          {
                              width: '60%',
                              text: ''
                          },
                          {
                              margin: [0,10,0,0],
                              style: 'tandaTangan',
                              table: {
                                  widths: [200],
                                  body: [
                                      [{text: ['Ditetapkan di ', {text:'Bekasi', bold:true}], alignment : 'left'}],
                                      [{text: ['pada tanggal ', {text:'26 Februari 2018', bold:true}], alignment : 'left'}],
                                      [{margin: [0,5,0,0], text:'', alignment : 'left'}],
                                      [{text: 'KEPALA DINAS\nKOMUNIKASI INFORMATIKA PERSANDIAN DAN STATISTIK\nSelaku\nPenguna Anggaran,', alignment : 'left', bold: true}],
                                      [{text: ' ',margin: [0,20]}],
                                      [{text: 'Drs. H. ROHIM SUTISNA, M.Pd', alignment : 'left', bold:true}],
                                      [{text: 'Pembina Tk.I', alignment : 'left', bold:true}],
                                      [{text: 'NIP. 19620727 198403 1 009', alignment : 'left'}]
                                  ]
                              },
                              layout: 'noBorders'
                          }
                      ]
                  },

                  {
                      margin: [0,0,0,10],
                      pageBreak: 'before',
                      pageOrientation: 'landscape',
                      columns: [
                          {
                              width: '50%',
                              text: ''
                          },
                          {
                              style: 'font10',
                              table: {
                                  widths: [80, 5, '*'],
                                  body: [
                                      [
                                          {text: 'Lampiran'}, {text: ':'}, {text: 'Surat Keputusan Kepala Dinas\nKomunikasi Informatika Persandian dan Statistik Kabupaten Bekasi\nSelaku Pengguna Anggaran'}
                                      ],
                                      [
                                          {text: 'Nomor'}, {text: ':'}, {text: '800/546-Kep/Diskominfo.1/2018'}
                                      ],
                                      [
                                          {text: 'Tanggal'}, {text: ':'}, {text: '26 Februari 2018'}
                                      ]
                                  ]
                              }, layout: 'noBorders'
                          }
                      ]
                  },

                  {
                      margin: [0,0,0,10],
                      text: 'MENUNJUKAN DAN MENGANGKAT PEJABAT PENATAUSAHAAN KEUANGAN, PEJABAT PEMBUAT KOMITMEN DAN PEJABAT PELAKSANA TEKNIS KEGIATAN DI LINGKUNGAN DINAS KOMUNIKASI INFORMASI PERSANDIAN DAN STATISTIK KABUPATEN BEKASI\nTAHUN ANGGARAN 2018', alignment: 'center', fontSize: 10, bold:true
                  },

                  {
                      style: 'font10',
                      table: {
                          widths: ['auto', 'auto', 'auto', 'auto', 'auto', 250, 100],
                          body: [
                              [
                                  {text: 'NO', alignment : 'center'},
                                  {text: 'URUTAN', alignment : 'center'},
                                  {text: 'PEJABAT PENATA USAHAAN KEUANGAN', alignment : 'center'},
                                  {text: 'PEJABAT PEMBUAT KOMITMEN', alignment : 'center'},
                                  {text: 'PEJABAT PELAKSANA TEKNIS KEGIATAN', alignment : 'center'},
                                  {text: 'NAMA KEGIATAN', alignment : 'center'},
                                  {text: 'KET', alignment : 'center'}
                              ],
                              [
                                  {text: '1', rowSpan: 1},
                                  {text: 'Nama\nJabatan\nNIP', rowSpan: 1},
                                  {
                                      rowSpan: 1,
                                      stack: [
                                          {text:'' + data.gelarDepan + data.nama + data.gelarBelakang + '\n', bold:true},
                                          {text:'' + data.jabatan + '\n'},
                                          {text:'NIP. '+ data.nip +'\n'}
                                      ]
                                  },
                                  {
                                      rowSpan: data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList.length,
                                      stack: [
                                          {text:'' + data.pejabatBarjasPPKList[0].gelarDepan + ' ' + data.pejabatBarjasPPKList[0].nama + data.pejabatBarjasPPKList[0].gelarBelakang + '\n', bold:true},
                                          {text: '' + data.pejabatBarjasPPKList[0].jabatan + '\n'},
                                          {text: 'NIP. ' + data.pejabatBarjasPPKList[0].nip + '\n'}
                                      ]
                                  },
                                  {
                                      stack: [
                                          {text: '' + data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList[0].gelarDepan + ' ' + data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList[0].nama + data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList[0].gelarBelakang + '\n', bold:true},
                                          {text: '' + data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList[0].jabatan + '\n'},
                                          {text:'NIP. ' + data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList[0].nip + '\n'}
                                      ]
                                  },
                                  {
                                      stack: [
                                          {
                                              ol: [
                                              ]
                                          }
                                      ]
                                  },
                                  {text: ''}
                              ]
                          ]
                      }
                  },

                  {
                      columns: [
                          {
                              width: '60%',
                              text: ''
                          },
                          {
                              margin: [0,10,0,0],
                              style: 'font10',
                              table: {
                                  widths: [200],
                                  body: [
                                      [{text: 'KEPALA DINAS\nKOMUNIKASI INFORMATIKA PERSANDIAN DAN STATISTIK\nSelaku\nPenguna Anggaran,', alignment : 'left', bold: true}],
                                      [{text: ' ',margin: [0,20]}],
                                      [{text: 'Drs. H. ROHIM SUTISNA, M.Pd', alignment : 'left', bold:true}],
                                      [{text: 'Pembina Tk.I', alignment : 'left', bold:true}],
                                      [{text: 'NIP. 19620727 198403 1 009', alignment : 'left'}]
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
                      alignment : 'center',
                      color: '#000',
                      fontSize: 12
                  },
                  tandaTangan: {
                      color: '#000',
                      fontSize: 12,
                      alignment:'right'
                  },
                  font10: {
                      fontSize: 10
                  }
                },

                images:{
                    logo: logo_bekasi
                }
            }

            var number = 1;
            var rowKeuangan = 1;
            for(var i = 0; i < data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList[0].kegiatanWrapperList.length;i++){
                docDefinition.content[12].table.body[1][5].stack[0].ol.push(data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList[0].kegiatanWrapperList[i].ketKegiatan);
                number += 1;
            }

            for(var i = 1; i < data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList.length;i++){
                rowKeuangan += 1;
                var row = [
                                  {text: ''},
                                  {text: ''},
                                  {text: ''},
                                  {text: ''},
                                  {
                                      stack: [
                                          {text:'' + data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList[i].gelarDepan + ' ' + data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList[i].nama + data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList[i].gelarBelakang + '\n', bold:true},
                                          {text:'' + data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList[i].jabatan + '\n'},
                                          {text:'NIP. ' + data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList[i].nip + '\n'}
                                      ]
                                  },
                                  {
                                      stack: [
                                          {
                                              start: number,
                                              ol: [
                                              ]
                                          }
                                      ]
                                  },
                                  {text: ''}
                              ];
                for(var j = 0; j < data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList[i].kegiatanWrapperList.length;j++){
                    row[5].stack[0].ol.push(data.pejabatBarjasPPKList[0].pejabatBarjasPPTKList[i].kegiatanWrapperList[j].ketKegiatan);
                    number += 1;
                }
                docDefinition.content[12].table.body.push(row);
            }

            for(var k = 1; k < data.pejabatBarjasPPKList.length;k++){
                rowKeuangan += 1;
                var ppk = [
                                  {text: ''},
                                  {text: ''},
                                  {text: ''},
                                  {
                                      rowSpan: data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList.length,
                                      stack: [
                                          {text:'' + data.pejabatBarjasPPKList[k].gelarDepan + ' ' + data.pejabatBarjasPPKList[k].nama + data.pejabatBarjasPPKList[k].gelarBelakang + '\n', bold:true},
                                          {text:'' + data.pejabatBarjasPPKList[k].jabatan + '\n'},
                                          {text:'NIP. ' + data.pejabatBarjasPPKList[k].nip + '\n'}
                                      ]
                                  },
                                  {
                                      stack: [
                                          {text:'' + data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList[0].gelarDepan + ' ' + data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList[0].nama + data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList[0].gelarBelakang + '\n', bold:true},
                                          {text:'' + data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList[0].jabatan + '\n'},
                                          {text:'NIP. ' + data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList[0].nip + '\n'}
                                      ]
                                  },
                                  {
                                      stack: [
                                          {
                                              start: number,
                                              ol: [
                                              ]
                                          }
                                      ]
                                  },
                                  {text: ''}
                              ]
                for(var l = 0; l < data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList[0].kegiatanWrapperList.length;l++){
                    ppk[5].stack[0].ol.push(data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList[0].kegiatanWrapperList[l].ketKegiatan);
                    number += 1;
                }
                docDefinition.content[12].table.body.push(ppk);
                for(var i = 1; i < data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList.length;i++){
                    rowKeuangan += 1;
                    var row = [
                                      {text: ''},
                                      {text: ''},
                                      {text: ''},
                                      {text: ''},
                                      {
                                          stack: [
                                              {text:'' + data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList[i].gelarDepan + ' ' + data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList[i].nama + data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList[i].gelarBelakang + '\n', bold:true},
                                              {text:'' + data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList[i].jabatan + '\n'},
                                              {text:'NIP. ' + data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList[i].nip + '\n'}
                                          ]
                                      },
                                      {
                                          stack: [
                                              {
                                                  start: number,
                                                  ol: [
                                                  ]
                                              }
                                          ]
                                      },
                                      {text: ''}
                                  ];
                    for(var j = 0; j < data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList[i].kegiatanWrapperList.length;j++){
                        row[5].stack[0].ol.push(data.pejabatBarjasPPKList[k].pejabatBarjasPPTKList[i].kegiatanWrapperList[j].ketKegiatan);
                        number += 1;
                    }
                    docDefinition.content[12].table.body.push(row);
                }
            }
            docDefinition.content[12].table.body[1][0].rowSpan = rowKeuangan;
            docDefinition.content[12].table.body[1][1].rowSpan = docDefinition.content[12].table.body[1][0].rowSpan;
            docDefinition.content[12].table.body[1][2].rowSpan = docDefinition.content[12].table.body[1][0].rowSpan;
            console.log(docDefinition);
            
            return docDefinition;
        }

        return service;
    }
})();