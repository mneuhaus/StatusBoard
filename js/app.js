var App = Em.Application.create();
var Colors = ["#FCBF17", "#47C615", "#FC3A16", "#7655C0", "#178CFF"];
var base = 'https://api.github.com/';

if(!jQuery.Storage.has("username")){
	jQuery.Storage.set("username", window.prompt("GitHub Username:",""));
}

if(!jQuery.Storage.has("token")){
	jQuery.Storage.set("token", window.prompt("GitHub Token (Needed if you want to see Private Repositories):",""));
}

StatusBoard = Em.Application.create({
  ready: function() {
  	StatusBoard.Repositories.refreshProjects();
    //setInterval(function() {
    //  	StatusBoard.spotlightItems.refresh();
    //}, 2000);
    this.username = jQuery.Storage.get("username");
    this.token = jQuery.Storage.get("token");

    this._super();
  }
});