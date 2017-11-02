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
      });

    // $urlRouterProvider.otherwise('/');
  }


})();
