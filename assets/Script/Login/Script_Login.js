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
        label_test : cc.Label,
        button_test : cc.Button,
        
        editbox_Account : cc.EditBox,       // 帳號
        editbox_Password : cc.EditBox,      // 密碼
        
        audio : cc.AudioClip,               // 背景音 
        ws : WebSocket,                     // WebSocket 物件
    },

    //==================================================================================================================
    // 物件初始化    
    onLoad: function () {

        //this.audioSource.play();
        this.current = cc.audioEngine.play(this.audio, false, 1);
        //cc.SpriteFrameCache.AddSpriteFrames("res/Texture/");
        
        this.Net_Init();
        /*
        console.log("###測試 WebSocket 開始...");
        //var ws = new WebSocket("ws://localhost:1234/socket");
        this.ws = new WebSocket( "ws://192.168.1.119:1234/Login");
        console.log("###測試 WebSocket 開始...222");
        this.ws.onopen = function (event) {
             console.log("cocos Send Text WS was opened.");
         };
        this.ws.onmessage = function (event) {
             console.log("response text msg: " + event.data);
         };
        this.ws.onerror = function (event) {
             console.log("Send Text fired an error");
         };
        this.ws.onclose = function (event) {
             console.log("WebSocket instance closed.");
         };
         
         // 以秒为单位的时间间隔
         var interval = 5;
         // 重复次数
         var repeat = 3;
         // 开始延时
         var delay = 10;
         var ws = this.ws;
         this.schedule(function() {
             // 这里的 this 指向 component
             console.log("doSomething.....");
             
             if (ws.readyState === WebSocket.OPEN) {
                 var Loginstr = '{"Account":"cat111","Password":"1234","Married":false}';
                 console.log("Loginstr=" + Loginstr );
                 ws.send(Loginstr);
             }
             else {
                 console.log("cocos WebSocket instance wasn't ready... readyState=" + ws.readyState  );
             }
             
         }, interval, repeat, delay);
        */
    },

    //==================================================================================================================
    // 銷毀
    onDestroy: function () {
        cc.log("#Scene_Login銷毀");
        cc.audioEngine.stop(this.current);
    },
    
    //==================================================================================================================
    // 離開遊戲
    onMyQuit:function() {
        cc.log("#MyQuit");
        // 暫停音樂
        cc.audioEngine.stop(this.current);
        // 轉場
        // http://www.cocos.com/docs/creator/scripting/scene-managing.html
        //cc.director.replaceScene( cc.TransitionPageTurn(1, new Scene_Lobby(), false) );
        cc.director.loadScene("Scene_Lobby");
    },
    
    //==================================================================================================================
    // 儲存玩家資訊
    SavePlayerInfo : function( PlayerInfo, Money, UID ){
        cc.log("玩家資訊 PlayerInfo=" + PlayerInfo );
        cc.log("玩家金錢 Money=" + Money );
        cc.log("暫時替代的機台編號 UID=" + UID );
        
        var ls = cc.sys.localStorage;
        ls.setItem(DEF_LS_KeyName.DEF_LS_PLAYER, PlayerInfo );
        ls.setItem(DEF_LS_KeyName.DEF_LS_PLAYER_MONEY, Money );
        ls.setItem(DEF_LS_KeyName.DEF_LS_MACHINE_NUM, UID );
    },
    
    //==================================================================================================================
    // 網路初始化
    Net_Init : function(){
        
        var SavePlayerInfo = this.SavePlayerInfo;
        
        console.log("###測試 WebSocket 開始...");
        //var ws = new WebSocket("ws://localhost:1234/socket");
        this.ws = new WebSocket( "ws://192.168.1.119:1234/Login");
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
                cc.log("#要轉場到Scene_Lobby了");

                cc.log("儲存玩家資訊到localStorage");
                var Data        = json["Data"];
                var Game_Money  = json["Game_Money"];
                
                var Playerinfojson = JSON.parse(Data)
                var UID  = Playerinfojson["UID"];
                cc.log('#Data =' + Data );
                cc.log('#Game_Money =' + Game_Money );
                cc.log('#UID =' + UID );
                SavePlayerInfo(Data,Game_Money,UID);
                
                
                // 轉場
                // http://www.cocos.com/docs/creator/scripting/scene-managing.html
                //cc.director.replaceScene( cc.TransitionPageTurn(1, new Scene_Lobby(), false) );
                cc.director.loadScene("Scene_Lobby");
            }
            else
            {
                cc.log("登入失敗 Code=" + Code + " Message = " + Message );
            }
         };
        this.ws.onerror = function (event) {
             console.log("Send Text fired an error");
         };
        this.ws.onclose = function (event) {
             console.log("WebSocket instance closed.");
         };
    },
    
    //==================================================================================================================
    // 網路登入 ( WS 協定 傳送JSON的登入資訊到golang的GameServer上 )
    Net_Login : function( params ){
        
        console.log("###Net_Login params=" + params );
        
        if (this.ws.readyState === WebSocket.OPEN) {
            var Loginstr = '{"Account":"cat111","Password":"1234","Married":false}';
            console.log("Loginstr=" + Loginstr );
            this.ws.send(params);
        }
        else {
            console.log("cocos WebSocket instance wasn't ready... readyState=" + this.ws.readyState  );
        }
    },
    

    //==================================================================================================================
    // 登入按鈕按下
    onButtonClick: function() {
        //this.label_test.string = "測試點擊";
        var account_str = this.editbox_Account.string;
        var password_str = this.editbox_Password.string;
        cc.log("玩家帳號 account_str=" + account_str );
        cc.log("玩家密碼 account_str=" + password_str );
        
        // 暫停音樂
        cc.audioEngine.stop(this.current);
        
        // 轉場
        //cc.director.loadScene("Scene_Lobby");
        
        //var params = "Account={0}&PassWord={1}&UID={2}";
        //params = params.replace("{0}", account_str);
        //params = params.replace("{1}", password_str);
        //params = params.replace("{2}", 65535);
        
        var obj = {
            Account : account_str,
            PassWord : password_str,
            UID : 65535
        };
        var params = JSON.stringify(obj);
        
        this.Net_Login(params);
        
        /*
        var url = "http://192.168.1.119:3000/MblieLogin";
        //var params = "Account=" + account_str + "&PassWord=" + password_str;
        //var params = "Account=cat111&PassWord=1234&UID=65535";
        var params = "Account={0}&PassWord={1}&UID={2}";
        params = params.replace("{0}", account_str);
        params = params.replace("{1}", password_str);
        params = params.replace("{2}", 65535);
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
        //xhr.setRequestHeader("Content-Type","text/html;charset=UTF-8");
        
        cc.log("http post params=" + params );
        xhr.send(params);
        xhr["onloadend"] = function() {
            
            cc.log("http post onloadend!!!!");
            
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                
                var json = JSON.parse(xhr.responseText)
                cc.log("http post 回應 json=" + json );
                var Code = parseInt(json["Code"]);
                var Message = json["Message"];
                cc.log("http post 回應 Code=" + Code );
                cc.log("http post 回應 Message=" + Message );
                
                if( Code == 0 )
                {
                    cc.log("#要轉場到Scene_Lobby了");
                    // 轉場
                    // http://www.cocos.com/docs/creator/scripting/scene-managing.html
                    //cc.director.replaceScene( cc.TransitionPageTurn(1, new Scene_Lobby(), false) );
                    cc.director.loadScene("Scene_Lobby");
                }
                else
                {
                    cc.log("登入失敗 Code=" + Code + " Message = " + Message );
                }
            }
            else
                cc.log("http post 回應失敗 readyState=" + xhr.readyState + " status= " + xhr.status );
        };
        */
        
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
