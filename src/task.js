const lowdb = require('lowdb');
const db = lowdb();

const initialData = {
    tasks: [],
};

//set initial data to db
db.defaults(initialData).write();

//get
function get() {
    return db.get('tasks').value();
}
//create
function create(taskName) {
    db.get('tasks').push(taskName).write();
}
//remove
function remove(number) {
    db.get('tasks').remove((task, n) => n === number - 1).write();
}

module.exports = {
    get,
    create,
    remove,
}
