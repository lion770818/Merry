
var DEF_LS_KeyName = require('../Common/DEF_LocalStorageKeyName');

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

        
        PlayerInfo : ""　,                  // 玩家資訊
        Money : "",                         // 玩家金錢
        MachineNum : "",                    // 機台編號
        
        Label_MachineNum : cc.Label,        // 機台編號
        Label_PlayerMoney : cc.Label,       // 玩家金錢
    },

    // use this for initialization
    onLoad: function () {

        // 讀取玩家資訊
        this.SavePlayerInfo();
        
        this.Label_MachineNum.string = this.MachineNum;
        this.Label_PlayerMoney.string = this.Money;
    },

    //==================================================================================================================
    // 讀取玩家資訊
    SavePlayerInfo : function(){
        cc.log("#讀取玩家資訊");
        cc.log("#讀取玩家資訊 DEF_LS_PLAYER=" + DEF_LS_KeyName.DEF_LS_PLAYER ); 
        var ls          = cc.sys.localStorage;
        
        cc.log("#11111");
        this.PlayerInfo = ls.getItem(DEF_LS_KeyName.DEF_LS_PLAYER );
        this.Money      = ls.getItem(DEF_LS_KeyName.DEF_LS_PLAYER_MONEY );
        this.MachineNum      = ls.getItem(DEF_LS_KeyName.DEF_LS_MACHINE_NUM );
        
        cc.log("玩家資訊 PlayerInfo=" + this.PlayerInfo );
        cc.log("玩家金錢 Money=" + this.Money );
        cc.log("機台編號 MachineNum=" + this.MachineNum );
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
