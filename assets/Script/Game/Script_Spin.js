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
    },

    // use this for initialization
    onLoad: function () {
        
        var label = this.getComponent(cc.Label);
        cc.log('####### spin label = ' + label );
        cc.log('####### PlayerMoney = ' + this.PlayerMoney.string  );
        cc.log('####### Win_Money = ' + this.Win_Money.string  );
        
        // websocket連線
        this.Net_Init();
    },
    
    onClickButton: function(){
        cc.log("點到spin按鈕了");   
        this.current = cc.audioEngine.play(this.audio, false, 1);
     
        if (this.ws.readyState === WebSocket.OPEN) {
            var Spinstr = '{"Account":"cat111","Password":"1234","BetKind":[0,1,2,3,4,5,1,1,1]}';
            console.log("Spinstr=" + Spinstr );
            this.ws.send(Spinstr);
        }
        else {
            console.log("cocos WebSocket instance wasn't ready... readyState=" + this.ws.readyState  );
        }
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

                var Data        = json["Data"];
                cc.log('#Data 111111 =' + Data );
                
                var Playerinfojson = JSON.parse(Data)
                var UID  = Playerinfojson["UID"];
                var Game_Money = Playerinfojson["Game_Money"];
                var data_Win_Money  = Playerinfojson["Win_Money"];
                cc.log('#UID =' + UID );
                cc.log('#Game_Money =' + Game_Money );
                cc.log('#Win_Money =' + data_Win_Money );
                
                PlayerMoney.string = Game_Money;
                Win_Money.string  = data_Win_Money;
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
