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
        editbox_Password : cc.EditBox,       // 密碼
        
        audio : cc.AudioClip,

    },

    // use this for initialization
    onLoad: function () {

        //this.audioSource.play();
        this.current = cc.audioEngine.play(this.audio, false, 1);
    },

    onDestroy: function () {
        cc.log("#Scene_Login銷毀");
        cc.audioEngine.stop(this.current);
    },
    
    onButtonClick: function() {
        //this.label_test.string = "測試點擊";
        var account_str = this.editbox_Account.string;
        var password_str = this.editbox_Password.string;
        cc.log("玩家帳號 account_str=" + account_str );
        cc.log("玩家密碼 account_str=" + password_str );
        
        // 暫停音樂
        cc.audioEngine.stop(this.current);
        
        // 轉場
        cc.director.loadScene("Scene_Lobby");
        
        /*
        var url = "http://192.168.1.119:3000/MblieLogin";
        //var params = "Account=" + account_str + "&PassWord=" + password_str;
        var params = "Account=cat111&PassWord=1234&UID=65535";
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
        //xhr.setRequestHeader("Content-Type","text/html;charset=UTF-8");
        
        cc.log("http post params=" + params );
        xhr.send(params);
        xhr["onloadend"] = function(){
            cc.log("這是回應嗎? !!! http post onloadend!!!!");
            var sc = -1
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                sc = 0;
            }
            
            var json = JSON.parse(xhr.responseText)
            cc.log("http post 回應 json=" + json );
            var Code = parseInt(json["Code"]);
            var Message = json["Message"];
            cc.log("http post 回應 Code=" + Code );
            cc.log("http post 回應 Message=" + Message );
            
            // 轉場
            // http://www.cocos.com/docs/creator/scripting/scene-managing.html
            //cc.director.replaceScene( cc.TransitionPageTurn(1, new Scene_Lobby(), false) );
            cc.director.loadScene("Scene_Lobby");
        };
        */
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
