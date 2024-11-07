({

    searchAccounts: function (component, keyword) {

        return (new Promise(function (resolve, reject) {

            var action = component.get('c.getAccounts');

            action.setParams({
                str: keyword.trim(),
            })

            action.setCallback(this, function (response) {

                if (response.getState() === 'SUCCESS') {
                    var arr = response.getReturnValue();
                    resolve(arr)
                }
                else {
                    reject(true)
                }
            });

            $A.enqueueAction(action);
        }))
    },

    updateValues: function (component, data, chooseAccount) {
        return (new Promise(function (resolve, reject) {

            var action = component.get('c.updateParent')

            action.setParams({
                newParent: (chooseAccount === 1 ? component.get('v.accountId1') : component.get('v.accountId2')),
                ContactId: data,
            })

            action.setCallback(this, function (response) {

                let map1 = component.get('v.contactMap1');
                let map2 = component.get('v.contactMap2');

                if (response.getState() === 'SUCCESS') {

                    if (chooseAccount === 1) {  
                        map1.set(data, map2.get(data));
                        map2.delete(data);
                    }
                    else {
                        map2.set(data, map1.get(data));
                        map1.delete(data);
                    }

                    component.set('v.contactMap1', map1);
                    component.set('v.contactMap2', map2);

                    resolve(true);
                }
                else {
                    reject(true);
                }
            })

            $A.enqueueAction(action);
        }));
    },

    setOnViewAgain: function (component) {

        let map1 = component.get('v.contactMap1');
        let map2 = component.get('v.contactMap2');

        if (map1 !== null) {

            let arr = [];

            for (let it of map1.values()) {
                arr.push(it);
            }
            component.set('v.contactData1', arr);
        }

        if (map2 !== null) {

            let arr = [];

            for (let it of map2.values()) {
                arr.push(it);
            }
            component.set('v.contactData2', arr);
        }
    },
})