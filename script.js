// Modal Data for Projects
const projectDetails = {
       sgae: {
              category: "Automatización & Gestión Académica",
              title: "Sistema Académico Escolar"
       },
       calc: {
              category: "Software & Algoritmos",
              title: "Calculadora Multifuncional"
       },
       ytdlp: {
              category: "Automatización & Media Processing",
              title: "Descargador de Audio y Video con yt-dlp & FFmpeg"
       },
       RealESRGAN: {
              category: "Visión por Computadora & IA",
              title: "Editor de Fotos IA (Real-ESRGAN & Eliminación de fondo)"
       },
       CoquiTTS: {
              category: "Deep Learning & Audio Synthesis",
              title: "Síntesis y Clonación de Voz con Coqui TTS"
       }
};

// Modal triggers
function openModal(key) {
       const modal = document.getElementById('projectModal');
       const container = document.getElementById('modalContentContainer');

       // Detectamos el idioma actual desde el atributo lang del documento (o una variable global de idioma)
       const currentLang = document.documentElement.getAttribute('lang') || 'es';
       // Obtenemos el diccionario del idioma activo o caemos en español por defecto
       const t = translations[currentLang] || translations['es'];

       const btnCloseText = t['btn_close'] || 'Cerrar';

       // Extraemos dinámicamente el título, categoría y detalles traducidos
       const category = t[`${key}_category`] || '';
       const title = t[`${key}_title`] || '';
       const details = t[`${key}_details`] || '';

       if (title) {
              container.innerHTML = `
              <button onclick="closeModal()" class="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-900 p-2 rounded-lg border border-gray-800">
                     <i class="fa-solid fa-xmark text-lg"></i>
              </button>
              <div class="space-y-2">
                     <span class="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider">${category}</span>
                     <h3 class="text-2xl font-bold text-white">${title}</h3>
              </div>
              <div class="space-y-4 text-gray-300 text-sm leading-relaxed border-t border-b border-gray-800 py-4">
                     ${details}
              </div>
              <div class="flex items-center justify-end gap-3 pt-2">
                     <button onclick="closeModal()" class="px-4 py-2 bg-gray-900 text-gray-300 hover:text-white text-xs font-semibold rounded-lg border border-gray-800" >${btnCloseText}</button>
              </div>
              `;
              modal.classList.remove('hidden');
       }
}

function closeModal() {
       document.getElementById('projectModal').classList.add('hidden');
}

document.getElementById('projectModal').addEventListener('click', function (e) {
       if (e.target === this) {
              closeModal();
       }
});

// Category Filter Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
       btn.addEventListener('click', () => {
              filterBtns.forEach(b => {
                     b.classList.remove('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-600/20', 'border-blue-500', 'active');
                     b.classList.add('bg-gray-100', 'dark:bg-gray-900', 'text-gray-800', 'dark:text-gray-300', 'border-gray-300', 'dark:border-gray-800');
              });

              btn.classList.remove('bg-gray-100', 'dark:bg-gray-900', 'text-gray-800', 'dark:text-gray-300', 'border-gray-300', 'dark:border-gray-800');
              btn.classList.add('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-600/20', 'border-blue-500', 'active');

              const filter = btn.getAttribute('data-filter');

              projectCards.forEach(card => {
                     if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'flex';
                     } else {
                            card.style.display = 'none';
                     }
              });
       });
});

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
       link.addEventListener('click', () => {
              navLinks.forEach(l => {
                     l.classList.remove('border-blue-500', 'font-semibold', 'text-blue-600', 'dark:text-white');
                     l.classList.add('border-transparent', 'text-gray-600', 'dark:text-gray-300');
              });

              link.classList.remove('border-transparent', 'text-gray-600', 'dark:text-gray-300');
              link.classList.add('border-blue-500', 'font-semibold', 'text-blue-600', 'dark:text-white');
       });
});

let translations = {};
const defaultLang = 'es';

async function loadTranslations() {
       try {
              const response = await fetch('translation.json');
              translations = await response.json();
              setLanguage(defaultLang);
       } catch (error) {
              console.error('Error al cargar las traducciones:', error);
       }
}

function setLanguage(lang) {
       if (!translations[lang]) return;

       if (translations[lang]['html_lang']) {
              document.documentElement.setAttribute('lang', translations[lang]['html_lang']);
       }

       const elements = document.querySelectorAll('[data-i18n]');
       elements.forEach(el => {
              const key = el.getAttribute('data-i18n');
              if (translations[lang][key]) {
                     el.textContent = translations[lang][key];
              }
       });

       // Actualización centralizada y DRY para cualquier enlace de CV en la página
       const cvFileName = `Currículum Vitae Vera Ramiro Mateo_${lang}.pdf`;

       const cvLinks = document.querySelectorAll('#cvLink, #cvLinkMobile');
       cvLinks.forEach(link => {
              link.href = cvFileName;
       });

       if (lang === 'ar') {
              document.documentElement.setAttribute('dir', 'rtl');
       } else {
              document.documentElement.setAttribute('dir', 'ltr');
       }

       localStorage.setItem('selectedLang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
       const mobileMenuBtn = document.getElementById('mobileMenuBtn');
       const mobileMenu = document.getElementById('mobileMenu');

       if (mobileMenuBtn && mobileMenu) {
              mobileMenuBtn.addEventListener('click', () => {
                     mobileMenu.classList.toggle('hidden');
              });
       }

       const themeToggleBtn = document.getElementById('themeToggle');
       const themeToggleMobile = document.getElementById('themeToggleMobile');
       const htmlElement = document.documentElement;

       function toggleTheme() {
              htmlElement.classList.toggle('dark');
              const isDark = htmlElement.classList.contains('dark');
              localStorage.setItem('theme', isDark ? 'dark' : 'light');

              if (themeToggleBtn) {
                     const themeIcon = themeToggleBtn.querySelector('i');
                     if (themeIcon) {
                            themeIcon.className = isDark ? 'fa-regular fa-moon text-base' : 'fa-regular fa-sun text-base text-amber-400';
                     }
              }

              // Icono para móvil (¡Esto era lo que faltaba actualizar!)
              if (themeToggleMobile) {
                     const themeIconMobile = themeToggleMobile.querySelector('i');
                     if (themeIconMobile) {
                            themeIconMobile.className = isDark ? 'fa-regular fa-moon text-base' : 'fa-regular fa-sun text-base text-amber-400';
                     }
              }
       }

       if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
       if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

       const languageSelect = document.getElementById('languageSelect');
       const languageSelectMobile = document.getElementById('languageSelectMobile');

       function handleLanguageChange(lang) {
              if (languageSelect) languageSelect.value = lang;
              if (languageSelectMobile) languageSelectMobile.value = lang;
              setLanguage(lang);
       }

       if (languageSelect) {
              languageSelect.addEventListener('change', (e) => handleLanguageChange(e.target.value));
       }
       if (languageSelectMobile) {
              languageSelectMobile.addEventListener('change', (e) => handleLanguageChange(e.target.value));
       }

       loadTranslations();
});