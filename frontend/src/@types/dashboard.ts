export interface ICategory {
  _id:string
  catName: string;
  catImage: string
  description:string
}

export interface ISubCategory {
  _id:string,
  catName: string;
  subCatName:string,
  SubCatImage: string,
  description:string
}