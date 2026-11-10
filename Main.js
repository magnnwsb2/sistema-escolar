let turmas = [];
let turma = [];

function listarAluno(){
 Interface.listar(turma);
}

function btnSalvar(){
 const aluno = Interface.salvar();
 if (aluno instanceof Aluno){
  turma.push(aluno);
  const turmaSelecionada = document.getElementById('turma-aluno').value;
  if (turmaSelecionada !== '') {
   turmas[Number(turmaSelecionada)].alunos.push(aluno);
  }
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
 }
}

function cadastroAluno(){
 Interface.cadastrar();
}
