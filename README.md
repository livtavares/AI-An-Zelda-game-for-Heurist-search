# Trabalho prático - Busca heurística

> O Trabalho consiste em implementar um agente capaz de locomover-se
> autonomamente pelo reino de Hyrule e reunir os três Pingentes da Virtude. Para
> isso, você deve utilizar o algoritmo de busca heurística A\*.
> O agente deve ser capaz de calcular automaticamente a melhor rota para reunir os
> três pingentes da virtude e ir para Lost Woods, onde está localizada a Master
> Sword.

Após matar o rei de Hyrule, o mago Agahnim está mantendo a princesa Zelda
prisioneira e pretende romper o selo que mantem o malvado Ganon aprisionado no
Dark World.
Link é o único guerreiro capaz de vencer o mago Agahnim, salvar a princesa Zelda e
trazer a paz para o reino de Hyrule. Porem, a única arma forte o suficiente para
derrotar o mago Agahnim é a legendaria Master Sword (Figura 1), que encontra-se
presa em um pedestal em Lost Woods.
Para provar que é digno de empunhar a Master Sword, Link deve encontrar e reunir
os três Pingentes da Virtude: coragem, poder e sabedoria (Figura 2). Os três
pingentes encontram-se espalhados pelo reino de Hyrule.
O seu objetivo é encontrar os três pingentes da virtude e em seguida ir para Lost
Woods até a legendaria Master Sword.

![](./assets/img/pagina-inicial.png)
![](./assets/img/pagina-jogo.png)

## Como rodar a aplicação

Na pasta do projeto, clique com o botão direito do mouse sobre o arquivo index.html e escolha seu navegador preferido para abrir o arquivo.

## Sobre o projeto

O trabalho foi feito utilizando as tecnologias javascript, jQuery, html e css. O método de busca implementado foi o A\*, com a função heuristica de [Manhattan ](https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html).

## Opções de terreno

O jogador pode escolher duas categorias de mapas, o mapa padrão ou um mapa aleatório.

## Posição dos elementos

A cada novo jogo os pingentes aparecem em lugares aleatórios, somente o agente Link tem posição inicial fixa. A espada Master Sword não muda sua posição.

## Tema do jogo

O modelo dos botões e páginas foram inspirados no jogo [The Legend of Zelda](https://www.nintendo.pt/Jogos/Portal-Nintendo/Portal-The-Legend-of-Zelda/Portal-The-Legend-of-Zelda-627606.html)
