const slider = document.querySelector('.carousel')

const upArrow = document.querySelector('.up')
const downArrow = document.querySelector('.down')

let sectionIndex = 0
const numSections = document.getElementsByClassName('section').length
const increment = 100.0 / numSections;

upArrow.addEventListener('click', () => {
    sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0
    slider.style.transform = `translateY(${sectionIndex * -increment}%`
})
downArrow.addEventListener('click', () => {
    sectionIndex = (sectionIndex < numSections - 1) ? sectionIndex + 1 : numSections - 1
    slider.style.transform = `translateY(${sectionIndex * -increment}%`
})