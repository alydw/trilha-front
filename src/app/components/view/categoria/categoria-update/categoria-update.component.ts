import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../components/view/categoria/categoria.service';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById() : void{
    this.service.findById(this.categoria.id!).subscribe((resposta) => {
      this.categoria.nome = resposta.nome;
      this.categoria.descricao = resposta.descricao;
    })
  }

  update(): void {
    this.service.update(this.categoria).subscribe((resposta) =>{
      this.router.navigate(['categorias']);
      this.service.mensagem('Categoria atualiada com sucesso');
    }, err => {
      this.service.mensagem('Validar campos não preenchidos')
    })
  }

  calcel(): void {
    this.router.navigate(['categorias'])
  }

}
