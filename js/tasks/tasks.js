Njn.Tasks = function (engine) {
    this._init();

    this._idMap = new Njn.Map();
    this.engine = engine;
    this.tasks = {};
};

Njn._extend(Njn.Tasks, Njn.Component);

Njn.Tasks.prototype.start = function (params) {
    params = params || {};
    if (params.id) {
        if (this.tasks[params.id]) {
            Njn.log.error("A task with this ID already exists: " + params.id);
            return;
        }
    } else {
        params.id = this._idMap.addItem({});
    }
    var task = this.tasks[params.id] = new Njn.Tasks.Task(this, params);
    var self = this;
    task.on("completed",
        function () {
            delete self.tasks[task.id];
            self._idMap.removeItem(task.id);
            self.set("completed", task, true);
        });
    task.on("failed",
        function () {
            delete self.tasks[task.id];
            self._idMap.removeItem(task.id);
            self.set("failed", task, true);
        });
    self.set("started", task, true);
    return task;
};

Njn.Tasks.prototype.completed = function (id) {
    var task = this.tasks[id];
    if (!task) {
        this.engine.log.error("Task not found:" + id);
        return;
    }
    task.set("completed", task, true);
};

Njn.Tasks.prototype.failed = function (id) {
    var task = this.tasks[id];
    if (!task) {
        this.engine.log.error("Task not found:" + id);
        return;
    }
    task.set("failed", task, true);
};
