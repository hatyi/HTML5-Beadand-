(function() {

	var championship;
	var serverurl = "http://94.177.230.203:8080/sport/rest/";

	jQuery(document).ready(function($) {
		if(!window.location.search.includes("id"))
			RedirectToHomeScreen();

		$.ajax({
			url: serverurl + "championship/" + getChampionshipID(),
			type: 'GET',
			dataType: 'json'
		})
		.done(function(data) {
			CreateChampionship(data);
		})
		.fail(function() {
			alert("Nincs ilyen id-vel rendelkezo bajnoksag..");
			RedirectToHomeScreen();
		});
		
	});

	function RedirectToHomeScreen()
	{
		var urlarray = window.location.href.split("/");
		urlarray[urlarray.length-1] = "index.html";
		window.location.replace(urlarray.join("/"));
	}

	function GetHomeScreenURL()
	{
		var urlarray = window.location.href.split("/");
		urlarray[urlarray.length-1] = "index.html";
		return urlarray.join("/");
	}

	function getChampionshipID()
	{
		var a = window.location.search.split("?id=");
		return a[a.length-1];

	}

	function CreateChampionshipInfo()
	{
		var infostring = "<h1>" + championship.name + "</h1>";
			infostring+= "<h2>" + championship.description + "</h2>";
			if(championship.startDate !== "" && championship.startDate !== null && championship.endDate !== "" && championship.endDate !== null)
				infostring += "<h3>" + championship.startDate + "-tól " + championship.endDate + "-ig tartott.</h3>";
			else
				infostring += "<h3>Ez az esemény nem tartott semeddig</h3>"; 
			infostring += "<a href=" + GetHomeScreenURL() + "><p>Vissza a kezdőoldalra</p></a>";
			infostring += "<hr>";
		$("#championship-info").html(infostring);
	}

	function CreateSportEvents()
	{
		var container = $("#championship-details");
		var htmlstring = "";
		/*
			sporteseményenként felsorolom a sportesemény típusát, specializációját és rounds conditions users
		*/

		for (var i = 0; i < championship.events.length; i++) {
			var actualrounds = championship.events[i].rounds;
			htmlstring += "<div class=\"sportevent\">";
			htmlstring += "<p class=\"sportevent-infotext\">Sport: " + championship.events[i].sport.name + "</p>";
			htmlstring += "<p class=\"sportevent-infotext\">Specialization: " + (championship.events[i].specialization != null ? championship.events[i].specialization.name : "" ) + "</p>";
			htmlstring += "<table data-toggle=\"table\" class=\"sportevent-table\" data-id=\""+ championship.events[i].id + "\">";
			htmlstring += "<thead>";
			htmlstring += "<tr>";
			htmlstring += "<th> Rounds </th>";
			htmlstring += "<th> Conditions </th>";
			htmlstring += "<th> Users </th>";
			htmlstring += "</tr>";
			htmlstring += "</thead>";

			for (var j = 0; j < actualrounds.length; j++) {
				console.log("i: "+ i + " j: " + j);
				htmlstring += "<tbody>";
				htmlstring += "<tr>";
				htmlstring += "<td>" + actualrounds[j].name + "</td>";
				htmlstring += "<td>" + actualrounds[j].description + "</td>"; 
				htmlstring += "</tr>";
				htmlstring += "</tbody>";
				
			}
			
		htmlstring += "</table>";
		htmlstring += "</div>";
		}
		if(championship.events.length == 0)
			htmlstring = "<p style=\"text-align:center\">Úgy tűnik nem voltak sportesemények</p>";
		container.html(htmlstring);
		container.css('border', '1px ridge #e2e3e3');
		$(".sportevent-table").bootstrapTable();

	}

	function CreateChampionship(json)
	{
		championship = new Championship(json);
		championship.addSeason();
		championship.addSeria();
		championship.addEvents();
		console.log(championship);
		CreateChampionshipInfo();
		CreateSportEvents();
	}

	function Season(data){
		this.name = data.name;
		this.id = data.id;
	}

	function Seria(data){
		this.name = data.name;
		this.id = data.id;
	}

	function Championship(data)
	{
		var _data = data;

		this.id = data.id;
		this.name = data.name;
		this.description = data.description;
		this.season;
		this.seria;
		this.events = [];
		this.condition = data.condition;
		this.startDate = data.startDate;
		this.endDate = data.endDate;

		this.addSeria = function(){
			if(_data.seria !== null)
				this.seria = new Seria(_data.seria);
			else
				this.seria = null;
		};

		this.addSeason = function(){
			if(_data.season !== null)
				this.season = new Season(_data.season);
			else
				this.season = null;
		};

		this.addEvents = function(){
			if(typeof(_data.event) === "object")
				for (var i = 0; i < _data.event.length; i++) {
					this.events.push(new Sportevent(_data.event[i]));
				}
			else
				this.events = null;
		};
	}

	function Sportevent(data)
	{
		var _data = data;
		this.id = data.id;
		this.condition = data.condition;
		this.rounds = data.round;
		this.specialization = data.specialization;
		this.sport = data.sport;
		this.user = data.user;

		this.add
	}

	function Sport(data)
	{
		this.id = data.id;
		this.name = data.name;
		this.description = data.description;
	}

	function Sportspecialization(data)
	{
		this.id = data.id;
		this.name = data.name;
		this.description = data.description;
	}

	function Race(data)
	{
		this.id = data.id;
		this.name = data.name;
		this.description = data.description;	
	}

	function User(data)
	{
		this.username = data.username;
		this.password = data.password;
	}

	function Condition(data)
	{
		this.id = data.id;
		this.name = data.name;
		this.description = data.description;
		this.minimum = data.minimum;
		this.maximum = data.maximum;
		this.equal = data.equal;
	}

	function Type(data)
	{
		this.id = data.id;
		this.name = data.name;
		this.description = data.description;	
	}

	function Race(data)
	{
		this.id = data.id;
		this.name = data.name;
		this.description = data.description;	
	}

	function Round(data)
	{
		this.id = data.id;
		this.name = data.name;
		this.description = data.description;
		this.race = [];

		this.addRaces = function(){

		}
	}

})();