import { IExpert } from "../../entities/ExpertEntity";

export interface IExpertRepository {
  findAll(): Promise<IExpert[]>;
  findById(id: string): Promise<IExpert | null>;
  create(expert:Partial< IExpert>): Promise<IExpert>;
  update(id: string, student: Partial<IExpert>): Promise<IExpert | null>;
  findOne(email: string): Promise<IExpert | null>;
  findUserByAuthId(authentication_id:string):Promise<IExpert|null>
}
