// src/LivroDados.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ControleLivro }  from './controle/ControleLivros'; 
import { ControleEditora } from './controle/ControleEditora';

const LivroDados = () => {
  const controleLivro = new ControleLivro();
  const controleEditora = new ControleEditora();
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(0);
  const [opcoes, setOpcoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const editoras = controleEditora.getEditoras().map(editora => ({
      value: editora.codEditora,
      text: editora.nome,
    }));
    setOpcoes(editoras);
  }, []);

  const tratarCombo = (event) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = (event) => {
    event.preventDefault();
    const livro = {
      codigo: "", // Identificador inicial vazio
      titulo: titulo,
      resumo: resumo,
      autores: autores.split('\n'), // Autores separados por linhas
      codEditora: codEditora
  };
    controleLivro.incluir(livro).then(() => {
      navigate('/');
    }); 
  };

  return (
    <main className="container mt-5">
      <h1>Cadastro de Livro</h1>
      <form onSubmit={incluir}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="resumo" className="form-label">Resumo</label>
          <textarea
            className="form-control"
            id="resumo"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="autores" className="form-label">Autores (um por linha)</label>
          <textarea
            className="form-control"
            id="autores"
            value={autores}
            onChange={(e) => setAutores(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="codEditora" className="form-label">Editora</label>
          <select
            className="form-select"
            id="codEditora"
            value={codEditora}
            onChange={tratarCombo}
          >
            {opcoes.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.text}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </main>
  );
};

export default LivroDados;
