/**
 * ? Interface validate for phone
 *
 * @param  {?string} phone - the phone to be validated.
 * @return boolean
 */

type ValidatePhoneProps = string | undefined

function validatePhone(phone: ValidatePhoneProps): boolean {
  if (!phone) return false // if not a string

  const pattern = /^[(]?[0-9]{2}[)]?[/\s/g]?[0-9]{5}[-\s.]?[0-9]{4}$/
  return pattern.test(phone)
}

export default validatePhone
