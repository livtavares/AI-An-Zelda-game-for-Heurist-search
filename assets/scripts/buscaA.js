((definition) => {
  var exports = definition();
  window.buscaA = exports.buscaA;
})(() => {
  const getCaminho = (item) => {
    var newItem = item;
    var caminho = [];
    while (newItem.origem) {
      caminho.unshift(newItem);
      newItem = newItem.origem;
    }
    return caminho;
  };

  const iniciaHeap = () => {
    return new Heap((item) => {
      return item.f;
    });
  };

  var buscaA = {
    busca: (mapa, start, end) => {
      mapa.inicializar();

      options = {};

      var distancia = buscaA.getDistancia;

      var heap = iniciaHeap();

      start.distanciaM = distancia(start, end);

      mapa.setVisitados(start);

      heap.add(start);

      while (heap.tamanho() > 0) {
        // Pega o item de menor valor para processar a seguir. Heap mantém isso organizado para nós.
        var item = heap.removeTopo();

        // Finaliza -- resultado encontrado, retorna o caminho
        if (item === end) {
          return getCaminho(item);
        }

        // Caso normal -- move o item de aberto para fechado, para visitar cada um de seus vizinhos
        item.fechado = true;

        // Encontra os vizinhos
        var vizinhos = mapa.vizinhos(item);

        for (var i = 0, il = vizinhos.length; i < il; ++i) {
          var vizinho = vizinhos[i];

          if (vizinho.fechado) {
            // Não é um item para ser visitado, segue para o próximo
            continue;
          }

          // A menorDistanciaAteInicio é a distância mais curta do início ao nó atual.
          // Verifica-se se o caminho percorrido para chegar a este vizinho é o mais curto que já visitado
          var menorDistanciaAteInicio = item.custo + vizinho.getCusto(item);
          var foiVisitado = vizinho.visitado;

          if (!foiVisitado || menorDistanciaAteInicio < vizinho.custo) {
            // Encontrado um caminho ideal. Verifica o uqão bom é:
            vizinho.visitado = true;
            vizinho.origem = item;
            vizinho.distanciaM = vizinho.distanciaM || distancia(vizinho, end);
            vizinho.custo = menorDistanciaAteInicio;
            vizinho.f = vizinho.custo + vizinho.distanciaM;
            mapa.setVisitados(vizinho);

            if (!foiVisitado) {
              //Posiociona no heap de acordo com o valor de f
              heap.add(vizinho);
            } else {
              // Reoganiza a posição do item já visitado no heap
              heap.reposicionaNoHeap(vizinho);
            }
          }
        }
      }

      // Não encontrou nada - não encontrou caminho
      return [];
    },
    getDistancia: (pos0, pos1) => {
      var d1 = Math.abs(pos1.x - pos0.x);
      var d2 = Math.abs(pos1.y - pos0.y);
      return d1 + d2;
    },
    iniciaItemVazio: (item) => {
      item.f = 0;
      item.custo = 0;
      item.distanciaM = 0;
      item.visitado = false;
      item.fechado = false;
      item.origem = null;
    },
  };

  return {
    buscaA: buscaA,
  };
});
