myApp.controller('EditPostController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    var data ='';

    $scope.blogPostToEdit = '';
    $scope.added = false;
    $scope.dataFactory = DataFactory;
    $scope.currentID = $scope.dataFactory.factoryReturnStoredID();
    $scope.deleted = false;
    $scope.updated = false;
    $scope.review = '';

    getData($scope.currentID);

    function getData(id) {

        $http.get('/addBlogPost/' + id).then(function(response) {
            $scope.blogPostToEdit = response.data[0];
            console.log("inside editPost Get singular Blog", $scope.blogPostToEdit);

        });
    }


    $scope.update = function(id) {

        data = {review: $scope.review};

        console.log('id from scope.update function: ', id);
        $http.put('/blogPost/' + id, data).then(function(response) {
            console.log('response sent', response.data);
            $scope.updated = true;
        });
    };


    $scope.deletePost = function(id) {

        var promise = $http.delete('/blogPost/' + id).then(function(response) {
        $scope.dataFactory.factoryRetrieveData().then(function() {
            $scope.deleted = true;
        });
    });

    return promise;
};



}]);