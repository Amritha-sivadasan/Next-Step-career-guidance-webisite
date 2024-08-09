import { IExpert } from "../../entities/ExpertEntity";

export interface IExpertRepository {
  findAll(page:number,limit:number): Promise<IExpert[]>;
  findById(id: string): Promise<IExpert | null>;
  create(expert:Partial< IExpert>): Promise<IExpert>;
  update(id: string, expert: Partial<IExpert>): Promise<IExpert | null>;
  findOne(email: string): Promise<IExpert | null>;
  findUserByAuthId(authentication_id:string):Promise<IExpert|null>
  countDocuments(): Promise<number>
  findExpertBySubCatName(subCatName:string):Promise<IExpert[]|null>
  findAllExpert(): Promise<IExpert[]>;
}
