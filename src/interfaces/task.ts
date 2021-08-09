import { FileUpload } from "./file";
import { Order } from "./order";


export interface Task {
    _id?: string,
    name: string,
    description: string,
    dateOfCreate?: Date,
    dateDeadline? : Date,    
    orderOrder?: number,
    orderName?: string,
    priority?: string,
    file? : FileUpload        
  }