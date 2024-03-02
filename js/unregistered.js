async function initUnregistered(){
    logedInUser = await getItemContacts("logedInUser");
    if (logedInUser.length == 0) {
        addCss('../styles/unregistered.css');
    }
}

function addCss(fileName) {
    var head = document.head;
    var link = document.createElement("link");
  
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;
  
    head.appendChild(link);
}
  
