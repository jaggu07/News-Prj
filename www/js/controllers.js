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
          $scope.color='red';
        }
    });
 };
$scope.display=function(){
   $window.localStorage.clear();
var localarray=[];
var localarrayname=[];
  for(var i=0;i<$scope.CID.length;i++ ){
  localarray[i]=$scope.CID[i];
  localarrayname[i]=$scope.name[i];
  }
  localStorage.setItem('data',JSON.stringify(localarray));
  $scope.output=JSON.parse(localStorage.getItem('data'));
  localStorage.setItem('dataName',JSON.stringify(localarrayname));
  $scope.outputname=JSON.parse(localStorage.getItem('dataName'));
  console.log($scope.outputname);
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
})
  }
})
.controller('descCntrl',function($scope,$window,$stateParams,$ionicModal,$http,$cordovaInAppBrowser,$cordovaSocialSharing){
  
  //description view
    $ionicModal.fromTemplateUrl('templates/desc.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.openModal = function(arg) {
    $scope.src=arg;
    $scope.modal.show();
  };
   //Content sharing
  $scope.shareContent=function(newsImage, description){
  $cordovaSocialSharing.share('NEWS:', 'subject',newsImage,description) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    });
  }

  //In App Browser Opening
     var options = {
    location: 'yes',
    clearcache: 'no',
    toolbar: 'no'
  };
   $scope.openBrowser=function(url){
      $cordovaInAppBrowser.open(url, '_blank', options)
      .then(function(event) {
         success
      })
      .catch(function(event) {
         error
      });
    }


  var rows = document.getElementsByTagName('a');
  function rowHighlight() {
    var selectedRows = document.getElementsByClassName('selected');
      for (var n = 0; n < selectedRows.length; n++) {
      selectedRows[n].className = '';
    }
    this.className = 'selected'
}
for (var i = 0; i < rows.length; i++) {
    rows[i].addEventListener('click', rowHighlight);
}
  $scope.a=function(options)
  {
     $http.get("https://newsapi.org/v1/articles?source="+$scope.api+"&sortBy="+options+"&apiKey=850de99fe1d34a3ea6b92fb4e85c540b").then(function(latestNews){
    $scope.latestNewslist = latestNews.data.articles; 
  })
  
}
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
