/**
 * EntityController
 *
 * @description :: Server-side logic for managing Entity
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    /**
     * `EntityController.index()`
     */
    // index: function (req, res) {
    //   return res.json({
    //     todo: 'index() is not implemented yet!'
    //   });
    // },


    /**
     * `EntityController.new()`
     */
    new: function(req, res) {
        return res.json({
            todo: 'new() is not implemented yet!'
        });
    },


    /**
     * `EntityController.show()`
     */
    show: function(req, res) {
        var id = req.param('id');
        Entity.findOne(id).populate('fields').exec(function(err, show) {
            if (err) return res.send(err, 500);
            res.json({ entityTypeShow: show });
        });
    },


    /**
     * `EntityController.create()`
     */
    create: function(req, res) {
        var values = req.params.all();
        var id;
        var result = [];
        Entity.create(values, function(err, create) {
            if (err) return res.send(err, 500);
            id = create.id;
            Entity.find({ id: id }).populate('fields').exec(function(err, entityFields) {
                
                console.log(entityFields);
                res.json({ entityCreated: entityFields });
            });
        });
    },


    /**
     * `EntityController.edit()`
     */
    edit: function(req, res) {
        return res.json({
            todo: 'edit() is not implemented yet!'
        });
    },


    /**
     * `EntityController.update()`
     */
    update: function(req, res) {
        var values = req.params.all();
        var id = req.param('id');
        Entity.update(id, values, function(err, update) {
            if (err) return res.send(err, 500);
            Entity.find({ id: id }).populate('fields').exec(function(err, entityUpdated) {
                if (err) return res.send(err, 500);
                console.log(entityUpdated);
                res.json({ entityCreated: entityUpdated });
            });
        });
    },


    /**
     * `EntityController.destroy()`
     */
    destroy: function(req, res) {
        var id = req.param('id');
        Entity.find(id, function(err, entity) {
            if (err) return res.send(err, 500);
            if (!entity) return res.send("No user with that id.", 404);

            Entity.destroy({ id: id }).exec(function(err, entity) {
                if (err) return res.send(err, 500);
                Field.destroy({ entities: id }).exec(function(err, field) {
                    if (err) return res.send(err, 500);
                });
            });
            res.json({ entityValues: "deleted" });
        });
    }
};
