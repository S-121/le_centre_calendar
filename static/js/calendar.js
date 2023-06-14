<<<<<<< HEAD
const statusDropdown = document.querySelector('#status-select')
const featuredDropdown = document.querySelector('#featured-select')
const date = new Date()

let month = date.getMonth()
=======
const curruntYear = new Date().getFullYear()

const getTime = (time) => {
    let hours = Number(time.substring(0, 2))
    const AmOrPm = hours >= 12 ? 'P.M.' : 'A.M.'
    hours = hours % 12 || 12
    const minutes = time.substring(3, 5)
    const finalTime = hours + ':' + minutes + ' ' + AmOrPm
    return finalTime
}
const dropdownElement = document.getElementById('hey'),
    daysWrapperElement = document.querySelector('.days')

const eventsURL = `${
        window.location.origin
    }/calendar/?y=${new Date().getFullYear()}`,
    singleEventUrl = (id) => {
        return `${window.location.origin}/calendar/${id}`
    }

let calenderDidInit = false

const renderEventsTitles = (event) => {
    return `
            <div class="single-event-wrapper">
              <div class="single-event-wrapper">
                <div class="single-event-header">
                  ${event.time.start} | ${event.title}
                  </span>
                </div>
                <div>
                  Ends: - ${event.time.end}
                </div>
            </div>`
}
const renderEvents = (event) => {
    return `
    <div class="d-flex w-100 my-4 mx-2 px-2">
        <div style='max-width:25rem;'>
        <img class="img-fluid" style='object-fit:cover;'
            src="${
                event.img ??
                'https://images.subsplash.com/image.jpg?id=817858a2-494f-4b7f-b0c6-365e4409f77e&w=960&h=540'
            }"
            alt="Card image cap">
        </div>
        <div id="selected-event-info" class='mx-4'>
            <h4 class="selected-event-info-title">${event.title}
            </h4>
            <p class='selected-event-info-data lead'>
                <i class="bi bi-calendar3 text-secondary"></i>
                <span id='selected-event-info-date'>
                    ${event.date}
                </span>
                <i class="bi bi-clock text-secondary"></i>
                <span id='selected-event-info-time'>
                    ${event.time}
                </span>
                am EST
            </p>
            <p class='lead'>
                Église Le Centre
            </p>
        </div>
    </div>
`
}
const renderSelect = (monthNumber) => {
    const monthName = new Date(curruntYear, monthNumber).toLocaleString(
        'default',
        {
            month: 'long',
        }
    )
    return `<option value=${monthNumber}>${monthName}</option>`
}

function initCalendar(state) {
    let selects = ''
    for (const key in state.calendarData) {
        if (Object.hasOwnProperty.call(state.calendarData, key)) {
            selects += renderSelect(key, state.month)
        }
    }
    dropdownElement.innerHTML = selects
    renderCalendar(state)
}
const addEventOnActiveDays = () => {
    const els = $('li.active')
    els.each((e) => {
        els[e].addEventListener('click', (e) => {
            store.dispatch(FilterEvents(e.currentTarget.dataset.day))
            setTimeout(function () {
                window.scrollTo({ top: '100000', behavior: 'smooth' })
            }, 300)
        })
    })
}

