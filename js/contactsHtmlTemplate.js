/**
 * Renders the first letter of the contact array
 * @param {number} index - Array index required to display the first letter
 * @returns - HTML
 */
function contactDataHTML(index) {
    return /*html*/ `
        <div class="contacts-content">
            <div class="list">
                <span class="list-char">${contacts[index].name.charAt(0).toUpperCase()}</span>
            </div>
            <div class="underline"></div>
        </div>
    `
}

/**
 * together with a for loop can render all contacts
 * @param {number} index - Array index required to display the contact
 * @returns - HTML
 */
function contactUserCardHtml(index) {
    return /*html*/ `
        <div class="contact-data pointer" id="contact-data-${index}" onclick="renderSingleContactOverview(${index})">
            <div class="initials-circle ${contacts[index].circleColor}">
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
 * @returns - HTML
 */
function singleContactOverview(index) {
    return /*html*/ `
        <div class="single-data-headline">
            <div class="big-circle ${contacts[index].circleColor}">${contacts[index].initials}</div>
            <div class="single-contact-name-card">
                <span class="single-contacts-name">${contacts[index].name + " " + contacts[index].lastname}</span>
                <div class="contacts-icon-container">
                    <div class="icons-contacts" id="edit-contact-INDEX" onclick="renderEditContact(${contacts[index].id})">
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
            <span>Contact Information</span>
        </div>
        <div class="contact-info-card" >
            <div class="contact-info-value">
                <span class="single-contact-data-headline-font">Email</span>
                <a href="mailto:${contacts[index].email}">${contacts[index].email}</a>
            </div>
            <div class="contact-info-value">
                <span class="single-contact-data-headline-font">Phone</span>
                <a href="tel:${contacts[index].phone}" class="second-cart-font">${formatPhoneNumber(contacts[index].phone)}</a>
            </div>
        </div>
    `
}

/**
 * Is required to display the form fields
 * @param {String} cardName - Heading of the card
 * @param {String}  secondText - additional text to be displayed
 * @param {String} functionName - function name to be used renderAddNewContact or renderEditContact
 * @returns - HTML
 */
function contactsCardHTML(cardName, secondText, functionName) {
    return /*html*/ `
        <div class="edit-card" data-id="${id}">
            <div class="edit-card-headline">
                <img src="./assets/img/icons/join-logo.png" alt="">
                <div class="edit-card-header">
                    <span>${cardName}</span>
                    <span class="small-card-text">${secondText}</span>
                </div>
                <div class="small-underline"></div>
            </div>
            <div class="close-btn pointer">
                <img src="./assets/img/icons/close.png" alt="" onclick="closeRenderContactCard()">
            </div>
            <div class="edit-card-form">
                <div class="big-circle user-color-eleven card-circle-center">
                    <span>UD</span>
                </div>
                <div class="edit-card-form-input">
                    <form onsubmit="${functionName}(); return false" id="contacts-form">
                        <input class="edit-card-from-input" type="text" placeholder="Name" id="name">
                        <input class="edit-card-from-input" type="email" placeholder="E-Mail" id="email">
                        <input class="edit-card-from-input" type="tel" placeholder="Phone" id="phone" maxlength="11">
                        <div class="edit-card-btn-wrapper">
                            <button class="edit-card-btn white-btn pointer" onclick="clearFormValues('contacts-form')">Delete</button>
                            <button class="edit-card-btn main-btn-color font-color pointer" type="submit">
                                <span>Save</span>
                                <img src="./assets/img/icons/check.png" alt="">
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `
}
