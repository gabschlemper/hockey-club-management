/**
 * Event entity for managing club activities
 */
export interface Event {
  id: string
  title: string
  description?: string
  eventDate: Date
  eventTime: string
  location?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Create event DTO
 */
export interface CreateEventDto {
  title: string
  description?: string
  eventDate: Date
  eventTime: string
  location?: string
}

/**
 * Update event DTO
 */
export interface UpdateEventDto {
  title?: string
  description?: string
  eventDate?: Date
  eventTime?: string
  location?: string
}
