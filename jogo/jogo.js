$(() => {
  var $mapa = $("#tabela");

  var mapa = new BuscaNoMapa($mapa, buscaA.busca);

  $("#mapaPadrao").click(() => {
    mapa.montarMapa(false);
  });
  $("#mapaAleatorio").click(() => {
    mapa.montarMapa(true);
  });

  var legendaIsOpen = false;

  $("#mostrarLegenda").click(() => {
    legendaIsOpen = !legendaIsOpen;

    if (legendaIsOpen) {
      $("#mostrarLegenda").text("Esconder legenda");

      $("#custosTerrenos").slideDown();
      $("#itemsLeg").slideDown();
    } else {
      $("#mostrarLegenda").text("Mostrar legenda");

      $("#custosTerrenos").slideUp();
      $("#itemsLeg").slideUp();
    }
  });
});

var classe = {
  inicio: "inicio",
  fim: "fim",
  pingente: {
    sabedoria: "sabedoria",
    poder: "poder",
    coragem: "coragem",
  },
  agente: "agente",
  ativo: "ativo",
  masterSword: "masterSword",
};

//Construtor
class BuscaNoMapa {
  constructor($mapa, busca) {
    this.$mapa = $mapa;
    this.busca = busca;
    this.config = $.extend({ dimensao: 42 });
    this.montarMapa(false);
  }

  //Inicia novo mapa
  montarMapa(isMapaAleatorio) {
    this.tabelaMapa = [];
    var buscaMapa = this,
      itensMapa = [],
      $mapa = this.$mapa;

    $mapa.empty();

    var larguraItem = $mapa.width() / this.config.dimensao - 2,
      alturaItem = $mapa.height() / this.config.dimensao - 2,
      $itemConfig = $("<span />")
        .addClass("item")
        .width(larguraItem)
        .height(alturaItem);

    const posicaoPingentesRandom = [
      {
        nome: "sabedoria",
        x: Math.floor(Math.random() * 42),
        y: Math.floor(Math.random() * 42),
      },
      {
        nome: "coragem",
        x: Math.floor(Math.random() * 42),
        y: Math.floor(Math.random() * 42),
      },
      {
        nome: "poder",
        x: Math.floor(Math.random() * 42),
        y: Math.floor(Math.random() * 42),
      },
    ];

    for (var x = 0; x < this.config.dimensao; x++) {
      var $linhaTabela = $("<div class='vazio' />"),
        custoLinha = [],
        itensTabela = [];

      for (var y = 0; y < this.config.dimensao; y++) {
        var id = "cell_" + x + "_" + y,
          $item = $itemConfig.clone();

        $item.attr("id", id).attr("x", x).attr("y", y);

        $linhaTabela.append($item);

        itensTabela.push($item);

        const custosTerrenos = [1, 2, 10, 15, 18];

        var custoItem = isMapaAleatorio
          ? custosTerrenos[Math.floor(Math.random() * custosTerrenos.length)]
          : defaultMap[x][y];

        custoLinha.push(custoItem);

        $item.addClass("weight" + custoItem);

        if (x === 1 && y === 2) {
          $item.addClass(classe.masterSword);
        }

        const posicaoAtual = posicaoPingentesRandom.find(
          (pingente) => pingente.x === x && pingente.y === y
        );

        if (posicaoAtual) {
          var $pingente = $("<span />")
            .addClass("item" + " " + "pingente" + " " + posicaoAtual.nome)
            .attr("x", x)
            .attr("y", y)
            .width(larguraItem)
            .height(alturaItem);

          $item.append($pingente);
        }

        //Inicializa Link na posição 24,28
        if (x === 27 && y === 23) {
          $item.addClass(classe.inicio + " " + classe.agente);
        }
      }
      $mapa.append($linhaTabela);

      this.tabelaMapa.push(itensTabela);

      itensMapa.push(custoLinha);
    }

    this.mapa = new EstruturaMapa(itensMapa);

    this.$cells = $mapa.find(".item");

    var $agente = $mapa.find("." + classe.agente);
    var $masterSword = $mapa.find("." + classe.masterSword);
    var $poder = $mapa.find("." + classe.pingente.poder);
    var $sabedoria = $mapa.find("." + classe.pingente.sabedoria);
    var $coragem = $mapa.find("." + classe.pingente.coragem);

    buscaMapa.percurso($agente, $sabedoria, $poder, $coragem, $masterSword);
  }

