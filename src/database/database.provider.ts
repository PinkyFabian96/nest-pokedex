import { MongooseModule } from '@nestjs/mongoose';
//import { MongoClient } from './../../node_modules/mongodb/src/mongo_client';
import * as mongoose from 'mongoose';

// export const databaseProviders = [
//     {
//       provide: 'DATABASE_CONNECTION',
//       useFactory: async () => await mongoose.connect("mongodb://localhost:27017/nest-pokemon", {
//         // useNewUrlParser:true,
//         // useUnifiedTopology: true,
//       }),
//     },
// ];
mongoose.set('strictQuery', true);
export const databaseProviders = [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => await mongoose.connect("mongodb://localhost:27017/nest-pokemon", {
        connectTimeoutMS:300,
        retryReads:true,
      }),
      
    },
];


// export const databaseProviders = [
//     {
//       provide: 'DATABASE_CONNECTION',
//       useFactory: async () => mongoose.connect('mongodb://localhost:27017/nest-pokemon'),
//     },
// ];