({
    // handleInit: function (component, event, helper) {

    //     var action = component.get('c.getContactList');

    //     action.setCallback(this, function (response) {
    //         if (response.getState() !== 'SUCCESS')
    //             return;
    //         console.log(response.getReturnValue());
    //         component.set('v.contactList', response.getReturnValue());

    //     });

    //     $A.enqueueAction(action);
    // },
    // btn: function name(component, event, helper) {
    //     component.set('v.first', { name: "na1" });
    // }

    // doInit: function (component, event, helper) {

    //     const columns = helper.getColumnData();

    //     component.set('v.mycolumns', columns);
    //     helper.getSetContactList(component);

    // },

    doInit: function (component, event, helper) {

        var newContact = {
            sobjectType: 'Contact',
            Title: '',
            FirstName: '',
            LastName: '',
            Email: '',
            Description: '',
        };

        component.set("v.contact", newContact);
    },

    handleSave: function (component, event, helper) {
        console.log('in handleSave');
    },

    handleExit: function (component, event, helper) {
        console.log('in handleExit');
        $A.get("e.force:closeQuickAction").fire()

    },
    onFormSubmit: function (component, event, helper) {
        event.preventDefault();

        const label = event.target;
        if (label.getAttribute('name') === 'Cancel') {
            helper.clearForm();
            $A.get("e.force:closeQuickAction").fire();
            return;
        }

        var action = component.get('c.CreateContacRecord');
        var newcontact = component.get('v.contact');

        if (newcontact.LastName.trim() === '') {
            return;
        };

        action.setParams({
            requireData: newcontact,
        });

        action.setCallback(this, function (response) {

            if (response.getState() != "SUCCESS")
                return;

            var res = response.getReturnValue();
            if (res.status == 'SUCCESS')
                helper.showMyToast(component, event, res.status, res.SuccessMessge);
            else
                helper.showMyToast(component, event, res.status, res.ErrorMessage);

            $A.get("e.force:closeQuickAction").fire();
        });

        $A.enqueueAction(action);
    },

})