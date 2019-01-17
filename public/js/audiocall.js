


var coolPhone = '';


var remoteAudio = new window.Audio();
remoteAudio.autoplay = true;
var incomingCallAudio = new window.Audio();
incomingCallAudio.loop = true;

var eventHandlers = {
    'progress': function (e) {
        console.log('call is in progress');
        console.log('busy is', JsSIP.C.causes.BUSY);
        $('.alert').html("call is in progress");
    },
    'failed': function (data) {
        if (data.cause && data.cause  === JsSIP.C.causes.BUSY) {
            'Người dùng đang bận'
          }
        console.log('call failed with cause: ' +  data.cause);
    },
    'ended': function (e) {
        console.log('call ended with cause: ' + e.cause);
    },
    'confirmed': function (e) {
        console.log('call confirmed event caller', e);
    }
};


var callOptions = {
    eventHandlers: eventHandlers,
    mediaConstraints: {
      audio: true, // only audio calls
      video: false
    }
  };

var session;
function toggleBtn(){
    $('.btnCall').css({'background': 'red'})
}

function ph_addStream() {
    var peerconnection = session.connection;
    session.connection.addEventListener('addstream', (e) =>
    {
        console.log('addstream');
        incomingCallAudio.pause();
        remoteAudio.src = window.URL.createObjectURL(e.stream);
    });
 }

