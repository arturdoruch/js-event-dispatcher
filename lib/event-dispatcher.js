/*
 * (c) Artur Doruch <arturdoruch@interia.pl>
 */

let listeners = {};

/**
 * Dispatches custom events to registered listeners.
 */
export default {
    /**
     * Adds an event listener.
     *
     * @param {string} eventName
     * @param {function} listener The event listener function.
     * @param {object} [listenerContext]
     */
    addListener: function (eventName, listener, listenerContext = window) {
        if (typeof eventName !== 'string') {
            throw new TypeError(`Invalid event name. Expected string, but got "${typeof eventName}".`);
        }

        if (typeof listener !== 'function') {
            throw new TypeError(`Invalid event listener. Expected function, but got "${typeof listener}".`);
        }

        if (!hasEvent(eventName)) {
            listeners[eventName] = [];
        }

        listeners[eventName].push(new Listener(listener, listenerContext));
    },

    /**
     * Removes an event listener or listeners from the specified event.
     *
     * @param {string} eventName
     * @param {function} [listener] The listener to remove. If not given all listeners registered to the event will be removed.
     */
    removeListener: function (eventName, listener) {
        if (!hasEvent(eventName)) {
            return;
        }

        if (!listener) {
            delete listeners[eventName];

            return;
        }

        let _listeners = listeners[eventName];

        for (let i in _listeners) {
            if (_listeners[i].function === listener) {
                _listeners.splice(i, 1);

                return;
            }
        }
    },

    /**
     * Dispatches event to registered listeners.
     *
     * @param {string} eventName
     * @param {[]} [eventData] Event data for passing to the listener.
     */
    dispatch: function (eventName, eventData) {
        if (!hasEvent(eventName)) {
            return;
        }

        for (let listener of listeners[eventName]) {
            listener.function.apply(listener.context, eventData);
        }
    },
};

/**
 * @param {string} eventName
 *
 * @return {boolean}
 */
function hasEvent(eventName) {
    return listeners.hasOwnProperty(eventName);
}

/**
 * @param {function} _function
 * @param {object} context
 */
function Listener(_function, context) {
    this.function = _function;
    this.context = context;
}