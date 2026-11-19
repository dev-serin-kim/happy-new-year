export function isMailboxOwnerEmail(email: unknown, configured: string | undefined): boolean {
  const owner = configured?.trim().toLowerCase()
  if (!owner || typeof email !== 'string') return false
  return email.trim().toLowerCase() === owner
}
