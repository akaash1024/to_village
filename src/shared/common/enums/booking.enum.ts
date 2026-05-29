export enum BookingStatusEnum {
  BOOKED = 'Booked',
  RESCHEDULED = 'Rescheduled',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed',
  NO_SHOW = 'No Show',
}

export enum BookingJourneyStatusEnum {
  BOOKED = 'Booked',
  BOARDED = 'Boarded',
  IN_TRANSIT = 'In Transit',
  REACHED = 'Reached',
  CANCELLED = 'Cancelled',
  NO_SHOW = 'No Show',
}

export enum PaymentStatusEnum {
  PENDING = 'Pending',
  PARTIAL = 'Partial',
  PAID = 'Paid',
}

export enum PaymentModeEnum {
  CASH = 'CASH',
  UPI = 'UPI',
  CARD = 'CARD',
}