({

    doInit: function (component, event, helper) {

    },

    PreviewImage: function (component, event, helper) {

        const file_ = event.getParam('file_');
        const image_main = document.getElementById('image-main');
        image_main.setAttribute('src', file_)
    },
})