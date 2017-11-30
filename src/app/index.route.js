(function() {
  'use strict';

  angular
    .module('eKinerja')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/login/loginEKInerja.html',
        controller: 'LoginEKinerjaController',
        controllerAs: 'login',
        resolve:{
          check: function(EkinerjaService){
              // console.log($state.current.name);
              // EkinerjaService.checkCredential();
          }
        }
      })
      .state('welcomeEkinerja', {
        url: '/welcome',
        templateUrl: 'app/welcome/welcome.html',
        controller: 'welcomeController',
        controllerAs: 'welcomeekinerja'
      })
      .state('master-urtug', {
        url: '/master/urtug',
        templateUrl: 'app/formMaster/urtug/masterUrtug.html',
        controller: 'MasterUrtugController',
        controllerAs: 'urtug',
        resolve:{
          check: function(EkinerjaService){
              console.log('kjs');
              EkinerjaService.checkCredential();
          }
        }
      })
      .state('urtug-jabatan', {
        url: '/urtug/jabatan',
        templateUrl: 'app/uraianJabatan/pengumpulanDataBebanKerja.html',
        controller: 'PengumpulanDataBebanKerjaController',
        controllerAs: 'urtug_jabatan'
      })
      .state('aktivitas', {
        url: '/aktivitas',
        templateUrl: 'app/aktivitasPegawai/aktivitasPegawai.html',
        controller: 'AktivitasPegawaiController',
        controllerAs: 'aktivitas'
      })
      .state('hakakses', {
        url: '/hak-akses',
        templateUrl: 'app/hakAkses/hakAkses.html',
        controller: 'HakAksesController',
        controllerAs: 'akses'
      })
      .state('kontrak', {
        url: '/kontrak-pegawai',
        templateUrl: 'app/kontrakPegawai/kontrakPegawai.html',
        controller: 'KontrakPegawaiController',
        controllerAs: 'kontrak'
      })
      .state('sk', {
        url: '/skkpd/:kdUrtug/:kdJenis/:kdJabatan/:tahun',
        templateUrl: 'app/pengadaanBarangJasa/pengadaanBarangJasa.html',
        controller: 'PengadaanBarangJasaController',
        controllerAs: 'sk'
      })
      .state('approval', {
        url: '/approval',
        templateUrl: 'app/ajuanKontrak/ajuanKontrak.html',
        controller: 'AjuanKontrakController',
        controllerAs: 'ajuankontrak'
      })
      .state('kontrakdpa', {
        url: '/kontrakdpa',
        templateUrl: 'app/kontrakUrtugDpa/kontrakUrtugDpa.html',
        controller: 'KontrakUrtugDpaController',
        controllerAs: 'kontrakdpa'
      })
      .state('notadinas', {
        url: '/nota-dinas',
        templateUrl: 'app/template/notaDinas/notaDinas.html',
        controller: 'NotaDinasController',
        controllerAs: 'notadinas'
      })
      .state('suratperintahpejabat', {
        url: '/surat-perintah-pejabat',
        templateUrl: 'app/template/suratPerintah/suratPerintah.html',
        controller: 'SuratPerintahController',
        controllerAs: 'suratperintah'
      })
      .state('suratperintahnonpejabat', {
        url: '/surat-perintah-nonpejabat',
        templateUrl: 'app/template/suratPerintah/suratPerintah.html',
        controller: 'SuratPerintahController',
        controllerAs: 'suratperintah'
      })
      .state('instruksipejabat', {
        url: '/surat-instruksi-pejabat',
        templateUrl: 'app/template/suratInstruksi/pejabat/instruksiPejabat.html',
        controller: 'InstruksiPejabatController',
        controllerAs: 'instruksipejabat'
      })
      .state('instruksinonpejabat', {
        url: '/surat-instruksi-nonpejabat',
        templateUrl: 'app/template/suratInstruksi/pejabat/instruksiPejabat.html',
        controller: 'InstruksiPejabatController',
        controllerAs: 'instruksipejabat'
      })
      .state('surattugas', {
        url: '/surat-tugas',
        templateUrl: 'app/template/suratTugas/suratTugas.html',
        controller: 'SuratTugasController',
        controllerAs: 'surattugas'
      })
      .state('suratdinaspejabat', {
        url: '/surat-dinas-pejabat',
        templateUrl: 'app/template/suratDinas/suratDinas.html',
        controller: 'SuratDinasController',
        controllerAs: 'suratdinas'
      })
      .state('suratdinasnonpejabat', {
        url: '/surat-dinas-nonpejabat',
        templateUrl: 'app/template/suratDinas/suratDinas.html',
        controller: 'SuratDinasController',
        controllerAs: 'suratdinas'
      })
      .state('suratkeputusan', {
        url: '/surat-keputusan',
        templateUrl: 'app/template/suratKeputusan/suratKeputusan.html',
        controller: 'SuratKeputusanController',
        controllerAs: 'suratkeputusan'
      })
      .state('naskahpedoman', {
        url: '/naskah-pedoman',
        templateUrl: 'app/template/pedoman/pedoman.html',
        controller: 'PedomanController',
        controllerAs: 'pedoman'
      })
      .state('pedomannonpejabat', {
        url: '/naskah-pedoman-nonpejabat',
        templateUrl: 'app/template/pedoman/pedoman.html',
        controller: 'PedomanController',
        controllerAs: 'pedoman'
      })
      .state('naskahpetunjuk', {
        url: '/naskah-petunjuk',
        templateUrl: 'app/template/petunjuk/petunjuk.html',
        controller: 'PetunjukController',
        controllerAs: 'petunjuk'
      })
      .state('petunjuknonpejabat', {
        url: '/naskah-petunjuk-nonpejabat',
        templateUrl: 'app/template/petunjuk/petunjuk.html',
        controller: 'PetunjukController',
        controllerAs: 'petunjuk'
      })
      .state('suratedaran', {
        url: '/surat-edaran',
        templateUrl: 'app/template/suratEdaran/suratEdaran.html',
        controller: 'SuratEdaranController',
        controllerAs: 'suratedaran'
      })
      .state('suratedarannonpejabat', {
        url: '/surat-edaran-nonpejabat',
        templateUrl: 'app/template/suratEdaran/suratEdaran.html',
        controller: 'SuratEdaranController',
        controllerAs: 'suratedaran'
      })
      .state('suratpengantar', {
        url: '/surat-pengantar',
        templateUrl: 'app/template/suratPengantar/suratPengantar.html',
        controller: 'SuratPengantarController',
        controllerAs: 'suratpengantar'
      })
        .state('pengumuman', {
        url: '/pengumuman',
        templateUrl: 'app/template/pengumuman/pengumuman.html',
        controller: 'PengumumanController',
        controllerAs: 'pengumuman'
      })
        .state('laporan', {
            url: '/laporan',
            templateUrl: 'app/template/laporan/laporan.html',
            controller: 'LaporanController',
            controllerAs: 'laporan'
        })
        .state('suratkuasa', {
            url: '/surat-kuasa',
            templateUrl: 'app/template/suratKuasa/suratKuasa.html',
            controller: 'SuratKuasaController',
            controllerAs: 'suratkuasa'
        })
        .state('suratketerangan', {
            url: '/surat-keterangan',
            templateUrl: 'app/template/suratKeterangan/suratKeterangan.html',
            controller: 'SuratKeteranganController',
            controllerAs: 'suratketerangan'
        })
        .state('suratundanganpejabat', {
            url: '/surat-undangan-pejabat',
            templateUrl: 'app/template/suratUndangan/suratUndangan.html',
            controller: 'SuratUndanganController',
            controllerAs: 'suratundangan'
        })
        .state('suratundangannonpejabat', {
            url: '/surat-undangan-nonpejabat',
            templateUrl: 'app/template/suratUndangan/suratUndangan.html',
            controller: 'SuratUndanganController',
            controllerAs: 'suratundangan'
        })
        .state('beritaacara', {
            url: '/berita-acara',
            templateUrl: 'app/template/beritaAcara/beritaAcara.html',
            controller: 'BeritaAcaraController',
            controllerAs: 'beritaacara'
        })
        .state('telaahanstaff', {
            url: '/telaahan-staff',
            templateUrl: 'app/template/telaahanStaff/telaahanStaff.html',
            controller: 'TelaahanStaffController',
            controllerAs: 'telaahanstaff'
        })
        .state('memorandumpejabat', {
            url: '/memorandum-pejabat',
            templateUrl: 'app/template/memorandum/memorandum.html',
            controller: 'MemorandumController',
            controllerAs: 'memorandum'
        })
        .state('memorandumnonpejabat', {
            url: '/memorandum-nonpejabat',
            templateUrl: 'app/template/memorandum/memorandum.html',
            controller: 'MemorandumController',
            controllerAs: 'memorandum'
        })
        .state('suratperjanjianantarinstansidalamnegeri', {
            url: '/surat-perjanjian-antar-instansi-dalam-negeri',
            templateUrl: 'app/template/suratPerjanjian/antarInstansiDalamNegeri/suratPerjanjianAntarInstansiDalamNegeri.html',
            controller: 'SuratPerjanjianAntarInstansiDalamNegeriController',
            controllerAs: 'suratperjanjianantarinstansidalamnegeri'
        })
        .state('suratperjanjiankerjasamapemerintahlingkupnasional', {
            url: '/surat-perjanjian-kerja-sama-pemerintah-lingkup-nasional',
            templateUrl: 'app/template/suratPerjanjian/pemerintahLingkupNasional/suratPerjanjianKerjaSamaPemerintahLingkupNasional.html',
            controller: 'SuratPerjanjianKerjaSamaPemerintahLingkupNasionalController',
            controllerAs: 'suratperjanjiankerjasamapemerintahlingkupnasional'
        })
        .state('penugasan', {
          url: '/penugasan',
          templateUrl: 'app/penugasan/penugasan.html',
          controller: 'PenugasanController',
          controllerAs: 'penugasan'
        });

    // $urlRouterProvider.otherwise('/');
  }


})();
