(function () {
    'use strict';
 
    angular
        .module('eKinerja')
        .factory('UserService', UserService);
 
    UserService.$inject = ['$http', 'API'];
    function UserService($http, API) {
        var service = {};
        // var API = 'http://192.168.1.184:8080';
 
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetAuth = GetAuth;

 
        return service;

        function GetAuth(user){
        	debugger;
        	return $http.post(API + 'authentication/', user).then(handleSuccess, function(errResponse){
        		// console.log(JSON.stringify(errResponse.data.message));
        		return handleError(errResponse.data.message);
        	});
        }
 
        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }
 
        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }
 
        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }
 
        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }
 
        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }
 
        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }
 
        // private functions
 
        function handleSuccess(res) {
            return res.data;
        }
 
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
 
})();