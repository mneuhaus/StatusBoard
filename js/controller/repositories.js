StatusBoard.Repositories = Em.ArrayController.create({
	content: [],
	_idCache: {},
	max_issues: 0,

	addItem: function(item) {
		var name = item.name;

		if (typeof this._idCache[name] === "undefined") {
			this.pushObject(item);
			this._idCache[name] = item.name;
		}
	},

  	refreshProjects: function() {
    	this.set("content", []);
		var self = this;
		this.max_issues = 0;
		var options = {
			url: 'https://api.github.com/users/' + jQuery.Storage.get("username") + '/repos?sort=created&type=private',
			dataType: 'jsonp',
			data: [],
			success: function(data){
				jQuery(data.data).each(function(){
					var repository = StatusBoard.Repository.create(this);
					repository.load_collaborators();
					repository.load_issues();
					
					if(jQuery.Storage.has("Hide:" + repository.full_name))
						return;

					self.addItem(repository);

					if(self.max_issues < repository.open_issues){
						self.set("max_issues", repository.open_issues);
					}
				});
			}
		};

		if(jQuery.Storage.get("token").length > 0){
			options["url"] = 'https://api.github.com/user/repos?type=private&sort=created&access_token=' + jQuery.Storage.get("token");
		}

		jQuery.ajax(options);

		return;
  	}
});