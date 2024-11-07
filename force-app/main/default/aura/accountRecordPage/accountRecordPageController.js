({

    doInit: function (component, event, helper) {

        component.set('v.columns', [
            { label: 'Account Name', fieldName: 'Name', type: 'text', editable: true, typeAttributes: { required: true } },
            // { label: '', fieldName: '', type: '', editable: '', typeAttributes: '' },
        ]);

        helper.initServer(component, helper).then($A.getCallback(function () {
      
            helper.fetchData(component);
        }));
    },

    handleSaveEdition: function (component, event, helper) {

        var draftValues = event.getParam('draftValues');
        // helper.saveEdition(component, draftValues);
        console.log('draft Values');

    },
    handleCancelEdition: function (component) {

    },
    handleRowClick: function (component, event, helper) {

        const selectedRows = event.getParam('selectedRows');
        if (selectedRows.length === 0)
            return;

        const AccId = selectedRows[0].Id;

        component.set('v.recordId', AccId);


        component.set('v.render', !component.get('v.render'));
        
    }
});