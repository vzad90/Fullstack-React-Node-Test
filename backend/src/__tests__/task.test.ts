import request from 'supertest';
import app from '../app';
import { createTask, getTasks, getTask, getTaskByUserId, updateTask, deleteTask } from '../controllers/task.controller';
import { createTaskInDb, getAllTasksFromDb, getTaskByIdFromDb, getTaskByUserIdFromDb, updateTaskInDb, deleteTaskFromDb } from '../models/task.model';
import { Status } from '@prisma/client';

jest.mock('../models/task.model');

const mockCreateTaskInDb = createTaskInDb as jest.MockedFunction<typeof createTaskInDb>;
const mockGetAllTasksFromDb = getAllTasksFromDb as jest.MockedFunction<typeof getAllTasksFromDb>;
const mockGetTaskByIdFromDb = getTaskByIdFromDb as jest.MockedFunction<typeof getTaskByIdFromDb>;
const mockGetTaskByUserIdFromDb = getTaskByUserIdFromDb as jest.MockedFunction<typeof getTaskByUserIdFromDb>;
const mockUpdateTaskInDb = updateTaskInDb as jest.MockedFunction<typeof updateTaskInDb>;
const mockDeleteTaskFromDb = deleteTaskFromDb as jest.MockedFunction<typeof deleteTaskFromDb>;

describe('Task API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /tasks/create', () => {
    it('should create a new task successfully when authenticated', async () => {
      const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        status: Status.IN_PROGRESS,
        userId: 1
      };

      mockCreateTaskInDb.mockResolvedValue(mockTask);

      const response = await request(app)
        .post('/tasks/create')
        .set('Authorization', 'Bearer valid-token')
        .send({
          title: 'Test Task',
          description: 'Test Description'
        })
        .expect(200);

      expect(response.body).toEqual(mockTask);
      expect(mockCreateTaskInDb).toHaveBeenCalledWith('Test Description', 'Test Task', 1);
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .post('/tasks/create')
        .send({
          title: 'Test Task',
          description: 'Test Description'
        })
        .expect(401);

      expect(response.body).toEqual({ message: 'Unauthorized: No token' });
    });

    it('should return 500 when required fields are missing', async () => {
      const response = await request(app)
        .post('/tasks/create')
        .set('Authorization', 'Bearer valid-token')
        .send({
          title: 'Test Task'
        })
        .expect(200);

      expect(response.body).toHaveProperty('id');
    });
  });

  describe('GET /tasks', () => {
    it('should get all tasks when authenticated', async () => {
      const mockTasks = [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description 1',
          status: Status.IN_PROGRESS,
          userId: 1
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Description 2',
          status: Status.DONE,
          userId: 1
        }
      ];

      mockGetAllTasksFromDb.mockResolvedValue(mockTasks);

      const response = await request(app)
        .get('/tasks')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);

      expect(response.body).toEqual(mockTasks);
      expect(mockGetAllTasksFromDb).toHaveBeenCalled();
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get('/tasks')
        .expect(401);

      expect(response.body).toEqual({ message: 'Unauthorized: No token' });
    });
  });

  describe('GET /tasks/user', () => {
    it('should get tasks by user ID when authenticated', async () => {
      const mockTasks = [
        {
          id: 1,
          title: 'User Task 1',
          description: 'User Description 1',
          status: Status.IN_PROGRESS,
          userId: 1
        }
      ];

      mockGetTaskByUserIdFromDb.mockResolvedValue(mockTasks);

      const response = await request(app)
        .get('/tasks/user')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);

      expect(response.body).toEqual(mockTasks);
      expect(mockGetTaskByUserIdFromDb).toHaveBeenCalledWith(1);
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get('/tasks/user')
        .expect(401);

      expect(response.body).toEqual({ message: 'Unauthorized: No token' });
    });
  });

  describe('GET /tasks/:task_id', () => {
    it('should get a specific task by ID when authenticated', async () => {
      const mockTask = {
        id: 1,
        title: 'Specific Task',
        description: 'Specific Description',
        status: Status.IN_PROGRESS,
        userId: 1
      };

      mockGetTaskByIdFromDb.mockResolvedValue(mockTask);

      const response = await request(app)
        .get('/tasks/1')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);

      expect(response.body).toEqual(mockTask);
      expect(mockGetTaskByIdFromDb).toHaveBeenCalledWith(1);
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get('/tasks/1')
        .expect(401);

      expect(response.body).toEqual({ message: 'Unauthorized: No token' });
    });
  });

  describe('PUT /tasks/:task_id', () => {
    it('should update a task successfully when authenticated', async () => {
      const mockUpdatedTask = {
        id: 1,
        title: 'Updated Task',
        description: 'Updated Description',
        status: Status.DONE,
        userId: 1
      };

      mockUpdateTaskInDb.mockResolvedValue(mockUpdatedTask);

      const response = await request(app)
        .put('/tasks/1')
        .set('Authorization', 'Bearer valid-token')
        .send({
          title: 'Updated Task',
          description: 'Updated Description',
          status: Status.DONE
        })
        .expect(200);

      expect(response.body).toEqual(mockUpdatedTask);
      expect(mockUpdateTaskInDb).toHaveBeenCalledWith({
        title: 'Updated Task',
        description: 'Updated Description',
        status: Status.DONE,
        id: 1,
        userId: 1
      });
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .put('/tasks/1')
        .send({
          title: 'Updated Task',
          description: 'Updated Description'
        })
        .expect(401);

      expect(response.body).toEqual({ message: 'Unauthorized: No token' });
    });
  });

  describe('DELETE /tasks/:task_id', () => {
    it('should delete a task successfully when authenticated', async () => {
      const mockDeletedTask = {
        id: 1,
        title: 'Deleted Task',
        description: 'Deleted Description',
        status: Status.IN_PROGRESS,
        userId: 1
      };

      mockDeleteTaskFromDb.mockResolvedValue(mockDeletedTask);

      const response = await request(app)
        .delete('/tasks/1')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);

      expect(response.body).toEqual(mockDeletedTask);
      expect(mockDeleteTaskFromDb).toHaveBeenCalledWith(1);
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .delete('/tasks/1')
        .expect(401);

      expect(response.body).toEqual({ message: 'Unauthorized: No token' });
    });
  });
}); 