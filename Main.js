import './Aluno.js';
import './Turma.js';
import './Interface.js';

let turmas = [];
let turma = [];

function salvarDados() {
 const dados = turmas.map(t => ({
  professor: t.professor,
  curso: t.curso,
  alunos: t.alunos.map(a => a.getMatricula())
 }));
 const alunos = turma.map(a => ({
  nome: a.getNome(), matricula: a.getMatricula(),
  nota1: a.getNota1(), nota2: a.getNota2(), nota3: a.getNota3()
 }));
 localStorage.setItem('sistema-escolar', JSON.stringify({ turmas: dados, alunos }));
}

function carregarDados() {
 try {
  const dados = JSON.parse(localStorage.getItem('sistema-escolar'));
  if (!dados) return;
  turma = (dados.alunos || []).map(a => {
   const aluno = new Aluno(a.nome, a.matricula, a.nota1, a.nota2, a.nota3);
   aluno.gerarMedia();
   aluno.gerarEstado();
   return aluno;
  });
  turmas = (dados.turmas || []).map(t => {
   const novaTurma = new Turma(t.professor, t.curso);
   novaTurma.alunos = (t.alunos || []).map(m => turma.find(a => a.getMatricula() === m)).filter(Boolean);
   return novaTurma;
  });
  const select = document.getElementById('turma-aluno');
  turmas.forEach((t, i) => {
   const opcao = document.createElement('option');
   opcao.value = i;
   opcao.textContent = t.curso + ' - ' + t.professor;
   select.appendChild(opcao);
  });
 } catch (erro) {
  console.error('Não foi possível recuperar os dados salvos.', erro);
 }
}

function salvarFormulario() {
 const campos = ['nome', 'matricula', 'n1', 'n2', 'n3', 'turma-aluno', 'professor', 'curso'];
 const valores = {};
 campos.forEach(id => valores[id] = document.getElementById(id).value);
 localStorage.setItem('sistema-escolar-formulario', JSON.stringify(valores));
}

function carregarFormulario() {
 try {
  const valores = JSON.parse(localStorage.getItem('sistema-escolar-formulario')) || {};
  Object.keys(valores).forEach(id => {
   const campo = document.getElementById(id);
   if (campo) campo.value = valores[id];
  });
 } catch (erro) {
  console.error('Não foi possível recuperar o formulário.', erro);
 }
}

window.addEventListener('DOMContentLoaded', () => {
 carregarDados();
 carregarFormulario();
 if (localStorage.getItem('sistema-escolar-aba') === 'listar') {
  Interface.listar(turma);
 }
 document.querySelectorAll('input, select').forEach(campo => {
  campo.addEventListener('input', salvarFormulario);
  campo.addEventListener('change', salvarFormulario);
 });
});

function listarAluno(){
 Interface.listar(turma);
}

function btnSalvar(){
 const turmaSelecionada = document.getElementById('turma-aluno').value;
 if (turmaSelecionada === '' || !turmas[Number(turmaSelecionada)]) {
  alert('Cadastre e selecione uma turma antes de cadastrar o aluno.');
  return;
 }
 const aluno = Interface.salvar();
 if (aluno instanceof Aluno){
  turma.push(aluno);
  turmas[Number(turmaSelecionada)].alunos.push(aluno);
  salvarDados();
 }
}

function btnSalvarTurma(){
 const novaTurma = Interface.salvarTurma();
 if (novaTurma instanceof Turma){
  turmas.push(novaTurma);
  const select = document.getElementById('turma-aluno');
  const opcao = document.createElement('option');
  opcao.value = turmas.length - 1;
  opcao.textContent = novaTurma.curso + ' - ' + novaTurma.professor;
  select.appendChild(opcao);
  salvarDados();
 }
}

function cadastroAluno(){
 Interface.cadastrar();
}

function editarNotas(i) {
 const aluno = turma[i];
 if (!aluno) {
  alert('Aluno não encontrado.');
  return;
 }
 const escolha = prompt('Qual nota deseja alterar? Digite 1, 2 ou 3:');
 if (escolha === null) return;
 const numero = escolha.trim();
 if (!['1', '2', '3'].includes(numero)) {
  alert('Escolha a nota 1, 2 ou 3.');
  return;
 }
 const notaAtual = numero === '1' ? aluno.getNota1() : numero === '2' ? aluno.getNota2() : aluno.getNota3();
 const entrada = prompt('Digite o novo valor da nota ' + numero + ':', notaAtual);
 if (entrada === null) return;
 const valor = Number(entrada.trim().replace(',', '.'));
 if (entrada.trim() === '' || !Number.isFinite(valor) || valor < 0 || valor > 10) {
  alert('A nota deve ser um número entre 0 e 10.');
  return;
 }
 if (numero === '1') aluno.setNota1(valor);
 if (numero === '2') aluno.setNota2(valor);
 if (numero === '3') aluno.setNota3(valor);
 salvarDados();
 listarAluno();
 alert('Nota ' + numero + ' atualizada.');
}

window.btnSalvarTurma = btnSalvarTurma;
window.btnSalvar = btnSalvar;
window.listarAluno = listarAluno;
window.cadastroAluno = cadastroAluno;
window.editarNotas = editarNotas;
