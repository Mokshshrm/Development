({
    doInit: function (component, event, helper) {

    },

    updateCss: function (component, event, helper) {

        let cssObj = component.get('v.cssObj')

        const descrption = document.getElementsByClassName('cmp-img-description')[0];
        descrption.style.fontSize = cssObj.fontSize;
        descrption.style.color = cssObj.fontColor;
        descrption.textContent = cssObj.description;

        document.getElementById('background-boxx').style.backgroundColor = cssObj.backgroundColor;

        return;
    }
})