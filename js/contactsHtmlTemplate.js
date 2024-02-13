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

function contactUserCardHtml(index) {
    return /*html*/ `
        <div class="contact-data pointer" id="contact-data-${index}" onclick="renderSingleContactOverview(${index})">
            <div class="initials-circle user-color-one">
                <!-- USER DATA -->
                <span>${contacts[index].name.charAt(0).toUpperCase() + contacts[index].lastname.charAt(0).toUpperCase()}</span>
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


function singleContactOverview(index) {
    return /*html*/ `
        <div class="single-data-headline">
            <div class="big-circle user-color-one">${contacts[index].initials}</div>
            <div class="single-contact-name-card">
                <span class="single-contacts-name">${contacts[index].name + " " + contacts[index].lastname}</span>
                <div class="contacts-icon-container">
                    <div class="icons-contacts" id="edit-contact-INDEX" onclick="editContact(${contacts[index].id})">
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
