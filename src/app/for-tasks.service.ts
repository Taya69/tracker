import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, find, map, tap } from 'rxjs/operators';
import { Task } from 'src/interfaces/task';
import { Priority } from 'src/interfaces/priority';

//const postUrl = 'http://localhost:3000/posts';
//const postUrl = 'https://jsonplaceholder.typicode.com/posts'
//const commentsUrl = 'https://jsonplaceholder.typicode.com/comments'
@Injectable({
  providedIn: 'root'
})
export class FortasksService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor( private http: HttpClient) { }
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('api/tasks');
  }
  addTask(task : Task) : Observable<Task>{    
    return this.http.post<Task>('api/tasks', task, this.httpOptions).pipe(         
      catchError(this.handleError<Task>('addPost'))
    );    
  }
  // addTask(task : Task, image? : File) : Observable<Task>{
  //   const fd = new FormData() 
  //   if (image) {
  //     fd.append('image', image, image.name)
  //   } 
  //   fd.append('name', task.name);
  //   fd.append('description', task.description),
  //   fd.append('priority', task.priority!)    
  //   return this.http.post<Task>('api/tasks', fd, this.httpOptions).pipe(         
  //     catchError(this.handleError<Task>('addPost'))
  //   );    
  // }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {     
      console.error(error); 
      return of(result as T);
    };
  }
  getLastId(): Observable<number> {
   // let posts: Post[] = [];
    return this.getTasks().pipe(
      map ((data:any) => {
        let id = data[data.length - 1].id    
        return id} )        
    )   
  }
  // searchTasks(term: string): Observable<Task[]> {
  //   if (!term.trim()) {
  //     return this.http.get<Task[]>('tasks').pipe(           
  //       catchError(this.handleError<Task[]>('searchHeroes', []))
  //     );      
  //   }
  //   return this.http.get<Task[]>(`${postUrl}?title=${term}`).pipe(          
  //     catchError(this.handleError<Post[]>('searchHeroes', []))
  //   );
  // }
  deleteTask(id: string): Observable<Task> {
    const url = `api/tasks/${id}`;  
    return this.http.delete<Task>(url).pipe(      
      catchError(this.handleError<Task>('deleteTask'))
    );
  }
  updateTask(task: {}, id: string, files = false): Observable<any> {
    // const fd = new FormData() 
    //   if (image) {
    //     fd.append('image', image, image.name)
    //   }
    //   for (let key of Object.keys(task)) {
    //     fd.append(key, task[key])
    //   } 
      // fd.append('name', task.name);
      // fd.append('description', task.description),
      // fd.append('priority', task.priority!)    
      return this.http.patch(`api/tasks/${id}`, task, this.httpOptions).pipe(         
        catchError(this.handleError<Task>('addingPost'))
      );    
    
  }
  getTaskById(id: string): Observable<Task> {
    const url = `api/tasks/${id}`;
    return this.http.get<Task>(url).pipe(      
      catchError(this.handleError<Task>(`gettask id=${id}`))
    );
  } 
  getTasksByPriorities(priority: string): Observable<Task[]> {
    return this.http.get<Task[]>(`api/tasks?priority=${priority}`);
  }
  addFile(uploadFormData : FormData) {    
   return this.http.post('api/tasks/upload', uploadFormData)    
  }
 
}
