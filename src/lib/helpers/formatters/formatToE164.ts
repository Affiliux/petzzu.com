/**
 * @name formatToE164
 * @category Helpers - Formatters
 *
 * @param  {?string} text - to use for formatting.
 * @return string
 */

type formatToE164Props = string | undefined

export function formatToE164(phone: formatToE164Props): string {
  if (!phone) return ''
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')
  // Add + prefix if not present
  return digits.startsWith('+') ? digits : `+${digits}`
}

export default formatToE164
