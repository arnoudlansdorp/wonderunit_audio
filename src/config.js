const os = require('os')

module.exports = {
    listenIp: '52.201.225.159',
    listenPort: 443,
    // sslCrt: '../ssl/cert.pem',
    // sslKey: '../ssl/key.pem',
    sslCrt: '../ssl/rootCA.pem',
    sslKey: '../ssl/rootCA-key.pem',
    
    mediasoup: {
      // Worker settings
      numWorkers : Object.keys(os.cpus()).length,
      worker: {
        rtcMinPort: 10000,
        rtcMaxPort: 10100,
        logLevel: 'warn',
        logTags: [
          'info',
          'ice',
          'dtls',
          'rtp',
          'srtp',
          'rtcp',
          // 'rtx',
          // 'bwe',
          // 'score',
          // 'simulcast',
          // 'svc'
        ],
      },
      // Router settings
      router: {
        mediaCodecs:
          [
            {
              kind: 'audio',
              mimeType: 'audio/opus',
              clockRate: 48000,
              channels: 2
            },
            {
              kind: 'video',
              mimeType: 'video/VP8',
              clockRate: 90000,
              parameters:
                {
                  'x-google-start-bitrate': 1000
                }
            },
          ]
      },
    // WebRtcTransport settings
    webRtcTransport: {
        listenIps: [
          {
            ip: '52.201.225.159',      
            announcedIp:'52.201.225.159' // replace by public IP address
          }
        ],
        maxIncomingBitrate: 1500000,
        initialAvailableOutgoingBitrate: 1000000
    },
    }
  };
  
