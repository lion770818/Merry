//var RateValue = 0;

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
        Button_RateCtrl : cc.Button,
        Label_RateValue : cc.Label,
        RateValue : 0,
        audio           : cc.AudioClip,       // 點擊按鈕音效
    },

    // use this for initialization
    onLoad: function () {
        this.RateValue = 0;
    },

    onButtonClick: function(){
        cc.log("#onButtonClick 開始" );
        this.RateValue += 10;
        cc.log("RateValue=" + this.RateValue );
        
        // 改變倍率文字
        this.Label_RateValue.string = this.RateValue;
        
        // 點擊按鈕音效
        this.current = cc.audioEngine.play(this.audio, false, 1);
        // ===================== 測試抓節點資料 fail ==========================
        //Button_RateCtrl.Text = "11";
        //this.Button_RateCtrl.getChildByName("Label").getComponent(cc.Label).string=123;
        var node = this.node;
        node.x = 100;
        node.y = 400;
        
        cc.log("this.name=" + this.name );
        
        var label = this.getComponent(cc.Label);
        cc.log("label=" + label );
        var text = this.name + ' started';

        // Change the text in Label Component
        //label.string = text;
        // ===================== 測試抓節點資料 fail ==========================
        
        cc.log("#onButtonClick 結束" );
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
