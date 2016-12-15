// Your code here!

var channel;
var access_token;
var token_type;
var channel_uri;
var pushNotifications = Windows.Networking.PushNotifications;
var channelOperation;
window.onload = function () {
    document.getElementById("btnAuth").onclick = function (evt)
    {
        var data="grant_type=client_credentials&client_id=clientId&client_secret=clientSecret&scope=notify.windows.com";
        var clientId=encodeURIComponent("ms-app://s-1-15-2-2346786232-141831078-426639821-2047194343-2440547371-1667199629-2461356304");
        var clientSecret=encodeURIComponent("0vChyV5KVBwrx+C5cCMJaqyCJDMHVOAL");
        var newData=data.replace("clientId",clientId).replace("clientSecret",clientSecret);
        SendData("POST", "https://login.live.com/accesstoken.srf", newData, [
            {
                header: "Content-Type",
                value: "application/x-www-form-urlencoded"
            }
        ], function (response)
        {
            var data = JSON.parse(response.currentTarget.response);
            access_token = data.access_token;
            token_type = data.token_type;
        })
    }

    document.getElementById("btnChannel").onclick = function (evt)
    {
        channelOperation = pushNotifications.PushNotificationChannelManager.createPushNotificationChannelForApplicationAsync();
        channelOperation.then(function (res) {
            channel_uri = res.uri;
        }, function (err) { });
    }

    document.getElementById("btnSendNotification").onclick = function (evt)
    {
        var xmlData=//"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>"+
            "<toast launch='action=viewAlarm&amp;alarmId=3' scenario='alarm'>"+
              "<visual>"+
                "<binding template='ToastGeneric'>"+
                  "<text>Time to wake up!</text>"+
                  "<text>To prove you're awake, select which of the following fruits is yellow...</text>"+
                "</binding>"+
              "</visual>"+
              "<actions>"+
                "<input id='answer' type='selection' defaultInput='wrongDefault'>"+
                  "<selection id='wrong' content='Orange'/>"+
                  "<selection id='wrongDefault' content='Blueberry'/>"+
                  "<selection id='right' content='Banana'/>"+
                  "<selection id='wrong' content='Avacado'/>"+
                  "<selection id='wrong' content='Cherry'/>"+
                "</input>"+
                "<action activationType='system' arguments='snooze' content=''/>"+
                  "<action activationType='background' arguments='dismiss' content='Dismiss'/>"+
                "</actions>"+
              "</toast>";
        SendData("POST", channel_uri, xmlData, [
            {
                header: "Content-Type",
                value: "text/xml;charset=UTF-8"
            },
            {
                header: "X-WNS-Type",
                value: "wns/toast"
            },
            {
                header: "Authorization",
                value: token_type+" "+access_token
            }
        ], function (response) {
            var abc = response;
        });
    }
}