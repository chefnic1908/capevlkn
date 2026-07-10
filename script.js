const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("quoteForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Cape V Quote Request — ${data.get("name")}`);
  const body = encodeURIComponent(
`Hello Cape V of LKN,

I would like to request a quote.

Name: ${data.get("name")}
Email: ${data.get("email")}
Phone: ${data.get("phone") || "Not provided"}
Event date: ${data.get("date") || "Not provided"}
Guest count: ${data.get("guests") || "Not provided"}
Service: ${data.get("service")}

Event details:
${data.get("details")}

Thank you.`
  );

  document.getElementById("formStatus").textContent = "Opening your email app with the event details...";
  window.location.href = `mailto:capev.lkn@gmail.com?subject=${subject}&body=${body}`;
});
