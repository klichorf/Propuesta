// Funciones para manejar los dropdowns del navbar
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');
}
// Funciones para manejar los dropdowns (si aplica)
function toggleDropdown(submenuId) {
    const submenu = document.getElementById(submenuId);
    submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
}
function toggleSubmenu() {
    const submenu = document.getElementById('ajustes-submenu');
    submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
}
