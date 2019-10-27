"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
function startConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const url2014 = 'mongodb://gusfer:gusfer1234@clusterinmovivienda-shard-00-00-riqmi.mongodb.net:27017,clusterinmovivienda-shard-00-01-riqmi.mongodb.net:27017,clusterinmovivienda-shard-00-02-riqmi.mongodb.net:27017/test?ssl=true&replicaSet=ClusterInmovivienda-shard-0&authSource=admin&retryWrites=true&w=majority';
        const db = yield mongoose_1.connect(url2014, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useCreateIndex: true,
        });
        console.log('Database is connected');
    });
}
exports.startConnection = startConnection;
//# sourceMappingURL=database.js.map