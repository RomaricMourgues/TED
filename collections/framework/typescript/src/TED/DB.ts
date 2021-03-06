import TEDServer from "./TedServer";
import { TEDSchema } from "./Schemas";
import { StringIndexedObject } from "..";

export type TedRequest = SaveRequest | GetRequest  | RemoveRequest;

export type SaveRequest = 
{
    path:string;
    body:SaveBody;
    afterTask:boolean;
}

export type GetRequest = 
{
    path:string;
    body:GetBody;
}

export type RemoveRequest = 
{
    path:string;
    body:RemoveBody;
    afterTask:boolean;
}

export type SaveBody = 
{
    action:"save";
    object:StringIndexedObject;
    schema?:TEDSchema;
}

export type GetBody = 
{
    action:"get";
    order?:Order;
    limit?:number;
    pageToken?:string;
    where?:WhereClause;
    fullsearch?:JSON;
}
type Order = {
    key:string,
    order:"ASC" | "DESC"
}
type WhereClause = {
    operator:Operator;
    key:string;
    value:any;
}
enum Operator
{
    eq = "=",
    diff = "!=",
    gt = ">",
    geq = ">=",
    lt = '<',
    leq = '<=',
    in = "IN",
    notin = "NOT IN"
}
  
export type RemoveBody =
{
    action:"remove";
    schema?:TEDSchema;
}

export default class DB
{
    server:TEDServer;

    constructor(server:TEDServer)
    {
        this.server = server;
    }

    public async save(data:SaveRequest):Promise<any>
    {
      return this.server.request(data)
    }
  
    public async get(data:GetRequest):Promise<any>
    {
      return this.server.request(data);
    }
  
    public async remove(data:RemoveRequest):Promise<any>
    {
      return this.server.request(data);
    }
}