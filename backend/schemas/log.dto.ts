import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { GcpLogLevel } from '@sz/enum';
import { ObjectPair } from '@sz/interface';

export class CreateLogDTO {
  @IsNotEmpty()
  message: string;

  @IsEnum(GcpLogLevel)
  level: GcpLogLevel;

  @IsOptional()
  labels: ObjectPair;
}

export class FetchLogDTO {
  /**
   *
   * Filter results, e.g. "severity=ERROR"
   * See https://cloud.google.com/logging/docs/view/advanced_filters for more
   * filter information.
   */
  @IsOptional()
  filter = `severity=${GcpLogLevel.INFO}`;

  @IsOptional()
  pageSize = 5;

  @IsOptional()
  orderBy = 'timestamp desc';

  @IsOptional()
  pageToken: string;
}
