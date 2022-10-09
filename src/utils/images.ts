import bill10 from 'assets/bill10.png'
import bill100 from 'assets/bill100.png'
import bill20 from 'assets/bill20.png'
import bill5 from 'assets/bill5.png'
import bill50 from 'assets/bill50.png'
import bill500 from 'assets/bill500.png'
import { BillValue } from 'types/types'

export function getBillImage(bill: BillValue) {
  const images = {
    [BillValue.Five]: bill5,
    [BillValue.Ten]: bill10,
    [BillValue.Twenty]: bill20,
    [BillValue.Fifty]: bill50,
    [BillValue.OneHundred]: bill100,
    [BillValue.FiveHundred]: bill500
  }

  return images[bill]
}
