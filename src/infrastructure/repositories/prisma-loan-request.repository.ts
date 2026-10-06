import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { LoanRequest, LoanRequestStatus } from '../../domain/entities/loan-request.entity';
import { LoanRequestRepository } from '../../domain/ports/loan-request.repository';

@Injectable()
export class PrismaLoanRequestRepository implements LoanRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(loanRequest: LoanRequest): Promise<LoanRequest> {
    const created = await this.prisma.loanRequest.create({
      data: {
        id: loanRequest.id,
        operationNumber: loanRequest.operationNumber,
        channel: loanRequest.channel,
        amount: loanRequest.amount,
        termMonths: loanRequest.termMonths,
        customerId: loanRequest.customerId,
        status: loanRequest.status,
        createdAt: loanRequest.createdAt,
        updatedAt: loanRequest.updatedAt,
        antifraudResult: loanRequest.antifraudResult,
        riskBureauResult: loanRequest.riskBureauResult,
        creditOriginatorResult: loanRequest.creditOriginatorResult,
      },
    });
    return this.mapToDomain(created);
  }

  async findById(id: string): Promise<LoanRequest | null> {
    const loanRequest = await this.prisma.loanRequest.findUnique({
      where: { id },
    });
    return loanRequest ? this.mapToDomain(loanRequest) : null;
  }

  async findByOperationNumberAndChannel(operationNumber: string, channel: string): Promise<LoanRequest | null> {
    const loanRequest = await this.prisma.loanRequest.findUnique({
      where: { operationNumber_channel: { operationNumber, channel } },
    });
    return loanRequest ? this.mapToDomain(loanRequest) : null;
  }

  async updateStatus(id: string, status: LoanRequestStatus): Promise<LoanRequest> {
    const updated = await this.prisma.loanRequest.update({
      where: { id },
      data: { status, updatedAt: new Date() },
    });
    return this.mapToDomain(updated);
  }

  async updateAntifraudResult(id: string, result: string): Promise<LoanRequest> {
    const updated = await this.prisma.loanRequest.update({
      where: { id },
      data: { antifraudResult: result, updatedAt: new Date() },
    });
    return this.mapToDomain(updated);
  }

  async updateRiskBureauResult(id: string, result: string): Promise<LoanRequest> {
    const updated = await this.prisma.loanRequest.update({
      where: { id },
      data: { riskBureauResult: result, updatedAt: new Date() },
    });
    return this.mapToDomain(updated);
  }

  async updateCreditOriginatorResult(id: string, result: string): Promise<LoanRequest> {
    const updated = await this.prisma.loanRequest.update({
      where: { id },
      data: { creditOriginatorResult: result, updatedAt: new Date() },
    });
    return this.mapToDomain(updated);
  }

  async findAll(): Promise<LoanRequest[]> {
    const loanRequests = await this.prisma.loanRequest.findMany();
    return loanRequests.map(this.mapToDomain);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.loanRequest.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaLoanRequest: any): LoanRequest {
    return new LoanRequest(
      prismaLoanRequest.id,
      prismaLoanRequest.operationNumber,
      prismaLoanRequest.channel,
      prismaLoanRequest.amount,
      prismaLoanRequest.termMonths,
      prismaLoanRequest.customerId,
      prismaLoanRequest.status as LoanRequestStatus,
      prismaLoanRequest.createdAt,
      prismaLoanRequest.updatedAt,
      prismaLoanRequest.antifraudResult,
      prismaLoanRequest.riskBureauResult,
      prismaLoanRequest.creditOriginatorResult
    );
  }
}