
var DEF_LS_KeyName = require('../Common/DEF_LocalStorageKeyName');

var x = new Array();
var y = new Array();
var RateTalbe = new Array();


    // 中獎框位置
    var Rolling_PosNow;
    var Rolling_Start;
    var Rolling_Result;
    var Rolling_Result_StopFrom;

    var Rolling_Delay;            // 目前轉動延遲累計
    var Rolling_Round;          // 轉了幾圈
    var Rolling_Count;          // 停止計數
    var Rolling_Speed;            // 目前轉動速度
    var Rolling_Status;         // 轉動狀態值，用於轉動中的步驟控制
    var Rolling_Time_Total;	// 累積等待Server時間
    var SpinResult  = 0;    // 中獎框位置
    
    var ROLLGIN_GAME_STATUS_IDLE = 0;
    var ROLLGIN_GAME_STATUS_PLAYING = 1;
    var ROLLGIN_GAME_STATUS_ROLLING = 2;
    var ROLLGIN_GAME_STATUS_STOP = 3;
    var ROLLGIN_GAME_STATUS_QUIT = 4;
    
    var LightFrame; // 中獎框的物件
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
        
        PlayerMoney: {
            default: null,
            type: cc.Label
        },
        
        Win_Money : cc.Label,
        Sprite_Button_Light : cc.Sprite,
        
        
        MX : 0,     // 轉盤的中心點
        MY : 0,     // 轉盤的中心點
    },

    // use this for initialization
    onLoad: function () {
        
        var label = this.getComponent(cc.Label);
        cc.log('####### spin label = ' + label );
        cc.log('####### PlayerMoney = ' + this.PlayerMoney.string  );
        cc.log('####### Win_Money = ' + this.Win_Money.string  );
        
        // websocket連線
        this.Net_Init();
        
        // 設定轉動資訊
        this.RollInit();
    },
    
    //==================================================================================================================
    // 點到spin按鈕
    onClickButton: function(){
        cc.log("點到spin按鈕了");   
        
        
        this.current = cc.audioEngine.play(this.audio, false, 1);
        var CheckPlayBetRet = this.CheckPlayBet();
        
        /*
        var Button_RateCtrl_0 = cc.find("Canvas/Layout_RateCtrl/Button_RateCtrl_0");
        var Script_RateCtrlSingle = Button_RateCtrl_0.getChildByName("Script_RateCtrlSingle");
        cc.log("=====Button_RateCtrl_0=" + Button_RateCtrl_0 );
        cc.log("=====Script_RateCtrlSingle=" + Script_RateCtrlSingle );
        cc.log("===== RateValue=" + Script_RateCtrlSingle.RateValue );
        cc.log("===== BetKindStr=" + Script_RateCtrlSingle.BetKindStr );
        */
        var Script_RateCtrlSingle = cc.find("Canvas/Layout_RateCtrl/Button_RateCtrl_0").getComponent("Script_RateCtrlSingle");
        cc.log("=====Script_RateCtrlSingle=" + Script_RateCtrlSingle );
        cc.log("=====Script_RateCtrlSingle.RateValue=" + Script_RateCtrlSingle.RateValue );
         
        var ls = cc.sys.localStorage;
        
        
        var BetKindStr      = ls.getItem(DEF_LS_KeyName.DEF_LS_BET_KIND_STR );
        var account_str     = ls.getItem(DEF_LS_KeyName.DEF_LS_ACCOUNT );
        var password_str    = ls.getItem(DEF_LS_KeyName.DEF_LS_PASSWORD );
        cc.log("#BetKindStr=" + BetKindStr );
        
        var BetKindTmp = BetKindStr.split(',');
        cc.log("#BetKindTmp=" + BetKindTmp );
        cc.log("#BetKindTmp length =" + BetKindTmp.length );
        var BetKind = Array();
        for( var i = 0; i < BetKindTmp.length; i++  )
        {
            BetKind[i] = parseInt(BetKindTmp[i]);
        }
        //
        
        // 檢查押注
        if( CheckPlayBetRet === true )
        {
            // 檢查是否有連線
            if (this.ws.readyState === WebSocket.OPEN ) {
                
                // 組合傳送出去的參數
                var obj = {
                    Account : account_str,
                    PassWord : password_str,
                    BetKind : BetKind
                };
                var params = JSON.stringify(obj);
                console.log("params=" + params );
                
                //var Spinstr = '{"Account":"cat111","Password":"1234","BetKind":[0,1,2,3,4,5,1,1,1]}';
                //console.log("Spinstr=" + Spinstr );
                this.ws.send(params);
            }
            else {
                console.log("cocos WebSocket instance wasn't ready... readyState=" + this.ws.readyState  );
            }
        }
    },

    SetMovePosInfo : function(){
        var xGAdj = 1;
        var yGAdj = 1;
        
        // 左下角位子
        var MAP_X = this.MX - (265 * xGAdj);
        var MAP_Y = this.MY - (150 * yGAdj);
        
        //var MAP_W = 114 * xGAdj, MAP_H = 100 * yGAdj;
        var MAP_W = 88 * xGAdj, MAP_H = 74 * yGAdj;
        
        cc.log('####### MX = ' + this.MX );
        cc.log('####### MY = ' + this.MY );
        cc.log('####### MAP_X = ' + MAP_X );
        cc.log('####### MAP_Y = ' + MAP_Y );
        
        //var x = new Array();
        //var y = new Array();
        
        // 上排
        x[0] = MAP_X + 0 * MAP_W; y[0] = MAP_Y + 6 * MAP_H;
        x[1] = MAP_X + 1 * MAP_W; y[1] = MAP_Y + 6 * MAP_H;
        x[2] = MAP_X + 2 * MAP_W; y[2] = MAP_Y + 6 * MAP_H;
        x[3] = MAP_X + 3 * MAP_W; y[3] = MAP_Y + 6 * MAP_H;
        x[4] = MAP_X + 4 * MAP_W; y[4] = MAP_Y + 6 * MAP_H;
        x[5] = MAP_X + 5 * MAP_W; y[5] = MAP_Y + 6 * MAP_H;
        x[6] = MAP_X + 6 * MAP_W; y[6] = MAP_Y + 6 * MAP_H;
        
        
        // 右排
        x[7]  = MAP_X + 6 * MAP_W; y[7]  = MAP_Y + 5 * MAP_H;
        x[8]  = MAP_X + 6 * MAP_W; y[8]  = MAP_Y + 4 * MAP_H;
        x[9]  = MAP_X + 6 * MAP_W; y[9]  = MAP_Y + 3 * MAP_H;
        x[10] = MAP_X + 6 * MAP_W; y[10] = MAP_Y + 2 * MAP_H;
        x[11] = MAP_X + 6 * MAP_W; y[11] = MAP_Y + 1 * MAP_H;

        // 下排
        x[12] = MAP_X + 6 * MAP_W; y[12] = MAP_Y + 0 * MAP_H;
        x[13] = MAP_X + 5 * MAP_W; y[13] = MAP_Y + 0 * MAP_H;
        x[14] = MAP_X + 4 * MAP_W; y[14] = MAP_Y + 0 * MAP_H;
        x[15] = MAP_X + 3 * MAP_W; y[15] = MAP_Y + 0 * MAP_H;
        x[16] = MAP_X + 2 * MAP_W; y[16] = MAP_Y + 0 * MAP_H;
        x[17] = MAP_X + 1 * MAP_W; y[17] = MAP_Y + 0 * MAP_H;
        x[18] = MAP_X + 0 * MAP_W; y[18] = MAP_Y + 0 * MAP_H;

        // 左排
        x[19] = MAP_X + 0 * MAP_W; y[19] = MAP_Y + 1 * MAP_H;
        x[20] = MAP_X + 0 * MAP_W; y[20] = MAP_Y + 2 * MAP_H;
        x[21] = MAP_X + 0 * MAP_W; y[21] = MAP_Y + 3 * MAP_H;
        x[22] = MAP_X + 0 * MAP_W; y[22] = MAP_Y + 4 * MAP_H;
        x[23] = MAP_X + 0 * MAP_W; y[23] = MAP_Y + 5 * MAP_H;
        
        //SpinResult = 23;
        //var LightFrame = cc.find("Canvas/Sprite_Button_Light");
        //LightFrame.x = x[SpinResult];
        //LightFrame.y = y[SpinResult];
        
        //cc.log('####### LightFrame.x = ' + LightFrame.x );
        //cc.log('####### LightFrame.y = ' + LightFrame.y );
        
        var FadeTo1 = cc.FadeTo.create(1, 150 );
		var FadeTo2 = cc.FadeTo.create(1, 255 );
		var sequence = cc.sequence( FadeTo1, FadeTo2 );
        var repeatforever = cc.repeatForever(sequence);
	    LightFrame.runAction(repeatforever);
	    
        
        RateTalbe[0] = 5;       // 蘋果
        RateTalbe[1] = 20;      // 西瓜
        RateTalbe[2] = 30;      // 星星
        RateTalbe[3] = 40;      // 七
        RateTalbe[4] = 100;     // BAR
        RateTalbe[5] = 20;      // 鈴鐺
        RateTalbe[6] = 15;      // 藍色水果
        RateTalbe[7] = 10;      // 橘子
        RateTalbe[8] = 2;       // 櫻桃
        cc.log("#SetMovePosInfo");  
    },
    
    //==================================================================================================================
    // 檢查玩家的押注是否大於金額
    CheckPlayBet : function(){
        var Label_PlayerBetMoney    = cc.find("Canvas/Label_PlayerBetMoney").getComponent(cc.Label);
        var Label_PlayerMoney       = cc.find("Canvas/Label_PlayerMoney").getComponent(cc.Label);
        cc.log("目前押注金額=" + Label_PlayerBetMoney.string );
        cc.log("目前玩家金額=" + Label_PlayerMoney.string );
        
        var PlayerBetMoney = parseInt(Label_PlayerBetMoney.string);
        var PlayerMoney = parseInt(Label_PlayerMoney.string);
        
        if( PlayerMoney >= PlayerBetMoney )
            return true;
        else
        {
            cc.log("#warning 玩家餘額不足... PlayerMoney=" + PlayerMoney + " PlayerBetMoney=" + PlayerBetMoney);
            return false;
        }
    },
    
    // 開始轉動
    StartRolling : function(){
        RollingGame_Status = enum_ROLLING_STATUS.ROLLGIN_GAME_STATUS_ROLLING;
        Rolling_Time_Total = 0;
        Rolling_Delay = 0;
        Rolling_Count = 0;
        Rolling_Round = 0;          // 已轉圈數
        Rolling_Speed = 1;
        Rolling_Status = 0;			// 起動
    },
    
    //==================================================================================================================
    // 設定轉動資訊
    RollInit : function(){
        
        // 取得中獎框的物件
        LightFrame = cc.find("Canvas/Sprite_Button_Light");
        
        // 設定中獎框的移動軌跡
        this.SetMovePosInfo();
    },
    //==================================================================================================================
    // 網路初始化
    Net_Init : function(){
        
        console.log("###測試 WebSocket 開始...");
        //var ws = new WebSocket("ws://localhost:1234/socket");
        this.ws = new WebSocket( "ws://192.168.1.119:1234/SpinStart");
        var ws = this.ws;
        var PlayerMoney = this.PlayerMoney;
        var Win_Money = this.Win_Money;
        console.log("###測試 WebSocket 開始...222");
        this.ws.onopen = function (event) {
             console.log("cocos Send Text WS was opened.");
         };
        this.ws.onmessage = function (event) {
             console.log("response text msg: " + event.data);
            

            var json = JSON.parse(event.data);
            cc.log("http post 回應 json=" + json );
            var Code = parseInt(json["Code"]);
            var Message = json["Message"];
            cc.log("http post 回應 Code=" + Code );
            cc.log("http post 回應 Message=" + Message );
            
            if( Code == 0 )
            {
                var MessageStr = "#收到Spin的回應";
                cc.log(MessageStr);

                var Data = json["Data"];
                cc.log('#Data 111111 =' + Data );
                
                var Playerinfojson = JSON.parse(Data)
                var UID  = Playerinfojson["UID"];
                var Game_Money = Playerinfojson["Game_Money"];
                var data_Win_Money  = Playerinfojson["Win_Money"];
                SpinResult  = Playerinfojson["SpinResult"];
                cc.log('#UID =' + UID );
                cc.log('#Game_Money =' + Game_Money );
                cc.log('#Win_Money =' + data_Win_Money );
                
                PlayerMoney.string = Game_Money;
                Win_Money.string  = data_Win_Money;
                
                LightFrame.x = x[SpinResult];
                LightFrame.y = y[SpinResult];
                //cc.log('#關閉websocket...' );
                //ws.close();
            }
            else
            {
                var MessageStr = "Spin失敗 Code=" + Code + " Message = " + Message;
                cc.log(MessageStr);
            }
         };
        this.ws.onerror = function (event) {
             console.log("Send Text fired an error");
         };
        this.ws.onclose = function (event) {
             console.log("#GameServer斷線 WebSocket instance closed.");
         };
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
