myApp.factory('DataFactory', ['$http', function($http) {
    // PRIVATE

    var currentID = '';

    var allBlogPosts = undefined;

    var getData = function() {
        console.log('getting data from server');
        var promise = $http.get('/addBlogPost').then(function(response) {
            allBlogPosts = response.data;
            console.log('Async data response:', allBlogPosts);
        });

        return promise;
    };

    //PUBLIC
    var publicApi = {
        factoryBlogPosts: function() {
            return allBlogPosts;
        },
        factoryRetrieveData: function() {
            return getData();
        },
        factoryStoreID: function(id) {
            currentID = id;
        },
        factoryReturnStoredID: function() {
            return currentID;
        }

    };

    return publicApi;

}]);