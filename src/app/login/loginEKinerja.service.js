(function() {
'use strict';
 
angular
    .module('eKinerja')

 
.factory('LoginEKinerjaService',
    ['Base64', '$http',  '$rootScope', '$timeout', 'UserService', '$q', 'API',
    function (Base64, $http,  $rootScope, $timeout, UserService, $q, API) {
        var service = {};

        service.Login = function (nip, password, callback) {
// debugger
            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            // $timeout(function(){
            //     var response = { success: nip === 'test' && password === 'test' };
            //     if(!response.success) {
            //         response.message = 'NIP atau password anda salah';
            //     }
            //     callback(response);
            // }, 1000);
            var users = {
                "nipPegawai": nip,
                "password": password
            }
            var deferred = $q.defer();
            $http.post(API + 'authentication/', users).then(
                function (response){
                    deferred.resolve(response);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;

            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

        };
 
        service.SetCredentials = function (nip, password) {
            var logindata = Base64.encode(nip + ':' + password);
 
            var credential = {
                currentUser: {
                    nip: nip,
                    logindata: logindata
                }
            };
            
            $http.defaults.headers.common['Login'] = 'Basic ' + logindata; // jshint ignore:line

            // var cookieExp = new Date();
            // cookieExp.setDate(cookieExp.getDate() + 7);
            sessionStorage.setItem('credential', credential);
        };

        service.ClearCredentials = function () {
            // $rootScope.globals = {};
            // $cookieStore.remove('globals');
            // $http.defaults.headers.common.Login = 'Basic ';
        };
 
        return service;
    }])

.factory('Base64', [ function () {
    /* jshint ignore:start */
 
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
 
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                debugger
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
 }])
//     /* jshint ignore:end */
})();



// (function() {
// 'use strict';
 
// angular
//     .module('eKinerja')
//     .factory('LoginEKinerjaController', LoginEKinerjaController);
 
//     LoginEKinerjaController.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService',
//     function LoginEKinerjaController($http, $cookies, $rootScope, $timeout, UserService) {
//         var service = {};
 
//         service.Login = Login;
//         service.SetCredentials = SetCredentials;
//         service.ClearCredentials = ClearCredentials;
 
//         return service;

//         function Login(nip, password, callback) {

//             /* Dummy authentication for testing, uses $timeout to simulate api call
//              ----------------------------------------------*/
//             // $timeout(function(){
//             //     var response = { success: nip === 'test' && password === 'test' };
//             //     if(!response.success) {
//             //         response.message = 'NIP atau password anda salah';
//             //     }
//             //     callback(response);
//             // }, 1000);
//             $timeout(function () {
//                 var response;
//                 UserService.GetByNip(nip)
//                     .then(function (user) {
//                         if (user !== null && user.password === password) {
//                             response = { success: true };
//                         } else {
//                             response = { success: false, message: 'nip atau password anda salah' };
//                         }
//                         callback(response);
//                     });
//             }, 1000);

//             /* Use this for real authentication
//              ----------------------------------------------*/
//             //$http.post('/api/authenticate', { username: username, password: password })
//             //    .success(function (response) {
//             //        callback(response);
//             //    });

//         };
 
//         function SetCredentials(username, password) {
//             var authdata = Base64.encode(nip + ':' + password);
 
//             $rootScope.globals = {
//                 currentUser: {
//                     nip: nip,
//                     authdata: authdata
//                 }
//             };
 
//             // set default auth header for http requests
//             $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
 
//             // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
//             var cookieExp = new Date();
//             cookieExp.setDate(cookieExp.getDate() + 7);
//             $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
//         }
 
//         function ClearCredentials() {
//             $rootScope.globals = {};
//             $cookies.remove('globals');
//             $http.defaults.headers.common.Authorization = 'Basic';
//         }

//         return service;
//     }]

// .factory('Base64', [ function () {
//     /* jshint ignore:start */
 
//     var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
 
//     return {
//         encode: function (input) {
//             var output = "";
//             var chr1, chr2, chr3 = "";
//             var enc1, enc2, enc3, enc4 = "";
//             var i = 0;
 
//             do {
//                 chr1 = input.charCodeAt(i++);
//                 chr2 = input.charCodeAt(i++);
//                 chr3 = input.charCodeAt(i++);
 
//                 enc1 = chr1 >> 2;
//                 enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
//                 enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
//                 enc4 = chr3 & 63;
 
//                 if (isNaN(chr2)) {
//                     enc3 = enc4 = 64;
//                 } else if (isNaN(chr3)) {
//                     enc4 = 64;
//                 }
 
//                 output = output +
//                     keyStr.charAt(enc1) +
//                     keyStr.charAt(enc2) +
//                     keyStr.charAt(enc3) +
//                     keyStr.charAt(enc4);
//                 chr1 = chr2 = chr3 = "";
//                 enc1 = enc2 = enc3 = enc4 = "";
//             } while (i < input.length);
 
//             return output;
//         },
 
//         decode: function (input) {
//             var output = "";
//             var chr1, chr2, chr3 = "";
//             var enc1, enc2, enc3, enc4 = "";
//             var i = 0;
 
//             // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
//             var base64test = /[^A-Za-z0-9\+\/\=]/g;
//             if (base64test.exec(input)) {
//                 window.alert("There were invalid base64 characters in the input text.\n" +
//                     "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
//                     "Expect errors in decoding.");
//             }
//             input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
//             do {
//                 enc1 = keyStr.indexOf(input.charAt(i++));
//                 enc2 = keyStr.indexOf(input.charAt(i++));
//                 enc3 = keyStr.indexOf(input.charAt(i++));
//                 enc4 = keyStr.indexOf(input.charAt(i++));
 
//                 chr1 = (enc1 << 2) | (enc2 >> 4);
//                 chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
//                 chr3 = ((enc3 & 3) << 6) | enc4;
 
//                 output = output + String.fromCharCode(chr1);
 
//                 if (enc3 != 64) {
//                     output = output + String.fromCharCode(chr2);
//                 }
//                 if (enc4 != 64) {
//                     output = output + String.fromCharCode(chr3);
//                 }
 
//                 chr1 = chr2 = chr3 = "";
//                 enc1 = enc2 = enc3 = enc4 = "";
 
//             } while (i < input.length);
 
//             return output;
//         }
//     };
//  }])
// //     /* jshint ignore:end */
// })();


// (function () {
//     'use strict';
 
//     angular.module('eKinerja');
    
//     .factory('LoginEKinerjaService',
//         ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
//     function ($http, $cookies, $rootScope, $timeout, UserService) {
//         var service = {};
 
//         service.Login = Login;
//         service.SetCredentials = SetCredentials;
//         service.ClearCredentials = ClearCredentials;
 
//         return service;
 
//         function Login(nip, password, callback) {
 
//             /* Dummy authentication for testing, uses $timeout to simulate api call
//              ----------------------------------------------*/
//             $timeout(function () {
//                 var response;
//                 UserService.GetByNip(nip)
//                     .then(function (user) {
//                         if (user !== null && user.password === password) {
//                             response = { success: true };
//                         } else {
//                             response = { success: false, message: 'nip atau password anda salah' };
//                         }
//                         callback(response);
//                     });
//             }, 1000);
 
//             /* Use this for real authentication
//              ----------------------------------------------*/
//             //$http.post('/api/authenticate', { username: username, password: password })
//             //    .success(function (response) {
//             //        callback(response);
//             //    });
//         }
 
//         function SetCredentials(nip, password) {
//             var logindata = Base64.encode(username + ':' + password);
 
//             $rootScope.globals = {
//                 currentUser: {
//                     username: username,
//                     logindata: logindata
//                 }
//             };
 
//             // set default auth header for http requests
//             $http.defaults.headers.common['Authorization'] = 'Basic ' + logindata;
 
//             // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
//             var cookieExp = new Date();
//             cookieExp.setDate(cookieExp.getDate() + 7);
//             $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
//         }
 
//         function ClearCredentials() {
//             $rootScope.globals = {};
//             $cookies.remove('globals');
//             $http.defaults.headers.common.Authorization = 'Basic';
//         }
//     }
 
//     // Base64 encoding service used by AuthenticationService
//     var Base64 = {
 
//         keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
 
//         encode: function (input) {
//             var output = "";
//             var chr1, chr2, chr3 = "";
//             var enc1, enc2, enc3, enc4 = "";
//             var i = 0;

//             do {
//                 chr1 = input.charCodeAt(i++);
//                 chr2 = input.charCodeAt(i++);
//                 chr3 = input.charCodeAt(i++);
 
//                 enc1 = chr1 >> 2;
//                 enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
//                 enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
//                 enc4 = chr3 & 63;
 
//                 if (isNaN(chr2)) {
//                     enc3 = enc4 = 64;
//                 } else if (isNaN(chr3)) {
//                     enc4 = 64;
//                 }
 
//                 output = output +
//                     this.keyStr.charAt(enc1) +
//                     this.keyStr.charAt(enc2) +
//                     this.keyStr.charAt(enc3) +
//                     this.keyStr.charAt(enc4);
//                 chr1 = chr2 = chr3 = "";
//                 enc1 = enc2 = enc3 = enc4 = "";
//             } while (i < input.length);
 
//             return output;
//         },
 
//         decode: function (input) {
//             var output = "";
//             var chr1, chr2, chr3 = "";
//             var enc1, enc2, enc3, enc4 = "";
//             var i = 0;

//             // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
//             var base64test = /[^A-Za-z0-9\+\/\=]/g;
//             if (base64test.exec(input)) {
//                 window.alert("There were invalid base64 characters in the input text.\n" +
//                     "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
//                     "Expect errors in decoding.");
//             }
//             input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
//             do {
//                 enc1 = this.keyStr.indexOf(input.charAt(i++));
//                 enc2 = this.keyStr.indexOf(input.charAt(i++));
//                 enc3 = this.keyStr.indexOf(input.charAt(i++));
//                 enc4 = this.keyStr.indexOf(input.charAt(i++));
 
//                 chr1 = (enc1 << 2) | (enc2 >> 4);
//                 chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
//                 chr3 = ((enc3 & 3) << 6) | enc4;
 
//                 output = output + String.fromCharCode(chr1);
 
//                 if (enc3 != 64) {
//                     output = output + String.fromCharCode(chr2);
//                 }
//                 if (enc4 != 64) {
//                     output = output + String.fromCharCode(chr3);
//                 }
 
//                 chr1 = chr2 = chr3 = "";
//                 enc1 = enc2 = enc3 = enc4 = "";
 
//             } while (i < input.length);
 
//             return output;
//         }
//     };
 
// })();