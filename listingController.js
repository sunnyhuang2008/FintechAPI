angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
    
    function ($scope, Listings) {
        $scope.listings = Listings;

        $scope.addListing = function (name, code, long, lat, address) {
            if (name != null && code != null) {
                var place = {
                    "name": name,
                    "code": code,
                    "coordinates": {
                        "longitude": long,
                        "latitude": lat
                    },
                    "address": address
                };

                Listings.push(place);
            }
        };
        $scope.deleteListing = function (listing) {
            $scope.listings.splice($scope.listings.indexOf(listing), 1); 
        };

        $scope.showDetails = function (listing) {
            $scope.detailedInfo = $scope.listings[$scope.listings.indexOf(listing)];
        };

        $scope.clearText = function () {
            for (var i = 0; i < 5; i++) {
                document.getElementById("addP"+i).value = "";
            } 
        }

        

    }

]);