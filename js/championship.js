(function() {

	var serverurl = "http://94.177.230.203:8080/sport/rest/";
	var championships = [];

	jQuery(document).ready(function($) {

		$.ajax({
			url: serverurl + "championship/entity/all",
			type: 'GET',
			dataType: 'json'
		})
		.done(function(data) {
			CreateChampionships(data);
			CreateTable(championships);
		})
		.fail(function() {
			console.log("hiba az ajax hivassal");
		});
	});

	function getChampionshipURL(id)
	{
		var urlarray = window.location.href.split("/");
		urlarray[urlarray.length-1] = "championship.html?id="+ id;
		return urlarray.join("/");
	}


	function CreateTable(championships)
	{
		var container = $("#championships");
		var htmlstring = "<table data-toggle=\"table\" id=\"list-of-championships\">";
		htmlstring += "<thead>";
		htmlstring += "<tr>";
		htmlstring += "<th> Name of the championship </th>";
		htmlstring += "<th> Description </th>";
		htmlstring += "<th> Start Date</th>";
		htmlstring += "<th> End Date </th>";
		htmlstring += "</tr>";
		htmlstring += "</thead>";
		htmlstring += "<tbody>";

		for (var i = 0; i < championships.length; i++) {

			htmlstring += "<tr>";
			htmlstring += "<td><a href=" + getChampionshipURL(championships[i].id) + ">" + championships[i].name + "</a></td>";
			htmlstring += "<td>" + championships[i].description + "</td>";
			htmlstring += "<td>" + championships[i].startDate + "</td>";
			htmlstring += "<td>" + championships[i].endDate + "</td>";
			htmlstring += "</tr>";
		}

		htmlstring += "</tbody>";
		htmlstring += "</table>";
		console.log(htmlstring);
		container.html(htmlstring);
		container.css('border', '1px ridge #e2e3e3');
		$("#list-of-championships").bootstrapTable();

	}

	function CreateChampionships(json)
	{
		for (var i = 0; i < json.length; i++) {
			var ch = new Championship(json[i]);
			ch.addSeason();
			ch.addSeria();
			ch.addEvents();
			championships.push(ch);
		}
		console.log(championships);
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