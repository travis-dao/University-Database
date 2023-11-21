let sidebar_element = document.getElementById('side-bar');
let menu_icon = document.getElementById('menu');
function sidebar() {
    sidebar_element.classList.toggle('active');
    menu_icon.dataset.state = menu_icon.dataset.state == 'on' ? 'off' : 'on';
}