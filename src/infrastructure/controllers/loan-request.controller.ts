import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, UseGuards, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { LoanRequestService } from '../../application/loan-request.service';
import { LoanRequest, LoanRequestStatus } from '../../domain/entities/loan-request.entity';
import { CreateLoanRequestDto } from './dtos/create-loan-request.dto';
import { UpdateLoanRequestStatusDto } from './dtos/update-loan-request-status.dto';
import { WinstonLogger } from '../logging/winston.logger';

@ApiTags('loans')
@Controller('api/loan-requests')
export class LoanRequestController {
  private readonly logger = new Logger(LoanRequestController.name);

  constructor(
    private readonly loanRequestService: LoanRequestService,
    private readonly winstonLogger: WinstonLogger,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva solicitud de préstamo' })
  @ApiBody({ type: CreateLoanRequestDto })
  @ApiResponse({ status: 201, description: 'Solicitud de préstamo creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'Conflicto: solicitud duplicada por número de operación y canal' })
  async create(@Body() createLoanRequestDto: CreateLoanRequestDto): Promise<LoanRequest> {
    this.logger.log(`Creating loan request for operation: ${createLoanRequestDto.operationNumber}`);
    this.winstonLogger.log('info', 'Loan request creation initiated', {
      operationNumber: createLoanRequestDto.operationNumber,
      channel: createLoanRequestDto.channel,
      requestedAmount: createLoanRequestDto.requestedAmount,
    });

    try {
      const loanRequest = await this.loanRequestService.createLoanRequest(createLoanRequestDto);
      this.winstonLogger.log('info', 'Loan request created successfully', {
        loanRequestId: loanRequest.id,
        operationNumber: loanRequest.operationNumber,
        status: loanRequest.status,
      });
      return loanRequest;
    } catch (error) {
      this.winstonLogger.log('error', 'Failed to create loan request', {
        operationNumber: createLoanRequestDto.operationNumber,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una solicitud de préstamo por ID' })
  @ApiParam({ name: 'id', description: 'ID único de la solicitud de préstamo' })
  @ApiResponse({ status: 200, description: 'Solicitud de préstamo encontrada' })
  @ApiResponse({ status: 404, description: 'Solicitud de préstamo no encontrada' })
  async findById(@Param('id') id: string): Promise<LoanRequest | null> {
    this.logger.log(`Fetching loan request with id: ${id}`);
    this.winstonLogger.log('info', 'Loan request fetch initiated', { loanRequestId: id });

    const loanRequest = await this.loanRequestService.findById(id);
    if (loanRequest) {
      this.winstonLogger.log('info', 'Loan request found', { loanRequestId: id });
    } else {
      this.winstonLogger.log('warning', 'Loan request not found', { loanRequestId: id });
    }
    return loanRequest;
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las solicitudes de préstamos' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes de préstamos' })
  async findAll(): Promise<LoanRequest[]> {
    this.logger.log('Fetching all loan requests');
    this.winstonLogger.log('info', 'Fetching all loan requests', {});

    const loanRequests = await this.loanRequestService.findAll();
    this.winstonLogger.log('info', 'All loan requests fetched', { count: loanRequests.length });
    return loanRequests;
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Actualizar el estado de una solicitud de préstamo' })
  @ApiParam({ name: 'id', description: 'ID único de la solicitud de préstamo' })
  @ApiBody({ type: UpdateLoanRequestStatusDto })
  @ApiResponse({ status: 200, description: 'Estado actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Solicitud de préstamo no encontrada' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateLoanRequestStatusDto,
  ): Promise<LoanRequest> {
    this.logger.log(`Updating status for loan request: ${id} to ${updateStatusDto.status}`);
    this.winstonLogger.log('info', 'Loan request status update initiated', {
      loanRequestId: id,
      newStatus: updateStatusDto.status,
    });

    try {
      const loanRequest = await this.loanRequestService.updateStatus(id, updateStatusDto.status);
      this.winstonLogger.log('info', 'Loan request status updated successfully', {
        loanRequestId: id,
        newStatus: loanRequest.status,
      });
      return loanRequest;
    } catch (error) {
      this.winstonLogger.log('error', 'Failed to update loan request status', {
        loanRequestId: id,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  @Put(':id/antifraud-result')
  @ApiOperation({ summary: 'Actualizar resultado del motor antifraude' })
  @ApiParam({ name: 'id', description: 'ID único de la solicitud de préstamo' })
  @ApiBody({ schema: { properties: { result: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Resultado antifraude actualizado' })
  @ApiResponse({ status: 404, description: 'Solicitud de préstamo no encontrada' })
  async updateAntifraudResult(
    @Param('id') id: string,
    @Body('result') result: string,
  ): Promise<LoanRequest> {
    this.logger.log(`Updating antifraud result for loan request: ${id}`);
    this.winstonLogger.log('info', 'Antifraud result update initiated', {
      loanRequestId: id,
      result,
    });

    const loanRequest = await this.loanRequestService.updateAntifraudResult(id, result);
    this.winstonLogger.log('info', 'Antifraud result updated successfully', { loanRequestId: id });
    return loanRequest;
  }

  @Put(':id/risk-bureau-result')
  @ApiOperation({ summary: 'Actualizar resultado del buró de riesgos' })
  @ApiParam({ name: 'id', description: 'ID único de la solicitud de préstamo' })
  @ApiBody({ schema: { properties: { result: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Resultado del buró de riesgos actualizado' })
  @ApiResponse({ status: 404, description: 'Solicitud de préstamo no encontrada' })
  async updateRiskBureauResult(
    @Param('id') id: string,
    @Body('result') result: string,
  ): Promise<LoanRequest> {
    this.logger.log(`Updating risk bureau result for loan request: ${id}`);
    this.winstonLogger.log('info', 'Risk bureau result update initiated', {
      loanRequestId: id,
      result,
    });

    const loanRequest = await this.loanRequestService.updateRiskBureauResult(id, result);
    this.winstonLogger.log('info', 'Risk bureau result updated successfully', { loanRequestId: id });
    return loanRequest;
  }

  @Put(':id/credit-originator-result')
  @ApiOperation({ summary: 'Actualizar resultado del originador de créditos' })
  @ApiParam({ name: 'id', description: 'ID único de la solicitud de préstamo' })
  @ApiBody({ schema: { properties: { result: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Resultado del originador actualizado' })
  @ApiResponse({ status: 404, description: 'Solicitud de préstamo no encontrada' })
  async updateCreditOriginatorResult(
    @Param('id') id: string,
    @Body('result') result: string,
  ): Promise<LoanRequest> {
    this.logger.log(`Updating credit originator result for loan request: ${id}`);
    this.winstonLogger.log('info', 'Credit originator result update initiated', {
      loanRequestId: id,
      result,
    });

    const loanRequest = await this.loanRequestService.updateCreditOriginatorResult(id, result);
    this.winstonLogger.log('info', 'Credit originator result updated successfully', { loanRequestId: id });
    return loanRequest;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una solicitud de préstamo' })
  @ApiParam({ name: 'id', description: 'ID único de la solicitud de préstamo' })
  @ApiResponse({ status: 204, description: 'Solicitud de préstamos eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Solicitud de préstamo no encontrada' })
  async delete(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting loan request: ${id}`);
    this.winstonLogger.log('info', 'Loan request deletion initiated', { loanRequestId: id });

    await this.loanRequestService.delete(id);
    this.winstonLogger.log('info', 'Loan request deleted successfully', { loanRequestId: id });
  }
}