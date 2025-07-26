import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';

jest.setTimeout(10000);

jest.mock('../utils/jwt', () => ({
  generateToken: jest.fn().mockReturnValue('mock-jwt-token'),
  verifyToken: jest.fn().mockReturnValue({ userId: 1 })
})); 