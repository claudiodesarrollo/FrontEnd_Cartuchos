import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  title:string="usuarios"
  usuarios:User[]=[];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getData();
  }
  
  getData(){
    this.userService.getAll().subscribe(res=>{
      this.usuarios=res
      console.log(this.usuarios);
    });
  }
  delete(item:any):void{

  }

}
