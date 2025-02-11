/**
 * ? Interface mask for card number
 *
 * @param  {?string} card_number - the card number to be masked.
 * @return string
 */

type MaskCardNumberProps = string | undefined

function maskCardNumber(card_number: MaskCardNumberProps): string {
  if (!card_number) return '' // if not a string

  const isNotRegularCardNumber = card_number.replace(/\s/g, '').length === 15

  if (isNotRegularCardNumber) {
    return card_number
      .replace(/\D/g, '')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{6})(\d)/, '$1 $2')
  } else {
    return card_number
      .replace(/\D/g, '')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
  }
}

export default maskCardNumber
