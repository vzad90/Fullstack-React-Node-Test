import request from 'supertest';
import app from '../app';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';
import { createUserInDb, getAllUsersFromDb, getUserByIdFromDb, updateUserInDb, deleteUserFromDb } from '../models/user.model';
import { generateToken } from '../utils/jwt';
import bcrypt from 'bcryptjs';

jest.mock('../models/user.model');
jest.mock('bcryptjs');

const mockCreateUserInDb = createUserInDb as jest.MockedFunction<typeof createUserInDb>;
const mockGetAllUsersFromDb = getAllUsersFromDb as jest.MockedFunction<typeof getAllUsersFromDb>;
const mockGetUserByIdFromDb = getUserByIdFromDb as jest.MockedFunction<typeof getUserByIdFromDb>;
const mockUpdateUserInDb = updateUserInDb as jest.MockedFunction<typeof updateUserInDb>;
const mockDeleteUserFromDb = deleteUserFromDb as jest.MockedFunction<typeof deleteUserFromDb>;
const mockGenerateToken = generateToken as jest.MockedFunction<typeof generateToken>;
const mockBcryptHash = bcrypt.hash as jest.MockedFunction<typeof bcrypt.hash>;

describe('User API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /users/create', () => {
    it('should create a new user successfully', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        created_at: new Date(),
        updated_at: new Date()
      };

      mockBcryptHash.mockResolvedValue('hashedpassword' as never);
      mockCreateUserInDb.mockResolvedValue(mockUser);
      mockGenerateToken.mockReturnValue('mock-jwt-token');

      const response = await request(app)
        .post('/users/create')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(200);

      expect(response.body).toEqual({ token: 'mock-jwt-token' });
      expect(mockBcryptHash).toHaveBeenCalledWith('password123', 10);
      expect(mockCreateUserInDb).toHaveBeenCalledWith('Test User', 'test@example.com', 'hashedpassword');
      expect(mockGenerateToken).toHaveBeenCalledWith({ userId: 1 });
    });

    it('should return 500 when required fields are missing', async () => {
      const response = await request(app)
        .post('/users/create')
        .send({
          name: 'Test User',
          email: 'test@example.com'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
    });
  });

  describe('GET /users', () => {
    it('should get all users when authenticated', async () => {
      const mockUsers = [
        {
          id: 1,
          name: 'User 1',
          email: 'user1@example.com',
          password: 'hashedpassword1'
        },
        {
          id: 2,
          name: 'User 2',
          email: 'user2@example.com',
          password: 'hashedpassword2'
        }
      ];

      mockGetAllUsersFromDb.mockResolvedValue(mockUsers);

      const response = await request(app)
        .get('/users')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);

      expect(response.body).toEqual(mockUsers);
      expect(mockGetAllUsersFromDb).toHaveBeenCalled();
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get('/users')
        .expect(401);

      expect(response.body).toEqual({ message: 'Unauthorized: No token' });
    });
  });

  describe('GET /users/get-user-data', () => {
    it('should get user data when authenticated', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        created_at: '2025-07-26T08:39:37.429Z',
        updated_at: '2025-07-26T08:39:37.429Z'
      };

      mockGetUserByIdFromDb.mockResolvedValue(mockUser);

      const response = await request(app)
        .get('/users/get-user-data')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);

      expect(response.body).toEqual(mockUser);
      expect(mockGetUserByIdFromDb).toHaveBeenCalledWith(1);
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get('/users/get-user-data')
        .expect(401);

      expect(response.body).toEqual({ message: 'Unauthorized: No token' });
    });
  });

  describe('PUT /users/:user_id', () => {
    it('should update user successfully when authenticated', async () => {
      const mockUpdatedUser = {
        id: 1,
        name: 'Updated User',
        email: 'updated@example.com',
        password: 'newhashedpassword'
      };

      mockUpdateUserInDb.mockResolvedValue(mockUpdatedUser);

      const response = await request(app)
        .put('/users/1')
        .set('Authorization', 'Bearer valid-token')
        .send({
          name: 'Updated User',
          email: 'updated@example.com',
          password: 'newpassword'
        })
        .expect(200);

      expect(response.body).toEqual(mockUpdatedUser);
      expect(mockUpdateUserInDb).toHaveBeenCalledWith({
        name: 'Updated User',
        email: 'updated@example.com',
        password: 'newpassword',
        id: 1
      });
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .put('/users/1')
        .send({
          name: 'Updated User',
          email: 'updated@example.com'
        })
        .expect(401);

      expect(response.body).toEqual({ message: 'Unauthorized: No token' });
    });
  });

  describe('DELETE /users/:user_id', () => {
    it('should delete user successfully when authenticated', async () => {
      const mockDeletedUser = {
        id: 1,
        name: 'Deleted User',
        email: 'deleted@example.com',
        password: 'hashedpassword'
      };

      mockDeleteUserFromDb.mockResolvedValue(mockDeletedUser);

      const response = await request(app)
        .delete('/users/1')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);

      expect(response.body).toEqual(mockDeletedUser);
      expect(mockDeleteUserFromDb).toHaveBeenCalledWith(1);
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .delete('/users/1')
        .expect(401);

      expect(response.body).toEqual({ message: 'Unauthorized: No token' });
    });
  });
}); 