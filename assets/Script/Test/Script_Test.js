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
        player: {
            default: null,
            type: cc.Button,
        },
        
        MyLabel: {
            default: null,
            type: cc.Label,
        },
    },

    // use this for initialization
    onLoad: function () {
        var bg  = this.node.getChildByName("BG");
        bg.x = 300;
        cc.log('bg='+ bg);
        
        cc.log('#player='+ this.player );
        var script = this.player.getComponent("Script_button");
        
        cc.log('#player test='+ script.test );
        
        //var LL = cc.find("Script_button", this.player);
        //cc.log('LL='+ LL);
        var _label = cc.find("Canvas/New Label").getComponent(cc.Label);
        console.log("_label = " + _label.string);
        _label.string = 1234;
        
        var MyLabel = this.MyLabel;
        MyLabel.getComponent(cc.Label);
        MyLabel.string = 5678;
        console.log("MyLabel = " + this.MyLabel);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
