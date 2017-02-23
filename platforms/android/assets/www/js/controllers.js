angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('sourceCntrl', function($scope,$http,$window,$stateParams) {
 $scope.sourceList = function(){
    $http.get("https://newsapi.org/v1/sources?language=en").success(function(list){
   $scope.newsSources = list.sources;
  })
 }
 $scope.checkItems = function(){
   
    $scope.CID = [];
    $scope.name = [];
    angular.forEach($scope.newsSources,function(src){
        if(src.checked){
          $scope.CID.push(src.id);
          $scope.name.push(src.name);
        }
    });
    //send CID to server
 };
$scope.display=function(){
   $window.localStorage.clear();
var localarray=[];
var localarrayname=[];
  for(var i=0;i<$scope.CID.length;i++ ){
   // alert($scope.CID[i])
  //$window.localStorage[i] = $scope.CID[i];
  localarray[i]=$scope.CID[i];
  localarrayname[i]=$scope.name[i];
  }
  localStorage.setItem('data',JSON.stringify(localarray));
  $scope.output=JSON.parse(localStorage.getItem('data'));
  localStorage.setItem('dataName',JSON.stringify(localarrayname));
  $scope.outputname=JSON.parse(localStorage.getItem('dataName'));
  console.log($scope.outputname);
  //var op=JSON.parse(localStorage
  //$scope.j=JSON.stringify($scope.CID);
//  alert(JSON.stringify($scope.j))
//alert($scope.output)
}
})
.controller('newsCntrl',function($scope,$window,$http){
  $scope.displaynews=function(){
  $scope.outputname=JSON.parse(localStorage.getItem('dataName'));
  $scope.output=JSON.parse(localStorage.getItem('data'));
  }
  $scope.content=function(desc){
   $scope.api=desc;
    $http.get("https://newsapi.org/v1/articles?source="+$scope.api+"&apiKey=850de99fe1d34a3ea6b92fb4e85c540b").then(function(latestNews){
    $scope.latestNewslist = latestNews.data.articles;  
    //alert(JSON.stringify($scope.latestNewslist))
})
  }
})
.controller('descCntrl',function($scope,$window,$stateParams,$http){
  $scope.a=function(options)
  {
     $http.get("https://newsapi.org/v1/articles?source="+$scope.api+"&sortBy="+options+"&apiKey=850de99fe1d34a3ea6b92fb4e85c540b").then(function(latestNews){
    $scope.latestNewslist = latestNews.data.articles;  
  })
  }
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
