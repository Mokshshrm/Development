({
    render: function (component, helper) {
        component = this.superRender();
        console.log('child render');
        return component;
    },

    rerender: function (component, helper) {

        this.superRerender();
        console.log('child rerender');

        var action = component.get('c.updateCss');
        $A.enqueueAction(action);
    },

    afterRender: function (component, helper) {
        console.log('after rerender')
    },
    unrender: function () {
        this.superUnrender();
        console.log('child unrender')
    }

})