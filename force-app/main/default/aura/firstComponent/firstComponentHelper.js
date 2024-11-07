({

    initServer: function (component, helper) {

        self = this;

        return (new Promise(function (resolve, reject) {

            var action = component.get('c.getConactOfAcccount');
            action.setParams({
                str: component.get('v.recordId')
            })

            action.setCallback(this, function (response) {
                var arr = response.getReturnValue();
                if (response.getState() === 'SUCCESS')
                    resolve(arr);
                else
                    reject(true);
            });

            $A.enqueueAction(action);
        }))
    },
    SearchOnServer: function (component, helper, keyWords) {
        self = this;

        return (new Promise(function (resolve, reject) {

            var action = component.get('c.SearchContact');

            action.setParams({
                keyWords: keyWords
            })

            action.setCallback(this, function (response) {
                var arr = response.getReturnValue();
                if (response.getState() === 'SUCCESS')
                    resolve(arr);
                else
                    reject(true);
            });

            $A.enqueueAction(action);
        }))
    },
    setOnView: function (component, helper) {

        let recordSize = component.get('v.recordSize');
        let pageNumber = component.get('v.pageNumber');
        let hideList = component.get('v.hideList');

        let left = (recordSize * pageNumber);

        let right = Math.min((recordSize * (pageNumber + 1)), (hideList == false ? helper.server.length : helper.searchResult.length));

        let tmp = [];

        while (left < right) {
            let val = hideList == false ? helper.server[left] : helper.searchResult[left];
            tmp.push(val);
            left++;
        }
        component.set('v.data', tmp);
    },
    server: [],
    searchResult: [],
    getMaxPage: function (component) {
        return true;
    }
});