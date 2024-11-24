import React, { useState, useEffect } from 'react';
import { ControleLivro } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';

const controleLivro = new ControleLivro();
const controleEditora = new ControleEditora();

const LinhaLivro = (props) => {
  const { livro, excluir } = props;
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>
        <div className="d-flex flex-column">
          <strong>{livro.titulo}</strong>
          <button 
            onClick={() => excluir(livro.codigo)} 
            className="btn btn-danger mt-2" 
          >
            Excluir
          </button>
        </div>
      </td>
      <td>{livro.resumo}</td>
      <td>{nomeEditora}</td>
      <td>
        <ul className="list-unstyled">
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

const LivroLista = () => {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

 
  useEffect(() => {
      if (!carregado) {
          controleLivro.obterLivros()
              .then((dados) => {
                  setLivros(dados); 
                  setCarregado(true);
              })
              .catch((erro) => {
                  console.error("Erro ao carregar livros:", erro);
              });
      }
  }, [carregado]);

  
  const excluir = (id) => {
      controleLivro.excluir(id)
          .then((sucesso) => {
              if (sucesso) {
                  setLivros((livros) => livros.filter((livro) => livro._id !== id));
              }
          })
          .catch((erro) => {
              console.error("Erro ao excluir livro:", erro);
          });
  };

  
  return (
      <main className="container my-4">
          <h1 className="mb-4">Catálogo de Livros</h1>
          <table className="table table-striped table-bordered table-hover">
              <thead className="table-dark">
                  <tr>
                      <th className="col-2">Título</th>
                      <th className="col-6">Resumo</th>
                      <th className="col-2">Editora</th>
                      <th className="col-2">Autores</th>
                  </tr>
              </thead>
              <tbody>
                  {}
                  {livros.map((livro) => (
                      <LinhaLivro
                          key={livro._id} 
                          livro={livro}
                          excluir={excluir}
                      />
                  ))}
              </tbody>
          </table>
      </main>
  );
};
export default LivroLista;