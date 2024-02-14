
/**
 * Renders the first letter of the contact array
 * @param {number} index - Array index required to display the first letter
 * @returns
 */
function contactDataHTML(index) {
    return /*html*/ `
        <div class="contacts-content" id="contacts-${index}">
            <div class="list">
                <span class="list-char" id="char-${index}">${contacts[index].name.charAt(0).toUpperCase()}</span>
            </div>
            <div class="underline"></div>
        </div>
    `
}

/**
 * together with a for loop can render all contacts
 * @param {number} index - Array index required to display the contact
 * @returns
 */
function contactUserCardHtml(index) {
    return /*html*/ `
        <div class="contact-data pointer" id="contact-data-${index}" onclick="renderSingleContactOverview(${index})">
            <div class="initials-circle ${contacts[index].circleColor}">
                <!-- USER DATA -->
                <span>${contacts[index].initials}</span>
            </div>
            <div class="user-data-container">
                <div class="user-Data" id="user-Data-${index}">
                    <span>${contacts[index].name + " " + contacts[index].lastname}</span>
                    <a href="#">${contacts[index].email}</a>
                </div>
            </div>
        </div>
    `
}

/**
 * Renders the large display when clicking on a contact in Contacts
 * @param {number} index - array index of the person to be displayed
 * @returns
 */
function singleContactOverview(index) {
    return /*html*/ `
        <div class="single-data-headline">
            <div class="big-circle ${contacts[index].circleColor}">${contacts[index].initials}</div>
            <div class="single-contact-name-card">
                <span class="single-contacts-name">${contacts[index].name + " " + contacts[index].lastname}</span>
                <div class="contacts-icon-container">
                    <div class="icons-contacts" id="edit-contact-INDEX" onclick="renderEditContact()">
                        <img src="./assets/img/icons/edit.png" alt="">
                        <span>Edit</span>
                    </div>
                    <div class="icons-contacts" id="edit-contact-INDEX" onclick="deleteContact(${contacts[index].id})">
                        <img src="./assets/img/icons/delete.png" alt="">
                        <span>Delete</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="contact-info-headline">
            <span>Concat Information</span>
        </div>
        <div class="contact-info-card" >
            <div class="contact-info-value">
                <span>Email</span>
                <a href="#">${contacts[index].email}</a>
            </div>
            <div class="contact-info-value">
                <span>Phone</span>
                <span>${contacts[index].phone}</span>
            </div>
        </div>
    `
}


/**
 * Is required to display the form fields
 * @param {String} cardName - Heading of the card
 * @param {String}  - additional text to be displayed
 * @param {String} functionName - function name to be used renderAddNewContact or renderEditContact
 * @returns
 */
function contactsCardHTML(cardName, secondText,functionName) {
    return /*html*/ `
        <div class="edit-card">
            <div class="edit-card-headline">
                <img src="./assets/img/icons/join-logo.png" alt="">
                <div class="edit-card-header">
                    <span>${cardName}</span>
                    <span class="small-card-text">${secondText}</span>
                </div>
                <div class="small-underline"></div>
            </div>
            <div class="edit-card-form">
                <form onsubmit="${functionName}(); return false">
                    <input type="text" placeholder="Name" id="name">
                    <input type="email" placeholder="E-Mail" id="email">
                    <input type="number" placeholder="Phone" id="phone">
                    <button>Send</button>
                    <button onclick="closeRenderContactCard()">CLOSE</button>
                </form>
            </div>
        </div>
    `
}
