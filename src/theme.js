const themeToggle = document.getElementById('themeToggle');
const circle = document.getElementById('toggleCircle');

// Load preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    circle.style.transform = 'translateX(28px)';
    themeToggle.classList.replace('bg-white/20', 'bg-pink-500');
}

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Animation logic
    circle.style.transform = isDark ? 'translateX(28px)' : 'translateX(0)';
    if(isDark) {
        themeToggle.classList.replace('bg-white/20', 'bg-pink-500');
    } else {
        themeToggle.classList.replace('bg-pink-500', 'bg-white/20');
    }
});