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
        controllerAs: 'suratKeputusan'
      })
        .state('pengumuman', {
        url: '/pengumuman',
        templateUrl: 'app/template/pengumuman/pengumuman.html',
        controller: 'PengumumanController',
        controllerAs: 'pengumuman'
      });

    // $urlRouterProvider.otherwise('/');
  }


})();
