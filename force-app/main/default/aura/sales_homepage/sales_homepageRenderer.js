({
    render: function (component, helper) {
        component = this.superRender();
        console.log('parent render');
        return component;
    },
    
    rerender: function (component, helper) {
        this.superRerender();
        console.log('parent rerender');
    }
})