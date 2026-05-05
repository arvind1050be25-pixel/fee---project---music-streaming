document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 19, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(22, 22, 29, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- 2. Mobile Menu Toggle (Visual simulation) ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    menuBtn.addEventListener('click', () => {
        const icon = menuBtn.querySelector('i');
        if(icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // --- 3. Play/Pause Logic & Progress Bar Simulation ---
    const playPauseBtn = document.getElementById('main-play-btn');
    const playIcon = playPauseBtn.querySelector('i');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    
    let isPlaying = false;
    let progressInterval;
    let currentSeconds = 84; // Start at 1:24
    const totalSeconds = 225; // Total 3:45

    // Helper: format time
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const updateProgress = () => {
        if (currentSeconds >= totalSeconds) {
            clearInterval(progressInterval);
            isPlaying = false;
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            currentSeconds = 0;
        } else {
            currentSeconds++;
            const percentage = (currentSeconds / totalSeconds) * 100;
            progressBar.style.width = `${percentage}%`;
            currentTimeEl.textContent = formatTime(currentSeconds);
        }
    };

    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
            progressInterval = setInterval(updateProgress, 1000);
        } else {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            clearInterval(progressInterval);
        }
    });

    // --- 4. Like/Heart Button Toggle ---
    const likeBtn = document.querySelector('.like-btn');
    likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle('liked');
        const icon = likeBtn.querySelector('i');
        
        if (likeBtn.classList.contains('liked')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            // Small pop animation
            icon.style.transform = "scale(1.3)";
            setTimeout(() => { icon.style.transform = "scale(1)"; }, 150);
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
        }
    });

    // --- 5. Interactive Cards (Simulate playing from a card) ---
    const playOverlays = document.querySelectorAll('.card-overlay, .play-overlay');
    
    playOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent bubbling if needed
            
            // Auto play main player when clicking a card
            if (!isPlaying) {
                playPauseBtn.click();
            }
            
            // Visual feedback on card
            const icon = overlay.querySelector('i');
            icon.style.transform = "scale(0.8)";
            setTimeout(() => {
                icon.style.transform = "scale(1)";
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                
                // Reset after 2 seconds for visual effect
                setTimeout(() => {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                }, 2000);
            }, 100);
        });
    });

});

// --- Spotify Search Interaction ---
const mainSearch = document.getElementById('mainSearch');
const songs = document.querySelectorAll('.song-card');

if (mainSearch) {
    mainSearch.addEventListener('input', () => {
        const value = mainSearch.value.toLowerCase();

        songs.forEach(song => {
            const title = song.querySelector('h4').textContent.toLowerCase();
            song.style.display = title.includes(value) ? 'block' : 'none';
        });
    });
}

// ELEMENTS
const avatarBtn = document.getElementById("avatarBtn");
const authModal = document.getElementById("authModal");
const closeAuth = document.getElementById("closeAuth");
const toggleAuth = document.getElementById("toggleAuth");
const authTitle = document.getElementById("authTitle");
const authBtn = document.getElementById("authBtn");
const authForm = document.getElementById("authForm");

let isLogin = true;

// OPEN MODAL
avatarBtn.addEventListener("click", () => {
    authModal.style.display = "flex";
});

// CLOSE MODAL
closeAuth.addEventListener("click", () => {
    authModal.style.display = "none";
});

// TOGGLE LOGIN / SIGNUP
toggleAuth.addEventListener("click", () => {
    isLogin = !isLogin;

    if (isLogin) {
        authTitle.innerText = "Login";
        authBtn.innerText = "Login";
        toggleAuth.innerText = "Sign Up";
        document.querySelector(".toggle-text").innerHTML =
            `Don't have an account? <span id="toggleAuth">Sign Up</span>`;
    } else {
        authTitle.innerText = "Sign Up";
        authBtn.innerText = "Sign Up";
        document.querySelector(".toggle-text").innerHTML =
            `Already have an account? <span id="toggleAuth">Login</span>`;
    }

    // FIX: re-bind event properly
    document.querySelector("#toggleAuth").addEventListener("click", arguments.callee);
});

// FORM SUBMIT
authForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (isLogin) {
        // LOGIN
        const storedUser = JSON.parse(localStorage.getItem(email));

        if (storedUser && storedUser.password === password) {
            alert("Login Successful!");
            authModal.style.display = "none";
        } else {
            alert("Invalid Credentials!");
        }

    } else {
        // SIGNUP
        localStorage.setItem(email, JSON.stringify({ email, password }));
        alert("Account Created! Please Login.");
    }

    authForm.reset();
});

// CLOSE WHEN CLICK OUTSIDE
window.addEventListener("click", (e) => {
    if (e.target === authModal) {
        authModal.style.display = "none";
    }
});

const aboutBtn = document.getElementById("aboutBtn");
const aboutModal = document.getElementById("aboutModal");
const closeAbout = document.getElementById("closeAbout");

aboutBtn.addEventListener("click", function(e) {
    e.preventDefault();
    aboutModal.style.display = "flex";
});

closeAbout.addEventListener("click", function() {
    aboutModal.style.display = "none";
});

window.addEventListener("click", function(e) {
    if (e.target === aboutModal) {
        aboutModal.style.display = "none";
    }
});