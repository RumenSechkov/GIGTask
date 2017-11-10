$.extend(AddressBook, {
    Config: {
        pageID: 'GIG_address_book',

        PersistentStorageValues: {
            // By configuring contacts here you can manually import contact tables:
            // (Or paste it directly to DOM inspector application local storage with key:GIG_address_book_contact_list)
            // [["first-name","last-name","e-mail","country"],["first-name","last-name","e-mail","country"],etc..]
            currentContacts: [],
            contactsList: 'GIG_address_book_contacts_list',
            defaultSort: 'GIG_address_book_default_sort'
        },

        List: {
            button: {
                // I didn't auto-capitalize the button labels, so that the person
                // configuring the page, has full freedom of text capitalization.
                addContact: 'ADD NEW'
            },
            // All 'strings' from HTML document can be exported here for easier customization.
            noContacts: 'You have no contacts in your address book'
        },

        Edit: {
            // Here you can turn on/off loading countries list from npm package.
            loadCountries: true,
            button: {
                // I didn't auto-capitalize the button labels, so that the person
                // configuring the page, has full freedom of text capitalization.
                cancel: 'CANCEL',
                create: 'CREATE',
                edit: 'SAVE',
                delete: 'DELETE'
            }
        }
    }
});