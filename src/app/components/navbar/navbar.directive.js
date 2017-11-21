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
    function NavbarController(EkinerjaService, $state) {
      var vm = this;

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.pegawai = $.parseJSON(sessionStorage.getItem('credential'));
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
    }
  }

})();
