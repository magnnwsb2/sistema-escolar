let turma = [];


function listarAluno(){
   Interface.listar(turma);
}


function btnSalvar(){
  const aluno = Interface.salvar();
  turma.push(aluno);
}


function cadastroAluno(){
   Interface.cadastrar();
}
