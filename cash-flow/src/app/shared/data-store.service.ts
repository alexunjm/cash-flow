import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/**
 * A service to hold Application wide data
 * Performs operations against a local store
 * Comunicates with the app trought Observabales
 * */
export abstract class DataStoreService {

  /** Data Change emitter */
  private dataSubject: BehaviorSubject<any>;


  constructor(protected dataKey: string, protected data: any) {
    this.getData();
    this.dataSubject = new BehaviorSubject(this.data);
    this.emit();
  }
  /** An onservable to get notified about changes */
  public getDataObservable = (): Observable<any> => this.dataSubject.asObservable();

  /**
   * Saves appdata to localstorage
   * and notifies it
   */
  protected setData(data) {
    this.data = data;
    if (this.dataKey) {
      localStorage.setItem(this.dataKey, JSON.stringify(this.data));
    }
    this.emit();
  }
  /** Notifies a change in data */
  private emit() {
    this.dataSubject.next(this.data);
  }
  /**
   * Gets data from local sotorage
   */
  protected getData(): any {
    if (this.dataKey) {
      let localData = localStorage.getItem(this.dataKey);
      if (localData) {
        this.data = JSON.parse(localData);
      }
    }
    return this.data;
  }
}
