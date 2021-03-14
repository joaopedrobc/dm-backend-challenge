export interface FindProductModel {
  name: string
}

export interface FindProduct {
  find: (order: FindProductModel) => Promise<FindProductModel>
}
