
const translations = {
  en: {
    audience: [
      "No Response",
      "Policymakers",
      "Practitioners",
      "People",
      "Researchers",
      "Donors/Funders/Dev agencies"
    ],
    topic: [
      "No Response",
      "The approach and methodology we employed (process story)",
      "The way we worked and its impact (narrative story)",
      "The impact of our work on people’s lives (impact story)",
      "How our work can impact lives (creative story)"
    ],
    message: [
      "No Response",
      "Getting evidence on what works is a complex/interesting/challenging process",
      "There are results you can use for decision-making",
      "Lives can be impacted if effective interventions are used",
      "Policies need to be more evidence-informed",
      "Practice needs to be more evidence-informed",
      "People need to make evidence-based choices"
    ],
    why: [
      "No Response",
      "Improve knowledge on the availability",
      "Change behavior towards uptake of effective intervention",
      "To stimulate investments (government, funders/dev agencies)",
      "To stimulate community engagement",
      "To change workplace culture towards evidence-based practice"
    ],
    how: [
      "No Response",
      "Online (using digital platforms – social media, blogs)",
      "Television",
      "Radio",
      "In-person meetings",
      "On stage performance"
    ],
    when: [
      "No Response",
      "Today",
      "Within a month",
      "Within 6 months",
      "Within 12 months"
    ],
    season: [
      "No Response",
      "Harvest season",
      "Rainy season",
      "Winter",
      "Summer",
      "After exams in school"
    ],
    where: [
      "No Response",
      "City hall",
      "Village square",
      "Market place",
      "Parliament building",
      "School",
      "Church",
      "Conference"
    ]
  },
  fr: {
    audience: [
      "Pas de réponse",
      "Décideurs politiques",
      "Praticiens",
      "Population",
      "Chercheurs",
      "Bailleurs/Fonds/Agences de développement"
    ],
    topic: [
      "Pas de réponse",
      "L'approche et la méthodologie utilisées (histoire de processus)",
      "Notre méthode de travail et son impact (histoire narrative)",
      "L’impact de notre travail sur la vie des gens (histoire d'impact)",
      "Comment notre travail peut impacter les vies (histoire créative)"
    ],
    message: [
      "Pas de réponse",
      "Obtenir des preuves sur ce qui fonctionne est un processus complexe/intéressant/difficile",
      "Il existe des résultats que vous pouvez utiliser pour la prise de décision",
      "Les vies peuvent être impactées si des interventions efficaces sont utilisées",
      "Les politiques doivent être davantage fondées sur des preuves",
      "La pratique doit être davantage fondée sur des preuves",
      "Les gens doivent faire des choix fondés sur des preuves"
    ],
    why: [
      "Pas de réponse",
      "Améliorer les connaissances sur la disponibilité",
      "Changer le comportement vers l’adoption d’interventions efficaces",
      "Stimuler les investissements (gouvernements, bailleurs/agences)",
      "Stimuler l’engagement communautaire",
      "Changer la culture de travail vers la pratique fondée sur des preuves"
    ],
    how: [
      "Pas de réponse",
      "En ligne (réseaux sociaux, blogs)",
      "Télévision",
      "Radio",
      "Réunions en personne",
      "Spectacle sur scène"
    ],
    when: [
      "Pas de réponse",
      "Aujourd’hui",
      "Dans un mois",
      "Dans 6 mois",
      "Dans 12 mois"
    ],
    season: [
      "Pas de réponse",
      "Saison des récoltes",
      "Saison des pluies",
      "Hiver",
      "Été",
      "Après les examens"
    ],
    where: [
      "Pas de réponse",
      "Hôtel de ville",
      "Place du village",
      "Marché",
      "Parlement",
      "École",
      "Église",
      "Conférence"
    ]
  }
};

function populateDropdowns(lang) {
  const keys = ["audience", "topic", "message", "why", "how", "when", "season", "where"];
  keys.forEach(key => {
    const select = document.querySelector(`[name=${key}]`);
    select.innerHTML = "";
    translations[lang][key].forEach(option => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      select.appendChild(opt);
    });
  });
}

function setLanguage(lang) {
  populateDropdowns(lang);
}

document.addEventListener("DOMContentLoaded", function () {
  setLanguage("en");
});

document.getElementById("storyForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  const storyType = getStoryType(data);

  document.getElementById("response").innerHTML = `
    <p><strong>Thank you for sharing your story preferences!</strong></p>
    <p>Your recommended story type is: <strong>${storyType}</strong></p>
    <p>We appreciate your time and interest. Your submission has been received, and our team at eBASE Africa will work closely with you to develop the best story possible. We're excited to tell your story! 💚</p>
  `;

  fetch("https://formspree.io/f/xanjgjpn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.assign(data, { storyType }))
  });
});

function getStoryType(data) {
  if (data.topic.includes("impact") || data.topic.includes("impact story")) return "Impact Story";
  if (data.topic.includes("process")) return "Process Story";
  if (data.topic.includes("narrative")) return "Narrative Story";
  if (data.topic.includes("creative")) return "Creative Story";
  return "Narrative Story";
}
