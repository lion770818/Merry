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
        ScrollView_Lobby : cc.ScrollView,
        
    },

    // use this for initialization
    onLoad: function () {

        cc.log("scrollView 初始化 Start...");
        this.ScrollView_Lobby.node.on('scroll-to-top', this.callback, this);
        this.ScrollView_Lobby.node.on('scrolling', this.callback2, this);
        this.ScrollView_Lobby.node.on('touch-up', this.callback3, this);
        //this.ScrollView_Lobby.node.on('scroll-to-top', this.callback, this);
        cc.log("scrollView 初始化 End...");
    },

    onButtonClick: function() {
        cc.log("點到scrollView按鈕");
    
    
    },
    
    callback: function (event) {
       //这里的 event 是一个 EventCustom 对象，你可以通过 event.detail 获取 ScrollView 组件
       var scrollview = event.detail;
       //do whatever you want with scrollview
       //另外，注意这种方式注册的事件，也无法传递 customEventData
       
       cc.log("點到scrollView callback");
    },
    
    callback2: function (event) {
       //这里的 event 是一个 EventCustom 对象，你可以通过 event.detail 获取 ScrollView 组件
       var scrollview = event.detail;
       //do whatever you want with scrollview
       //另外，注意这种方式注册的事件，也无法传递 customEventData
       
       cc.log("點到scrollView callback2");
    },
    
    callback3: function (event) {
       //这里的 event 是一个 EventCustom 对象，你可以通过 event.detail 获取 ScrollView 组件
       var scrollview = event.detail;
       //do whatever you want with scrollview
       //另外，注意这种方式注册的事件，也无法传递 customEventData
       
       cc.log("點到scrollView callback3 detail = " + scrollview );
       
       cc.log("#要轉場到 Scene_Game 了");
       cc.director.loadScene("Scene_Game");
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
