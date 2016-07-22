/**
 * TenantController
 *
 * @description :: Server-side logic for managing tenants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    /**
     * `TenantController.index()`
     */
    // index: function (req, res) {
    //   return res.json({
    //     todo: 'index() is not implemented yet!'
    //   });
    // },


    /**
     * `TenantController.new()`
     */
    new: function(req, res) {
        return res.json({
            todo: 'new() is not implemented yet!'
        });
    },


    /**
     * `TenantController.show()`
     */
    show: function(req, res) {
        var id = req.param('id');
        Tenant.findOne(id).populate('entities').exec(function(err, show) {
            if (err) return res.send(err, 500);
            res.json({ tenantShow: show });
        });
    },


    /**
     * `TenantController.create()`
     */
    create: function(req, res) {
        var values = req.params.all();
        var result = [];
        
        // console.log(values);
        Tenant.create(values, function(err, tenantCreate) {
            if (err) return res.send(err, 500);
            console.log(tenantCreate);
            return res.json({ tenantCreate: tenantCreate });
        });
    },


    /**
     * `TenantController.edit()`
     */
    edit: function(req, res) {
        return res.json({
            todo: 'edit() is not implemented yet!'
        });
    },


    /**
     * `TenantController.update()`
     */
    update: function(req, res) {
        console.log("update");
        var values = req.params.all();
        var id = req.param('id');
        Tenant.update(id, values, function(err, update) {
            if (err) return res.send(err, 500);
            console.log(update);
            res.json({ tenantUpdate: update });
        });
    },


    /**
     * `TenantController.destroy()`
     */
    destroy: function(req, res) {
        var id = req.param('id');
        var entitiesId;
        console.log(id);
        Tenant.find(id).populate('entities').exec(function(err, tenant) {
            if (err) return res.send(err, 500);
            if (!tenant) return res.send("No user with that id.", 404);

            Entity.find({ tenant: id }).exec(function(err, findEntities) {
                if (err) return res.send(err, 500);
                _.each(findEntities, entity => {
                    Field.destroy({ entities: entity.id }).exec(function(err, fields) {
                        if (err) return res.send(err, 500);
                        Entity.destroy({ tenant: id }).exec(function(err, entities) {
                            if (err) return res.send(err, 500);
                        });

                    });
                });
                var entitiesId = findEntities.id;
                console.log(entitiesId);
                console.log(findEntities);
                Tenant.destroy({ id: id }).exec(function(err) {
                    if (err) return res.send(err, 500);

                    console.log(id);

                });
                res.json({ values: "deleted" });
            });
        });
    }
};
