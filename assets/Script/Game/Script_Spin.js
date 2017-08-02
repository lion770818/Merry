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
        button_Spin : cc.Button,
        audio : cc.AudioClip,       // 點擊按鈕音效
    },

    // use this for initialization
    onLoad: function () {
        
    },
    
    onClickButton: function(){
     cc.log("點到spin按鈕了");   
     this.current = cc.audioEngine.play(this.audio, false, 1);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
