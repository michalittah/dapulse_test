angular.module('messageService', [])

// super simple service
// each function returns a promise object
    .factory('Messages', ['$http', function ($http) {
        return {
            get: function (id) {
                if (id) {
                    return $http.get('/api/lastMessages/' + id);
                } else {
                    return $http.get('/api/allMessages');
                }
            },
            create: function (messageData) {
                return $http.post('/api/messages', messageData);
            },
            delete: function (id) {
                return $http.delete('/api/messages/' + id);
            }
        }
    }]);