const renderCalendar = async ({ calendarData, month }) => {
    let firstDayofMonth = new Date(curruntYear, month, 1).getDay(),
        lastDateofMonth = new Date(curruntYear, month + 1, 0).getDate(),
        // getting last day of month
        lastDayofMonth = new Date(curruntYear, month, lastDateofMonth).getDay(),
        // getting last date of previous month
        lastDateofLastMonth = new Date(curruntYear, month, 0).getDate()
    // a coundition for feb to solve 30 days bug
    if (month == 1) {
        lastDateofMonth = 28
        lastDayofMonth = 2
    }
    // blank string to recive the days list
    let liTags = ''
    for (let i = firstDayofMonth; i > 0; i--) {
        // creating li of previous month last days
        liTags += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`
    }
    for (let i = 1; i <= lastDateofMonth; i++) {
        // creating li of all days of current month
        // TODO add past and upcoming classes
        let eventId = ''
        // adding active class to li if it contains an event
        calendarData[month] !== undefined &&
        calendarData[month].some((x) => {
            if (x.day === i) {
                eventId = x.id
            } else eventId = ''
            return x.day === i
        })
            ? (liTags += `<li data-day='${i}'data-month='${month}' class='active'>${i}</li>`)
            : (liTags += `<li>${i}</li>`)
    }
    for (let i = lastDayofMonth; i < 6; i++) {
        // creating li of next month first days
        liTags += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    // rendring days
    daysWrapperElement.innerHTML = liTags
    addEventOnActiveDays()
}

>>>>>>> 0cffa442c706e094f7f95b51a98945fd890264f9
const getEvents = (url) => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            store.dispatch(AddEvents(data))
        })
        .catch((e) => console.error(e))
}

store.subscribe(() => {
    let state = store.getState()
<<<<<<< HEAD
    console.log(state)
    document.querySelector('.single-events-wrapper').innerHTML = null
    Object.keys(state.filterdEvents).map((key) => {
        let eventsListHtml = ``
        state.filterdEvents[key].map((event) => {
            const date = new Date(event.start_date)
            const currData = new Date(event.start_date)
            currData.setDate(date.getDate() + 1)

            const dataToShow = {
                old: currData.getTime() <= new Date().getTime(),
                date: date.toString().substring(4, 15),
                time: `${event.start_time
                    .toString()
                    .substring(0, 5)} - ${event.end_time
                    .toString()
                    .substring(0, 5)}`,
                title: event.title,
            }
            dataToShow.img = `https://images.subsplash.com/image.jpg?id=817858a2-494f-4b7f-b0c6-365e4409f77e&w=960&h=540`
            if (event?.artwork)
                dataToShow.img = `${window.location.origin}${event.artwor}`
            eventsListHtml += renderEvents(dataToShow)
        })
        document.querySelector('.single-events-wrapper').innerHTML +=
            wrapper(eventsListHtml)
    })
    if (!document.querySelector('.single-events-wrapper').innerHTML)
        document.querySelector('.single-events-wrapper').innerHTML += wrapper(
            'this month has no events'
        )
})

const picker = new easepick.create({
    element: document.getElementById('datepicker'),
    css: ['/static/css/easepick.css', '/static/css/test.css'],
    lang: 'fr-CA',
    strict: true,
    // inline: true,
    calendars: 2,
    header: '<h4 >Le Centre Calendar</h4>',
    plugins: ['RangePlugin', 'LockPlugin'], //, 'AmpPlugin'],
    RangePlugin: {
        tooltipNumber(num) {
            return num - 1
        },
        locale: {
            one: 'day',
            other: 'days',
        },
    },
    LockPlugin: {
        minDate: new Date(),
        minDays: 2,
        maxDays: 14,
        inseparable: true,
    },
})

picker.on('select', () => {
    const end = picker.getEndDate()
    const start = picker.getStartDate()
    const url = `${window.location.origin}/calendar/?start=${getDateTime(
        start
    )}&end=${getDateTime(end)}`
    getEvents(url)
})

const clearFillters = () => {
    getEvents(eventsURL)
    picker.clear()
    featuredDropdown.selectedIndex = 0
    statusDropdown.selectedIndex = 0
}

function onStatusChange() {
    let value = statusDropdown.options[statusDropdown.selectedIndex].value
    const end = picker.getEndDate()
    const start = picker.getStartDate()
    if (start && end) {
        const url = `${window.location.origin}/calendar/?start=${getDateTime(
            start
        )}&end=${getDateTime(end)}&location=${value}`
        getEvents(url)
        return
    }
    const url = `${window.location.origin}/calendar/?location=${value}`
    getEvents(url)
    featuredDropdown.selectedIndex = 0
}

