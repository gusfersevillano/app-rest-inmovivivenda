import { connect } from 'mongoose'

export async function startConnection() {
    const url2014 = 'mongodb://gusfer:gusfer1234@clusterinmovivienda-shard-00-00-riqmi.mongodb.net:27017,clusterinmovivienda-shard-00-01-riqmi.mongodb.net:27017,clusterinmovivienda-shard-00-02-riqmi.mongodb.net:27017/test?ssl=true&replicaSet=ClusterInmovivienda-shard-0&authSource=admin&retryWrites=true&w=majority';
    const db = await connect(url2014,{
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
    });
    console.log('Database is connected');
}
