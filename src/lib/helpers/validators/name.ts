/**
 * @name validateName
 * @category Helpers - Validators
 *
 * @param  {?string} name - the name to be validated.
 * @return boolean
 */

type ValidateNameProps = string | undefined

function validateName(name: ValidateNameProps): boolean {
  if (!name) return false // if not a string

  const pattern = /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/
  return pattern.test(name)
}

export default validateName
