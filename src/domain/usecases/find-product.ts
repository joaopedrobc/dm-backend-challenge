export interface FindProductModel {
  name: string
}

export interface FindProduct {
  find: (productData: FindProductModel) => Promise<FindProductModel>
}
