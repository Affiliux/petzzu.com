type MaskCPFProps = string | undefined

/**
 * Mask a cpf.
 *
 * @category Helpers - Masks - Cpf
 * @version 0.0.1
 *
 * @interface MaskCPFProps - the cpf to be masked.
 * @return string
 *
 */

function maskCPF(cpf: MaskCPFProps): string {
  if (!cpf) return '' // if not a string

  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export default maskCPF
