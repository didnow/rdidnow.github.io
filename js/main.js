const burger = document.querySelector('.burger');
const navigation = document.querySelector('.navigation');
const header = document.querySelector('.header');

let showedNavigation = false

burger.addEventListener('click', () => {
    if (!showedNavigation) {
        navigation.style['margin-top'] = "50px"
        showedNavigation = true
    }
    else {
        navigation.style['margin-top'] = "-160px"
        showedNavigation = false
    }
})

window.addEventListener('scroll', () => {
    if (this.scrollY >= 150)
        header.style.boxShadow = '0 4px 4px rgba(0, 0, 0, 0.1)'
    else
        header.style.boxShadow = '0 0px 0px rgba(0, 0, 0, 0.1)'
})