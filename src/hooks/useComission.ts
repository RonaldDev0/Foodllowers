export function useComission (amount: number) {
  // const porcentajeComision = 0.0279
  const porcentajeComision = 0.0329
  const IVA = 0.19
  const costoFijo = 952

  const comision = amount * porcentajeComision
  const IVAComision = comision * IVA
  const totalComision = comision + IVAComision + costoFijo

  return Math.floor(totalComision + 118)
  // return Math.floor(totalComision + 101)
}
