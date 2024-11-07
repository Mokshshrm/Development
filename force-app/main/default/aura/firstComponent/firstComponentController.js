({
    init: function (component, event, helper) {

        component.set('v.columns', [
            { label: 'LastName', fieldName: 'LastName', type: 'text' }
        ]);
        component.set('v.hideList', false);
        helper.initServer(component, helper).then(function (response) {
            helper.server = response;   
            helper.setOnView(component, helper);
        });
    },
    increase: function (component, event, helper) {

        let tmp = component.get('v.pageNumber');
        let recordSize = component.get('v.recordSize');

        let lengthOfCurrentArr = component.get('v.hideList') == false ? helper.server.length : helper.searchResult.length;

        component.set('v.pageNumber', Math.min(tmp + 1, Number.parseInt(lengthOfCurrentArr / recordSize)));
        helper.setOnView(component, helper);

    },
    decrease: function (component, event, helper) {

        let tmp = component.get('v.pageNumber');
        component.set('v.pageNumber', Math.max(0, tmp - 1));
        helper.setOnView(component, helper);

    },
    handleSearch: function (component, event, helper) {

        var keyWord = event.getParam('keyword');
        var IsEmpty = event.getParam('IsEmpty');

        component.set('v.pageNumber', 0);

        if (IsEmpty) {

            component.set('v.hideList', false);
            helper.searchResult = [];
            helper.setOnView(component, helper);

        }
        else {

            component.set('v.hideList', true);
            helper.SearchOnServer(component, helper, keyWord).then(function (response) {
                helper.searchResult = response;
                helper.setOnView(component, helper);

            });
        }
        return;
    },
    showMoreRecords: function (component, event, helper) {

        component.set('v.recordSize', Number.parseInt(event.target.value));

        if (component.get('v.hideList') == false){
            helper.setOnView(component, helper);
            console.log(component.get('v.recordSize'));
        }
    }
});