({
    fireEvent: function (component, event, helper) {

        var action = component.getEvent('cmpEvent');

        if (event.target.value.trim() == '') {
            action.setParams({
                keyword: undefined,
                IsEmpty: true,
            })
        }
        else {
            action.setParams({
                keyword: event.target.value.trim(),
                IsEmpty: false,
            })
        }
        action.fire();
    },
    
})