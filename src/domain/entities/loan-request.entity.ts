import { IsString, IsNumber, IsDate, IsEnum, IsUUID } from 'class-validator';

export enum LoanRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  TIMEOUT = 'TIMEOUT'
}

export class LoanRequest {
  @IsUUID()
  id: string;

  @IsString()
  operationNumber: string;

  @IsString()
  channel: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  termMonths: number;

  @IsString()
  customerId: string;

  @IsEnum(LoanRequestStatus)
  status: LoanRequestStatus;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsString()
  antifraudResult?: string;

  @IsString()
  riskBureauResult?: string;

  @IsString()
  creditOriginatorResult?: string;

  constructor(
    id: string,
    operationNumber: string,
    channel: string,
    amount: number,
    termMonths: number,
    customerId: string,
    status: LoanRequestStatus = LoanRequestStatus.PENDING,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    antifraudResult?: string,
    riskBureauResult?: string,
    creditOriginatorResult?: string
  ) {
    this.id = id;
    this.operationNumber = operationNumber;
    this.channel = channel;
    this.amount = amount;
    this.termMonths = termMonths;
    this.customerId = customerId;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.antifraudResult = antifraudResult;
    this.riskBureauResult = riskBureauResult;
    this.creditOriginatorResult = creditOriginatorResult;
  }

  updateStatus(newStatus: LoanRequestStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  updateAntifraudResult(result: string): void {
    this.antifraudResult = result;
    this.updatedAt = new Date();
  }

  updateRiskBureauResult(result: string): void {
    this.riskBureauResult = result;
    this.updatedAt = new Date();
  }

  updateCreditOriginatorResult(result: string): void {
    this.creditOriginatorResult = result;
    this.updatedAt = new Date();
  }
}