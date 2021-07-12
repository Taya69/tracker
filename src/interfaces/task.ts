import { FileUpload } from "./file";


export interface Task {
    _id?: string;
    name: string;
    description: string,
    dateOfCreate?: Date;
    dateDeadline? : Date,    
    order: number,
    priority?: string,
    file? : FileUpload
        
  }