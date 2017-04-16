<!DOCTYPE html>
<html ng-app="myApp"> 
<head>
	<title>Gallery App</title>
	<link rel="stylesheet" type="text/css" href="{{asset('bower_components/bootstrap/dist/css/bootstrap.min.css')}}">
    <script>var baseUrl = "{{url('/')}}/";</script>
</head>
<body>
	<div class="container">
		<div ng-view></div>

	</div>
	<script type="text/javascript" src="{{asset('bower_components/angular/angular.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('bower_components/angular-route/angular-route.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('bower_components/angular-cookies/angular-cookies.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/app.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/controller.js')}}"></script>

</body>
</html>