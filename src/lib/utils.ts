import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createUrl(path: string, searchParams: URLSearchParams): string {
  const params = searchParams.toString()
  return params ? `${path}?${params}` : path
}