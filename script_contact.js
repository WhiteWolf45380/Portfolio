// mail_sender avec EmailJS
emailjs.init("otjsCz_61pefPQSRj");

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_2kyg489", "template_893vlrs", this)
    .then(() => {
      status.textContent = "✅ Message envoyé avec succès !";
      form.reset();
    })
    .catch((err) => {
      status.textContent = "❌ Une erreur est survenue. Réessaie plus tard.";
      console.error("Erreur EmailJS :", err);
    });
});