  percurso($agente, $sabedoria, $poder, $coragem, $masterSword) {
    var agente = this.getValoresItem($agente);
    var sabedoria = this.getValoresItem($sabedoria);
    var poder = this.getValoresItem($poder);
    var coragem = this.getValoresItem($coragem);
    var masterSword = this.getValoresItem($masterSword);

    this.$cells.removeClass(classe.fim);
    $agente.removeClass("agente");

    //Calculando qual melhor ordem pra pegar os pingentes
    var path = this.getMelhorCaminho(
      agente,
      sabedoria,
      poder,
      coragem,
      masterSword
    );

    this.caminhoAnimacao(path);
  }
  getMelhorCaminho(agente, sabedoria, poder, coragem, masterSword) {
    var caminho1 = this.getCaminho(
      agente,
      sabedoria,
      poder,
      coragem,
      masterSword
    );

    var caminho2 = this.getCaminho(
      agente,
      sabedoria,
      coragem,
      poder,
      masterSword
    );
    var caminho3 = this.getCaminho(
      agente,
      poder,
      sabedoria,
      coragem,
      masterSword
    );
    var caminho4 = this.getCaminho(
      agente,
      poder,
      coragem,
      sabedoria,
      masterSword
    );
    var caminho5 = this.getCaminho(
      agente,
      coragem,
      sabedoria,
      poder,
      masterSword
    );
    var caminho6 = this.getCaminho(
      agente,
      coragem,
      poder,
      sabedoria,
      masterSword
    );
    var caminhos = [caminho1, caminho2, caminho3, caminho4, caminho5, caminho6];
    var menorCusto = { caminho: [], custo: 1000002 };

    for (var i = 0; i < 6; i++) {
      if (caminhos[i].custo <= menorCusto.custo) {
        menorCusto = caminhos[i];
      }
    }

    return menorCusto.caminho;
  }
  getCaminho(agente, pingente1, pingente2, pingente3, masterSword) {
    var caminhoAgentePingente1 = this.busca(this.mapa, agente, pingente1);

    var caminhoPingente1Pingente2 = this.busca(this.mapa, pingente1, pingente2);
    var caminhoPingente2Pingente3 = this.busca(this.mapa, pingente2, pingente3);
    var caminhoPingente3MasterSword = this.busca(
      this.mapa,
      pingente3,
      masterSword
    );

    var caminho = [
      ...caminhoAgentePingente1,
      ...caminhoPingente1Pingente2,
      ...caminhoPingente2Pingente3,
      ...caminhoPingente3MasterSword,
    ];

    var custo = caminho.reduce((prev, value) => prev + value.weight, 0);

    return { caminho, custo };
  }

  getValoresItem($cell) {
    return this.mapa.tabela[parseInt($cell.attr("x"))][
      parseInt($cell.attr("y"))
    ];
  }

  caminhoAnimacao(path) {
    let custo = 0;

    var mapa = this.tabelaMapa,
      velocidade = 1000 / mapa.length;
    var buscaMapa = this;

    $("#message").text("Custo total " + custo);

    var getCustoItem = (item) => {
      return mapa[item.x][item.y];
    };

    var removerClasse = (path, i) => {
      if (i >= path.length) {
        // finished removing path, set start positions
        return setClasseInicio(path, i);
      }
      getCustoItem(path[i]).removeClass(classe.ativo);
      setTimeout(() => {
        removerClasse(path, i + 1);
      }, velocidade * path[i].getCusto());
    };

    var setClasseInicio = (path, i) => {
      if (i === path.length) {
        buscaMapa.$mapa.find("." + classe.inicio).removeClass(classe.inicio);
        getCustoItem(path[i - 1]).addClass(classe.inicio);
      }
    };

    var setClasse = (path, i) => {
      if (i >= path.length) {
        // Finished showing path, now remove
        $("#message").text("Custo total: " + custo);
        return removerClasse(path, 0);
      }

      getCustoItem(path[i]).addClass(classe.ativo);
      custo = custo + path[i].weight * 10;
      $("#message").text("Custo: " + custo);

      setTimeout(() => {
        setClasse(path, i + 1);
      }, velocidade * path[i].getCusto());
    };

    setClasse(path, 0);

    this.$mapa.find("." + classe.inicio).removeClass(classe.inicio);

    this.$mapa
      .find("." + classe.fim)
      .removeClass(classe.fim)
      .addClass(classe.inicio);
  }
}
