({
    validation: function (data) {

        return false;
        let Name = data.Name;
        let Phone = data.Phone
        let AccountNumber = data.AccountNumber
        let Site = data.Site
        let Type = data.Type
        let Ownership = data.Ownership

        if (Name == null || Name.trim() == '') {
            return true
        }
        
        if (Phone != null && Phone.trim() != '') {
            const phonePatterns = {
                'US': /^\+1\s?\d{3}[-\s]?\d{3}[-\s]?\d{4}$/,
                'CA': /^\+1\s?\d{3}[-\s]?\d{3}[-\s]?\d{4}$/,
                'UK': /^\+44\s?7\d{3}[-\s]?\d{3}[-\s]?\d{3}$/
            };
            // check for each pattern with loop if not found fail validation;

            // return false;
        }
       








        return false;
    }
})