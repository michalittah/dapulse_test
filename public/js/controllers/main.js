angular.module('mainController', [])

// inject the Message service factory into our controller
    .controller('mainController', ['$scope', '$http', '$localStorage', '$interval', 'Messages', function ($scope, $http, $localStorage, $interval, Messages) {
        $scope.formData = {user_id: Math.floor((Math.random() * 10000000000) + 1)};
        $scope.$storage = $localStorage;
        $scope.$storage.user_id = $scope.formData.user_id;


        // GET =====================================================================
        // when landing on the page, get all messages and show them
        // use the service to get all the messages
        $scope.getMessages = function () {
            Messages.get($scope.$storage.last_message_id)
                .success(function (data) {
                    if (!$scope.messages) {
                        $scope.messages = data;
                    }
                    if ($scope.messages && $scope.messages[$scope.messages.length - 1]) {
                        $scope.$storage.last_message_id = $scope.messages[$scope.messages.length - 1]._id;
                    }

                });
        };

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createMessage = function () {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.text) {

                // call the create function from our service (returns a promise object)
                $scope.formData.last_message_id = $scope.$storage.last_message_id;
                Messages.create($scope.formData)

                // if successful creation, call our get function to get all the new messages
                    .success(function (data) {
                        $scope.formData.text = null; // clear the form so our user is ready to enter another message
                        $scope.messages.push(data[0]); // assign our new list of messages
                        if ($scope.messages && $scope.messages[$scope.messages.length - 1]) {
                            $scope.$storage.last_message_id = $scope.messages[$scope.messages.length - 1]._id;
                        }
                    });
            }
        };


        //get all messages on first time
        $scope.getMessages();

        //update chat every 2 sec
        $interval(function () {
            Messages.get($scope.$storage.last_message_id)
                .success(function (data) {

                    if (data[0]) {
                        $scope.messages.push(data[0]); // assign our new list of messages
                        if ($scope.messages && $scope.messages[$scope.messages.length - 1]) {
                            $scope.$storage.last_message_id = $scope.messages[$scope.messages.length - 1]._id;
                        }
                    }
                });
        }, 2000);

    }]);