var user = data.user_credentials;

var coolPhone = null;
var call callSession = null;

var socket = new JsSIP.WebSocketInterface('wss://'+user.USER_PROXY+':8089/ws');

var configuration = {
               'sockets': [socket],
               'uri': 'sip:'+user.USER_EXTENSION+'@'+user.USER_PROXY,
               'password':  user.USER_EXT_PASS,
               'realm': 'asterisk'
};

coolPhone = new JsSIP.UA(configuration);
coolPhone.start();

coolPhone.on('newRTCSession', function(e){
               callSession = e.session;
});

function ph_call(number) {
   var options = {
       mediaConstraints: {'audio': true, 'video': false},
       rtcOfferConstraints: {'offerToReceiveAudio': true, 'offerToReceiveVideo': false},
       sessionTimersExpires: 7200
   };

    coolPhone.call(number, options);
   ph_addStream()
}

function ph_answer() {
   var options = {
       mediaConstraints: {'audio': true, 'video': false},
       rtcOfferConstraints: {'offerToReceiveAudio': true, 'offerToReceiveVideo': false},
       sessionTimersExpires: 7200
   };

    callSession.answer(options);
   ph_addStream();
}

function ph_addStream() {
   var peerconnection = callSession.connection;
   callSession.connection.addEventListener('addstream', (event) =>
   {
     remoteView.srcObject = event.stream;
   });
}