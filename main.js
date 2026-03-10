window.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".ios-item");
  const indicator = document.getElementById("tabIndicator");
  // Prende il nome del file corrente (es: index.html)
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  function updateIndicator(el) {
    if (!el) return;
    indicator.style.width = `${el.offsetWidth + 20}px`; // +20 per dare respiro alla pillola
    indicator.style.left = `${el.offsetLeft - 10}px`;
  }

  navItems.forEach(item => {
    // 1. Riconoscimento pagina attiva
    const linkPath = item.getAttribute("href");
    if (linkPath === currentPath) {
      item.classList.add("active");
    }

    // 2. Posizionamento iniziale
    if (item.classList.contains("active")) {
      // Piccolo timeout per aspettare che il font sia caricato e le misure siano corrette
      setTimeout(() => updateIndicator(item), 100);
    }
    
    // 3. Effetto Hover
    item.addEventListener("mouseenter", () => updateIndicator(item));
  });

  // Torna sul tasto attivo quando il mouse esce
  document.querySelector(".ios26-nav-inner").addEventListener("mouseleave", () => {
    const activeItem = document.querySelector(".ios-item.active");
    updateIndicator(activeItem);
  });
});

// --- DA QUI IN POI MANTIENI IL TUO VECCHIO CODICE PER LE MODALI ---

// Gestione Modali
const mLegale = document.getElementById("modalLegale");
const mPrivacy = document.getElementById("modalPrivacy");
const btnLegale = document.getElementById("linkLegale");
const btnPrivacy = document.getElementById("linkPrivacy");
const closeLegale = document.getElementById("closeLegale");
const closePrivacy = document.getElementById("closePrivacy");

function openM(m) {
  if(m) {
    m.style.display = "block";
    document.body.style.overflow = "hidden";
  }
}

function closeM(m) {
  if(m) {
    m.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

if(btnLegale) btnLegale.onclick = () => openM(mLegale);
if(btnPrivacy) btnPrivacy.onclick = () => openM(mPrivacy);
if(closeLegale) closeLegale.onclick = () => closeM(mLegale);
if(closePrivacy) closePrivacy.onclick = () => closeM(mPrivacy);

window.onclick = (e) => {
  if (e.target == mLegale) closeM(mLegale);
  if (e.target == mPrivacy) closeM(mPrivacy);
};

/*************************************************    CAROSELLO    ***********************************************************/
/************************************************* CAROSELLO    ***********************************************************/
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const pausePlayBtn = document.getElementById("pausePlayBtn"); // Riferimento nuovo tasto
const carousel = document.querySelector(".carousel");
const list = document.querySelector(".list");
const items = Array.from(document.querySelectorAll(".item"));
const runningTimeBar = document.querySelector(".carousel .timeRunning");

const TIME_RUNNING = 1500; 
const TIME_AUTO_NEXT = 3500; 

let transitionTimeout;
let autoNextTimeout;
let isPaused = false; // Stato iniziale: attivo

// Inizializzazione Progress Bar
const arrowsDiv = document.querySelector(".arrows");
const progressBarContainer = document.createElement("div");
progressBarContainer.className = "progress-bar-container";
const progressBar = document.createElement("div");
progressBar.className = "progress-bar";
progressBarContainer.appendChild(progressBar);
arrowsDiv.appendChild(progressBarContainer);

// Gestione Click Frecce (fermano l'auto-scorrimento per cortesia verso l'utente)
nextBtn.addEventListener("click", () => {
    if(!isPaused) togglePause(); // Opzionale: ferma se l'utente interagisce manualmente
    handleSliderNavigation("next");
});
prevBtn.addEventListener("click", () => {
    if(!isPaused) togglePause(); // Opzionale: ferma se l'utente interagisce manualmente
    handleSliderNavigation("prev");
});

// Gestione Tasto Play/Pause
pausePlayBtn.addEventListener("click", togglePause);

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        carousel.classList.add("paused");
        // Cambia l'icona in "Play" quando è in pausa
        pausePlayBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        clearTimeout(autoNextTimeout);
        runningTimeBar.style.animation = "none";
    } else {
        carousel.classList.remove("paused");
        // Torna l'icona "Pausa" quando riparte
        pausePlayBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        resetCarouselState();
    }
}

items.forEach((item, index) => {
  item.querySelector(".title").setAttribute("data-item", index + 1);
});

// Avvio iniziale
resetCarouselState();
afterSlideChange();

function resetAnimation() {
  if (isPaused) return;
  runningTimeBar.style.animation = "none";
  runningTimeBar.offsetHeight; 
  runningTimeBar.style.animation = `runningTime ${TIME_AUTO_NEXT / 1000}s linear forwards`;
}

function handleSliderNavigation(direction) {
  const sliderItems = list.querySelectorAll(".item");
  if (direction === "next") {
    list.appendChild(sliderItems[0]);
    carousel.classList.add("next");
  } else if (direction === "prev") {
    list.prepend(sliderItems[sliderItems.length - 1]);
    carousel.classList.add("prev");
  }
  afterSlideChange();
}

function afterSlideChange() {
  const slideNumberElement = document.querySelector(".slide-number");
  if (slideNumberElement) slideNumberElement.remove();

  const sliderItems = Array.from(list.querySelectorAll(".item"));
  const activeItem = parseInt(sliderItems[1].querySelector(".title").getAttribute("data-item"));
  const activeIndex = activeItem < 10 ? `0${activeItem}` : activeItem.toString();

  const div = document.createElement("div");
  div.classList.add("slide-number");
  div.textContent = `${activeIndex}/${sliderItems.length}`;
  arrowsDiv.appendChild(div);

  updateProgressBar();
  resetCarouselState();
}

function updateProgressBar() {
  const totalSlides = items.length;
  const sliderItems = Array.from(list.querySelectorAll(".item"));
  const activeItem = parseInt(sliderItems[0].querySelector(".title").getAttribute("data-item")) + 1;
  const progressPercentage = (activeItem / totalSlides) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

function resetCarouselState() {
  clearTimeout(transitionTimeout);
  clearTimeout(autoNextTimeout);

  transitionTimeout = setTimeout(() => {
    carousel.classList.remove("next");
    carousel.classList.remove("prev");
  }, TIME_RUNNING);

  // Fai ripartire il timer solo se non è in pausa
  if (!isPaused) {
    autoNextTimeout = setTimeout(() => {
      handleSliderNavigation("next");
    }, TIME_AUTO_NEXT);
    resetAnimation();
  }
}
/*************************************************    CAROSELLO    ***********************************************************/

/*************************************************  PAGINA CONTATTI  ***********************************************************/

/*************************************************  PAGINA CONTATTI  ***********************************************************/
