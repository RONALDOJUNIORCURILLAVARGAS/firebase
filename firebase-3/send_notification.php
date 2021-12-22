<?php
    function sendNotification(){
        $url = "https://fcm.googleapis.com/fcm/send";
        $fields = array(
            "to" => $_REQUEST['token'],
            "notification"=> array(
                "body" => $_REQUEST['message'],
                "title"=> $_REQUEST['title'],
                "icon" => $_REQUEST['icon'],
                "click_action"=> $_REQUEST['click_Action']
            )
        );
        $headers = array(
            'Authorization: key=AAAAN5zbBYI:APA91bGSUnSs4MqUtfwo3VrYOndEdaQl4SJAYUJtF2qIQ5l8jXob3IiFm1s8RyHzRpNMB4LTpC8NNM5F0sap8U-hBHBClCRTcxq6hoS8fn7-rdUFINYx-zd7ghpgtPNTEFUmfdKKBOO6',
            'Content-Type: application/json'
        );
        $ch=curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
        
        $result = curl_exec($ch);
        print_r($result);
        curl_close($ch);
    }

    sendNotification();

?>