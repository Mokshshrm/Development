({

    initServer: function (component, helper) {

        return (new Promise(function (resolve, reject) {

            helper.makeRequest(component)
                .then(function (COWrapper) {

                    var contacts = COWrapper.contacts;
                    var opp = COWrapper.opp;

                    helper.server._dataOfContanct = contacts.reduce(function (acc, it) {
                        acc[it.Id] = it;
                        return acc;
                    }, {});

                    helper.server._dataOfOpp = opp.reduce(function (acc, it) {
                        acc[it.Id] = it;
                        return acc;
                    }, {});

                    resolve(true);
                })
                .catch(function (err) {
                    reject('Setting on server failed');
                })
        }));
    },

    setOnView: function (component, helper) {
        
        component.set('v.contactList', Object.values(helper.server._dataOfContanct));
        component.set('v.opportunityList', Object.values(helper.server._dataOfOpp));

        return;
    },

    makeRequest: function (component) {

        return (new Promise(function (resolve, reject) {

            var action = component.get('c.getCOWrapperResult');

            action.setParams({
                accId: component.get('v.recordId')
            });

            action.setCallback(this, function (response) {

                if (response.getState() === 'SUCCESS' && response.getReturnValue().statusOfCO === 'SUCCESS') {
                    var res = response.getReturnValue();

                    resolve(response.getReturnValue())
                }
                else {
                    reject('$Enqueu fails');
                }
            })

            $A.enqueueAction(action);

        }))
    },
    server: {
        _dataOfContanct: {},
        _dataOfOpp: {},
    }
})