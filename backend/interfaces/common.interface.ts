import { Document } from 'mongoose';
import { Actions } from '@sz/enum';

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
  [key: string]: string;
}
