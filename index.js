import { APP_CONFIG } from "./config.js";
console.log("CONFIG:", APP_CONFIG);

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js"
import { getDatabase,
            ref,
            push,
            onValue,
            remove } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js"

    const firebaseConfig = {
        databaseURL: APP_CONFIG.DATABASE_URL
    }

      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app)
      const referenceInDB = ref(database, "tab-leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")


function isValidURL(url) {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

function render(tabs) {
    ulEl.innerHTML = ""

    for (let i = 0; i < tabs.length; i++) {
        const li = document.createElement("li")
        const a = document.createElement("a")

        a.href = tabs[i].url
        a.textContent = tabs[i].title || tabs[i].url
        a.target = "_blank"
        a.rel = "noopener noreferrer"

        li.appendChild(a)
        ulEl.appendChild(li)
    }
}

onValue(referenceInDB, function(snapshot) {
     const snapshotValues = snapshot.val()

     const leads = Object.values(snapshotValues)
     console.log(leads)

     render(leads)
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})