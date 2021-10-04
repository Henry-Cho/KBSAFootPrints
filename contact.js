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