$.extend(AddressBook, {
    Data: {
        PersistentStorage: {
            readContacts: function readValue() {
                if (localStorage.getItem(AddressBook.Config.PersistentStorageValues.contactsList)) {
                    return JSON.parse(localStorage.getItem(AddressBook.Config.PersistentStorageValues.contactsList));
                }
            },

            writeContacts: function writeValue() {
                localStorage.setItem(AddressBook.Config.PersistentStorageValues.contactsList,
                    JSON.stringify(AddressBook.Config.PersistentStorageValues.currentContacts));
            }
        },

        loadCountries: function () {
            // By using loadCountries check the app loads countries list only on page load, not switching views for process optimization.
            return new Promise(function (resolve) {
                if (AddressBook.Config.Edit.loadCountries) {
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            var countries = JSON.parse(this.response);
                            countries.forEach(function (country) {
                                var addCountryTemplate = $('#country-template').clone();
                                addCountryTemplate
                                    .removeAttr('id')
                                    .attr('class', 'country')
                                    .attr('value', country.toLowerCase())
                                    .text(country);
                                $('#form-country').append(addCountryTemplate);
                            });
                            $('#country-template');

                            AddressBook.Config.Edit.loadCountries = false;
                            resolve();
                        }
                    };
                    xmlhttp.open("GET", "//localhost:8000/countries", true);
                    xmlhttp.send();
                } else {
                    resolve();
                }
            });
        }
    }
});