/**
 * @name formatToE164
 * @category Helpers - Formatters
 *
 * @param  {?string} text - to use for formatting.
 * @return string
 */

export function formatToE164(phone: string): string {
  if (!phone) return ''
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')
  // Add + prefix if not present
  return digits.startsWith('+') ? digits : `+${digits}`
}

export default formatToE164
