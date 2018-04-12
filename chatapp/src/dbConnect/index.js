import database from './database_creator';
let initial_data_loaded = false;

export function getMessages() {
    return database.ref('chat').once('value').then(data => {
        const messages = [];
        const values = data.val();
        for (let prop in values) {
            if ({}.hasOwnProperty.call(values, prop)) {
                messages.push(values[prop]);
            }
        }
        initial_data_loaded = true;
        return messages.reverse();
    });
}
export function saveMessage(message) {
    database.ref('chat').push(message);
}

export function onNewMessage(callback, delay = false) {
    database.ref('chat').on('child_added', (data) => {
        if (!initial_data_loaded) return;
        if (delay) {
            setTimeout(() => callback(data.val()), 3000);
        } else {
            callback(data.val());
        }
    })
}
