/*
 * (c) Artur Doruch <arturdoruch@interia.pl>
 */

let listeners = {};

export default {
    /**
     * Adds an event listener.
     *
     * @param {string} eventName
     * @param {function} listener The event listener function.
     */
    addListener: function (eventName, listener) {
        if (typeof listener !== 'function') {
            throw new TypeError(`Invalid event listener. Expected function, but got "${typeof listener}".`);
        }

        if (typeof eventName !== 'string') {
            throw new TypeError(`Invalid event name. Expected string, but got "${typeof eventName}".`);
        }

        if (!hasEvent(eventName)) {
            listeners[eventName] = [];
        }

        listeners[eventName].push(listener);
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

        let _listeners = listeners[eventName];

        for (let i in _listeners) {
            if (_listeners[i] === listener) {
                _listeners.splice(i, 1);

                return;
            }
        }
    },

    /**
     * Dispatches event to registered listeners.
     *
     * @param {string} eventName
     * @param {[]} [args] The arguments for passing to the listener.
     */
    dispatch: function (eventName, args) {
        if (!hasEvent(eventName)) {
            return;
        }

        for (let listener of listeners[eventName]) {
            listener.apply(null, args);
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
