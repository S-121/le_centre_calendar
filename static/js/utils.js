const eventsURL = `${window.location.origin}/calendar/`;

const getDateTime = (date) => {
    if (!date) return '';
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

const filters = {
    startDate: '',
    endDate: '',
    status: '',
    isFeatured: '',
};

const renderEvents = (event) => {
    console.log(event.featured);
    console.log('hi');
    return `
        <div class="card ${event.old ? 'bg-secondary text-dark' : ''} ${event.featured ? 'bg-info text-light' : ''}" style="width: 18rem;">
            <img src="${event.img}" class="card-img-top" alt="${event.title}">
            <div class="card-body">
                <h5 class="card-title">${event.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${event.date}</h6>
                <p class="card-text">
                    <i class="bi bi-calendar3 text-secondary"></i>
                    <span id='selected-event-info-date'>
                        ${event.date}
                    </span>
                    <i class="bi bi-clock text-secondary"></i>
                    <span id='selected-event-info-time'>
                        ${event.time}
                    </span>
                </p>
                <a href="#" disabled class="card-link">Église Le Centre</a>
            </div>
        </div>
    `;
};

const wrapper = (html) => {
    return `<div class='row my-2 pb-2 border-bottom border-primary'>${html}</div>`;
};
