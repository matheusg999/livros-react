import { Livro } from '../modelo/Livro';

const livros: Array<Livro> = [
        { 
            codigo: 1,
            codEditora: 1,
            titulo: "Use a cabeça: Java",
            resumo: "Use a cabeça! Java é uma experiência completa de aprendizado em programação orientada a objetos(OO) e Java",
            autores: ["Bert Bates, Kathy Sierra"] },
        { 
            codigo: 2, 
            codEditora: 2, 
            titulo: "Java, como programar", 
            resumo: "Milhões de alunos e profissionais aprenderam programação e desenvolvimento de software com os livros Deitel", 
            autores: ["Paul Deitel","Harvey Deitel"] },
        { 
            codigo: 3, 
            codEditora: 3, 
            titulo: "Core Java for the impatient", 
            resumo: "eaders familiar with Horstmann's original, two-volume 'Core Java' books who are looking for a comprehensive, but condensed guide to all of the new features and functions of Java SE 9 will learn how these new features impact the language and core libraries.", 
            autores: ['Cay Horstmann'] }
    ];

    export class ControleLivros {
        obterLivros(): Array<Livro> {
          return livros;
        }
      
        incluir(livro: Livro): void {
          const novoCodigo = livros.length > 0 ? Math.max(...livros.map(l => l.codigo)) + 1 : 1;
          livro.codigo = novoCodigo;
          livros.push(livro);
        }
      
        excluir(codigo: number): void {
          const index = livros.findIndex(l => l.codigo === codigo);
          if (index !== -1) {
            livros.splice(index, 1);
          }
        }
    }
