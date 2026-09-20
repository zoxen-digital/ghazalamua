export type ContactFormInput = {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  preferredDate?: string;
  location?: string;
  message?: string;
  honeypot?: string;
};

export function validateContactForm(input: ContactFormInput): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!input.name || input.name.trim().length < 2) errors.push("Name is required.");
  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) errors.push("A valid email is required.");
  if (!input.phone || input.phone.trim().length < 6) errors.push("Phone number is required.");
  if (!input.eventType || input.eventType.trim().length < 2) errors.push("Event type is required.");
  if (!input.message || input.message.trim().length < 5) errors.push("Message is required.");
  return { valid: errors.length === 0, errors };
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
