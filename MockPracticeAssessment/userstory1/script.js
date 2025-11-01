// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Form validation
const form = document.getElementById('registrationForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) {
    e.stopPropagation();
    form.classList.add('was-validated');
  } else {
    alert("Thank you! Your registration has been received.");
    form.reset();
    form.classList.remove('was-validated');
  }
});

// Auto-select event when clicking "Join Now"
document.querySelectorAll('.register-btn').forEach(button => {
  button.addEventListener('click', e => {
    const eventName = e.target.closest('.card').querySelector('.card-title').textContent;
    const select = document.getElementById('eventSelect');
    Array.from(select.options).forEach(option => {
      if (option.text.includes(eventName.split(' ')[0])) {
        select.value = option.value;
      }
    });
    document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
  });
});
