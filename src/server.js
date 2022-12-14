// memuat kode untuk membuat, mengkonfigurasi dan menjalankan server HTTP menggunakan Hapi framework

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port : 5000,
        host : 'localhost',
        routes : {
            cors : {
                origin : ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server working at ${server.info.uri}`);
};

init();

