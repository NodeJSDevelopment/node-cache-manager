function CallbackFiller() {
    this.queues = {};
}

CallbackFiller.prototype.fill = function(key, err, data) {
    var self = this;

    var waiting = self.queues[key];
    delete self.queues[key];

    waiting.forEach(function(task) {
        var taskDomain = task.domain;
        if (taskDomain) {
            taskDomain.bind(task.cb)(err, data);
        } else {
            task.cb.call(this, err, data);
        }
    });
};

CallbackFiller.prototype.has = function(key) {
    return this.queues[key];
};

CallbackFiller.prototype.add = function(key, funcObj) {
    if (this.queues[key]) {
        this.queues[key].push(funcObj);
    } else {
        this.queues[key] = [funcObj];
    }
};

module.exports = CallbackFiller;
