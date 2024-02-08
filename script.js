const STORAGE_TOKEN = "B0S7VW5J7TMVF1N3C8G1FX6TF8A9FYUYYTJ8W60E";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
/**
 * function to set the json into the remote-storage
 * 
 * @param {string} key - key as string to identify the data
 * @param {json} value  - json value that needs to be set up in the remote storage
 * @returns fetched value
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST", // fügt Daten hinzu
    body: JSON.stringify(payload), // definiert was gesendet wird
  }).then((res) => res.json());
}


/**
 * function to get the json object out of the remote storage
 * 
 * @param {string} key - key as string to indentify the data
 * @returns json object
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  console.log(url);
  return fetch(url).then((res) => res.json());
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
