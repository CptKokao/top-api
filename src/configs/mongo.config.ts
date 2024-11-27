import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (configService: ConfigService): Promise<MongooseModuleOptions> => {
	return {
		uri: getMongoString(configService),
		...getMongoOptions(),
	};
};

const getMongoString = (configService: ConfigService) => {
	const LOGIN = configService.get('MONGO_LOGIN');
	const PASSWORD = configService.get('MONGO_PASSWORD');
	const DB = configService.get('MONGO_AUTH_DB');
	const HOST = configService.get('MONGO_HOST');
	const PORT = configService.get('MONGO_PORT');

	return `mongodb://${LOGIN}:${PASSWORD}@${HOST}:${PORT}/${DB}`;
};
const getMongoOptions = () => ({
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
