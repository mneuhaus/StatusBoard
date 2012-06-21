StatusBoard.Repository = Em.Object.extend({
	open_issues: 0,
	closed_issues: 0,
	collaborators: [],
	issues: [],
	load_collaborators: function(){
		var repository = this;
		var options = {
			url: 'https://api.github.com/repos/' + jQuery.Storage.get("username") + '/' + repository.name + '/collaborators',
			dataType: 'jsonp',
			data: [],
			success: function(data){
				repository.set("collaborators", data.data);
			}
		};
		if(jQuery.Storage.get("token").length > 0){
			options["url"] = options["url"] + '?access_token=' + jQuery.Storage.get("token");
		}
		jQuery.ajax(options);
	},
	
	load_issues: function(){
		var repository = this;
		var options = {
			url: 'https://api.github.com/repos/' + jQuery.Storage.get("username") + '/' + repository.name + '/issues?state=closed',
			dataType: 'jsonp',
			data: [],
			success: function(data){
				repository.set("issues", data.data);
				repository.set("closed_issues", data.data.length);
			}
		};
		if(jQuery.Storage.get("token").length > 0){
			options["url"] = options["url"] + '&access_token=' + jQuery.Storage.get("token");
		}
		jQuery.ajax(options);
	},
	
	height: function(){
		return 100 * ( this.open_issues / StatusBoard.Repositories.max_issues );
	}.property(),

	margin: function(){
		return 105 - ( 100 * ( this.open_issues / StatusBoard.Repositories.max_issues ) );
	}.property(),

	color: function(){
		if(!jQuery.Storage.has("Color:" + this.name)){
			var numOfSteps = 30;
			var step = parseInt(Math.random() * numOfSteps);
		    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distiguishable vibrant markers in Google Maps and other apps.
		    // Adam Cole, 2011-Sept-14
		    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
		    var r, g, b;
		    var h = step / numOfSteps;
		    var i = ~~(h * 6);
		    var f = h * 6 - i;
		    var q = 1 - f;
		    switch(i % 6){
		        case 0: r = 1, g = f, b = 0; break;
		        case 1: r = q, g = 1, b = 0; break;
		        case 2: r = 0, g = 1, b = f; break;
		        case 3: r = 0, g = q, b = 1; break;
		        case 4: r = f, g = 0, b = 1; break;
		        case 5: r = 1, g = 0, b = q; break;
		    }
		    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
		    jQuery.Storage.set("Color:" + this.name, c);
		}
		return jQuery.Storage.get("Color:" + this.name);
	}.property()
});