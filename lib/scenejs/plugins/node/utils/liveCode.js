(function () {

    var refreshRate = 1000;
    var consumers = {};

    SceneJS.Types.addType("utils/liveCode", {

        construct:function (params) {

            var id = params.id;
            if (!id) {
                this.log("error", "Param 'id' is mandatory on this node type");
                return;
            }

            var src = params.src;
            if (!src) {
                this.log("error", "Param 'src' is mandatory on this node type");
                return;
            }

            var consumer = consumers[id] = {
                id:id,
                src:src,
                parent:this,
                child:null
            };

            var self = this;

            loadWorkbench(consumer,
                function (errMsg) {
                    self.log("error", errMsg);
                });
        }
    });

    SceneJS.liveCode = {

        /** Configures all workbenches
         */
        configure:function (cfg) {
            if (cfg.refreshRate) {
                refreshRate = cfg.refreshRate;
            }
        },

        /** Loads a subgraph into a workbench
         * @param id
         * @param json
         */
        load:function (id, json) {
            var consumer = consumers[id];
            if (!consumer) {
                console.error("SceneJS.liveCode(\"" + id + "\") did not resolve to any utils/liveCode scene node");
                return;
            }
            if (consumer.child) {
                consumer.child.destroy();
                consumer.child = null;
            }
            //     console.log(JSON.stringify(json));
            try {
                consumer.parent.addNode(json,
                    function (child) {
                        consumer.child = child;

                        setTimeout(function () {
                            loadWorkbench(consumer,
                                function (errMsg) {
                                    consumer.parent.log("error", errMsg);
                                    setTimeout(function () {
                                        loadWorkbench(consumer,
                                            function (errMsg) {
                                                consumer.parent.log("error", errMsg);
                                            });
                                    }, refreshRate);
                                });
                        }, refreshRate);
                    });
            } catch (e) {
                console.error(e);
                setTimeout(function () {
                    loadWorkbench(consumer,
                        function (errMsg) {
                            consumer.parent.log("error", errMsg);
                        });
                }, refreshRate);
            }
        },

        get: function(id, callback) {
            callback(consumers[id].parent);
        }
    };

    var lastText = "";
    function loadWorkbench(consumer, error) {



        if (consumer.script) {
            consumer.script.parentElement.removeChild(consumer.script);
        }
        var script = document.createElement("script");
        //   script.id = id;
        script.type = "text/javascript";
        script.src = consumer.src + "?x=" + (new Date()).getTime();
        script.onerror = error;
        document.getElementsByTagName("head")[0].appendChild(script);
        consumer.script = script;
    }

})();


