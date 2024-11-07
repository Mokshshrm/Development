({
    doInit: function (component, event, helper) {

        helper.initServer(component, helper)
            .then(function (response) {
                helper.setOnView(component, helper);
            })
            .catch(function (err) {
                console.log(err);
            })

        console.log('Called')
    },
    closeModal: function (component, event, helper) {
        component.set('v.render', !component.get('v.render'))
    }
})