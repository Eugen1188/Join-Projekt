/**
 * renders the maps, always makes a capital letter when a new charAt(0) is reached
 */
function renderContacts() {
    sortArrayByUserName();
    const list = document.getElementById("contact-list");
    list.innerHTML = "";
    list.innerHTML += contactDataHTML(0);
    list.innerHTML += contactUserCardHtml(0);
    for (let i = 1; i < contacts.length; i++) {
        if (contacts[i].name.charAt(0) != contacts[i - 1].name.charAt(0)) {
            list.innerHTML += contactDataHTML(i);
            list.innerHTML += contactUserCardHtml(i);
        } else {
            list.innerHTML += contactUserCardHtml(i);
        }
    }
}

function renderSingleContactOverview(id) {
    if (window.innerWidth < 1024) {
        mobileSingleContactOverview(id);
        renderMobileViewMenu(id)
    } else {
        singleContactOverview(id);
    }
}

function closeRenderContactCardSlide() {
    let opasity = document.getElementById("opasity");
    opasity.classList.remove("opasity");
    clearFormValues("contacts-form");
    slideBackAnimation("edit-card");
    setTimeout(() => {
        document.getElementById("edit-card").innerHTML = "";
    }, 420);
}

/**
 * Renders the card with the given html content
 * @param {Number} id - id of the person in contacts
 * @param {String} htmlContent - html content
 */
function renderCard(id, htmlContent) {
    const card = document.getElementById(id);
    card.innerHTML = "";
    rightSlideAnimation(id, htmlContent);
}

function renderAddNewContact() {
    grayOpasityBackgroundColor()
    const formConfig = {
        cardName: "Add contact",
        secondText: "Tasks are better with a team!",
        functionName: `addNewContactToContactlist()`,
        index: ""
    };
    renderCard("edit-card", contactsCardHTML(formConfig));
    let circleColor = document.getElementById("circle-color");
    circleColor.innerHTML = addContactIconHTML();
}

function renderEditContact(userId, userIndex) {
    grayOpasityBackgroundColor()
    const formConfig = {
        cardName: "Edit contact",
        secondText: "",
        functionName: `editContact(${userId})`,
        index: userIndex
    };
    renderCard("edit-card", contactsCardHTML(formConfig));
    let circleColor = document.getElementById("circle-color");
    circleColor.innerHTML += contactsCardCircleHTML(userIndex)
    document.getElementById("name").value = contacts[userIndex].name + " " + contacts[userIndex].lastname;
    document.getElementById("email").value = contacts[userIndex].email;
    document.getElementById("phone").value = formatPhoneNumber(contacts[userIndex].phone);
}

/**
 * Renders the success message after adding a contact
 * @param {Number} id - id of the contact
 */
function renderAddContactSuccess(userId) {
    let container = document.getElementById("single-contact-data-container")
    let indexOfId = contacts.findIndex(contact => contact.id === userId);
    let succesfully = document.getElementById("contact-success");
    container.innerHTML = ""
    container.innerHTML += singleContactOverview(indexOfId)
    setPersonToActive(indexOfId);
    rightSlideAnimation("contact-success", addContactSuccessHTML());
    setTimeout(() => {
        slideBackAnimation("contact-success");
    }, 1000);
    setTimeout(() => {
        succesfully.innerHTML = "";
    }, 1420);
}

function renderMobileViewMenu(index) {
    let container = document.getElementById("contact-list")
    let btnContainer = document.getElementById("btn-container")
    btnContainer.innerHTML = ""
    btnContainer.innerHTML += menuContactMobileIconHTML(index)
}

function renderEditOrDelete(index) {
    let container = document.getElementById("renderOrDelete")
    container.innerHTML = ""
    container.innerHTML += mobileDeleteOrEditBtnHTML(index)
}

function renderContactListAfterDeleteMobile() {
    if (window.innerWidth < 1024) {
        let renderOrDelete = document.getElementById("renderOrDelete");
        document.getElementById("contact-list").innerHTML = "";
        renderContacts();
        setMobileAddBtnToDefault()
        renderOrDelete.innerHTML = "";
    }
}

/**
 * Render a single person in a more detailed view
 * @param {number} id - is required to find the desired user
 */
function singleContactOverview(index) {
    const singlContactDataContainer = document.getElementById(
        "single-contact-data-container"
    );
    setPersonToActive(index);
    singlContactDataContainer.innerHTML = "";
    rightSlideAnimation("single-contact-data-container", singleContactOverviewHTML(index));
}
