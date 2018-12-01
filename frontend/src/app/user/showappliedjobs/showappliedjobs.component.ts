import { Component, OnInit } from '@angular/core';
import { ShowappliedjobsService } from '../../service/showappliedjobs.service';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from "jquery";
@Component({
  selector: 'app-showappliedjobs',
  templateUrl: './showappliedjobs.component.html',
  styleUrls: ['./showappliedjobs.component.scss']
})
export class ShowappliedjobsComponent implements OnInit {
  arrCard: any[] = [];

  constructor(private showappliedjobsService: ShowappliedjobsService,
    private formBuilder: FormBuilder,
  ) {
    this.getdata();
  }
  getdata() {
    this.showappliedjobsService.getdata().subscribe(data => {
      console.log(data);
      this.arrCard = data

    })
  }
  ngOnInit() {


  }




}
