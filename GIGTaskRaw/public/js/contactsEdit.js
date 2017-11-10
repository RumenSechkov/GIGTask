$.extend(AddressBook.Contacts, {
    Edit: {
        initView: function (type, element) {
            var docHeight = $(document).height();
            AddressBook.Data.loadCountries().then(function () {
                var nav = $('nav').height();

                var footer = $('footer').height();

                if (type === 'create') {
                    $('#form-submit-btn').attr('value', AddressBook.Config.Edit.button.create);
                    $('#form-delete-btn').css('display', 'none');
                    $('#contact-form')[0].reset();
                } else if (type === 'edit') {
                    AddressBook.Contacts.Edit.editContact(element);
                    $('#form-submit-btn').attr('value', AddressBook.Config.Edit.button.edit);
                    $('#form-delete-btn')
                        .attr('value', AddressBook.Config.Edit.button.delete)
                        .css('display', 'inline-block');
                }
                $('#add-cancel-contact-btn')
                    .attr('value', AddressBook.Config.Edit.button.cancel)
                    .attr('class', 'cancel');
                $('#view-contacts').css('display', 'none');
                $('#edit-contacts')
                    .css('display', 'block')
                    .height(docHeight - (nav + footer));
            });
        },

        saveContact: function () {
            var contact = [];
            var formIsValid = true;
            $('.form-input').each(function (i, element) {
                if (!$(element).data().isValid) {
                    formIsValid = false;
                    return false;
                }
                contact.push($(element).val());
            });
            if (formIsValid) {
                if ($('#form-delete-btn').css('display') === 'inline-block') {
                    var index = $('#form-delete-btn').data().element.data().index;
                    AddressBook.Config.PersistentStorageValues.currentContacts.splice(index, 1, contact);
                } else {
                    AddressBook.Config.PersistentStorageValues.currentContacts.push(contact);
                }
                AddressBook.Data.PersistentStorage.writeContacts();
                AddressBook.Contacts.List.initView();
            }
        },

        editContact: function (contact) {
            AddressBook.Config.PersistentStorageValues.currentContacts[contact.data().index].forEach(function (field, index) {
                $('#contact-form input, select').eq(index).val(field).trigger('change');
            });
            $('#form-delete-btn').data('element', contact)
        },

        deleteContact: function (contact) {
            AddressBook.Config.PersistentStorageValues.currentContacts.splice((contact.index() - 1), 1);
            AddressBook.Data.PersistentStorage.writeContacts();
            contact.remove();
        },

        events: function () {
            $('nav').on('click', '.cancel', function () {
                AddressBook.Contacts.List.initView();
            });

            $('#form-first-name, #form-last-name').on('keyup change', function () {
                var isValid = AddressBook.Validations.validateName($(this));
                $(this).data('isValid', isValid);
            });

            $('#form-e-mail').on('keyup change', function () {
                var isValid = AddressBook.Validations.validateEMail($(this));
                $(this).data('isValid', isValid);
            });

            $('#form-country').on('change', function () {
                $(this).data('isValid', true);
            });

            $('#contact-form').on('submit', function (event) {
                event.preventDefault();
                AddressBook.Contacts.Edit.saveContact();
            });

            $('#form-delete-btn').on('click', function () {
                AddressBook.Contacts.Edit.deleteContact($(this).data().element);
                AddressBook.Contacts.List.initView();
            });
        }
    }
});