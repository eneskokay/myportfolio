const photo = document.querySelector(".photo");
const repositories = document.getElementById("repositories");
const searchinput = document.getElementById("search_input");


document.addEventListener("DOMContentLoaded", function(){

picture();
respositories();

});

async function picture(){
let datauser = await request.GetFromGithub("eneskokay");
photo.style.cssText += `background-image: url("${datauser.avatar_url}")`;
}

async function respositories(){
    let datarepo = await request.GetFromGithub("eneskokay/repos");
    let i = 0;
    datarepo.forEach(element => {
        let newBox = document.createElement("a");
        newBox.innerHTML = `
        <div class="repository whitebox">
            <div class="repo_header">
                <svg viewBox="0 0 16 16">
                    <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
                </svg>
                <p class="repo_name">${element.name}</p>
            </div> 
            <div class="line-clamp">
                <p class="repo_description">${element.description}</p>
            </div>
        </div>`;
    newBox.classList.add("repo_href");
    newBox.href = element.html_url;
    repositories.appendChild(newBox);
});
}

searchinput.addEventListener("keyup", search);

function search(event){
let box = document.querySelectorAll(".repo_href");
let input = event.target.value;
input = input.trim();
input = input.toLocaleLowerCase();


    box.forEach(element => {
        let name = element.querySelector(".repo_name").textContent.toLocaleLowerCase();
        name = name.trim();
        let indexresult = name.indexOf(input);
        
        if(indexresult === -1){
                element.classList.add("none");
        }
        else{
                    let content = name;
                    const last = content.slice(name.indexOf(input));
                    const result = content.slice(0, name.indexOf(input)) + "<div class='searchBackground'>" +input + "</div>" + name.slice((indexresult+input.length));
                    element.querySelector("p").innerHTML = result;

                    element.classList.remove("none");
            }
        }
    )
}