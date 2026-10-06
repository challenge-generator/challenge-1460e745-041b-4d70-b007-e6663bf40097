import { Test, TestingModule } from '@nestjs/testing';
import { LoanRequestService, CreateLoanRequestInput } from './loan-request.service';
import { LoanRequestRepository } from '../domain/ports/loan-request.repository';
import { LoanRequest, LoanRequestStatus } from '../domain/entities/loan-request.entity';
import { WinstonLogger } from '../infrastructure/logging/winston.logger';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('LoanRequestService', () => {
  let service: LoanRequestService;
  let repository: jest.Mocked<LoanRequestRepository>;
  let logger: jest.Mocked<WinstonLogger>;

  const mockLoanRequest: LoanRequest = {
    id: 'test-uuid-123',
    operationNumber: 'OP-2024-001',
    channel: 'DIGITAL',
    status: LoanRequestStatus.PENDING,
    applicantName: 'Juan Pérez',
    applicantDocument: '12345678',
    requestedAmount: 50000,
    currency: 'USD',
    termMonths: 12,
    interestRate: 0.15,
    destinationAccount: 'ACC-123456',
    antifraudResult: null,
    riskBureauResult: null,
    creditOriginatorResult: null,
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    updateStatus: jest.fn(),
    updateAntifraudResult: jest.fn(),
    updateRiskBureauResult: jest.fn(),
    updateCreditOriginatorResult: jest.fn(),
  };

  const mockCreateInput: CreateLoanRequestInput = {
    operationNumber: 'OP-2024-001',
    channel: 'DIGITAL',
    applicantName: 'Juan Pérez',
    applicantDocument: '12345678',
    requestedAmount: 50000,
    currency: 'USD',
    termMonths: 12,
    interestRate: 0.15,
    destinationAccount: 'ACC-123456',
  };

  beforeEach(async () => {
    const mockRepository: Partial<jest.Mocked<LoanRequestRepository>> = {
      create: jest.fn(),
      findById: jest.fn(),
      findByOperationNumberAndChannel: jest.fn(),
      updateStatus: jest.fn(),
      updateAntifraudResult: jest.fn(),
      updateRiskBureauResult: jest.fn(),
      updateCreditOriginatorResult: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    };

    const mockLogger: Partial<jest.Mocked<WinstonLogger>> = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanRequestService,
        {
          provide: LoanRequestRepository,
          useValue: mockRepository,
        },
        {
          provide: WinstonLogger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<LoanRequestService>(LoanRequestService);
    repository = module.get(LoanRequestRepository);
    logger = module.get(WinstonLogger);
  });

  describe('createLoanRequest', () => {
    it('debería crear una nueva solicitud de préstamo exitosamente', async () => {
      repository.findByOperationNumberAndChannel.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockLoanRequest);

      const result = await service.createLoanRequest(mockCreateInput);

      expect(repository.findByOperationNumberAndChannel).toHaveBeenCalledWith(
        mockCreateInput.operationNumber,
        mockCreateInput.channel,
      );
      expect(repository.create).toHaveBeenCalled();
      expect(result.operationNumber).toBe(mockCreateInput.operationNumber);
      expect(result.channel).toBe(mockCreateInput.channel);
      expect(result.status).toBe(LoanRequestStatus.PENDING);
    });

    it('debería retornar solicitud existente por idempotencia', async () => {
      repository.findByOperationNumberAndChannel.mockResolvedValue(mockLoanRequest);

      const result = await service.createLoanRequest(mockCreateInput);

      expect(repository.create).not.toHaveBeenCalled();
      expect(result.id).toBe(mockLoanRequest.id);
    });
  });

  describe('findById', () => {
    it('debería encontrar una solicitud por ID', async () => {
      repository.findById.mockResolvedValue(mockLoanRequest);

      const result = await service.findById('test-uuid-123');

      expect(result).not.toBeNull();
      expect(result?.id).toBe('test-uuid-123');
    });

    it('debería retornar null cuando la solicitud no existe', async () => {
      repository.findById.mockResolvedValue(null);

      const result = await service.findById('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('findAllLoanRequests', () => {
    it('debería listar todas las solicitudes', async () => {
      const mockRequests = [mockLoanRequest, { ...mockLoanRequest, id: 'test-uuid-456' }];
      repository.findAll.mockResolvedValue(mockRequests);

      const result = await service.findAllLoanRequests();

      expect(result.length).toBe(2);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('updateStatus', () => {
    it('debería actualizar el estado de una solicitud', async () => {
      const updatedRequest = { ...mockLoanRequest, status: LoanRequestStatus.APPROVED };
      repository.updateStatus.mockResolvedValue(updatedRequest);

      const result = await service.updateStatus({
        id: 'test-uuid-123',
        newStatus: LoanRequestStatus.APPROVED,
      });

      expect(repository.updateStatus).toHaveBeenCalledWith(
        'test-uuid-123',
        LoanRequestStatus.APPROVED,
      );
      expect(result.status).toBe(LoanRequestStatus.APPROVED);
    });
  });

  describe('updateAntifraudResult', () => {
    it('debería actualizar el resultado de antifraude', async () => {
      const updatedRequest = { ...mockLoanRequest, antifraudResult: 'APPROVED' };
      repository.updateAntifraudResult.mockResolvedValue(updatedRequest);

      const result = await service.updateAntifraudResult({
        id: 'test-uuid-123',
        result: 'APPROVED',
      });

      expect(repository.updateAntifraudResult).toHaveBeenCalledWith('test-uuid-123', 'APPROVED');
      expect(result.id).toBe('test-uuid-123');
    });
  });

  describe('updateRiskBureauResult', () => {
    it('debería actualizar el resultado del buró de riesgos', async () => {
      const updatedRequest = { ...mockLoanRequest, riskBureauResult: 'LOW_RISK' };
      repository.updateRiskBureauResult.mockResolvedValue(updatedRequest);

      const result = await service.updateRiskBureauResult({
        id: 'test-uuid-123',
        result: 'LOW_RISK',
      });

      expect(repository.updateRiskBureauResult).toHaveBeenCalledWith('test-uuid-123', 'LOW_RISK');
      expect(result.id).toBe('test-uuid-123');
    });
  });

  describe('updateCreditOriginatorResult', () => {
    it('debería actualizar el resultado del originador de crédito', async () => {
      const updatedRequest = { ...mockLoanRequest, creditOriginatorResult: 'APPROVED' };
      repository.updateCreditOriginatorResult.mockResolvedValue(updatedRequest);

      const result = await service.updateCreditOriginatorResult({
        id: 'test-uuid-123',
        result: 'APPROVED',
      });

      expect(repository.updateCreditOriginatorResult).toHaveBeenCalledWith('test-uuid-123', 'APPROVED');
      expect(result.id).toBe('test-uuid-123');
    });
  });

  describe('deleteLoanRequest', () => {
    it('debería eliminar una solicitud existente', async () => {
      repository.findById.mockResolvedValue(mockLoanRequest);
      repository.delete.mockResolvedValue();

      await service.deleteLoanRequest('test-uuid-123');

      expect(repository.delete).toHaveBeenCalledWith('test-uuid-123');
    });

    it('debería lanzar excepción cuando la solicitud no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.deleteLoanRequest('non-existent-id')).rejects.toThrow(HttpException);
    });
  });

  describe('mapToResponse', () => {
    it('debería mapear correctamente la entidad a response', async () => {
      repository.findById.mockResolvedValue(mockLoanRequest);

      const result = await service.findById('test-uuid-123');

      expect(result).toEqual({
        id: 'test-uuid-123',
        operationNumber: 'OP-2024-001',
        channel: 'DIGITAL',
        status: LoanRequestStatus.PENDING,
        applicantName: 'Juan Pérez',
        requestedAmount: 50000,
        currency: 'USD',
        createdAt: mockLoanRequest.createdAt,
        updatedAt: mockLoanRequest.updatedAt,
      });
    });
  });
});