module.exports = {
    logger: {
        'name': '<%- project_name %>',
        level: 'info'
    },
    redis:{
        host: '127.0.0.1',
        port: '6739'
    },
    mongo:{
        host: '127.0.0.1',
        port: '27017',
        options:{
            useMongoClient:true
        },
    },
};