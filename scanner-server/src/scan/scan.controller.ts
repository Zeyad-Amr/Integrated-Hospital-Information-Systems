// src/scanner/scanner.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ScanerService } from './scan.service';

@Controller('scanner')
export class ScanerController {
  constructor(private readonly scannerService: ScanerService) {}

  @Get('scan')
  async scanDocument() {
    try {
      return await this.scannerService.scanDocument()
    } catch (error) {
      console.log(error)
      
      return { error: error.message }
    }
  }

  @Get('sendFiles')
  async sendFiles() {
    try {
      return await this.scannerService.sendImagesToExternalApi();
    } catch (error) {
      // console.log(error)
      return { error: error.response.data,status:error.response.status }
    }
  }
}
