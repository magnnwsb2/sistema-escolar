class Aluno {
  #nome;
  #matricula;
  #nota1;
  #nota2;
  #nota3;
  constructor(nome, matricula, nota1, nota2, nota3) {
    this.#nome = nome;
    this.#matricula = matricula;
    this.#nota1 = nota1;
    this.#nota2 = nota2;
    this.#nota3 = nota3;
    this.media = null;
    this.estado = '';
  }

  gerarMedia() {
    this.media = (this.#nota1 + this.#nota2 + this.#nota3) / 3;
    return this.media;
  }

  gerarEstado() {
    if (this.media === null) this.gerarMedia();
    if (this.media >= 6) {
      this.estado = 'Aprovado';
    } else if (this.media >= 3) {
      this.estado = 'Recuperação';
    } else {
      this.estado = 'Reprovado';
    }
    return this.estado;
  }
  getNome() { return this.#nome;}
  getMatricula() { return this.#matricula;}
  getNota1 () {return this.#nota1;}
  getNota2 () {return this.#nota2;}
  getNota3 () {return this.#nota3;}

  setNome (nome) {this.#nome = nome;}
  setNota1 (nota1) {
    this.#nota1 = nota1;
    this.gerarMedia();
    this.gerarEstado();
  }
  setNota2 (nota2) {
    this.#nota2 = nota2;
    this.gerarMedia();
    this.gerarEstado();
  }
  setNota3 (nota3) {
    this.#nota3 = nota3;
    this.gerarMedia();
    this.gerarEstado();
  }
  }

if (typeof module !== 'undefined' && module.exports) module.exports = Aluno;

if (typeof window !== 'undefined') window.Aluno = Aluno;
