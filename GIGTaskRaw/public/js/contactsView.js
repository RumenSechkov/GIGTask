$.extend(AddressBook, {
    Contacts: {
        List: {
            initView: function () {
                var docHeight = $(document).height();
                AddressBook.Contacts.List.loadContacts().then(function () {
                    AddressBook.Contacts.List.displayContacts();
                    $('thead th').each(function (index, col) {
                        $(col).css('width', $('tbody tr:nth-child(2) td').eq(index).width());
                    })

                });

                var nav = $('nav').height();
                var footer = $('footer').height();

                $('#add-cancel-contact-btn')
                    .attr('value', AddressBook.Config.List.button.addContact)
                    .attr('class', 'add');

                $('#edit-contacts').css('display', 'none');
                $('#view-contacts')
                    .css('display', 'block')
                    .height(docHeight - (nav + footer));
                $('thead tr').css('width', $('thead').width());
            },

            loadContacts: function () {
                return new Promise (function (resolve) {
                    var contacts = AddressBook.Data.PersistentStorage.readContacts();
                    if (contacts && contacts.length > 0) {
                        AddressBook.Config.PersistentStorageValues.currentContacts = contacts;
                        resolve();
                    } else {
                        $('.no-contacts').show().html(AddressBook.Config.List.noContacts);
                    }
                });
            },

            displayContacts: function (search) {
                $('.contact').remove();
                $('.no-contacts').hide();
                var found = true;
                AddressBook.Config.PersistentStorageValues.currentContacts.forEach(function (contact, index) {
                    if (search) {
                        found = false;
                    } else {
                        $('.delete').css('visibility', 'visible')
                    }
                    var addContactTemplate = $('#contact-template').clone();
                    contact.forEach(function (field, index) {
                        if (search) {
                            if (field.match(search)) {
                                found = true;
                            }
                        }
                        addContactTemplate
                            .children()
                            .eq(index)
                            .text(field);
                    });
                    addContactTemplate
                        .removeAttr('id')
                        .attr('class', 'contact');
                    if (found) {
                        addContactTemplate.data('index', index);
                        $('#contacts-list')
                            .append(addContactTemplate);
                    }
                });
            },

            sortContacts: function (element) {
                var x = -1;
                var y = 1;
                var col = $('th');
                if (element.attr('id') !== undefined && element.attr('id')) {
                    if (element.attr('id') === 'asc') {
                        col.removeAttr('id');
                        element.attr('id', 'desc');
                        element.children().attr('class', 'fa fa-arrow-circle-down');
                        x = 1;
                        y = -1;
                    } else if (element.attr('id') === 'desc') {
                        col.removeAttr('id');
                        element.attr('id', 'asc');
                        element.children().attr('class', 'fa fa-arrow-circle-up');
                        x = -1;
                        y = 1;
                    }
                } else {
                    col
                        .removeAttr('id')
                        .each(function (i) {
                            $(this).eq(i).removeAttr('id');
                        });
                    element.attr('id', 'asc');
                }

                var index = element.index();
                AddressBook.Config.PersistentStorageValues.currentContacts.sort(function (a, b) {
                    if (a[index] < b[index]) return x;
                    if (a[index] > b[index]) return y;
                    return 0;
                })
            },

            searchContacts: function (search) {
                $('.delete').css('visibility', 'hidden');
                AddressBook.Contacts.List.displayContacts(search);
            },

            events: function () {
                $(window).on('resize', function () {
                    $('thead tr').css('width', $('thead').width());
                    $('thead th').each(function (index, col) {
                        $(col).css('width', $('tbody tr:nth-child(2) td').eq(index).width())
                    })
                });

                $('nav')
                    .on('click', '.add', function () {
                        AddressBook.Contacts.Edit.initView('create', '');
                    })
                    .on('keyup change', '#search', function () {
                        AddressBook.Contacts.List.searchContacts($(this).val());
                    });

                // Faster performance by selecting this way, ref.:
                // https://jsperf.com/click-perf
                $('#contacts-list')
                    .on('click', 'th', function () {
                        AddressBook.Contacts.List.sortContacts($(this));
                        AddressBook.Contacts.List.displayContacts();
                        // Writing contacts saves the last sort view user chose when loaded next time.
                        AddressBook.Data.PersistentStorage.writeContacts()
                    })
                    .on('mouseenter', '.edit:not(.edit:eq(0))', function () {
                        $(this)
                            .attr('class', 'edit fa fa-address-card')
                    })
                    .on('mouseout', '.edit:not(.edit:eq(0))', function () {
                        $(this)
                            .attr('class', 'edit fa fa-address-card-o')
                    })
                    .on('mouseenter', '.delete:not(.delete:eq(0))', function () {
                        $(this)
                            .attr('class', 'delete fa fa-trash')
                    })
                    .on('mouseout', '.delete:not(.delete:eq(0))', function () {
                        $(this)
                            .attr('class', 'delete fa fa-trash-o')
                    })
                    .on('click', '.edit', function () {
                        AddressBook.Contacts.Edit.initView('edit', $(this).parent())
                    })
                    .on('click', '.delete', function () {
                        AddressBook.Contacts.Edit.deleteContact($(this).parent())
                    });
            }
        }
    }
});


