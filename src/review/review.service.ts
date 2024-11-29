import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewModel>) {}

	async create(dto: CreateReviewDto): Promise<ReviewModel> {
		return this.reviewModel.create(dto);
	}

	async delete(id: string): Promise<ReviewModel | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(productId: string): Promise<ReviewModel[]> {
		return this.reviewModel.find({ productId }).exec();
	}
	async deleteByProductId(productId: string) {
		return this.reviewModel.deleteMany({ productId }).exec();
	}
}
