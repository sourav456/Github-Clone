// Getting GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    // Geting the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // Getting the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;

    // Running GitHub API function, passing in the GitHub username
    requestUserRepos(gitHubUsername);

})


function requestUserRepos(username) {
  const url = `https://api.github.com/users/${username}/repos`;
  fetch(url,{
    Method:"GET"
            })
  .then((users) => users.json())
    .then((data) =>{
        
        let root = document.getElementById('userRepos');
       while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
        if (data.message === "Not Found") {
            let ul = document.getElementById('userRepos');

            // Created variable that will create li's to be added to ul
            let li = document.createElement('li');

            // Added Bootstrap list item class to each li
            li.classList.add('list-group-item')
                // Created the html markup for each li
            li.innerHTML = (`
                <p><strong>No account exists with username:</strong> ${username}</p>`);
            // Append each li to the ul
            ul.appendChild(li);
        } else {

            // Getting the ul with id of of userRepos
            let ul = document.getElementById('userRepos');
            let search=document.createElement("h3");
                 search.innerHTML="SEARCH RESULT"
               ul.append(search)
            let p = document.createElement('p');
            p.innerHTML = (`<p class="username1"><strong> UserName: ${username}</p>
            <p class="repository">Number of Repository: ${data.length}</p>`)
            ul.appendChild(p);
            // Looping over each object in data array
            for (let i in data) {
                // Created variable that will create li's to be added to ul
                let li = document.createElement('li');

                // Added Bootstrap list item class to each li
                li.classList.add('list-group-item')

                // Created the html markup for each li
                li.innerHTML = (`
                <p><strong>Repository Name:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>Files inside the repository:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
            `);

                // Append each li to the ul
                ul.appendChild(li);
                
                    
            }
           
        }
                   
  });
  
}


