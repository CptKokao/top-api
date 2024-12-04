import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
	let service: ReviewService;

	const exec = {
		exec: jest.fn(),
	};
	const reviewRepositoryFactory = () => ({
		find: () => exec,
	});

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ReviewService,
				{
					useFactory: reviewRepositoryFactory,
					provide: getModelToken('ReviewModel'),
				},
			],
		}).compile();

		service = module.get<ReviewService>(ReviewService);
	});

	it('findByProductId', async () => {
		const productId = new Types.ObjectId().toHexString();
		reviewRepositoryFactory()
			.find()
			.exec.mockResolvedValueOnce([{ productId }]);
		const resp = await service.findByProductId(productId);

		expect(resp[0].productId).toBe(productId);
	});
});
