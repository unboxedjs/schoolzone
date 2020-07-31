import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Controls, CRUD, GcpLogLevel, Role } from '@sz/enum';
import { ApiTags } from '@nestjs/swagger';
import { CreateLogDTO, FetchLogDTO } from 'backend/schemas/log.dto';
import { Api } from 'backend/handlers/decorators/api.decorators';
import { Logging, GetEntriesResponse, Entry } from '@google-cloud/logging';
import { WriteOptions, ApiResponse } from '@google-cloud/logging/build/src/log';
import { LogEntry } from '@google-cloud/logging/build/src/entry';
import { gcpLogOptions } from 'backend/library/logger';
import { AuthUser } from 'backend/handlers/decorators/user.decorators';
import { JwtPayload, ObjectPair } from '@sz/interface';

const name = Controls.Logs;
const { logName, ...rest } = gcpLogOptions;

@ApiTags(name)
@Controller(name)
export class LogController {
  private gcpLogs = new Logging(rest).log(`${logName}_client`, {
    removeCircular: true,
    maxEntrySize: 250000,
  });

  @Post('fetch')
  @Api(Controls.Logs, CRUD.READALL, { allow: [] })
  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  async getLogs(
    @Body()
    {
      filter = `severity=${GcpLogLevel.INFO}`,
      pageSize = 5,
      orderBy = 'timestamp desc',
      pageToken,
    }: FetchLogDTO,
  ): Promise<GetEntriesResponse> {
    const options = { filter, pageSize, orderBy, pageToken };
    if (!pageToken) delete options.pageToken;
    return await this.gcpLogs.getEntries(options);
  }

  @Post()
  @Api(Controls.Logs, CRUD.CREATEONE, { allow: [] })
  async writeLog(
    @Body() { level, message, labels = { clientApp: 'product' } }: CreateLogDTO,
    @AuthUser() user: JwtPayload,
  ): Promise<void> {
    this.write(
      level,
      this.createEntry(this.createMetadata(level, labels), {
        message,
        user,
      }),
    );
  }

  @Delete(':id')
  @Api(Controls.Logs, CRUD.DELETEONE, { allow: [Role.ADMIN] })
  async deleteLog(@Param('id') logName: string): Promise<void> {
    const log = new Logging(rest).log(logName);
    log.delete();
  }

  private createMetadata(level: GcpLogLevel, labels: ObjectPair): LogEntry {
    return {
      severity: level,
      labels,
      resource: { type: 'global' },
    };
  }

  private createEntry(
    metadata?: LogEntry,
    data?: string | Record<string, unknown>,
  ): Entry {
    return this.gcpLogs.entry(metadata, data);
  }

  private async write(
    level: GcpLogLevel,
    entry: Entry | Entry[],
    options?: WriteOptions,
  ): Promise<ApiResponse> {
    return this.gcpLogs[level](entry, options);
  }
}
