/**
 * ? Interface validate for email
 *
 * @param  {?string} email - the email to be validated.
 * @return boolean
 */

type ValidateEmailProps = string | undefined

function validateEmail(email: ValidateEmailProps): boolean {
  if (!email) return false // if not a string

  const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
  return pattern.test(email)
}

export default validateEmail
