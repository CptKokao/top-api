import { ConfigService } from '@nestjs/config';

export const getJWTConfig = (configService: ConfigService) => {
	return { secret: configService.get('JWT_SECRET') };
};
