((definition) => {
  var exports = definition();
  window.Heap = exports.Heap;
})(() => {
  class Heap {
    constructor(getItem) {
      this.heap = [];
      this.getItem = getItem;
    }
    add(item) {
      // Adiciona item no final do array
      this.heap.push(item);

      // colocar os maiores pra cima do heap, levando o item adicionado na raiz para a posição correta
      this.setPosicaoHeapDown(this.heap.length - 1);
    }
    removeTopo() {
      // Armazena primeiro item
      var item = this.heap[0];
      // Seleciona último item
      var ultimo = this.heap.pop();
      // Se houver algum item restante, coloca o item final no
      // começo e deixa ele subir o heap.
      if (this.heap.length > 0) {
        this.heap[0] = ultimo;
        this.setPosicaoHeapUp(0);
      }
      return item;
    }
    remove(item) {
      var i = this.heap.indexOf(item);

      var end = this.heap.pop();

      if (i !== this.heap.length - 1) {
        this.heap[i] = end;

        if (this.getItem(end) < this.getItem(item)) {
          this.setPosicaoHeapDown(i);
        } else {
          this.setPosicaoHeapUp(i);
        }
      }
    }
    tamanho() {
      return this.heap.length;
    }
    reposicionaNoHeap(item) {
      this.setPosicaoHeapDown(this.heap.indexOf(item));
    }
    setPosicaoHeapDown(n) {
      // Pega o item que vai descer de posição
      var item = this.heap[n];

      //Quando for 0, o item nao pode descer mais.
      while (n > 0) {
        // Pega os valores dos items de origem através do index calculdado.
        var origemN = ((n + 1) >> 1) - 1;
        var origem = this.heap[origemN];
        // Troca os itens se a origem tiver um valor maior
        if (this.getItem(item) < this.getItem(origem)) {
          this.heap[origemN] = item;
          this.heap[n] = origem;
          // Atualiza o item para posição atual
          n = origemN;
        }
        // Caso origem tenha valores meenores, não precisa reposicionar mais em baixo
        else {
          break;
        }
      }
    }
    setPosicaoHeapUp(n) {
      // Procure o item e seu custo.
      var tamanho = this.heap.length;
      var item = this.heap[n];
      var custoItem = this.getItem(item);

      while (true) {
        // Calcula a posição dos itens filhos
        var filho2 = (n + 1) << 1;
        var filho1 = filho2 - 1;
        // Guarda a nova posição do item
        var troca = null;
        var filho1Custo;
        // Existe filho 1
        if (filho1 < tamanho) {
          // calcula-se o custo do filho 1
          var filho1posicao = this.heap[filho1];
          filho1Custo = this.getItem(filho1posicao);

          // Se o custo for menor. Guarda o custo menor
          if (filho1Custo < custoItem) {
            troca = filho1;
          }
        }

        // O mesmo cáculo é feito para o filho 2
        if (filho2 < tamanho) {
          var filho2posicao = this.heap[filho2];
          var filho2custo = this.getItem(filho2posicao);
          if (filho2custo < (troca === null ? custoItem : filho1Custo)) {
            troca = filho2;
          }
        }

        // Se troca existir, move-se o item
        if (troca !== null) {
          this.heap[n] = this.heap[troca];
          this.heap[troca] = item;
          n = troca;
        }
        // Se não houver troca, termina
        else {
          break;
        }
      }
    }
  }

  return { Heap: Heap };
});
