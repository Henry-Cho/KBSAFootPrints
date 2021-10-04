// to home page
const toHome = () => {
    window.location.href = "../index/index.html";
}

// to about page
const toAbout = () => {
    window.location.href = "about.html";
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
