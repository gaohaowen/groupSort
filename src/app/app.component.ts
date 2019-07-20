import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PersonPetService } from './service/person-pet-service';
import { PersonPets } from './service/model/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'my-app';
  personPets : PersonPets;
  sorted: any;
  constructor(@Inject(PersonPetService) private personPetService:PersonPetService) {
  }

  ngOnInit(){
    //get data
    this.personPetService.getPersonPet('http://5c92dbfae7b1a00014078e61.mockapi.io/owners').subscribe(res=>{
      this.sorted = groupByGender(res);
    });

    function groupByGender(array) {
      //group by gender
      const groups = {};
      array.forEach(o=> {
        const gender = o.gender;
        groups[gender] = groups[gender] || [];
        if(o.pets !== null)
        {
          groups[gender] = groups[gender].concat(o.pets.filter(pet => { return pet.type === "Cat" }));
        }
      });

      //return array with object which contains gender and pets array
      return Object.keys(groups).map(function (gender) {
        //sort By First Character 
        groups[gender].sort(function(a, b){ 
          if (a.name.substr(0,1) > b.name.substr(0,1)) {
            return 1;
          } else if (a.name.substr(0,1) < b.name.substr(0,1)) {
            return -1;
          } else {
            return 0;
          }
        });
        //return object with pets array
        return {gender: gender, pets: groups[gender]};
      });
    }
  }
}
