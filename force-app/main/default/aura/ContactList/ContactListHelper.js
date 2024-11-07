({
	// getColumnData: function () {
	// 	return ([
	// 		{ label: 'Contact Name', fieldName: 'Name', type: 'text' },
	// 		{ label: 'Phone', fieldName: 'Phone', type: 'phone' },
	// 		{ label: 'Email', fieldName: 'Email', type: 'email' }
	// 	])

	// },
	// getSetContactList: function (component) {

	// 	var action = component.get('c.getContactList');

	// 	action.setParams({
	// 		recrodId: component.get('v.recrodId')
	// 	});

	// 	action.setCallback(this, function (response) {
	// 		if (response.getState() !== 'SUCCESS')
	// 			return;
	// 		component.set('v.contactList', response.getReturnValue());
	// 	})

	// 	$A.enqueueAction(action);
	// },

	showMyToast: function (component, event, title, msg) {


		var toastEvent = $A.get("e.force:showToast");

		toastEvent.setParams({
			"title": title,
			"message": msg
		});
		
		toastEvent.fire();
	},
	clearForm: function () {
		// logic behind how to end flow from herer;
		console.log('Closing flow')
		return;
	}
})