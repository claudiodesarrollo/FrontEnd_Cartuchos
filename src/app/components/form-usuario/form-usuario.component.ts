import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { User } from 'src/app/models/user';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
  titulo: string = "Formulario";
  user: User = new User();
  roles: Rol[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public route: Router,
    private userService: UserService,
    private rolService: RolService,
    private personaService: PersonaService

  ) { }

  ngOnInit(): void {
    this.cargar();
    this.getRoles();
  }

  cargar(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.userService.getOne(id).subscribe(res => this.user = res);
      }
    }
    );
  }
  getRoles(): void {
    this.rolService.getAll().subscribe(res => {
      this.roles = res
      console.log(this.roles);
    });
  }

  getPersonaDni(){
    const per:Persona= new Persona();
    this.personaService.getDni(this.user.persona.dni).subscribe(res => {
      this.user.persona = res;
    });
  }

  create() {
    var numeroAleatorio = Math.floor(Math.random() * 900) + 100;

    this.user.roles = this.result(); // devuelve los roles seleccionados 
    this.getPersonaDni(); // obtiene el objeto persona de la db 
    this.user.email = "admin" + numeroAleatorio + "@gmail.com";
    console.log(this.user);
    this.userService.add(this.user).subscribe(res => {
      Swal.fire(
        'Exito',
        `Categoria ${res.username}  Creada!`,
        'success'
      )
      this.route.navigate(['/usuarios']);
    });


  }

  update() {



  }

  result() :Rol[]{
    return this.roles.filter(item => item.checked);
  }

}
