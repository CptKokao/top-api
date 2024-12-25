import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { FileElementResponse } from './dto/file-element.response';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FilesService {
	async saveFiles(
		files: Express.Multer.File[],
	): Promise<FileElementResponse[]> {
		const dataFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${path}/uploads/${dataFolder}`;
		await ensureDir(uploadFolder);
		const res: FileElementResponse[] = [];

		for (const file of files) {
			await writeFile(
				`${uploadFolder}/${file.originalname}`,
				file.buffer,
			);

			res.push({
				url: `${dataFolder}/${file.originalname}`,
				id: file.originalname,
			});
		}

		return res;
	}
}
