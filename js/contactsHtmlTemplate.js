function contactDataHTML(index) {
    return /*html*/ `
        <div class="contacts-content" id="contacts-${index}">
            <div class="list" id="list-${index}">
                <span class="list-char" id="char-${index}">A</span>
            </div>
            <div class="underline"></div>
            <div class="contact-data" id="contact-data-${index}">
            <div class="initials-circle user-color-one">
                <!-- USER DATA -->
                <span>UD</span>
            </div>
            <div class="user-data-container">
                <div div="user-Data" id="user-Data-${index}">
                    <span>USER DATA</span>
                    <a href="#">userData@gmx.de</a>
                </div>
            </div>
        </div>
    `
}
