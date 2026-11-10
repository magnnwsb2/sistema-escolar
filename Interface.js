class Interface{


constructor(){


}   
static salvar() {
 let nome = document.getElementById('nome').value.trim();
 if (nome == ''){
  alert('Informe o nome do aluno.');
  return null;
 }
 let matricula = document.getElementById('matricula').value.trim();
 if (matricula == ''){
  alert('Informe uma matrícula válida!')
  return null;
 }
 let valorN1 = document.getElementById('n1').value.trim();
 let n1 = Number(valorN1)
 if (valorN1 === '' || !Number.isFinite(n1) || n1 < 0 || n1 > 10){
  alert('A nota 1 deve ser um, número entre 0 e 10.');
  return null;
 }
 let valorN2 = document.getElementById('n2').value.trim();
 let n2 = Number(valorN2)
 if (valorN2 === '' || !Number.isFinite(n2) || n2 < 0 || n2 > 10){
  alert('A nota 2 deve ser um, número entre 0 e 10.');
  return null;
 }
 let valorN3 = document.getElementById('n3').value.trim();
 let n3 = Number(valorN3)
 if (valorN3 === '' || !Number.isFinite(n3) || n3 < 0 || n3 > 10){
  alert('A nota 3 deve ser um, número entre 0 e 10.');
  return null;
 }
 let a1 = new Aluno(nome, matricula, n1, n2, n3);
 let m = a1.gerarMedia(n1, n2, n3);
 a1.gerarEstado(m);

 alert('aluno cadastrado');
 return a1;
}
static listar(turma) {
 const btnCadastrar = document.getElementById('btn-cadastrar');
 const tabCadastrar = document.getElementById('tab-cadastrar');
 const btnListar = document.getElementById('btn-listar');
 const tabListar = document.getElementById('tab-listar');


 btnListar.classList.add('active');
 btnCadastrar.classList.remove('active');


 // Ajusta o conteúdo visível
 tabListar.classList.add('active');
 tabCadastrar.classList.remove('active');
 let lista = '<table>';
 lista += '<tr><th>Nome</th><th>Nota 1</th><th>Nota 2</th><th>Nota 3</th><th>Média</th><th>Situação</th></tr>';
 for (let i = 0; i < turma.length; i++) {
   lista +=
     "<tr>"+
     "<td>"+turma[i].getNome() +"</td>"+
     "<td>"+turma[i].getNota1() +"</td>"+
     "<td>"+turma[i].getNota2() +"</td>"+
     "<td>"+turma[i].getNota3() +"</td>"+
     "<td>"+turma[i].media.toFixed(2) +"</td>"+
     "<td>"+turma[i].estado +"</td>" +
     "</tr>";
 }
 lista += "</table>";
 document.getElementById("alunos").innerHTML = lista;
/* lista += 
  "<tr>" +
  "<td>" + turma[i].getNome() + "</td>" +
  "<td>" + turma [i].media.toFixed(2) + "</td>" +
  "<td>" + turma [i].estado + "<td>" + "</tr>"; */
}

static salvarTurma() {
 const professor = document.getElementById('professor').value.trim();
 const curso = document.getElementById('curso').value.trim();
 if (professor === '' || curso === '') {
  alert('Informe o professor e o curso.');
  return null;
 }
 alert('Turma cadastrada');
 return new Turma(professor, curso);
}

static cadastrar() {
 const btnCadastrar = document.getElementById('btn-cadastrar');
 const tabCadastrar = document.getElementById('tab-cadastrar');
 const btnListar = document.getElementById('btn-listar');
 const tabListar = document.getElementById('tab-listar');


 btnListar.classList.remove('active');
 btnCadastrar.classList.add('active');


 // Ajusta o conteúdo visível
 tabListar.classList.remove('active');
 tabCadastrar.classList.add('active');
 //document.getElementById("media").innerHTML = m;
}
}//fim da classe
