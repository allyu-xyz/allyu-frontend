import keccak256 from 'keccak256'

export const hash = (data: string): string => {
  return keccak256(data).toString('hex')
}
