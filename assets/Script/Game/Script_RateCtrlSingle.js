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
        
        //var label = cc.find("Canvas/Label_PlayerBetMoney").getComponent(cc.Label);
        //label.string = "22222";
        
        //var Script_RateCtrlSingle = cc.find("Canvas/Layout_RateCtrl/Button_RateCtrl_0").getComponent("Script_RateCtrlSingle");
        //cc.log("=====Script_RateCtrlSingle=" + Script_RateCtrlSingle );
        //cc.log("=====Script_RateCtrlSingle.RateValue=" + Script_RateCtrlSingle.RateValue );
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
        var Button_RateCtrl_0 = cc.find("Canvas/Layout_RateCtrl/Button_RateCtrl_0");
        cc.log("=====Button_RateCtrl_0=" + Button_RateCtrl_0 );
        
        var TotalRateValue = 0; 
        for( var i = 0; i< 9; i++)
        {
            var path = "Canvas/Layout_RateCtrl/" + "Button_RateCtrl_" + i;
            cc.log("=====path=" + path );
            var Label_RateValue = cc.find(path).getChildByName("Label").getComponent(cc.Label);
            cc.log("=====Label_RateValue=" + Label_RateValue );
            cc.log("=====Label_RateValue.string=" + Label_RateValue.string );
            
            TotalRateValue += parseInt(Label_RateValue.string);
            cc.log("=====TotalRateValue=" + TotalRateValue );
        }
        
        var label = cc.find("Canvas/Label_PlayerBetMoney").getComponent(cc.Label);
        label.string = TotalRateValue.toString();
        // ===================== 測試抓節點資料 fail ==========================
        
        cc.log("#onButtonClick 結束" );
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
