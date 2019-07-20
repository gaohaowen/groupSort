import { Injectable, Inject } from "@angular/core";
import { inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as models from './model/models';
import { PersonPets } from './model/models';
import {map} from 'rxjs/operators';

@Injectable()
export class PersonPetService{
    constructor(@Inject(HttpClient) private _http: HttpClient)
    {

    }
    
    //match json data and return model
    getPersonPet(url): Observable<PersonPets> {
        return this._http.get<models.PersonPets>(url)
        .pipe(map(response => response));
    }
}