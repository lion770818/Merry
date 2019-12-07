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
        button_back : cc.Button,
        audio : cc.AudioClip,
    },

    // use this for initialization
    onLoad: function () {
        cc.log("Scene_Lobby 載入11");
        this.current = cc.audioEngine.play(this.audio, true, 1);
    },
    
    onDestroy: function () {
        cc.log("#Scene_Lobby銷毀");
        cc.audioEngine.stop(this.current);
    },

    onEixt: function () {
        cc.log("Scene_Lobby 離開");
        //cc.audioEngine.stop(this.current);
    },
    
    onButtonClick: function() {
        cc.log("點到返回按鈕");
        cc.audioEngine.stop(this.current);
        cc.director.loadScene("Scene_Login");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
