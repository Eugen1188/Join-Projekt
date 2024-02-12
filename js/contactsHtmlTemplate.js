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
        <div class="contact-data pointer" id="contact-data-${index}">
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
