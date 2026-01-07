/**
 * Attendance status for events
 */
export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED',
}

/**
 * Attendance record linking athletes to events
 */
export interface Attendance {
  id: string
  eventId: string
  athleteId: string
  status: AttendanceStatus
  markedAt: Date
  markedBy: string
  notes?: string
}

/**
 * Mark attendance DTO
 */
export interface MarkAttendanceDto {
  eventId: string
  athleteId: string
  status: AttendanceStatus
  notes?: string
}

/**
 * Attendance statistics
 */
export interface AttendanceStats {
  athleteId: string
  totalEvents: number
  present: number
  absent: number
  late: number
  excused: number
  attendanceRate: number
}
