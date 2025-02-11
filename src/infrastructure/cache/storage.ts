'use client'

/**
 * @name set_storage
 * @category Infrastructure - Cache - Storage
 *
 * @param  {string} name - the name for set new value in local storage.
 * @param  {string} value - the value set in local storage.
 * @return {void}
 */

export function set_storage(name: string, value: string): void {
  localStorage.setItem(name, value)
}

/**
 * @name get_storage
 * @category Infrastructure - Cache - Storage
 *
 * @param  {string} name - the name get value in local storage.
 * @return {string | null}
 */

export function get_storage(name: string): string | null {
  const response = localStorage.getItem(name)
  return response
}

/**
 * @name delete_storage
 * @category Infrastructure - Cache - Storage
 *
 * @param  {string} name - the name delete value in local storage.
 * @return {void}
 */

export function delete_storage(name: string): void {
  localStorage.removeItem(name)
}
