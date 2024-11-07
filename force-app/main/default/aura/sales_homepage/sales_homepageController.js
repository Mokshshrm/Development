({
    doInit: function (component, event, helper) {

        const cmp_obj = {
            imgUrl: '',
            description: 'Name is not availabel',
            fontSize: '1rem',
            fontColor: 'black',
            backgroundColor: '',
        }

        component.set('v.cmp_obj', cmp_obj);

        return;
    },

    updateObjectValues: function (component, event, helper) {


        const imgUrl = component.find('cmp-input-field1').get('v.value');
        const description = component.find('cmp-input-field2').get('v.value');
        const fontSize = component.find('cmp-input-field3').get('v.value');
        const fontColor = component.find('cmp-input-field4').get('v.value');
        const backgroundColor = component.find('cmp-input-field5').get('v.value');

        const newObj = {
            imgUrl: imgUrl,
            description: description,
            fontSize: fontSize,
            fontColor: fontColor,
            backgroundColor: backgroundColor
        }

        component.set("v.cmp_obj", newObj);
        component.set('v.render', !component.get('v.render'))
        return;
    },
})