// show menu
const showMenu = (toggleID, navId) => {
    const toggle = document.getElementById(toggleID);
    const nav = document.getElementById(navId);

    toggle.addEventListener('click', () => {
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu');
        // Add show-icon to show and hide menu icon
        toggle.classList.toggle('show-icon');
    });
};

showMenu('nav-toggle', 'nav-menu');  


// for disappearing the nav bar
let lastScrollTop = 0;
const navbar = document.getElementById("nav-header");

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        navbar.classList.add("hidden");
    } else {
        navbar.classList.remove("hidden");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});