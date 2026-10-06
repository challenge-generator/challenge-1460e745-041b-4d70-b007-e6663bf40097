import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { LoanRequestController } from './loan-request.controller';
import { LoanRequestService } from '../../application/loan-request.service';
import { LoanRequestStatus } from '../../domain/entities/loan-request.entity';

describe('LoanRequestController', () => {
  let controller: LoanRequestController;
  let service: LoanRequestService;

  const mockLoanRequest = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    operationNumber: 'OP-2024-001',
    channel: 'WEB',
    requestedAmount: 10000,
    termMonths: 12,
    status: LoanRequestStatus.PENDING_ANTIFRAUD,
    applicantName: 'John Doe',
    applicantEmail: 'john.doe@example.com',
    applicantDocumentNumber: '12345678',
    applicantPhone: '+1234567890',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockLoanRequestService = {
    create: jest.fn().mockResolvedValue(mockLoanRequest),
    findById: jest.fn().mockResolvedValue(mockLoanRequest),
    findAll: jest.fn().mockResolvedValue([mockLoanRequest]),
    updateStatus: jest.fn().mockResolvedValue({ ...mockLoanRequest, status: LoanRequestStatus.APPROVED }),
    processLoanRequest: jest.fn().mockResolvedValue({ ...mockLoanRequest, status: LoanRequestStatus.APPROVED }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanRequestController],
      providers: [
        {
          provide: LoanRequestService,
          useValue: mockLoanRequestService,
        },
      ],
    }).compile();

    controller = module.get<LoanRequestController>(LoanRequestController);
    service = module.get<LoanRequestService>(LoanRequestService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new loan request successfully', async () => {
      const createDto = {
        operationNumber: 'OP-2024-001',
        channel: 'WEB',
        requestedAmount: 10000,
        termMonths: 12,
        applicantName: 'John Doe',
        applicantEmail: 'john.doe@example.com',
        applicantDocumentNumber: '12345678',
        applicantPhone: '+1234567890',
      };

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockLoanRequest);
    });

    it('should handle errors when creating loan request fails', async () => {
      const createDto = {
        operationNumber: 'OP-2024-001',
        channel: 'WEB',
        requestedAmount: 10000,
        termMonths: 12,
        applicantName: 'John Doe',
        applicantEmail: 'john.doe@example.com',
        applicantDocumentNumber: '12345678',
      };

      mockLoanRequestService.create.mockRejectedValueOnce(new Error('Database error'));

      await expect(controller.create(createDto)).rejects.toThrow('Database error');
    });
  });

  describe('findById', () => {
    it('should return a loan request by id', async () => {
      const result = await controller.findById('123e4567-e89b-12d3-a456-426614174000');

      expect(service.findById).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual(mockLoanRequest);
    });

    it('should return null when loan request not found', async () => {
      mockLoanRequestService.findById.mockResolvedValueOnce(null);

      const result = await controller.findById('non-existent-id');

      expect(service.findById).toHaveBeenCalledWith('non-existent-id');
      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return all loan requests', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockLoanRequest]);
    });

    it('should return empty array when no loan requests exist', async () => {
      mockLoanRequestService.findAll.mockResolvedValueOnce([]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('updateStatus', () => {
    it('should update loan request status', async () => {
      const updateDto = { status: LoanRequestStatus.APPROVED };
      const result = await controller.updateStatus('123e4567-e89b-12d3-a456-426614174000', updateDto);

      expect(service.updateStatus).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000', LoanRequestStatus.APPROVED);
      expect(result.status).toBe(LoanRequestStatus.APPROVED);
    });
  });

  describe('processLoanRequest', () => {
    it('should process a loan request through all stages', async () => {
      const result = await controller.processLoanRequest('123e4567-e89b-12d3-a456-426614174000');

      expect(service.processLoanRequest).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
      expect(result.status).toBe(LoanRequestStatus.APPROVED);
    });

    it('should handle processing errors gracefully', async () => {
      mockLoanRequestService.processLoanRequest.mockRejectedValueOnce(
        new Error('Processing timeout')
      );

      await expect(
        controller.processLoanRequest('123e4567-e89b-12d3-a456-426614174000')
      ).rejects.toThrow('Processing timeout');
    });
  });