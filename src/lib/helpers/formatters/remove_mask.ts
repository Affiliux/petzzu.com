/**
 * ? Interface to remove mask
 *
 * @param  {?string} text - to use for formatting.
 * @return string
 */

type RemoveMaskProps = string | undefined

function removeMask(text: RemoveMaskProps): string {
  if (!text) return '' // if not a string

  return text.replace(/[^\w\s]/gi, '').replace(/\s/g, '')
}

export default removeMask
