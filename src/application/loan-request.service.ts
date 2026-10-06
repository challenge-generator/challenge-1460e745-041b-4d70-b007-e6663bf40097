import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { LoanRequest, LoanRequestStatus } from '../domain/entities/loan-request.entity';
import { LoanRequestRepository } from '../domain/ports/loan-request.repository';
import { WinstonLogger } from '../infrastructure/logging/winston.logger';

export interface CreateLoanRequestInput {
  operationNumber: string;
  channel: string;
  applicantName: string;
  applicantDocument: string;
  requestedAmount: number;
  currency: string;
  termMonths: number;
  interestRate: number;
  destinationAccount: string;
}

export interface LoanRequestResponse {
  id: string;
  operationNumber: string;
  channel: string;
  status: LoanRequestStatus;
  applicantName: string;
  requestedAmount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateLoanRequestStatusInput {
  id: string;
  newStatus: LoanRequestStatus;
}

export interface UpdateAntifraudResultInput {
  id: string;
  result: string;
}

export interface UpdateRiskBureauResultInput {
  id: string;
  result: string;
}

export interface UpdateCreditOriginatorResultInput {
  id: string;
  result: string;
}

@Injectable()
export class LoanRequestService {
  private readonly logger = new Logger(LoanRequestService.name);

  constructor(
    private readonly loanRequestRepository: LoanRequestRepository,
    private readonly winstonLogger: WinstonLogger,
  ) {}

  async createLoanRequest(input: CreateLoanRequestInput): Promise<LoanRequestResponse> {
    this.winstonLogger.info('Iniciando creación de solicitud de préstamo', {
      operationNumber: input.operationNumber,
      channel: input.channel,
      requestedAmount: input.requestedAmount,
    });

    const existingRequest = await this.loanRequestRepository.findByOperationNumberAndChannel(
      input.operationNumber,
      input.channel,
    );

    if (existingRequest) {
      this.winstonLogger.warn('Solicitud duplicada detectada - idempotencia', {
        operationNumber: input.operationNumber,
        channel: input.channel,
        existingRequestId: existingRequest.id,
      });

      return this.mapToResponse(existingRequest);
    }

    const loanRequest = new LoanRequest(
      input.operationNumber,
      input.channel,
      input.applicantName,
      input.applicantDocument,
      input.requestedAmount,
      input.currency,
      input.termMonths,
      input.interestRate,
      input.destinationAccount,
    );

    const created = await this.loanRequestRepository.create(loanRequest);

    this.winstonLogger.info('Solicitud de préstamo creada exitosamente', {
      requestId: created.id,
      operationNumber: input.operationNumber,
      status: created.status,
    });

    return this.mapToResponse(created);
  }

  async findById(id: string): Promise<LoanRequestResponse | null> {
    this.winstonLogger.debug('Buscando solicitud de préstamo por ID', { requestId: id });

    const request = await this.loanRequestRepository.findById(id);

    if (!request) {
      this.winstonLogger.warn('Solicitud de préstamo no encontrada', { requestId: id });
      return null;
    }

    return this.mapToResponse(request);
  }

  async findAllLoanRequests(): Promise<LoanRequestResponse[]> {
    this.winstonLogger.debug('Listando todas las solicitudes de préstamo');

    const requests = await this.loanRequestRepository.findAll();

    this.winstonLogger.info(`Se encontraron ${requests.length} solicitudes de préstamo`);

    return requests.map((req) => this.mapToResponse(req));
  }

  async updateStatus(input: UpdateLoanRequestStatusInput): Promise<LoanRequestResponse> {
    this.winstonLogger.info('Actualizando estado de solicitud de préstamo', {
      requestId: input.id,
      newStatus: input.newStatus,
    });

    const updated = await this.loanRequestRepository.updateStatus(input.id, input.newStatus);

    this.winstonLogger.info('Estado de solicitud actualizado', {
      requestId: input.id,
      status: input.newStatus,
    });

    return this.mapToResponse(updated);
  }

  async updateAntifraudResult(input: UpdateAntifraudResultInput): Promise<LoanRequestResponse> {
    this.winstonLogger.info('Actualizando resultado de antifraude', {
      requestId: input.id,
      result: input.result,
    });

    const updated = await this.loanRequestRepository.updateAntifraudResult(input.id, input.result);

    this.winstonLogger.info('Resultado de antifraude actualizado', {
      requestId: input.id,
      result: input.result,
    });

    return this.mapToResponse(updated);
  }

  async updateRiskBureauResult(input: UpdateRiskBureauResultInput): Promise<LoanRequestResponse> {
    this.winstonLogger.info('Actualizando resultado del buró de riesgos', {
      requestId: input.id,
      result: input.result,
    });

    const updated = await this.loanRequestRepository.updateRiskBureauResult(input.id, input.result);

    this.winstonLogger.info('Resultado del buró de riesgos actualizado', {
      requestId: input.id,
      result: input.result,
    });

    return this.mapToResponse(updated);
  }

  async updateCreditOriginatorResult(input: UpdateCreditOriginatorResultInput): Promise<LoanRequestResponse> {
    this.winstonLogger.info('Actualizando resultado del originador de crédito', {
      requestId: input.id,
      result: input.result,
    });

    const updated = await this.loanRequestRepository.updateCreditOriginatorResult(input.id, input.result);

    this.winstonLogger.info('Resultado del originador de crédito actualizado', {
      requestId: input.id,
      result: input.result,
    });

    return this.mapToResponse(updated);
  }

  async deleteLoanRequest(id: string): Promise<void> {
    this.winstonLogger.info('Eliminando solicitud de préstamo', { requestId: id });

    const existing = await this.loanRequestRepository.findById(id);
    if (!existing) {
      throw new HttpException(
        `Solicitud de préstamo con ID ${id} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.loanRequestRepository.delete(id);

    this.winstonLogger.info('Solicitud de préstamo eliminada', { requestId: id });
  }

  private mapToResponse(loanRequest: LoanRequest): LoanRequestResponse {
    return {
      id: loanRequest.id,
      operationNumber: loanRequest.operationNumber,
      channel: loanRequest.channel,
      status: loanRequest.status,
      applicantName: loanRequest.applicantName,
      requestedAmount: loanRequest.requestedAmount,
      currency: loanRequest.currency,
      createdAt: loanRequest.createdAt,
      updatedAt: loanRequest.updatedAt,
    };
  }
}