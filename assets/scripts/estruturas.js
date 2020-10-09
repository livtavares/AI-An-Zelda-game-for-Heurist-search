((definition) => {
  var exports = definition();
  window.EstruturaItem = exports.EstruturaItem;
  window.EstruturaMapa = exports.EstruturaMapa;
})(() => {
  class EstruturaMapa {
    constructor(mapa) {
      this.itens = [];
      this.tabela = [];
      for (var x = 0; x < mapa.length; x++) {
        this.tabela[x] = [];

        for (var y = 0, row = mapa[x]; y < row.length; y++) {
          var item = new EstruturaItem(x, y, row[y]);
          this.tabela[x][y] = item;
          this.itens.push(item);
        }
      }
      this.inicio();
    }
    inicio() {
      this.visitados = [];
      for (var i = 0; i < this.itens.length; i++) {
        buscaA.iniciaItemVazio(this.itens[i]);
      }
    }
    inicializar() {
      for (var i = 0; i < this.visitados.length; i++) {
        buscaA.iniciaItemVazio(this.visitados[i]);
      }
      this.visitados = [];
    }
    setVisitados(item) {
      this.visitados.push(item);
    }
    vizinhos(item) {
      var vizinhosEncontrados = [];
      var x = item.x;
      var y = item.y;
      var mapa = this.tabela;

      // Esquerda
      if (mapa[x - 1] && mapa[x - 1][y]) {
        vizinhosEncontrados.push(mapa[x - 1][y]);
      }

      // Direita
      if (mapa[x + 1] && mapa[x + 1][y]) {
        vizinhosEncontrados.push(mapa[x + 1][y]);
      }

      // Para baixo
      if (mapa[x] && mapa[x][y - 1]) {
        vizinhosEncontrados.push(mapa[x][y - 1]);
      }

      // Para cima
      if (mapa[x] && mapa[x][y + 1]) {
        vizinhosEncontrados.push(mapa[x][y + 1]);
      }
      return vizinhosEncontrados;
    }
    toString() {
      var pesosInfo = [];
      var itens = this.tabela;

      for (var x = 0; x < itens.length; x++) {
        var pesos = [];
        var linha = itens[x];
        for (var y = 0; y < linha.length; y++) {
          pesos.push(linha[y].custo);
        }
        pesosInfo.push(pesos.join(" "));
      }

      return pesosInfo.join("\n");
    }
  }

  class EstruturaItem {
    constructor(x, y, weight) {
      this.x = x;
      this.y = y;
      this.weight = weight;
    }
    toString() {
      return "[" + this.x + " " + this.y + "]";
    }
    getCusto(origem) {
      if (origem && origem.x != this.x && origem.y != this.y) {
        return this.weight * 1.41421;
      }
      return this.weight;
    }
  }

  return {
    EstruturaItem: EstruturaItem,
    EstruturaMapa: EstruturaMapa,
  };
});
