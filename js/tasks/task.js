Njn.Tasks.Task = function (tasks, cfg) {

    this._init();

    this.tasks = tasks;

    this.id = cfg.id;

    this.description = cfg.description || "";

    this.failed = false;

    this.completed = false;
};

Njn._extend(Njn.Tasks.Task, Njn.Component);

Njn.Tasks.Task.prototype.complete = function (id) {
    this.set("completed", this.completed = true);
};

Njn.Tasks.Task.prototype.fail = function (id, params) {
    this.set("failed", this.failed = true);
};

