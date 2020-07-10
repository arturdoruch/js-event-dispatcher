# Event dispatcher

Dispatches custom events to registered listeners.

## Install

```sh
yarn add @arturdoruch/event-dispatcher
```

Usage
```js
import eventDispatcher from '@arturdoruch/event-dispatcher';

// Add/register listeners.
eventDispatcher.addListener('upload.complete', uploadCompleteListener);
eventDispatcher.addListener('upload.complete', uploadCompleteSecondListener);

// Dispatch "upload.complete" event to two registered listeners.
eventDispatcher.dispatch('upload.complete', ['firstArgument', 'secondArgument']);

// Remove listener.
eventDispatcher.removeListener('upload.complete', uploadCompleteListener);

// Dispatch "upload.complete" event to one registered listeners.
eventDispatcher.dispatch('upload.complete', [1, 2, 3]);

function uploadCompleteListener(argument1, argument2) {
    console.log('First listener: ', argument1, argument2);
}

function uploadCompleteSecondListener(argument1, argument2, argument3) {
    console.log('Second listener: ', argument1, argument2, argument3);
}
```  