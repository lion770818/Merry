cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        button_exit : cc.Button,
    },

    // use this for initialization
    onLoad: function () {

    },
    
    onButtonClick: function() {
        cc.log("點到離開按鈕");
        //cc.audioEngine.stop(this.current);
        //cc.director.end();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
