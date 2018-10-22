class EventEmitter {
    constructor() {
        this.event = {}
    }

    subscribe( eventName, fn ) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(fn);

        return () => {
            this.event[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
        }
    }

    emit(eventName, data) {
        const event = this.events[eventName];
        if(event) {
            event.forEach( fn => {
                fn.call(null, data);
            })
        }
    }
}

let input = document.querySelector('input[type="text"]');
let button = document.querySelector('button');
let h1 = document.querySelector('h1');

button.addEventListener('click', () => {
    emitter.emit('event:name-changed', {name: input.value});
});

let emitter = new EventEmitter();

emitter.subscribe('event:name-changed', data => {
    h1.innerHTML = `Your name is: ${data.name}`;
});

let unsubscribe = emitter.subscribe('event:name-changed', data => console.log(data));

unsubscribe();