'use server'

import { cookies } from 'next/headers'

/**
 * @name set_cookie
 * @category Infrastructure - Cache - Cookies
 *
 * @param  {string} name - the name for set new value in cookies.
 * @param  {string} value - the value set in cookies.
 * @return {void}
 */

export async function set_cookie(name: string, value: string): Promise<void> {
  const api = await cookies()
  api.set(name, value)
}

/**
 * @name get_cookie
 * @category Infrastructure - Cache - Cookies
 *
 * @param  {string} name - the name get value in cookies.
 * @return {RequestCookie | undefined}
 */

export async function get_cookie(name: string): Promise<string | undefined> {
  const api = await cookies()

  const response = api.get(name)
  return response?.value
}

/**
 * @name delete_cookie
 * @category Infrastructure - Cache - Cookies
 *
 * @param  {string} name - the name delete value in cookies.
 * @return {void}
 */

export async function delete_cookie(name: string): Promise<void> {
  const api = await cookies()
  api.delete(name)
}