function onFeaturedChange() {
    let value = featuredDropdown.options[featuredDropdown.selectedIndex].value
    const url = `${window.location.origin}/calendar/?featured=${value}`
    getEvents(url)
    statusDropdown.selectedIndex = 0
}

const nextMonth = (e) => {
    month += 1
    const date_mon = new Date().setMonth(month)
    const start_mon = new Date(date_mon)
    const end_mon = new Date(date_mon)
    start_mon.setDate(1)
    end_mon.setMonth(end_mon.getMonth() + 1)
    end_mon.setDate(-1)
    const url = `${window.location.origin}/calendar/?start=${getDateTime(
        start_mon
    )}&end=${getDateTime(end_mon)}`
    getEvents(url)
    picker.clear()
    console.log(e.target, 'nextMonth')
}
const prevMonth = (e) => {
    month -= 1
    const date_mon = new Date().setMonth(month)
    const start_mon = new Date(date_mon)
    const end_mon = new Date(date_mon)
    start_mon.setDate(1)
    end_mon.setMonth(end_mon.getMonth() + 1)
    end_mon.setDate(-1)
    const url = `${window.location.origin}/calendar/?start=${getDateTime(
        start_mon
    )}&end=${getDateTime(end_mon)}`
    getEvents(url)
    picker.clear()
    console.log(e.target, 'prevMonth')
}
console.log(month)
const next = document
    .querySelector('#next-button')
    .addEventListener('click', nextMonth)
const prev = document
    .querySelector('#prev-button')
    .addEventListener('click', prevMonth)

//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////

document.querySelector('#reset-button').addEventListener('click', clearFillters)
statusDropdown.addEventListener('change', onStatusChange)
featuredDropdown.addEventListener('change', onFeaturedChange)

const date_mon = new Date().setMonth(month)
const start_mon = new Date(date_mon)
const end_mon = new Date(date_mon)
start_mon.setDate(1)
end_mon.setMonth(end_mon.getMonth() + 1)
end_mon.setDate(-1)
const url = `${window.location.origin}/calendar/?start=${getDateTime(
    start_mon
)}&end=${getDateTime(end_mon)}`

getEvents(url)
=======
    let eventsListHtml = ``
    let eventsListTitlesHtml = ``
    state.filterdEvents.map((event) => {
        const date = new Date(event.start_date)
        const dataToShow = {
            date: date.toString().substring(4, 15),
            time: `${event.start_time
                .toString()
                .substring(0, 5)} - ${event.end_time
                .toString()
                .substring(0, 5)}`,
            title: event.title,
        }
        if (event?.artworks?.square)
            dataToShow.img = `${window.location.origin}${event.artworks.square}`
       eventsListHtml += renderEvents(dataToShow)
        const TitleDataToShow = {
            time: {
                start: getTime(event.start_time),
                end: getTime(event.end_time),
            },
            title: event.title,
        }
        eventsListTitlesHtml += renderEventsTitles(TitleDataToShow)
    })
    $('.events-wrapper-new').html(eventsListHtml)
    $('.single-events-wrapper').html(eventsListTitlesHtml)
    if (!calenderDidInit) {
        initCalendar(state)
        calenderDidInit = true
    }
    renderCalendar(state)
})

function onChange() {
    let chosenMonth =
        dropdownElement.options[dropdownElement.selectedIndex].value
    store.dispatch(UpdateMonth(chosenMonth))
    store.dispatch(FilterEvents())
    setTimeout(function () {
        window.scrollTo({ top: '100000', behavior: 'smooth' })
    }, 300)
}

dropdownElement.addEventListener('change', onChange)

getEvents(eventsURL)
>>>>>>> 0cffa442c706e094f7f95b51a98945fd890264f9
