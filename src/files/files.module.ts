import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';

//localhost:3000/static/xxxx-xx-xx/image.jpg
@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/static',
		}),
	],
	providers: [FilesService],
	controllers: [FilesController],
})
export class FilesModule {}
