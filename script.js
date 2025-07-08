
function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = translations[lang][key] || key;
  });
}

const translations = {
  fr: {
    title: "Outil de Décision d'Histoire eBASE",
    question1: "Quel est votre public cible ?",
    question2: "De quoi voulez-vous que l'histoire parle ?",
    question3: "Quel message voulez-vous transmettre ?",
    question4: "Pourquoi voulez-vous raconter cette histoire ?",
    question5: "Comment voulez-vous raconter cette histoire ?",
    question6: "Quand voulez-vous raconter cette histoire ?",
    question7: "Y a-t-il des événements ou saisons que vous ciblez ?",
    question8: "Où voulez-vous raconter cette histoire ?",
    submit: "Soumettre"
  },
  en: {}
};

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
  if (data.topic === "Impact" && data.message.includes("Impact lives")) return "Impact Story";
  if (data.topic === "Process") return "Process Story";
  if (data.topic === "Narrative") return "Narrative Story";
  if (data.topic === "Creative") return "Creative Story";
  return "Narrative Story";
}
