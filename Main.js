let turmas = [];
let turma = [];

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

function editarNotas(i) {
 const aluno = turma[i];
 const nota1 = prompt('Nota 1:', aluno.getNota1());
 if (nota1 === null) return;
 const nota2 = prompt('Nota 2:', aluno.getNota2());
 if (nota2 === null) return;
 const nota3 = prompt('Nota 3:', aluno.getNota3());
 if (nota3 === null) return;
 const notas = [nota1, nota2, nota3];
 if (notas.some(n => n.trim() === '' || !Number.isFinite(Number(n)) || Number(n) < 0 || Number(n) > 10)) {
  alert('As notas devem ser números entre 0 e 10.');
  return;
 }
 aluno.setNota1(Number(nota1));
 aluno.setNota2(Number(nota2));
 aluno.setNota3(Number(nota3));
 listarAluno();
}
