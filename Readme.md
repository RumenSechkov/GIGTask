# The Gaming Innovation Group JavaScript Challenge

## Client Side Address Book
This is a Single Page Application - Address Book with basic functionality to store, view, search, order, edit or delete contacts.

### Package Install And Start
npm start

### Functionality
1. First view where all contacts are listed:
    - Order (Asc/Desc) contacts by clicking on column name.
    - Edit/Delete contact.
    - Search contacts.
2. Second view which is a form:
    - Add new contact.
    - Edit existing contact.
    - Delete existing contact.
3. Contacts data is persisted on the client and can be loaded manually through persistent storage value or app config.js file (see in-code comments for reference).
4. When creating new contacts there is fitting validation to all fields.
5. App loads countries list from npm package country-list which can be turned on/off (see in-code comments for reference).

### Form Fields
* First name (input[type=text], required, validated that it contains only letters, whitespaces, dots)
* Last name (input[type=text], required, validated that it contains only letters, whitespaces, dots)
* Email (input[type=text], required, validated that it contains valid email format)
* Country (select, required) - populated by npm country-list module on initial load of page.

### Project Info:
Even though this is a small project, the structure I used mimics a large project with separate logic for each view.
Some of the variables are extracted into config.js file for easier customization. More or all can be extracted in order 
to keep the business logical code free of any hard-coded values so that it can be as a reusable module.
I've kept things as simple as possible for faster code execution. Styling is basic which I can extend to a much nicer
version with great effects and animations but given the current task I emphasised on code logic than design.

Note: I've left some comments in the code-base itself where specific logic is used.

### Tools Used In Project:
* HTML5
* CSS3
* JavaScript
* jQuery
* Node.js
* Express