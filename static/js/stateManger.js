// Actions
const ADD_EVENTS = 'ADD_EVENTS'
<<<<<<< HEAD
=======
const FILTER_EVENT = 'FILTER_EVENT'
const UPDATE_MONTH = 'UPDATE_MONTH'
>>>>>>> 0cffa442c706e094f7f95b51a98945fd890264f9

// ActionsCreators
const AddEvents = (events) => {
    return {
        type: ADD_EVENTS,
        payload: events,
    }
}
<<<<<<< HEAD
=======
const FilterEvents = (filter) => {
    return {
        type: FILTER_EVENT,
        payload: filter,
    }
}
const UpdateMonth = (month) => {
    return {
        type: UPDATE_MONTH,
        payload: month,
    }
}
>>>>>>> 0cffa442c706e094f7f95b51a98945fd890264f9
// Reducers
initialState = {
    events: {},
    filterdEvents: {},
<<<<<<< HEAD
=======
    calendarData: {},
    month: new Date().getMonth(),
>>>>>>> 0cffa442c706e094f7f95b51a98945fd890264f9
}
const eventsReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case ADD_EVENTS:
<<<<<<< HEAD
            const finalData = {}

            payload.map((event) => {
                const m = new Date(event.start_date).getMonth() + 1
                if (finalData[m]) finalData[m] = [...finalData[m], event]
                else finalData[m] = [event]
                return m
            })

            payload.sort(function (a, b) {
                return new Date(a.start_date) - new Date(b.start_date)
            })

            return {
                ...state,
                events: payload,
                filterdEvents: finalData,
=======
            const finalData = { [state.month]: [] }
            const months = [
                ...new Set(
                    payload.map((event) => {
                        const m = new Date(event.start_date).getMonth()
                        finalData[m] = []
                        return m
                    })
                ),
            ]
            payload.map((event) => {
                const m = new Date(event.start_date).getMonth()
                const d = new Date(event.start_date).getDate()
                if (months.indexOf(m) !== -1) {
                    finalData[m] = [...finalData[m], { id: event.id, day: d }]
                }
            })
            const filterd = payload.filter((event) => {
                const m = new Date(event.start_date).getMonth()
                const month = new Date().getMonth()
                return m == month
            })
            payload.sort(function (a, b) {
                return new Date(a.start_date) - new Date(b.start_date)
            })
            return {
                ...state,
                events: payload,
                filterdEvents: filterd,
                calendarData: finalData,
            }
        case FILTER_EVENT:
            const temp = state.events.filter((event) => {
                const m = new Date(event.start_date).getMonth()
                const d = new Date(event.start_date).getDate()
                if (payload) return m == state.month && d == payload
                return m == state.month
            })
            return {
                ...state,
                filterdEvents: temp,
            }
        case UPDATE_MONTH:
            return {
                ...state,
                month: Number(payload),
>>>>>>> 0cffa442c706e094f7f95b51a98945fd890264f9
            }
        default:
            return state
    }
}
// Store
const store = Redux.createStore(eventsReducer)
