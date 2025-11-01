const eventList = document.getElementById('eventList');
const message = document.getElementById('message');
const filters = {
  category: 'all', date: '', search: ''
};

const fetchEvents = async () => {
  try {
    const res = await fetch('events.json');
    if (!res.ok) throw new Error('Failed to load events');
    const { events } = await res.json();
    render(events);
    setupFilters(events);
  } catch (err) {
    message.textContent = err.message;
  }
};

const render = (data) => {
  eventList.innerHTML = '';
  if (!data.length) return message.textContent = 'No events found.';
  message.textContent = '';
  data.forEach(({ title, category, date, location }) => {
    eventList.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5>${title}</h5>
            <p class="text-muted mb-1">${category}</p>
            <p>${new Date(date).toDateString()}</p>
            <p class="small">${location}</p>
          </div>
        </div>
      </div>`;
  });
};

const setupFilters = (events) => {
  const apply = () => {
    let filtered = events.filter(e => {
      const cat = filters.category === 'all' || e.category === filters.category;
      const dt = !filters.date || e.date === filters.date;
      const q = !filters.search || e.title.toLowerCase().includes(filters.search.toLowerCase());
      return cat && dt && q;
    });
    render(filtered);
  };

  document.getElementById('category').onchange = e => (filters.category = e.target.value, apply());
  document.getElementById('date').onchange = e => (filters.date = e.target.value, apply());
  document.getElementById('search').oninput = e => (filters.search = e.target.value, apply());
};

document.addEventListener('DOMContentLoaded', fetchEvents);
