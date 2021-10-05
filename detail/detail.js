// to home page
const toHome = () => {
    window.location.href = "../index/index.html";
}

// to about page
const toAbout = () => {
    window.location.href = "../about/about.html";
}

// to Contact page
const toContact = () => {
    window.location.href = "../contact.html";
}

const nav = document.querySelector(".nav_bar");
const nav_height = nav.getBoundingClientRect().height;

document.addEventListener('scroll', ()=> {
    if (window.scrollY > nav_height) {
        nav.classList.add('navbar--dark');
    }

    else {
        nav.classList.remove('navbar--dark');
    }

})

// display in detail.html

function displayDetail() {
    const content = document.querySelector(".content");

    let html_str = ``;

    // for (let i = 0; i < activities.other_pics.length; i++) {
    //     html_str += `<img src=${activities.other_pics[i]}> <br>`
    // } 

    content.innerHTML = `
    <div><img src=${sessionStorage.getItem("img")} alt="picß"></div>
    <div>${sessionStorage.getItem("title")}</div>
    <div>${sessionStorage.getItem("description")}</div>
    `;
    // ${html_str}
}