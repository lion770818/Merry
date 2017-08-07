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
        test : 10,
    },

    // use this for initialization
    onLoad: function () {
        var ll = this.node.getChildByName("Label");
        cc.log("ll = " + ll );
        ll.getComponent(cc.Label).string = 1111;
        cc.log("test = " + this.test );
        
        var Script_button = this.getComponent("Script_button");
        cc.log("Script_button = " + Script_button );
        
        cc.log("Script_button test = " + Script_button.test );
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
