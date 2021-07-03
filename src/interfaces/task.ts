

export interface Task {
    _id?: string;
    name: string;
    description: string,
    dateOfCreate?: Date;
    dateDeadline? : Date,    
    order?: Number,
    priority?: string,
    file? : [String]
        
  }