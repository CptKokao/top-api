import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect, Types } from 'mongoose';

const productId = new Types.ObjectId().toHexString();
const testDto = {
	name: 'test name',
	title: 'test title',
	description: 'test description',
	rating: 5,
	productId,
};

const loginDto = {
	login: 'test@test.ru',
	password: '1234',
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', async () => {
		try {
			const response = await request(app.getHttpServer())
				.post('/auth/login')
				.send(loginDto);

			expect(response.status).toBe(200);
			const { body } = response;
			token = body.access_token;
			expect(token).toBeDefined();
		} catch (error) {
			console.error('Ошибка в тесте:', error);
			throw error;
		}
	});

	it('/auth/login (POST) - fail password', async () => {
		try {
			const response = await request(app.getHttpServer())
				.post('/auth/login')
				.send({ ...testDto, password: '2' });

			expect(response.status).toBe(401);
		} catch (error) {
			console.error('Ошибка в тесте:', error);
			throw error;
		}
	});

	it('/auth/login (POST) - fail login', async () => {
		try {
			const response = await request(app.getHttpServer())
				.post('/auth/login')
				.send({ ...testDto, login: 'wrong' });

			expect(response.status).toBe(401);
		} catch (error) {
			console.error('Ошибка в тесте:', error);
			throw error;
		}
	});

	afterAll(() => {
		disconnect();
	});
});
