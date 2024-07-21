const inputEl = document.getElementById("input")
const ulEl = document.getElementById("list")
const saveBtn = document.getElementById("ff")
const clearBtn = document.getElementById("cc")
const deleteBtn = document.getElementById("dd")
const tabBtn = document.getElementById("tt")


let leads = []
let localLeads = JSON.parse(localStorage.getItem("leads"))
if (localLeads){
   leads = localLeads
   render(leads)
}
// variable to allow save-btn work..
s = true

// clear function...
clearBtn.addEventListener("click", function (){
   s = true
   inputEl.value = ""
})

// save function
saveBtn.addEventListener("click", function(){
   for (var i in leads){
      if (inputEl.value == leads[i]){
         inputEl.value = "This Lead Already Saved!"
         s =false

      }else if (!inputEl.value){
         inputEl.value = "Please Enter Your Lead!"
         s =false
      }
   }
   if(s){
      leads.push(inputEl.value)
      localStorage.setItem("leads", JSON.stringify(leads))
      inputEl.value = ""
      render(leads)
   }
})

//save current tab..
tabBtn.addEventListener("click", function(){
   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      leads.push(tabs[0].url)
      localStorage.setItem("leads", JSON.stringify(leads))
      console.log(tabs[0].url)
      render(leads)
    })

})

// delete function..
deleteBtn.addEventListener("click", function (){
   leads = []
   render(leads)
   localStorage.clear()
   s = true
})


function render(leads){
   let list_text = ""
   for(let i = 0; i < leads.length; i++){
      list_text += `<li> 
      <a href="${leads[i]}" target="_blank"> ${leads[i]}</a> 
      <span> 
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"
          id='${i}' onclick="removeLead(this.id)">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
         </svg>
      </span>
      </li>`
   }
      ulEl.innerHTML = list_text
}

function removeLead(id){
   leads.splice(id, 1);
   localStorage.setItem("leads", JSON.stringify(leads))
   render(leads);
}
