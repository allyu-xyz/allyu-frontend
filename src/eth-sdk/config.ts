import { defineConfig } from '@dethcrypto/eth-sdk'

export default defineConfig({
  contracts: {
    goerli: {
      dai: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844',
      allyu: '0xdAb87c1670972D389e625dcb9f8813dC5AB30bE5'
    },
    polygonMumbai: {
      dai: '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F',
      allyu: '0x12c2c185f8B14006aadE9f8914508C49CE019A84'
    },
    optimismGoerli: {
      dai: '0xd0B806F06E77157c3f39182A2C0b4C05A33D84a5',
      allyu: '0xdbf20E8AaA24660fb4e566d5D6FF47E726E5B13b'
    }
  }
})
