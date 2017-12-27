(function() {
  'use strict';

  angular
    .module('eKinerja')
    .directive('ekinerjaNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(EkinerjaService, $state, $interval) {
      var vm = this;

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.pegawai = $.parseJSON(sessionStorage.getItem('credential'));
      vm.pegawai.role.role = vm.pegawai.role.role.toUpperCase();
      // console.log(vm.pegawai);
      vm.logout = function(){
        EkinerjaService.logout();
      }

      vm.checkLocation = function(state){
        // console.log($state.current.name);
        if(state == $state.current.name)
          return true;
        else return false;
      }

      vm.checkRole = function(role){
        if(vm.pegawai.role.id == role)
          return true;
        else return false;
      }
      // console.log(vm.pegawai);
      function getNotif(){
        EkinerjaService.GetNotifLaporan(vm.pegawai.nipPegawai).then(
          function(response){
            vm.notif = response;
            if(response.length != 0)
              vm.jmlNotif = response.length;
            else vm.jmlNotif = undefined;
          },function(errResponse){

          })
      }

      vm.gantipwd = function(){
        if(vm.password == vm.retypePassword)
          EkinerjaService.GantiPassword({"nipPegawai": vm.pegawai.nipPegawai, "newPassword": vm.password}).then(
            function(response){
              EkinerjaService.showToastrSuccess("Password Telah Diubah");
              $state.reload();
            }, function(errResponse){

            })
        // debugger
        // $state.go('setting');
      }

      getNotif();

      $interval(function(){
      getNotif();
    }, 1000);
    }
  }

})();
