const translations = {};

// Function to load translation JSON file
function loadTranslations(lang) {
    fetch(`lang/${lang}.json`)
    .then(response => response.json())
    .then(data => {
      translations[lang] = data;
      translatePage(lang);
    })
    .catch(error => console.error("Error loading translations:", error));
}

// Function to apply translations to the page
function translatePage(lang) {
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

// Change language when the user selects a different option
document.getElementById("languageSwitcher").addEventListener("change", (event) => {
  const lang = event.target.value;
  if (!translations[lang]) {
    loadTranslations(lang); // Load translations if not already loaded
  } else {
    translatePage(lang);
  }
});

// Load default language (English)
window.onload = () => {
  const defaultLang = "en";
  loadTranslations(defaultLang);
  document.getElementById("languageSwitcher").value = defaultLang;
};
