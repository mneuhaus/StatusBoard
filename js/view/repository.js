StatusBoard.RepositoryView = Ember.View.extend({
    tagName: 'tr',
    hideRepository: function() {
        var repository = this.get('repository');
        jQuery.Storage.set("Hide:" + repository.full_name, "1");
        StatusBoard.Repositories.removeObject(repository);
    }
});