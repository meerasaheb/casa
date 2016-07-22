/**
 * FieldController
 *
 * @description :: Server-side logic for managing Field
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    /**
     * `FieldController.index()`
     */
    // index: function (req, res) {
    //   return res.json({
    //     todo: 'index() is not implemented yet!'
    //   });
    // },


    /**
     * `FieldController.new()`
     */
    new: function(req, res) {
        return res.json({
            todo: 'new() is not implemented yet!'
        });
    },


    /**
     * `FieldController.show()`
     */
    show: function(req, res) {
        var id = req.param('id');
        Field.findOne(id, function(err, show) {
            if (err) return res.send(err, 500);
            res.json({ Fieldhow: show });
        });
    },


    /**
     * `FieldController.create()`
     */
    create: function(req, res) {
        var values = req.params.all();
        Field.create(values, function(err, create) {
            if (err) return res.send(err, 500);
            res.json({ fieldCreate: create });
        });
    },


    /**
     * `FieldController.edit()`
     */
    edit: function(req, res) {
        return res.json({
            todo: 'edit() is not implemented yet!'
        });
    },


    /**
     * `FieldController.update()`
     */
    update: function(req, res) {
        var values = req.params.all();
        var id = req.param('id');
        Field.update(id, values, function(err, update) {
            if (err) return res.send(err, 500);
            res.json({ fieldUpdate: update });
        });
    },


    /**
     * `FieldController.destroy()`
     */
    destroy: function(req, res) {
        var id = req.param('id');
        Field.find(id, function(err, field) {
            if (err) return res.send(err, 500);
            if (!field) return res.send("No user with that id.", 404);
            Field.destroy(id, function(err) {
                if (err) return res.send(err, 500);
                res.json({ fieldValues: "deleted" });
            });
        });
    }
};
