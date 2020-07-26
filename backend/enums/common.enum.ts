export enum Actions {
  CREATE = 'create',
  EDIT = 'edit',
  VIEW = 'view',
  VOID = 'void',
  ASSIGN = 'assign',
  UNASSIGN = 'unassign',
  REVIEW = 'review',
  APPROVE = 'approve',
}

export enum STATUS {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending',
  VOIDED = 'voided',
  REVIEWED = 'reviewed',
  ASSIGNED = 'assigned',
  UNASSIGNED = 'unassigned',
}

export enum ErrorCode {
  A001 = 'Invalid Jwt',
  A002 = 'Password Mismatch',
}
