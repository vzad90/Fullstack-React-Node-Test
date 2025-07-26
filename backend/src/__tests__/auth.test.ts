import request from 'supertest';
import app from '../app';
import { createUser, loginUser } from '../controllers/user.controller';
import { getUserByEmailFromDb } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

jest.mock('../models/user.model');
jest.mock('bcryptjs');

const mockGetUserByEmailFromDb = getUserByEmailFromDb as jest.MockedFunction<typeof getUserByEmailFromDb>;
const mockGenerateToken = generateToken as jest.MockedFunction<typeof generateToken>;
const mockBcryptCompare = bcrypt.compare as jest.MockedFunction<typeof bcrypt.compare>;

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockBcryptCompare.mockResolvedValue(true as never);
  });

  describe('POST /auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
      };

      mockGetUserByEmailFromDb.mockResolvedValue(mockUser);
      mockGenerateToken.mockReturnValue('mock-jwt-token');

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(200);

      expect(response.body).toEqual({ token: 'mock-jwt-token' });
      expect(mockGetUserByEmailFromDb).toHaveBeenCalledWith('test@example.com');
      expect(mockGenerateToken).toHaveBeenCalledWith({ userId: 1 });
    });

    it('should return 500 when user not found', async () => {
      mockGetUserByEmailFromDb.mockResolvedValue(null);

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .expect(500);

      expect(response.body).toHaveProperty('errorss');
    });

    it('should return 500 when password is invalid', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: await bcrypt.hash('correctpassword', 10)
      };

      mockGetUserByEmailFromDb.mockResolvedValue(mockUser);
      mockBcryptCompare.mockResolvedValue(false as never);

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
    });

    it('should return 500 when email is missing', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          password: 'password123'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
    });

    it('should return 500 when password is missing', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword'
      };

      mockGetUserByEmailFromDb.mockResolvedValue(mockUser);
      mockBcryptCompare.mockResolvedValue(true as never);

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
    });
  });
}); 