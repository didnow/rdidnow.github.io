const scroll = document.querySelector('.scroll-top');
const more = document.querySelector('.more');
const showMore = document.querySelector('.show-more');

let showedMore = false

window.addEventListener('scroll', () => {
    if (this.scrollY >= 450)
        scroll.style.opacity = '1'
    else
        scroll.style.opacity = '0'
})

showMore.addEventListener('click', () => {
    if (!showedMore) {
        more.style.display = 'block'
        showedMore = true
    }
    else {
        more.style.display = 'none'
        showedMore = false
    }
})