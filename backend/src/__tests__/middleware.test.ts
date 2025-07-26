import request from 'supertest';
import app from '../app';
import { verifyToken } from '../utils/jwt';

const mockVerifyToken = verifyToken as jest.MockedFunction<typeof verifyToken>;

describe('Auth Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('protect middleware', () => {
    it('should allow access with valid Bearer token', async () => {
      mockVerifyToken.mockReturnValue({ userId: 1 });

      const response = await request(app)
        .get('/tasks')
        .set('Authorization', 'Bearer valid-jwt-token')
        .expect(200);

      expect(mockVerifyToken).toHaveBeenCalledWith('valid-jwt-token');
    });

    it('should return 401 when no Authorization header is provided', async () => {
      const response = await request(app)
        .get('/tasks')
        .expect(401);

      expect(response.body).toEqual({ message: 'Unauthorized: No token' });
    });

    it('should return 401 when Authorization header does not start with Bearer', async () => {
      const response = await request(app)
        .get('/tasks')
        .set('Authorization', 'Invalid valid-jwt-token')
        .expect(401);

      expect(response.body).toEqual({ message: 'Unauthorized: No token' });
    });

    it('should return 401 when token is invalid', async () => {
      mockVerifyToken.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const response = await request(app)
        .get('/tasks')
        .set('Authorization', 'Bearer invalid-jwt-token')
        .expect(401);

      expect(response.body).toEqual({ message: 'Unauthorized: Invalid token' });
      expect(mockVerifyToken).toHaveBeenCalledWith('invalid-jwt-token');
    });

    it('should set req.user with decoded token data', async () => {
      const mockDecodedToken = { userId: 123 };
      mockVerifyToken.mockReturnValue(mockDecodedToken);


      const response = await request(app)
        .get('/tasks/user')
        .set('Authorization', 'Bearer valid-jwt-token')
        .expect(200);

      expect(mockVerifyToken).toHaveBeenCalledWith('valid-jwt-token');
    });
  });
}); 