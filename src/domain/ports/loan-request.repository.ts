import { LoanRequest, LoanRequestStatus } from '../entities/loan-request.entity';

export interface LoanRequestRepository {
  create(loanRequest: LoanRequest): Promise<LoanRequest>;
  findById(id: string): Promise<LoanRequest | null>;
  findByOperationNumberAndChannel(operationNumber: string, channel: string): Promise<LoanRequest | null>;
  updateStatus(id: string, status: LoanRequestStatus): Promise<LoanRequest>;
  updateAntifraudResult(id: string, result: string): Promise<LoanRequest>;
  updateRiskBureauResult(id: string, result: string): Promise<LoanRequest>;
  updateCreditOriginatorResult(id: string, result: string): Promise<LoanRequest>;
  findAll(): Promise<LoanRequest[]>;
  delete(id: string): Promise<void>;
}