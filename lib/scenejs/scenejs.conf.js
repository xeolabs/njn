// SceneJS configuration
SceneJS.configure({

    // Point SceneJS at where dynamically-loaded plugins live
    // This is relative to the index document
    pluginPath: location.origin + location.pathname.substring(0, location.pathname.lastIndexOf("/")) + "/lib/scenejs/plugins"
});