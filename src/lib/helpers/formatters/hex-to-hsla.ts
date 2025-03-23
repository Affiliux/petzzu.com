/**
 * @name formatHexToHsl
 * @category Helpers - Formatters
 *
 * @param {string} hex - the hex color code to be converted.
 * @return {{ h: number; s: number; l: number } | null} - the HSL representation of the hex color code or null if the input is invalid.
 */

function formatHexToHsl(hex: string): { h: number; s: number; l: number } | null {
  // Remove o "#" se estiver presente
  hex = hex.replace(/^#/, '')

  // Verifica se o HEX é válido (3 ou 6 caracteres)
  if (![3, 6].includes(hex.length)) {
    return null
  }

  // Expande um HEX de 3 caracteres para 6 caracteres (ex: #FA2 -> #FFAA22)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(char => char + char)
      .join('')
  }

  // Converte para valores RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  // Encontra o valor máximo e mínimo para calcular a luminosidade (L)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  // Calcula a luminosidade (L)
  let h = 0
  let s = 0
  let l = (max + min) / 2

  if (delta !== 0) {
    // Calcula a saturação (S)
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)

    // Calcula o matiz (H)
    if (max === r) {
      h = ((g - b) / delta + (g < b ? 6 : 0)) * 60
    } else if (max === g) {
      h = ((b - r) / delta + 2) * 60
    } else if (max === b) {
      h = ((r - g) / delta + 4) * 60
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export default formatHexToHsl
