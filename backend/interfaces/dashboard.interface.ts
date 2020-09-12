import { Color } from '@sz/enum';
import { Common } from '@sz/interface';

export interface Reminder extends Common {
  title: string;
  description?: string;
  icon?: string;
  img?: string;
  color?: Color;
}
