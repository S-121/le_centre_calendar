// Actions
const ADD_EVENTS = 'ADD_EVENTS'

// ActionsCreators
const AddEvents = (events) => {
    return {
        type: ADD_EVENTS,
        payload: events,
    }
}
// Reducers
initialState = {
    events: {},
    filterdEvents: {},
}
const eventsReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case ADD_EVENTS:
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
            }
        default:
            return state
    }
}
// Store
const store = Redux.createStore(eventsReducer)
