import { Injectable } from '@nestjs/common';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPageModel.name)
		private readonly topPageModel: Model<TopPageModel>,
	) {}

	async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec();
	}

	async findByAlias(alias: string) {
		return this.topPageModel.findOne({ alias }).exec();
	}

	// async findAll() {
	// 	return this.topPageModel.find({}).exec();
	// }

	async findByCategory(firstCategory: TopLevelCategory) {
		return this.topPageModel
			.findOne(
				{ firstCategory },
				{ alias: 1, secondCategory: 1, title: 1 },
			)
			.exec();
	}
	// async findByCategory(firstCategory: TopLevelCategory) {
	// 	return this.topPageModel
	// 		.aggregate()
	// 		.match({
	// 			firstCategory,
	// 		})
	// 		.group({
	// 			_id: { secondCategory: '$secondCategory' },
	// 			pages: {
	// 				$push: {
	// 					alias: '$alias',
	// 					title: '$title',
	// 					_id: '$_id',
	// 					category: '$category',
	// 				},
	// 			},
	// 		})
	// 		.exec();
	// }

	async findByText(text: string) {
		return this.topPageModel
			.find({ $text: { $search: text, $caseSensitive: false } })
			.exec();
	}

	async deleteById(id: string) {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string | Types.ObjectId, dto: CreateTopPageDto) {
		return this.topPageModel
			.findByIdAndUpdate(id, dto, { new: true })
			.exec();
	}

	// async findForHhUpdate(date: Date) {
	// 	return this.topPageModel
	// 		.find({
	// 			firstCategory: 0,
	// 			$or: [
	// 				{ 'hh.updatedAt': { $lt: addDays(date, -1) } },
	// 				{ 'hh.updatedAt': { $exists: false } },
	// 			],
	// 		})
	// 		.exec();
	// }
}