$(document).ready(function () {
    var uri = `sip:1003@shoppingnow.xyz:5060`;
    var socket = new JsSIP.WebSocketInterface('wss://shoppingnow.xyz:7443');
    var configuration = {
        sockets: [socket],
        uri: uri,
        password: '1234',
        session_timers: false
    };

    coolPhone = new JsSIP.UA(configuration);

    coolPhone.on('connected', function (e) {
        console.log("Đã kết nối");
    });

    coolPhone.on('disconnected', function (e) {
        console.log('Mất kết nối');
        // coolPhone.register();
        // coolPhone.start();
    });

    coolPhone.on('registered', function (e) {
        console.log("Đăng ký");
        $('.alert').html("Đăng ký thành công");
    });
    coolPhone.on('unregistered', function (e) {
        console.log("Bỏ đăng ký");
    });
    coolPhone.on('registrationFailed', function (e) {
        console.log("Đăng ký lỗi", e);
    });
    coolPhone.start();
    // coolPhone.register();

    
   
    coolPhone.on('newRTCSession', function(e){
        console.log('new session', e.session);
        var newSession = e.session;
        if(session){ 
            console.log('con session', session);
            e.session.terminate();
            return;
            // session.terminate();
        }
        session = newSession;

        session.on('ended', function(e){
            console.log('Kết thúc cuộc gọi', e);
            // e.cause : nguyên nhân kết thúc: terminate - ngắt cuộc gọi
            session = null;
        });
        session.on('failed', function(e){
            console.log('Cuộc gọi lỗi', JSON.stringify(e));
            $('.alert').html('Cuộc gọi lỗi 111', JSON.stringify(e));
            session = null;
        });
        session.on('accepted', function(e){
            $('.alert').html(`Chấp nhận cuộc gọi`);
            console.log('Chấp nhận cuộc gọi', e);
            console.log('isEstablished', session.isEstablished())
        });
        if(session._direction === 'incoming')
        {
            console.log('Cuộc gọi đến');
            $('.alert').html(`Cuộc gọi đến từ ${session._request.from._display_name}`);
        }

        if(session._direction === 'outgoing')
        {
            console.log('Cuộc gọi đi');
            
            $('.alert').html("Cuộc gọi đi");
        }

        session.on('confirmed',function(e){
            console.log('call is confirmed',e);
            $('.alert').html("call is confirmed");
            // var localStream = session.connection.getSenders()[0];
            // var localStream1 = session.connection.getLocalStreams()[0];
            
            // console.log('localStream', localStream);
            // console.log('localStream cu', localStream1);
            
            // var dtmfSender = session.connection.createDTMFSender(localStream1.getAudioTracks()[0])
            //     session.sendDTMF = function(tone){
            //     dtmfSender.insertDTMF(tone);
            // };
        });

        // session.on('addstream', function(e){
        //     console.log('addstream');
        //     incomingCallAudio.pause();
        //     remoteAudio.src = window.URL.createObjectURL(e.stream);
        // });
    })

    $('.btnConnect').click(function () {
        var name = $('.name').val();
        var serverAddress = $('.server-address').val();
        //ip centos: 35.225.204.204
        // var uri = `sip:${name}@35.225.204.204:5060`;
        // var socket = new JsSIP.WebSocketInterface('ws://35.225.204.204:5066');
    //    var socketId = `ws://${serverAddress}:5066`
        //  var socketId = `wss://${serverAddress}:7443`
        // var socket = new JsSIP.WebSocketInterface(socketId);
        // var uri = `sip:${name}@${serverAddress}:5080`;

        var uri = `sip:1003@shoppingnow.xyz:5060`;
        var socket = new JsSIP.WebSocketInterface('wss://shoppingnow.xyz:7443');
        console.log('uri', uri);
        // console.log('socketId', socketId);
        if (name === null || name === '' || name === 'undefined')
        {
            alert('Chưa nhập địa chỉ người nhận')
            return;
        }
            
        var configuration = {
            sockets: [socket],
            uri: uri,
            password: '1234',
            session_timers: false
        };

        coolPhone = new JsSIP.UA(configuration);

        coolPhone.on('connected', function (e) {
            console.log("Đã kết nối");
        });

        coolPhone.on('disconnected', function (e) {
            console.log('Mất kết nối');
            // coolPhone.register();
            // coolPhone.start();
        });

        coolPhone.on('registered', function (e) {
            console.log("Đăng ký");
            $('.alert').html("Đăng ký thành công");
        });
        coolPhone.on('unregistered', function (e) {
            console.log("Bỏ đăng ký");
        });
        coolPhone.on('registrationFailed', function (e) {
            console.log("Đăng ký lỗi", e);
        });
        coolPhone.start();
        // coolPhone.register();

        
       
        coolPhone.on('newRTCSession', function(e){
            console.log('new session', e.session);
            var newSession = e.session;
            if(session){ 
                console.log('con session', session);
                e.session.terminate();
                return;
                // session.terminate();
            }
            session = newSession;

            session.on('ended', function(e){
                console.log('Kết thúc cuộc gọi', e);
                // e.cause : nguyên nhân kết thúc: terminate - ngắt cuộc gọi
                session = null;
            });
            session.on('failed', function(e){
                console.log('Cuộc gọi lỗi', JSON.stringify(e));
                $('.alert').html('Cuộc gọi lỗi 111', JSON.stringify(e));
                session = null;
            });
            session.on('accepted', function(e){
                $('.alert').html(`Chấp nhận cuộc gọi`);
                console.log('Chấp nhận cuộc gọi', e);
                console.log('isEstablished', session.isEstablished())
            });
            if(session._direction === 'incoming')
            {
                console.log('Cuộc gọi đến');
                $('.alert').html(`Cuộc gọi đến từ ${session._request.from._display_name}`);
            }

            if(session._direction === 'outgoing')
            {
                console.log('Cuộc gọi đi');
                
                $('.alert').html("Cuộc gọi đi");
            }

            session.on('confirmed',function(e){
                console.log('call is confirmed',e);
                $('.alert').html("call is confirmed");
                // var localStream = session.connection.getSenders()[0];
                // var localStream1 = session.connection.getLocalStreams()[0];
                
                // console.log('localStream', localStream);
                // console.log('localStream cu', localStream1);
                
                // var dtmfSender = session.connection.createDTMFSender(localStream1.getAudioTracks()[0])
                //     session.sendDTMF = function(tone){
                //     dtmfSender.insertDTMF(tone);
                // };
            });

            // session.on('addstream', function(e){
            //     console.log('addstream');
            //     incomingCallAudio.pause();
            //     remoteAudio.src = window.URL.createObjectURL(e.stream);
            // });
        })
    })
    $('.btnListen').click(function(e){
        console.log('session', session)
        session.answer(callOptions);
        ph_addStream();
    })
    $('.btnEnd').click(function(e){
        session.terminate();
    })
    
    $('.btnMessage').click(function () {
        var receivername = $('.receivername').val();
        var uri = `sip:${receivername}@35.225.204.204:5060`;

        var text = 'Hello Bob!';
        var eventHandlers = {
            'succeeded': function (e) {
                console.log("Gửi tin nhắn thành công");
            },
            'failed': function (e) {
                console.log("Gửi tin nhắn thất bại");
            }
        };

        var options = {
            'eventHandlers': eventHandlers
        };

        coolPhone.sendMessage(uri, text, options);
    })

    $('.btnCall').click(function () {
        $('.lt-xbutton-icons').toggleClass('onCall');
        $('.lt-xbutton-phone-icon').toggleClass('phone-icon');
        return;
        console.log('vao goi');
        // var receivername = $('.receivername').val();
        var uri = `sip:1001@35.225.204.204:5060`;
        console.log('uri', uri);
        var session = coolPhone.call(uri, callOptions);
        ph_addStream();
    })
    $('.btnReject').click(function(e){
        session.terminate();
    })
    
    $('.btnDetect').click(function(e){
        var hasMicrophone =  DetectRTC.hasMicrophone
        var isWebRTCSupported = DetectRTC.isWebRTCSupported
        var browserName = DetectRTC.browser.name
        
        DetectRTC.load(function(){
            var microp = DetectRTC.hasMicrophone
            console.log('microp', microp)
            if(DetectRTC.audioInputDevices.length) {
                console.log('Found microphone devices', DetectRTC.audioInputDevices.length)
                // output += '<br>Found microphone devices: ' + DetectRTC.audioInputDevices.length;
    
                var labels = [];
                DetectRTC.audioInputDevices.forEach(function(device) {
                    console.log('microphone devices', device.label)
                    // labels.push(device.label);
                });
    
                // output += '<br><div style="margin-left:15px;">' + labels.join('<br>') + '</div>';
            }
            else{
                console.log('ko có thiết bị')
            }
        })
        
        // console.log('hasMicrophone', hasMicrophone, 'isWebRTCSupported', isWebRTCSupported)
        // console.log('browserName', browserName)
    })

})
