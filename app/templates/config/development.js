module.exports = {
    keys: {
        tokenKey: '1qaz<.><$><#>...',
        md5Salt: '1qazxsw2',
        SHA256Key: '---..--$~$'
    },
    pgConfig: {
        user: 'postgres',
        database: 'postgres',
        password: '1qaz2wsx',
        host: '45.32.15.120',
        port: '5431',
        max: 20,
        poolIdleTimeout: 30000,
        reapIntervalMillis: 10000,
        //连接最大空闲时间 3s
        idleTimeoutMillis: 3000
    },
    emailConfig: {
        apiKey: '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',
        fromMail: 'BlockTrending@bt.com'
    },
    logger: {
        name: 'bt',
        level: 'info'
    },
    redis: {
        host: '127.0.0.1',
        port: '6379',
        password: null,
        db: 0
    },
    smsConfig: {
        SignName: 'BT',
        TemplateCode: 'SMS_133969226'
    },

    loggerLevel: 'info',

    hostName: 'http://beta.blocktrending.com',
    //45.76.219.180 data.blocktrending.com
    dataServer: 'http://45.76.219.180:9000',
    // dataServer: '45.76.219.180',
};