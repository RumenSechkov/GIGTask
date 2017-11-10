var AddressBook = {
    View: {
        init: function () {
            AddressBook.Contacts.List.initView();
            AddressBook.Contacts.List.events();
            AddressBook.Contacts.Edit.events();
        }
    }
};