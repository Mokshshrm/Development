({
    fetchData: function (component) {
        // simulates a call to the server, similar to an apex controller.
        this
            .server
            .getAccounts()
            .then($A.getCallback(function (response) {
                var state = response.state;

                if (state === "SUCCESS") {
                    var accounts = response.returnValue;
                    component.set('v.data', accounts);
                }
            }));
    },
    saveEdition: function (cmp, draftValues) {
        var self = this;
        this
            .server
            .updateOpportunities(draftValues)
            .then($A.getCallback(function (response) {
                var state = response.state;

                if (state === "SUCCESS") {
                    var returnValue = response.returnValue;

                    if (Object.keys(returnValue.errors).length > 0) {
                        // the draft values have some errors, setting them will show it on the table
                        cmp.set('v.errors', returnValue.errors);
                    } else {
                        // Yay! success, initialize everything back
                        cmp.set('v.errors', []);
                        cmp.set('v.draftValues', []);
                        self.fetchData(cmp);
                    }
                } else if (state === "ERROR") {
                    var errors = response.error;
                    console.error(errors);
                }
            }));
    },
    // Helpers to simulate a server.
    initServer: function (component, helper) {
        // used only to simulate a server where you make requests.

        var serverReady = new Promise(function (resolve, reject) {

            helper._generateData(component)
                .then(function (generatedData) {
                    helper.server._dataMap = generatedData.reduce(function (accumulator, accounts) {
                        accumulator[accounts.Id] = accounts;
                        return accumulator;
                    }, {});
                    console.log(helper.server._dataMap);
                    resolve(true);
                })
                .catch(function (err) {
                    reject(err);
                })
        });

        return serverReady;

    },
    server: {
        _dataMap: {},
        getAccounts: function () {
            var self = this;
            var dataPromise = new Promise(function (resolve) {
                resolve({
                    state: "SUCCESS",
                    returnValue: Object.values(self._dataMap)
                });
            });

            return dataPromise;
        },
        updateOpportunities: function (draftOpportunities) {
            var self = this;
            var updatePromise = new Promise(function (resolve) {
                var response = {
                    state: "SUCCESS",
                    returnValue: {}
                };

                response.returnValue.errors = self._validateOpportunities(draftOpportunities);

                if (Object.keys(response.returnValue.errors).length > 0) {
                    response.code = 'EDITION_HAS_ERRORS';
                } else {
                    self._saveDraftOpportunities(draftOpportunities);
                }

                resolve(response);
            });

            return updatePromise;
        },
        _saveDraftOpportunities: function (opportunities) {
            var self = this;
            opportunities.forEach(function (opportunity) {
                var storedOpportunity = self._dataMap[opportunity.id];
                self._dataMap[opportunity.id] = Object.assign(
                    {},
                    storedOpportunity,
                    opportunity
                );
            });
        },
        _validateOpportunities: function (opportunities) {
            var self = this;
            var totalErrors = 0;
            var errors = {};// new Map<String, Object>();
            var rowsError = {};// new Map<String, Object>();

            opportunities.forEach(function (opportunity) {
                var rowErrorMessages = [];
                var rowErrorFieldNames = [];

                if (opportunity.confidence && (opportunity.confidence < 0 || opportunity.confidence > 1)) {
                    rowErrorMessages.push('The confidence should be a value between 0 (0%) and 1 (100%).');
                    rowErrorFieldNames.push('confidence');
                }

                if (opportunity.amount && opportunity.amount < 0) {
                    rowErrorMessages.push('The amount should be greater than 0.');
                    rowErrorFieldNames.push('amount');
                }

                if (rowErrorMessages.length > 0) {
                    var storedOpportunity = self._dataMap[opportunity.id];

                    totalErrors += rowErrorMessages.length;

                    rowsError[opportunity.id] = {
                        messages: rowErrorMessages,
                        fieldNames: rowErrorFieldNames,
                        title: storedOpportunity.opportunityName + ' has ' + rowErrorMessages.length + ' error(s)'
                    };
                }
            });

            if (totalErrors > 0) {
                var tableMessages = [];// new List<String>();


                var rowErrorValues = Object.values(rowsError);
                rowErrorValues.forEach(function (rowError) {
                    tableMessages.push(rowError.title);
                });


                errors = {
                    /**
                     * Information to be displayed on each row that has an edition with an error.
                     * This is an object in the form:
                     * {
                     *      'row-id': {
                     *          // displayed in the help text of the icon in the row with id "row-id" indicating that the edition has error(s)
                     *          title: 'Error title',
                     *          // an array of messages
                     *          messages: [],
                     *          // an array of field names to which message corresponds
                     *          fieldNames: [],
                     *      }
                     * }
                     */
                    rows: rowsError,
                    table: { // displayed at the end of the table
                        title: 'Some records have errors', // the title of the popover
                        messages: tableMessages // A list of messages to be displayed as the popover content
                    }
                };
            }

            return errors;
        }
    },
    _generateData: function (component) {

        return new Promise(function (resolve, reject) {

            var action = component.get('c.getAccountsOnRecordsPage');

            action.setCallback(this, function (response) {

                if (response.getState() === 'SUCCESS') {
                    console.log(response.getReturnValue())
                    resolve(response.getReturnValue());
                }
                else{
                    reject(true)
                }
            });

            $A.enqueueAction(action);
        })
    }
});