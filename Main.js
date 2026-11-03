let turma = [];


function listarAluno(){
   Interface.listar(turma);
}


function btnSalvar(){
  const aluno = Interface.salvar();

  if (aluno instanceof Aluno){
   turma.push(aluno);
  }
}


function cadastroAluno(){
   Interface.cadastrar();
}
