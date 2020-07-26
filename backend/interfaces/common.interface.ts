import { Document } from 'mongoose';
import { Actions } from '@sz/enum';
import { HttpStatus } from '@nestjs/common';

export interface AppStatus {
  message: string;
}

export interface Common extends Document {
  createdBy?: string;
  updatedBy?: string;
  voidedBy?: string;
  void?: boolean;
}

export interface Permissions {
  [index: string]: Actions[];
}

export interface KeyValue {
  [key: string]: string | KeyValue | number;
}

export interface MongoError {
  driver?: boolean;
  name: string;
  index?: number;
  code: number | string;
  keyPattern?: KeyValue;
  keyValue: KeyValue;
  message?: string;
}

export interface AppError {
  name: string;
  response: ErrorResponse;
  status: HttpStatus;
}

export interface ErrorResponse {
  statusCode: HttpStatus;
  message: string | string[];
  error: string | KeyValue | number;
}
