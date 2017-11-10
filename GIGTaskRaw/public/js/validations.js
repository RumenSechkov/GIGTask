$.extend(AddressBook, {
    Validations: {
        validateName: function (name) {
            var regex = /^[a-zA-Z\s]{1,20}$/;
            var isValid = regex.test(name.val());
            AddressBook.Validations.validateFailEffect(name, isValid);
            return isValid;
        },

        validateEMail: function (email) {
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var isValid = regex.test(email.val());
            AddressBook.Validations.validateFailEffect(email, isValid);
            return isValid;
        },

        validateFailEffect: function (element, isValid) {
            if (!isValid) {
                element.css('border', '1px solid #c70039');
                $('#error').css('visibility', 'visible')
            } else {
                element.css('border', '1px solid #ffffff');
                $('#error').css('visibility', 'hidden')
            }
        }
    }
});