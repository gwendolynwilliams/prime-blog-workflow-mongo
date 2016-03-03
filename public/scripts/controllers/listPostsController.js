myApp.controller('ListPostsController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
console.log('listpostscontroller');
    $scope.blogPosts;

    $scope.dataFactory = DataFactory;


        $scope.dataFactory.factoryRetrieveData().then(function() {
            $scope.blogPosts = $scope.dataFactory.factoryBlogPosts();
        });

    $scope.storeID = function(id) {
        $scope.dataFactory.factoryStoreID(id);
    }




}]);
