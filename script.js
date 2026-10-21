'use strict';

/* =========================================================
   QUÍMICA PLAY v8.0 - BLOCO 1: Base + Dados + Jogos
   ========================================================= */

/* =========================================================
   STORAGE KEYS
   ========================================================= */
const STORAGE_KEYS = {
    QUESTIONS: 'qp_questions_v7',
    MEMORY_ELEMENTS: 'qp_memory_v7',
    MATCH_PAIRS: 'qp_match_v7',
    HANGMAN_WORDS: 'qp_hangman_v7',
    DIAGRAMS: 'qp_diagrams_v7',
    SCORES: 'qp_scores_v7',
    PLAYER: 'qp_current_player_v7',
    THEME: 'qp_theme_v7',
    SETTINGS: 'qp_settings_v7',
    ADMIN_PASSWORD: 'qp_admin_pass_v7',
    HUB_CONFIG: 'qp_hub_config_v7'
};

const DEFAULT_ADMIN_PASSWORD = 'admin123';

/* =========================================================
   NÍVEIS E SÉRIES
   ========================================================= */
const LEVEL_META = {
    facil: { label: 'Fácil', icon: '🟢' },
    medio: { label: 'Médio', icon: '🟡' },
    dificil: { label: 'Difícil', icon: '🔴' },
    misto: { label: 'Misto', icon: '🎲' }
};

const GRADE_META = {
    '9': { label: '9º ano', icon: '📗' },
    '1': { label: '1º ano', icon: '📘' },
    '2': { label: '2º ano', icon: '📙' },
    '3': { label: '3º ano', icon: '📕' },
    'outro': { label: 'Outro', icon: '🎓' }
};

const GAME_META = {
    quiz: { label: 'Quiz', icon: '🧪', color: 'accent' },
    memory: { label: 'Memória', icon: '🧠', color: 'purple' },
    match: { label: 'Ligar', icon: '🔗', color: 'success' },
    hangman: { label: 'Forca', icon: '🔤', color: 'warning' }
};

/* =========================================================
   DADOS PADRÃO
   ========================================================= */
const DEFAULT_QUESTIONS = [
    { id: 'q1', question: 'Qual é o símbolo químico do ouro?', options: ['Ag', 'Au', 'Fe', 'O'], correct: 1, explanation: 'O símbolo do ouro é <strong>Au</strong>, do latim <em>Aurum</em>.', grade: '1', level: 'facil' },
    { id: 'q2', question: 'Qual é a fórmula química da água?', options: ['H₂O₂', 'HO', 'H₂O', 'OH'], correct: 2, explanation: 'A água é <strong>H₂O</strong>.', grade: '9', level: 'facil' },
    { id: 'q3', question: 'Qual gás as plantas absorvem na fotossíntese?', options: ['O₂', 'N₂', 'CO₂', 'H₂'], correct: 2, explanation: 'As plantas absorvem <strong>CO₂</strong>.', grade: '9', level: 'facil' },
    { id: 'q4', question: 'Qual é o pH de uma solução neutra?', options: ['0', '7', '14', '10'], correct: 1, explanation: 'Neutro = pH <strong>7</strong>.', grade: '1', level: 'facil' },
    { id: 'q5', question: 'Qual é o nome do composto NaCl?', options: ['Cloreto de sódio', 'Sódio clorado', 'Carbonato de sódio', 'Hidróxido de sódio'], correct: 0, explanation: '<strong>Cloreto de sódio</strong> — sal de cozinha.', grade: '1', level: 'facil' },
    { id: 'q6', question: 'Quantos elementos químicos existem na Tabela Periódica atualmente?', options: ['92', '108', '118', '126'], correct: 2, explanation: 'São <strong>118 elementos</strong>.', grade: '1', level: 'medio' },
    { id: 'q7', question: 'O que é um átomo?', options: ['A menor partícula de uma substância composta', 'A menor unidade da matéria que mantém as propriedades de um elemento', 'Uma molécula grande', 'Um tipo de íon'], correct: 1, explanation: 'Átomo é a <strong>menor unidade da matéria</strong>.', grade: '9', level: 'medio' },
    { id: 'q8', question: 'Qual é o elemento mais abundante no universo?', options: ['Oxigênio', 'Hidrogênio', 'Carbono', 'Hélio'], correct: 1, explanation: 'O <strong>hidrogênio</strong> é ~75% do universo.', grade: '2', level: 'medio' },
    { id: 'q9', question: 'Quantos átomos de hidrogênio há na glicose (C₆H₁₂O₆)?', options: ['6', '12', '18', '24'], correct: 1, explanation: '<strong>12 átomos</strong> de hidrogênio.', grade: '2', level: 'medio' },
    { id: 'q10', question: 'Ligação entre metal e ametal com transferência de elétrons?', options: ['Covalente', 'Metálica', 'Iônica', 'Dativa'], correct: 2, explanation: 'Ligação <strong>iônica</strong>.', grade: '1', level: 'medio' },
    { id: 'q11', question: 'Nox do manganês no MnO₄⁻?', options: ['+2', '+5', '+6', '+7'], correct: 3, explanation: '4 O = -8, carga -1 → Mn = <strong>+7</strong>.', grade: '2', level: 'dificil' },
    { id: 'q12', question: 'Volume de 2 mols de gás ideal nas CNTP?', options: ['22,4 L', '33,6 L', '44,8 L', '67,2 L'], correct: 2, explanation: '2 × 22,4 = <strong>44,8 L</strong>.', grade: '2', level: 'dificil' },
    { id: 'q13', question: 'Hibridização do carbono em ligação tripla?', options: ['sp', 'sp²', 'sp³', 'sp³d'], correct: 0, explanation: 'Ligação tripla → <strong>sp</strong>.', grade: '3', level: 'dificil' },
    { id: 'q14', question: 'pH de HCl 0,01 mol/L (ácido forte)?', options: ['1', '2', '3', '12'], correct: 1, explanation: 'pH = -log(10⁻²) = <strong>2</strong>.', grade: '2', level: 'dificil' },
    { id: 'q15', question: 'Segundo a Lei de Hess, ΔH depende de:', options: ['Do caminho da reação', 'Apenas dos estados inicial e final', 'Apenas da temperatura', 'Apenas do catalisador'], correct: 1, explanation: 'Depende só dos <strong>estados inicial e final</strong>.', grade: '3', level: 'dificil' }
];

const DEFAULT_MEMORY_ELEMENTS = [
    { id: 'm1', symbol: 'H', name: 'Hidrogênio', atomic: 1 },
    { id: 'm2', symbol: 'He', name: 'Hélio', atomic: 2 },
    { id: 'm3', symbol: 'C', name: 'Carbono', atomic: 6 },
    { id: 'm4', symbol: 'N', name: 'Nitrogênio', atomic: 7 },
    { id: 'm5', symbol: 'O', name: 'Oxigênio', atomic: 8 },
    { id: 'm6', symbol: 'Na', name: 'Sódio', atomic: 11 },
    { id: 'm7', symbol: 'Fe', name: 'Ferro', atomic: 26 },
    { id: 'm8', symbol: 'Au', name: 'Ouro', atomic: 79 }
];

const DEFAULT_MATCH_PAIRS = [
    { id: 'p1', left: 'H₂O', right: 'Água' },
    { id: 'p2', left: 'CO₂', right: 'Gás carbônico' },
    { id: 'p3', left: 'NaCl', right: 'Sal de cozinha' },
    { id: 'p4', left: 'O₂', right: 'Gás oxigênio' },
    { id: 'p5', left: 'C₆H₁₂O₆', right: 'Glicose' },
    { id: 'p6', left: 'H₂SO₄', right: 'Ácido sulfúrico' }
];

const DEFAULT_HANGMAN_WORDS = [
    { id: 'h1', word: 'LIGAÇÃO IÔNICA', level: 'Fácil', difficultyScore: 1, definition: 'Tipo de ligação química resultante da atração eletrostática entre íons de cargas opostas (cátions e ânions), geralmente envolvendo a transferência definitiva de elétrons de um metal para um ametal.' },
    { id: 'h2', word: 'LIGAÇÃO COVALENTE', level: 'Fácil', difficultyScore: 1, definition: 'Ligação química que ocorre pelo compartilhamento de pares de elétrons entre átomos (geralmente ametal com ametal ou hidrogênio), visando atingir a estabilidade da camada de valência.' },
    { id: 'h3', word: 'LIGAÇÃO METÁLICA', level: 'Médio', difficultyScore: 2, definition: 'Interação que ocorre entre átomos de metais, onde os elétrons de valência formam uma nuvem eletrônica livre e deslocalizada, conferindo alta condutividade térmica e elétrica.' },
    { id: 'h4', word: 'ELÉTRONS', level: 'Fácil', difficultyScore: 1, definition: 'Partículas subatômicas com carga elétrica negativa que orbitam o núcleo do átomo e participam diretamente de todas as ligações químicas.' },
    { id: 'h5', word: 'CÁTION', level: 'Fácil', difficultyScore: 1, definition: 'Íon com carga elétrica positiva, formado quando um átomo neutro perde um ou mais elétrons (comum em metais).' },
    { id: 'h6', word: 'ÂNION', level: 'Fácil', difficultyScore: 1, definition: 'Íon com carga elétrica negativa, formado quando um átomo neutro ganha um ou mais elétrons (comum em ametais).' },
    { id: 'h7', word: 'COMPARTILHAMENTO', level: 'Médio', difficultyScore: 2, definition: 'Processo fundamental nas ligações covalentes em que os átomos envolvidos dividem pares de elétrons para completarem seus octetos.' },
    { id: 'h8', word: 'ELETRONEGATIVIDADE', level: 'Avançado', difficultyScore: 3, definition: 'Propriedade periódica que mede a tendência de um átomo em atrair elétrons para si quando ligado covalentemente a outro elemento.' },
    { id: 'h9', word: 'POLARIDADE', level: 'Médio', difficultyScore: 2, definition: 'Característica das moléculas ou ligações que apresenta distribuição desigual de cargas elétricas, gerando polos positivo e negativo.' },
    { id: 'h10', word: 'OCTETO', level: 'Fácil', difficultyScore: 1, definition: 'Regra que estabelece que os átomos tendem a adquirir estabilidade química quando possuem 8 elétrons na sua camada de valência (semelhante aos gases nobres).' },
    { id: 'h11', word: 'MOLÉCULA', level: 'Fácil', difficultyScore: 1, definition: 'Agregado de dois ou mais átomos unidos por fortes ligações covalentes, representando a menor parte fundamental de uma substância pura.' },
    { id: 'h12', word: 'ÍONS', level: 'Fácil', difficultyScore: 1, definition: 'Átomos ou grupos de átomos que ganharam ou perderam elétrons, adquirindo carga elétrica líquida positiva ou negativa.' },
    { id: 'h13', word: 'VALÊNCIA', level: 'Médio', difficultyScore: 2, definition: 'Número que indica a capacidade de combinação de um átomo, determinado principalmente pelos elétrons presentes em sua camada mais externa.' },
    { id: 'h14', word: 'SÓDIO', level: 'Fácil', difficultyScore: 1, definition: 'Metal alcalino (família 1) altamente reativo que tende a perder facilmente 1 elétron para formar o cátion Na⁺ em ligações iônicas.' },
    { id: 'h15', word: 'CLORO', level: 'Fácil', difficultyScore: 1, definition: 'Halogênio gasoso (família 17) que possui 7 elétrons na valência e tende a ganhar 1 elétron para formar o ânion Cl⁻.' },
    { id: 'h16', word: 'DÚCTIL', level: 'Avançado', difficultyScore: 3, definition: 'Propriedade física característica dos metais que permite que sejam estirados em fios finos sem se romperem, graças à flexibilidade da ligação metálica.' },
    { id: 'h17', word: 'CONDUTIVIDADE', level: 'Médio', difficultyScore: 2, definition: 'Capacidade de conduzir corrente elétrica ou calor, muito presente em soluções iônicas dissolvidas e em metais.' },
    { id: 'h18', word: 'CRISTAL', level: 'Médio', difficultyScore: 2, definition: 'Estrutura tridimensional organizada e geométrica formada pela repetição de íons em compostos iônicos (ex: cloreto de sódio).' },
    { id: 'h19', word: 'AMETAL', level: 'Fácil', difficultyScore: 1, definition: 'Elemento químico localizado na parte direita superior da tabela periódica, caracterizado por alta eletronegatividade e tendência a ganhar elétrons.' },
    { id: 'h20', word: 'METAL', level: 'Fácil', difficultyScore: 1, definition: 'Elemento químico bom condutor de calor e eletricidade, sólido (exceto o mercúrio), com tendência a doar elétrons nas reações.' }
];

/* =========================================================
   CONFIGURAÇÃO PADRÃO DO HUB DE JOGOS
   ========================================================= */
const DEFAULT_HUB_CONFIG = {
    landing: {
        title: 'Química Play',
        tagline: '',
        icon: '⚗️',
        btnPlay: '🎮 Jogar Agora',
        btnStats: '📊 Ver Ranking',
        btnDiagrams: '📐 Diagramas'
    },
    games: {
        quiz: { name: 'Quiz de Química', icon: '🧪', desc: 'Responda perguntas de múltipla escolha', order: 1, enabled: true },
        memory: { name: 'Memória dos Elementos', icon: '🧠', desc: 'Combine símbolos com nomes dos elementos', order: 2, enabled: true },
        match: { name: 'Ligue os Pares', icon: '🔗', desc: 'Conecte elementos com suas propriedades', order: 3, enabled: true },
        hangman: { name: 'Forca das Ligações Químicas', icon: '🔤', desc: 'Descubra os termos e aprenda as definições científicas', order: 4, enabled: true }
    }
};

/* =========================================================
   CONFIGURAÇÃO VISUAL PADRÃO
   ========================================================= */
const DEFAULT_VISUAL_CONFIG = {
    dark: {
        accent: '#00e5ff', accent2: '#0088ff', bgPrimary: '#0a0e27', bgCard: '#1a1f3a',
        success: '#00ff88', danger: '#ff3860', warning: '#ffb400', purple: '#9d00ff'
    },
    light: {
        accent: '#0088ff', accent2: '#0066cc', bgPrimary: '#e8eeff', bgCard: '#ffffff',
        success: '#00a854', danger: '#e63351', warning: '#e69a00', purple: '#7b00cc'
    }
};

/* =========================================================
   DIAGRAMAS MELHORADOS COM SUPORTE A ZOOM
   ========================================================= */
const DEFAULT_DIAGRAMS = [
    {
        id: 'tabela-periodica-completa',
        category: 'tabela',
        icon: '📊',
        title: 'Tabela Periódica Completa',
        description: 'Todos os 118 elementos organizados por família e período.',
        svg: `<svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" style="min-width:900px">
  <defs>
    <style>
      .el { font-family: sans-serif; font-size: 11px; font-weight: 700; text-anchor: middle; }
      .num { font-family: sans-serif; font-size: 8px; text-anchor: middle; opacity: 0.8; }
      .metal-alcalino { fill: #ff6b6b; stroke: #8a1c1c; stroke-width: 1; }
      .metal-alcalino-terroso { fill: #ffa94d; stroke: #8a4a1c; stroke-width: 1; }
      .metal-transicao { fill: #ffd43b; stroke: #8a6a1c; stroke-width: 1; }
      .metal-pos-transicao { fill: #a8e6cf; stroke: #2c7863; stroke-width: 1; }
      .semimetal { fill: #b3b3ff; stroke: #3a3a8a; stroke-width: 1; }
      .ametal { fill: #74c0fc; stroke: #1a5a8a; stroke-width: 1; }
      .halogenio { fill: #d0bfff; stroke: #5a3aa8; stroke-width: 1; }
      .gas-nobre { fill: #ffb3d9; stroke: #8a1a5a; stroke-width: 1; }
      .lantanideo { fill: #ffc9c9; stroke: #8a3a3a; stroke-width: 1; }
      .actinideo { fill: #ff9f9f; stroke: #8a2a2a; stroke-width: 1; }
      .label { fill: #ffffff; }
    </style>
  </defs>
  <rect width="1000" height="500" fill="#0a0e27"/>
  <!-- Linha 1: H -->
  <rect class="ametal" x="10" y="30" width="34" height="34" rx="3"/>
  <text class="el label" x="27" y="50">H</text>
  <text class="num label" x="27" y="60">1</text>
  <!-- Linha 1: He -->
  <rect class="gas-nobre" x="910" y="30" width="34" height="34" rx="3"/>
  <text class="el label" x="927" y="50">He</text>
  <text class="num label" x="927" y="60">2</text>
  <!-- Linha 2 -->
  <rect class="metal-alcalino" x="10" y="70" width="34" height="34" rx="3"/>
  <text class="el label" x="27" y="90">Li</text>
  <text class="num label" x="27" y="100">3</text>
  <rect class="metal-alcalino-terroso" x="48" y="70" width="34" height="34" rx="3"/>
  <text class="el label" x="65" y="90">Be</text>
  <text class="num label" x="65" y="100">4</text>
  <rect class="semimetal" x="200" y="70" width="34" height="34" rx="3"/>
  <text class="el label" x="217" y="90">B</text>
  <text class="num label" x="217" y="100">5</text>
  <rect class="ametal" x="238" y="70" width="34" height="34" rx="3"/>
  <text class="el label" x="255" y="90">C</text>
  <text class="num label" x="255" y="100">6</text>
  <rect class="ametal" x="276" y="70" width="34" height="34" rx="3"/>
  <text class="el label" x="293" y="90">N</text>
  <text class="num label" x="293" y="100">7</text>
  <rect class="ametal" x="314" y="70" width="34" height="34" rx="3"/>
  <text class="el label" x="331" y="90">O</text>
  <text class="num label" x="331" y="100">8</text>
  <rect class="halogenio" x="352" y="70" width="34" height="34" rx="3"/>
  <text class="el label" x="369" y="90">F</text>
  <text class="num label" x="369" y="100">9</text>
  <rect class="gas-nobre" x="910" y="70" width="34" height="34" rx="3"/>
  <text class="el label" x="927" y="90">Ne</text>
  <text class="num label" x="927" y="100">10</text>
  <!-- Linha 3 -->
  <rect class="metal-alcalino" x="10" y="110" width="34" height="34" rx="3"/>
  <text class="el label" x="27" y="130">Na</text>
  <text class="num label" x="27" y="140">11</text>
  <rect class="metal-alcalino-terroso" x="48" y="110" width="34" height="34" rx="3"/>
  <text class="el label" x="65" y="130">Mg</text>
  <text class="num label" x="65" y="140">12</text>
  <rect class="metal-pos-transicao" x="162" y="110" width="34" height="34" rx="3"/>
  <text class="el label" x="179" y="130">Al</text>
  <text class="num label" x="179" y="140">13</text>
  <rect class="semimetal" x="200" y="110" width="34" height="34" rx="3"/>
  <text class="el label" x="217" y="130">Si</text>
  <text class="num label" x="217" y="140">14</text>
  <rect class="ametal" x="238" y="110" width="34" height="34" rx="3"/>
  <text class="el label" x="255" y="130">P</text>
  <text class="num label" x="255" y="140">15</text>
  <rect class="ametal" x="276" y="110" width="34" height="34" rx="3"/>
  <text class="el label" x="293" y="130">S</text>
  <text class="num label" x="293" y="140">16</text>
  <rect class="halogenio" x="314" y="110" width="34" height="34" rx="3"/>
  <text class="el label" x="331" y="130">Cl</text>
  <text class="num label" x="331" y="140">17</text>
  <rect class="gas-nobre" x="910" y="110" width="34" height="34" rx="3"/>
  <text class="el label" x="927" y="130">Ar</text>
  <text class="num label" x="927" y="140">18</text>
  <!-- Linha 4 (resumido) -->
  <rect class="metal-alcalino" x="10" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="27" y="170">K</text>
  <text class="num label" x="27" y="180">19</text>
  <rect class="metal-alcalino-terroso" x="48" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="65" y="170">Ca</text>
  <text class="num label" x="65" y="180">20</text>
  <rect class="metal-transicao" x="86" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="103" y="170">Sc</text>
  <text class="num label" x="103" y="180">21</text>
  <rect class="metal-transicao" x="124" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="141" y="170">Ti</text>
  <text class="num label" x="141" y="180">22</text>
  <rect class="metal-transicao" x="162" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="179" y="170">V</text>
  <text class="num label" x="179" y="180">23</text>
  <rect class="metal-transicao" x="200" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="217" y="170">Cr</text>
  <text class="num label" x="217" y="180">24</text>
  <rect class="metal-transicao" x="238" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="255" y="170">Mn</text>
  <text class="num label" x="255" y="180">25</text>
  <rect class="metal-transicao" x="276" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="293" y="170">Fe</text>
  <text class="num label" x="293" y="180">26</text>
  <rect class="metal-transicao" x="314" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="331" y="170">Co</text>
  <text class="num label" x="331" y="180">27</text>
  <rect class="metal-transicao" x="352" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="369" y="170">Ni</text>
  <text class="num label" x="369" y="180">28</text>
  <rect class="metal-transicao" x="390" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="407" y="170">Cu</text>
  <text class="num label" x="407" y="180">29</text>
  <rect class="metal-transicao" x="428" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="445" y="170">Zn</text>
  <text class="num label" x="445" y="180">30</text>
  <rect class="metal-pos-transicao" x="466" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="483" y="170">Ga</text>
  <text class="num label" x="483" y="180">31</text>
  <rect class="semimetal" x="504" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="521" y="170">Ge</text>
  <text class="num label" x="521" y="180">32</text>
  <rect class="semimetal" x="542" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="559" y="170">As</text>
  <text class="num label" x="559" y="180">33</text>
  <rect class="ametal" x="580" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="597" y="170">Se</text>
  <text class="num label" x="597" y="180">34</text>
  <rect class="halogenio" x="618" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="635" y="170">Br</text>
  <text class="num label" x="635" y="180">35</text>
  <rect class="gas-nobre" x="910" y="150" width="34" height="34" rx="3"/>
  <text class="el label" x="927" y="170">Kr</text>
  <text class="num label" x="927" y="180">36</text>
  <!-- Linha 5 -->
  <rect class="metal-alcalino" x="10" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="27" y="210">Rb</text>
  <text class="num label" x="27" y="220">37</text>
  <rect class="metal-alcalino-terroso" x="48" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="65" y="210">Sr</text>
  <text class="num label" x="65" y="220">38</text>
  <rect class="metal-transicao" x="86" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="103" y="210">Y</text>
  <text class="num label" x="103" y="220">39</text>
  <rect class="metal-transicao" x="124" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="141" y="210">Zr</text>
  <text class="num label" x="141" y="220">40</text>
  <rect class="metal-transicao" x="162" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="179" y="210">Nb</text>
  <text class="num label" x="179" y="220">41</text>
  <rect class="metal-transicao" x="200" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="217" y="210">Mo</text>
  <text class="num label" x="217" y="220">42</text>
  <rect class="metal-transicao" x="238" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="255" y="210">Tc</text>
  <text class="num label" x="255" y="220">43</text>
  <rect class="metal-transicao" x="276" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="293" y="210">Ru</text>
  <text class="num label" x="293" y="220">44</text>
  <rect class="metal-transicao" x="314" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="331" y="210">Rh</text>
  <text class="num label" x="331" y="220">45</text>
  <rect class="metal-transicao" x="352" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="369" y="210">Pd</text>
  <text class="num label" x="369" y="220">46</text>
  <rect class="metal-transicao" x="390" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="407" y="210">Ag</text>
  <text class="num label" x="407" y="220">47</text>
  <rect class="metal-transicao" x="428" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="445" y="210">Cd</text>
  <text class="num label" x="445" y="220">48</text>
  <rect class="metal-pos-transicao" x="466" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="483" y="210">In</text>
  <text class="num label" x="483" y="220">49</text>
  <rect class="metal-pos-transicao" x="504" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="521" y="210">Sn</text>
  <text class="num label" x="521" y="220">50</text>
  <rect class="semimetal" x="542" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="559" y="210">Sb</text>
  <text class="num label" x="559" y="220">51</text>
  <rect class="semimetal" x="580" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="597" y="210">Te</text>
  <text class="num label" x="597" y="220">52</text>
  <rect class="halogenio" x="618" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="635" y="210">I</text>
  <text class="num label" x="635" y="220">53</text>
  <rect class="gas-nobre" x="910" y="190" width="34" height="34" rx="3"/>
  <text class="el label" x="927" y="210">Xe</text>
  <text class="num label" x="927" y="220">54</text>
  <!-- Linha 6 -->
  <rect class="metal-alcalino" x="10" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="27" y="250">Cs</text>
  <text class="num label" x="27" y="260">55</text>
  <rect class="metal-alcalino-terroso" x="48" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="65" y="250">Ba</text>
  <text class="num label" x="65" y="260">56</text>
  <rect class="lantanideo" x="86" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="103" y="250">La</text>
  <text class="num label" x="103" y="260">57</text>
  <rect class="metal-transicao" x="124" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="141" y="250">Hf</text>
  <text class="num label" x="141" y="260">72</text>
  <rect class="metal-transicao" x="162" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="179" y="250">Ta</text>
  <text class="num label" x="179" y="260">73</text>
  <rect class="metal-transicao" x="200" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="217" y="250">W</text>
  <text class="num label" x="217" y="260">74</text>
  <rect class="metal-transicao" x="238" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="255" y="250">Re</text>
  <text class="num label" x="255" y="260">75</text>
  <rect class="metal-transicao" x="276" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="293" y="250">Os</text>
  <text class="num label" x="293" y="260">76</text>
  <rect class="metal-transicao" x="314" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="331" y="250">Ir</text>
  <text class="num label" x="331" y="260">77</text>
  <rect class="metal-transicao" x="352" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="369" y="250">Pt</text>
  <text class="num label" x="369" y="260">78</text>
  <rect class="metal-transicao" x="390" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="407" y="250">Au</text>
  <text class="num label" x="407" y="260">79</text>
  <rect class="metal-transicao" x="428" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="445" y="250">Hg</text>
  <text class="num label" x="445" y="260">80</text>
  <rect class="metal-pos-transicao" x="466" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="483" y="250">Tl</text>
  <text class="num label" x="483" y="260">81</text>
  <rect class="metal-pos-transicao" x="504" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="521" y="250">Pb</text>
  <text class="num label" x="521" y="260">82</text>
  <rect class="metal-pos-transicao" x="542" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="559" y="250">Bi</text>
  <text class="num label" x="559" y="260">83</text>
  <rect class="semimetal" x="580" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="597" y="250">Po</text>
  <text class="num label" x="597" y="260">84</text>
  <rect class="halogenio" x="618" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="635" y="250">At</text>
  <text class="num label" x="635" y="260">85</text>
  <rect class="gas-nobre" x="910" y="230" width="34" height="34" rx="3"/>
  <text class="el label" x="927" y="250">Rn</text>
  <text class="num label" x="927" y="260">86</text>
  <!-- Linha 7 -->
  <rect class="metal-alcalino" x="10" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="27" y="290">Fr</text>
  <text class="num label" x="27" y="300">87</text>
  <rect class="metal-alcalino-terroso" x="48" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="65" y="290">Ra</text>
  <text class="num label" x="65" y="300">88</text>
  <rect class="actinideo" x="86" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="103" y="290">Ac</text>
  <text class="num label" x="103" y="300">89</text>
  <rect class="metal-transicao" x="124" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="141" y="290">Rf</text>
  <text class="num label" x="141" y="300">104</text>
  <rect class="metal-transicao" x="162" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="179" y="290">Db</text>
  <text class="num label" x="179" y="300">105</text>
  <rect class="metal-transicao" x="200" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="217" y="290">Sg</text>
  <text class="num label" x="217" y="300">106</text>
  <rect class="metal-transicao" x="238" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="255" y="290">Bh</text>
  <text class="num label" x="255" y="300">107</text>
  <rect class="metal-transicao" x="276" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="293" y="290">Hs</text>
  <text class="num label" x="293" y="300">108</text>
  <rect class="metal-transicao" x="314" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="331" y="290">Mt</text>
  <text class="num label" x="331" y="300">109</text>
  <rect class="metal-transicao" x="352" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="369" y="290">Ds</text>
  <text class="num label" x="369" y="300">110</text>
  <rect class="metal-transicao" x="390" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="407" y="290">Rg</text>
  <text class="num label" x="407" y="300">111</text>
  <rect class="metal-transicao" x="428" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="445" y="290">Cn</text>
  <text class="num label" x="445" y="300">112</text>
  <rect class="metal-pos-transicao" x="466" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="483" y="290">Nh</text>
  <text class="num label" x="483" y="300">113</text>
  <rect class="metal-pos-transicao" x="504" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="521" y="290">Fl</text>
  <text class="num label" x="521" y="300">114</text>
  <rect class="metal-pos-transicao" x="542" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="559" y="290">Mc</text>
  <text class="num label" x="559" y="300">115</text>
  <rect class="metal-pos-transicao" x="580" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="597" y="290">Lv</text>
  <text class="num label" x="597" y="300">116</text>
  <rect class="halogenio" x="618" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="635" y="290">Ts</text>
  <text class="num label" x="635" y="300">117</text>
  <rect class="gas-nobre" x="910" y="270" width="34" height="34" rx="3"/>
  <text class="el label" x="927" y="290">Og</text>
  <text class="num label" x="927" y="300">118</text>
  <!-- Lantanídeos e actinídeos -->
  <text class="el" x="500" y="340" style="fill:#ffffff;font-size:14px;">Lantanídeos e Actinídeos (separados)</text>
  <rect class="lantanideo" x="200" y="360" width="34" height="34" rx="3"/>
  <text class="el label" x="217" y="380">Ce</text>
  <rect class="lantanideo" x="238" y="360" width="34" height="34" rx="3"/>
  <text class="el label" x="255" y="380">Pr</text>
  <rect class="lantanideo" x="276" y="360" width="34" height="34" rx="3"/>
  <text class="el label" x="293" y="380">Nd</text>
  <rect class="lantanideo" x="314" y="360" width="34" height="34" rx="3"/>
  <text class="el label" x="331" y="380">Pm</text>
  <rect class="lantanideo" x="352" y="360" width="34" height="34" rx="3"/>
  <text class="el label" x="369" y="380">Sm</text>
  <rect class="lantanideo" x="390" y="360" width="34" height="34" rx="3"/>
  <text class="el label" x="407" y="380">Eu</text>
  <rect class="lantanideo" x="428" y="360" width="34" height="34" rx="3"/>
  <text class="el label" x="445" y="380">Gd</text>
  <rect class="lantanideo" x="466" y="360" width="34" height="34" rx="3"/>
  <text class="el label" x="483" y="380">Tb</text>
  <rect class="lantanideo" x="504" y="360" width="34" height="34" rx="3"/>
  <text class="el label" x="521" y="380">Dy</text>
  <rect class="lantanideo" x="542" y="360" width="34" height="34" rx="3"/>
  <text class="el label" x="559" y="380">Ho</text>
  <rect class="actinideo" x="200" y="410" width="34" height="34" rx="3"/>
  <text class="el label" x="217" y="430">Th</text>
  <rect class="actinideo" x="238" y="410" width="34" height="34" rx="3"/>
  <text class="el label" x="255" y="430">Pa</text>
  <rect class="actinideo" x="276" y="410" width="34" height="34" rx="3"/>
  <text class="el label" x="293" y="430">U</text>
  <rect class="actinideo" x="314" y="410" width="34" height="34" rx="3"/>
  <text class="el label" x="331" y="430">Np</text>
  <rect class="actinideo" x="352" y="410" width="34" height="34" rx="3"/>
  <text class="el label" x="369" y="430">Pu</text>
  <!-- Legenda -->
  <rect class="metal-alcalino" x="700" y="360" width="20" height="20"/>
  <text class="label" x="725" y="375" style="font-size:11px;">Metal alcalino</text>
  <rect class="metal-alcalino-terroso" x="700" y="385" width="20" height="20"/>
  <text class="label" x="725" y="400" style="font-size:11px;">Alcalino-terroso</text>
  <rect class="metal-transicao" x="700" y="410" width="20" height="20"/>
  <text class="label" x="725" y="425" style="font-size:11px;">Metal de transição</text>
  <rect class="ametal" x="850" y="360" width="20" height="20"/>
  <text class="label" x="875" y="375" style="font-size:11px;">Ametal</text>
  <rect class="gas-nobre" x="850" y="385" width="20" height="20"/>
  <text class="label" x="875" y="400" style="font-size:11px;">Gás nobre</text>
  <rect class="semimetal" x="850" y="410" width="20" height="20"/>
  <text class="label" x="875" y="425" style="font-size:11px;">Semimetal</text>
</svg>`,
        tip: 'Use scroll do mouse ou os botões +/- para dar zoom. Arraste para mover.'
    },
    {
        id: 'tabela-nox',
        category: 'referencia',
        icon: '🔢',
        title: 'Tabela de Números de Oxidação (Nox)',
        description: 'Nox mais comuns dos elementos por família.',
        svg: `<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" style="min-width:600px">
  <style>
    .h { font-family: sans-serif; font-size: 14px; font-weight: 800; fill: #00e5ff; }
    .r { font-family: sans-serif; font-size: 12px; fill: #e0e6ff; }
    .bg { fill: #0a0e27; }
    .card { fill: #1a1f3a; stroke: #2a3050; stroke-width: 1; }
  </style>
  <rect class="bg" width="700" height="400"/>
  <text class="h" x="20" y="30">Família 1 (Metais Alcalinos)</text>
  <text class="r" x="20" y="50">Nox = +1 sempre (Li, Na, K, Rb, Cs)</text>
  <text class="h" x="20" y="80">Família 2 (Alcalino-Terrosos)</text>
  <text class="r" x="20" y="100">Nox = +2 sempre (Be, Mg, Ca, Sr, Ba)</text>
  <text class="h" x="20" y="130">Família 13 (Alumínio)</text>
  <text class="r" x="20" y="150">Al = +3 (único)</text>
  <text class="h" x="20" y="180">Hidrogênio</text>
  <text class="r" x="20" y="200">+1 em compostos com ametais; -1 em hidretos metálicos</text>
  <text class="h" x="20" y="230">Oxigênio</text>
  <text class="r" x="20" y="250">-2 (geral); -1 em peróxidos; -1/2 em superóxidos</text>
  <text class="h" x="20" y="280">Halogênios (F, Cl, Br, I)</text>
  <text class="r" x="20" y="300">-1 (íon); +1, +3, +5, +7 em oxiácidos</text>
  <text class="h" x="20" y="330">Soma dos Nox = carga total do íon</text>
  <text class="r" x="20" y="350">Composto neutro: soma = 0</text>
  <text class="h" x="20" y="380">Exemplo: MnO₄⁻ → Mn + 4(-2) = -1 → Mn = +7</text>
</svg>`,
        tip: 'A soma dos NOX em compostos neutros é sempre 0. Em íons, é igual à carga.'
    },
    {
        id: 'tabela-eletronegatividade',
        category: 'referencia',
        icon: '⚡',
        title: 'Escala de Eletronegatividade',
        description: 'Elementos ordenados por tendência a atrair elétrons (escala de Pauling).',
        svg: `<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" style="min-width:600px">
  <style>
    .bar { stroke: #2a3050; stroke-width: 1; }
    .lbl { font-family: sans-serif; font-size: 12px; font-weight: 700; fill: #fff; }
    .val { font-family: sans-serif; font-size: 11px; fill: #a0a8c5; }
  </style>
  <rect width="700" height="400" fill="#0a0e27"/>
  <text x="20" y="25" class="lbl" style="font-size:16px;fill:#00e5ff;">F &nbsp; (4.0)</text>
  <rect class="bar" x="20" y="35" width="660" height="20" fill="#ff3860"/>
  <text x="20" y="80" class="lbl" style="font-size:16px;fill:#00e5ff;">O &nbsp; (3.5)</text>
  <rect class="bar" x="20" y="90" width="580" height="20" fill="#ff6b3d"/>
  <text x="20" y="135" class="lbl" style="font-size:16px;fill:#00e5ff;">Cl, N &nbsp; (3.0)</text>
  <rect class="bar" x="20" y="145" width="500" height="20" fill="#ffb400"/>
  <text x="20" y="190" class="lbl" style="font-size:16px;fill:#00e5ff;">Br &nbsp; (2.8)</text>
  <rect class="bar" x="20" y="200" width="470" height="20" fill="#c8e65a"/>
  <text x="20" y="245" class="lbl" style="font-size:16px;fill:#00e5ff;">I, S, C &nbsp; (2.5)</text>
  <rect class="bar" x="20" y="255" width="420" height="20" fill="#00ff88"/>
  <text x="20" y="300" class="lbl" style="font-size:16px;fill:#00e5ff;">H, P &nbsp; (2.1-2.2)</text>
  <rect class="bar" x="20" y="310" width="350" height="20" fill="#00c2a8"/>
  <text x="20" y="355" class="lbl" style="font-size:16px;fill:#00e5ff;">Metais (Li, Na, K, Fe)</text>
  <rect class="bar" x="20" y="365" width="200" height="20" fill="#0088ff"/>
</svg>`,
        tip: 'Quanto maior a eletronegatividade, maior a tendência de atrair elétrons.'
    },
    {
        id: 'tabela-ions-completa',
        category: 'referencia',
        icon: '🔤',
        title: 'Tabela Completa de Íons',
        description: 'Cátions e ânions mais comuns com suas cargas.',
        svg: `<svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg" style="min-width:600px">
  <style>
    .cat { fill: #1a1f3a; stroke: #ffb400; stroke-width: 1; }
    .an { fill: #1a1f3a; stroke: #00e5ff; stroke-width: 1; }
    .tt { font-family: sans-serif; font-size: 14px; font-weight: 800; }
    .tc { font-family: monospace; font-size: 13px; font-weight: 700; text-anchor: middle; fill: #ffffff; }
  </style>
  <rect width="700" height="500" fill="#0a0e27"/>
  <text class="tt" x="20" y="30" fill="#ffb400">CÁTIONS (+)</text>
  <rect class="cat" x="20" y="40" width="80" height="35" rx="5"/>
  <text class="tc" x="60" y="63">Na⁺</text>
  <rect class="cat" x="110" y="40" width="80" height="35" rx="5"/>
  <text class="tc" x="150" y="63">K⁺</text>
  <rect class="cat" x="200" y="40" width="80" height="35" rx="5"/>
  <text class="tc" x="240" y="63">Li⁺</text>
  <rect class="cat" x="290" y="40" width="80" height="35" rx="5"/>
  <text class="tc" x="330" y="63">Ag⁺</text>
  <rect class="cat" x="380" y="40" width="80" height="35" rx="5"/>
  <text class="tc" x="420" y="63">NH₄⁺</text>
  <rect class="cat" x="470" y="40" width="80" height="35" rx="5"/>
  <text class="tc" x="510" y="63">H₃O⁺</text>
  <rect class="cat" x="20" y="85" width="80" height="35" rx="5"/>
  <text class="tc" x="60" y="108">Mg²⁺</text>
  <rect class="cat" x="110" y="85" width="80" height="35" rx="5"/>
  <text class="tc" x="150" y="108">Ca²⁺</text>
  <rect class="cat" x="200" y="85" width="80" height="35" rx="5"/>
  <text class="tc" x="240" y="108">Zn²⁺</text>
  <rect class="cat" x="290" y="85" width="80" height="35" rx="5"/>
  <text class="tc" x="330" y="108">Fe²⁺</text>
  <rect class="cat" x="380" y="85" width="80" height="35" rx="5"/>
  <text class="tc" x="420" y="108">Cu²⁺</text>
  <rect class="cat" x="470" y="85" width="80" height="35" rx="5"/>
  <text class="tc" x="510" y="108">Ba²⁺</text>
  <rect class="cat" x="20" y="130" width="80" height="35" rx="5"/>
  <text class="tc" x="60" y="153">Al³⁺</text>
  <rect class="cat" x="110" y="130" width="80" height="35" rx="5"/>
  <text class="tc" x="150" y="153">Fe³⁺</text>
  <rect class="cat" x="200" y="130" width="80" height="35" rx="5"/>
  <text class="tc" x="240" y="153">Cr³⁺</text>
  <text class="tt" x="20" y="210" fill="#00e5ff">ÂNIONS (-)</text>
  <rect class="an" x="20" y="220" width="80" height="35" rx="5"/>
  <text class="tc" x="60" y="243">Cl⁻</text>
  <rect class="an" x="110" y="220" width="80" height="35" rx="5"/>
  <text class="tc" x="150" y="243">F⁻</text>
  <rect class="an" x="200" y="220" width="80" height="35" rx="5"/>
  <text class="tc" x="240" y="243">Br⁻</text>
  <rect class="an" x="290" y="220" width="80" height="35" rx="5"/>
  <text class="tc" x="330" y="243">I⁻</text>
  <rect class="an" x="380" y="220" width="80" height="35" rx="5"/>
  <text class="tc" x="420" y="243">OH⁻</text>
  <rect class="an" x="470" y="220" width="80" height="35" rx="5"/>
  <text class="tc" x="510" y="243">NO₃⁻</text>
  <rect class="an" x="20" y="265" width="80" height="35" rx="5"/>
  <text class="tc" x="60" y="288">O²⁻</text>
  <rect class="an" x="110" y="265" width="80" height="35" rx="5"/>
  <text class="tc" x="150" y="288">S²⁻</text>
  <rect class="an" x="200" y="265" width="80" height="35" rx="5"/>
  <text class="tc" x="240" y="288">SO₄²⁻</text>
  <rect class="an" x="290" y="265" width="80" height="35" rx="5"/>
  <text class="tc" x="330" y="288">CO₃²⁻</text>
  <rect class="an" x="380" y="265" width="80" height="35" rx="5"/>
  <text class="tc" x="420" y="288">CrO₄²⁻</text>
  <rect class="an" x="470" y="265" width="80" height="35" rx="5"/>
  <text class="tc" x="510" y="288">MnO₄²⁻</text>
  <rect class="an" x="20" y="310" width="80" height="35" rx="5"/>
  <text class="tc" x="60" y="333">N³⁻</text>
  <rect class="an" x="110" y="310" width="80" height="35" rx="5"/>
  <text class="tc" x="150" y="333">PO₄³⁻</text>
  <text class="tt" x="20" y="380" fill="#00ff88">Regra de nomenclatura</text>
  <text class="tc" x="350" y="405" style="text-anchor:start;font-size:13px;fill:#a0a8c5;">Composto neutro: soma das cargas = 0</text>
  <text class="tc" x="350" y="430" style="text-anchor:start;font-size:13px;fill:#a0a8c5;">Íon: soma das cargas = carga do íon</text>
  <text class="tc" x="350" y="455" style="text-anchor:start;font-size:13px;fill:#a0a8c5;">Exemplo: Na⁺ + Cl⁻ → NaCl (neutro)</text>
</svg>`,
        tip: 'A soma das cargas em compostos neutros é ZERO. Em íons, é a própria carga.'
    },
    {
        id: 'formulas-gerais',
        category: 'formulas',
        icon: '🧮',
        title: 'Formulário Completo de Química',
        description: 'Todas as fórmulas essenciais organizadas.',
        svg: `<svg viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" style="min-width:600px">
  <style>
    .sec { font-family: sans-serif; font-size: 14px; font-weight: 800; fill: #00e5ff; }
    .fr { font-family: monospace; font-size: 13px; fill: #00ff88; font-weight: 700; }
    .ds { font-family: sans-serif; font-size: 11px; fill: #a0a8c5; }
  </style>
  <rect width="700" height="700" fill="#0a0e27"/>
  <text class="sec" x="20" y="30">📏 CONCENTRAÇÃO E SOLUÇÕES</text>
  <text class="fr" x="30" y="55">C = m₁ / V</text>
  <text class="ds" x="250" y="55">Concentração comum (g/L)</text>
  <text class="fr" x="30" y="80">M = n₁ / V = m₁ / (MM·V)</text>
  <text class="ds" x="280" y="80">Molaridade (mol/L)</text>
  <text class="fr" x="30" y="105">τ = m₁ / m</text>
  <text class="ds" x="250" y="105">Título em massa</text>
  <text class="fr" x="30" y="130">C₁V₁ = C₂V₂</text>
  <text class="ds" x="250" y="130">Diluição</text>
  <text class="sec" x="20" y="170">⚗️ NÚMERO DE MOLS E PARTÍCULAS</text>
  <text class="fr" x="30" y="195">n = m / MM</text>
  <text class="ds" x="250" y="195">Mols a partir da massa</text>
  <text class="fr" x="30" y="220">N = n · 6,02×10²³</text>
  <text class="ds" x="250" y="220">Número de partículas</text>
  <text class="fr" x="30" y="245">V = n · 22,4 (CNTP)</text>
  <text class="ds" x="250" y="245">Volume nas CNTP (L)</text>
  <text class="sec" x="20" y="285">💨 GASES</text>
  <text class="fr" x="30" y="310">PV = nRT</text>
  <text class="ds" x="250" y="310">Equação de Clapeyron</text>
  <text class="fr" x="30" y="335">P₁V₁/T₁ = P₂V₂/T₂</text>
  <text class="ds" x="250" y="335">Equação geral dos gases</text>
  <text class="ds" x="250" y="360">R = 0,082 atm·L/mol·K</text>
  <text class="sec" x="20" y="400">🧪 ÁCIDOS E BASES</text>
  <text class="fr" x="30" y="425">pH = -log[H⁺]</text>
  <text class="ds" x="250" y="425">Definição de pH</text>
  <text class="fr" x="30" y="450">pOH = -log[OH⁻]</text>
  <text class="ds" x="250" y="450">Definição de pOH</text>
  <text class="fr" x="30" y="475">pH + pOH = 14 (25°C)</text>
  <text class="ds" x="250" y="475">Relação fundamental</text>
  <text class="sec" x="20" y="515">⚖️ ESTEQUIOMETRIA</text>
  <text class="fr" x="30" y="540">R% = (real / teórico) × 100</text>
  <text class="ds" x="280" y="540">Rendimento</text>
  <text class="fr" x="30" y="565">P% = (pura / total) × 100</text>
  <text class="ds" x="280" y="565">Pureza</text>
  <text class="sec" x="20" y="605">🔥 TERMOQUÍMICA</text>
  <text class="fr" x="30" y="630">ΔH = H_produtos - H_reagentes</text>
  <text class="ds" x="300" y="630">Variação de entalpia</text>
  <text class="fr" x="30" y="655">ΔH < 0 → exotérmica</text>
  <text class="fr" x="30" y="680">ΔH > 0 → endotérmica</text>
</svg>`,
        tip: 'Sempre verifique as unidades! Volume geralmente em Litros (L).'
    },
    {
        id: 'tabela-solubilidade',
        category: 'solucoes',
        icon: '📈',
        title: 'Curva de Solubilidade Comparada',
        description: 'Como a solubilidade varia com a temperatura.',
        svg: `<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" style="min-width:600px">
  <style>
    .axis { stroke: #a0a8c5; stroke-width: 2; }
    .grid { stroke: #2a3050; stroke-width: 1; stroke-dasharray: 3 3; }
    .lbl { font-family: sans-serif; font-size: 11px; fill: #a0a8c5; }
    .lbl-t { font-family: sans-serif; font-size: 13px; font-weight: 700; fill: #ffffff; }
    .curve { fill: none; stroke-width: 3; }
  </style>
  <rect width="700" height="400" fill="#0a0e27"/>
  <!-- Grid -->
  <line class="axis" x1="60" y1="340" x2="640" y2="340"/>
  <line class="axis" x1="60" y1="40" x2="60" y2="340"/>
  <text class="lbl-t" x="350" y="375" text-anchor="middle">Temperatura (°C)</text>
  <text class="lbl-t" x="20" y="190" text-anchor="middle" transform="rotate(-90 20 190)">Solubilidade (g/100g água)</text>
  <!-- Labels X -->
  <text class="lbl" x="60" y="358" text-anchor="middle">0</text>
  <text class="lbl" x="175" y="358" text-anchor="middle">20</text>
  <text class="lbl" x="290" y="358" text-anchor="middle">40</text>
  <text class="lbl" x="405" y="358" text-anchor="middle">60</text>
  <text class="lbl" x="520" y="358" text-anchor="middle">80</text>
  <text class="lbl" x="635" y="358" text-anchor="middle">100</text>
  <!-- Labels Y -->
  <text class="lbl" x="50" y="344" text-anchor="end">0</text>
  <text class="lbl" x="50" y="284" text-anchor="end">50</text>
  <text class="lbl" x="50" y="224" text-anchor="end">100</text>
  <text class="lbl" x="50" y="164" text-anchor="end">150</text>
  <text class="lbl" x="50" y="104" text-anchor="end">200</text>
  <text class="lbl" x="50" y="44" text-anchor="end">250</text>
  <!-- Grid lines -->
  <line class="grid" x1="60" y1="284" x2="640" y2="284"/>
  <line class="grid" x1="60" y1="224" x2="640" y2="224"/>
  <line class="grid" x1="60" y1="164" x2="640" y2="164"/>
  <line class="grid" x1="60" y1="104" x2="640" y2="104"/>
  <line class="grid" x1="60" y1="44" x2="640" y2="44"/>
  <!-- Curva KNO3 (sobe muito) -->
  <path class="curve" d="M60,330 Q200,280 350,200 T640,60" stroke="#ff3860"/>
  <text class="lbl-t" x="550" y="50" fill="#ff3860">KNO₃</text>
  <!-- Curva NaCl (quase reta) -->
  <path class="curve" d="M60,290 L640,250" stroke="#00ff88"/>
  <text class="lbl-t" x="550" y="245" fill="#00ff88">NaCl</text>
  <!-- Curva Ce2(SO4)3 (desce) -->
  <path class="curve" d="M60,180 Q300,220 640,290" stroke="#00e5ff"/>
  <text class="lbl-t" x="550" y="290" fill="#00e5ff">Ce₂(SO₄)₃</text>
</svg>`,
        tip: 'A maioria dos sólidos aumenta a solubilidade com a temperatura. Exceções: Ce₂(SO₄)₃.'
    },
    {
        id: 'ligacao-ionica-diagrama',
        category: 'ligacoes',
        icon: '🧲',
        title: 'Ligação Iônica — Detalhada',
        description: 'Transferência de elétrons com representação de camadas.',
        svg: `<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="min-width:700px">
  <style>
    .shell { fill: none; stroke-width: 2; }
    .nucleus { fill: #ffb400; }
    .electron { fill: #00e5ff; }
    .lbl { font-family: sans-serif; font-size: 14px; font-weight: 800; fill: #ffffff; text-anchor: middle; }
    .cap { font-family: sans-serif; font-size: 12px; fill: #a0a8c5; text-anchor: middle; }
    .arrow { stroke: #ffb400; stroke-width: 3; fill: none; marker-end: url(#m1); }
  </style>
  <defs>
    <marker id="m1" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
      <polygon points="0,0 10,5 0,10" fill="#ffb400"/>
    </marker>
  </defs>
  <rect width="800" height="400" fill="#0a0e27"/>
  <!-- Átomo Na -->
  <circle class="shell" cx="180" cy="200" r="100" stroke="#00e5ff"/>
  <circle class="shell" cx="180" cy="200" r="70" stroke="#00ff88"/>
  <circle class="shell" cx="180" cy="200" r="40" stroke="#ffb400"/>
  <circle class="nucleus" cx="180" cy="200" r="20"/>
  <text class="lbl" x="180" y="205">Na</text>
  <!-- 1 elétron na camada externa -->
  <circle class="electron" cx="270" cy="200" r="6"/>
  <!-- Átomo Cl -->
  <circle class="shell" cx="620" cy="200" r="100" stroke="#00e5ff"/>
  <circle class="shell" cx="620" cy="200" r="70" stroke="#00ff88"/>
  <circle class="shell" cx="620" cy="200" r="40" stroke="#ffb400"/>
  <circle class="nucleus" cx="620" cy="200" r="20"/>
  <text class="lbl" x="620" y="205">Cl</text>
  <!-- 7 elétrons na camada externa -->
  <circle class="electron" cx="530" cy="200" r="6"/>
  <circle class="electron" cx="560" cy="140" r="6"/>
  <circle class="electron" cx="620" cy="115" r="6"/>
  <circle class="electron" cx="680" cy="140" r="6"/>
  <circle class="electron" cx="710" cy="200" r="6"/>
  <circle class="electron" cx="680" cy="260" r="6"/>
  <circle class="electron" cx="620" cy="285" r="6"/>
  <!-- Seta -->
  <line class="arrow" x1="290" y1="200" x2="510" y2="200"/>
  <text class="lbl" x="400" y="190" style="font-size:16px;fill:#ffb400;">e⁻</text>
  <!-- Legendas -->
  <text class="cap" x="180" y="340">Cátion Na⁺</text>
  <text class="cap" x="180" y="360">(perdeu 1 elétron)</text>
  <text class="cap" x="620" y="340">Ânion Cl⁻</text>
  <text class="cap" x="620" y="360">(ganhou 1 elétron)</text>
</svg>`,
        formula: 'Na⁺ + Cl⁻ → NaCl',
        tip: 'Metal doa elétrons → vira cátion (+). Ametal recebe → vira ânion (−).'
    },
    {
        id: 'ligacao-covalente-diagrama',
        category: 'ligacoes',
        icon: '🔗',
        title: 'Ligação Covalente — Detalhada',
        description: 'Compartilhamento de elétrons entre ametais.',
        svg: `<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="min-width:700px">
  <style>
    .shell { fill: none; stroke-width: 2; }
    .nucleus { fill: #ffb400; }
    .electron { fill: #00e5ff; }
    .shared { fill: #00ff88; }
    .lbl { font-family: sans-serif; font-size: 16px; font-weight: 800; fill: #ffffff; text-anchor: middle; }
    .cap { font-family: sans-serif; font-size: 12px; fill: #a0a8c5; text-anchor: middle; }
  </style>
  <rect width="800" height="400" fill="#0a0e27"/>
  <!-- Átomo H esquerda -->
  <circle class="shell" cx="250" cy="200" r="80" stroke="#00e5ff"/>
  <circle class="nucleus" cx="250" cy="200" r="15"/>
  <text class="lbl" x="250" y="206">H</text>
  <circle class="electron" cx="330" cy="200" r="7"/>
  <!-- Átomo H direita -->
  <circle class="shell" cx="550" cy="200" r="80" stroke="#00e5ff"/>
  <circle class="nucleus" cx="550" cy="200" r="15"/>
  <text class="lbl" x="550" y="206">H</text>
  <circle class="electron" cx="470" cy="200" r="7"/>
  <!-- Elétrons compartilhados no centro -->
  <circle class="shared" cx="390" cy="180" r="8"/>
  <circle class="shared" cx="410" cy="220" r="8"/>
  <!-- Elo do compartilhamento -->
  <ellipse cx="400" cy="200" rx="60" ry="40" fill="none" stroke="#00ff88" stroke-width="2" stroke-dasharray="4 3"/>
  <text class="cap" x="400" y="310" style="fill:#00ff88;font-weight:700;">Elétrons compartilhados</text>
  <text class="cap" x="400" y="335">Cada átomo acredita ter 2 elétrons (regra do dueto)</text>
  <text class="cap" x="400" y="360">Molécula estável: H₂</text>
</svg>`,
        formula: 'H• + •H → H:H (H₂)',
        tip: 'Ametais compartilham elétrons para atingir a estabilidade (regra do octeto).'
    },
    {
        id: 'ligacao-metalica-diagrama',
        category: 'ligacoes',
        icon: '⚙️',
        title: 'Ligação Metálica — Mar de Elétrons',
        description: 'Cátions metálicos imersos em elétrons livres.',
        svg: `<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="min-width:700px">
  <style>
    .cation { fill: rgba(255,180,0,0.2); stroke: #ffb400; stroke-width: 2; }
    .cation-l { font-family: sans-serif; font-size: 14px; font-weight: 800; fill: #ffb400; text-anchor: middle; }
    .e-free { fill: #00e5ff; }
    .cap { font-family: sans-serif; font-size: 13px; fill: #a0a8c5; text-anchor: middle; }
    .container { fill: rgba(0,229,255,0.04); stroke: #2a3050; stroke-dasharray: 4 3; }
  </style>
  <rect width="800" height="400" fill="#0a0e27"/>
  <rect class="container" x="40" y="40" width="720" height="280" rx="12"/>
  <!-- Cátions distribuídos -->
  <circle class="cation" cx="150" cy="120" r="28"/>
  <text class="cation-l" x="150" y="126">Na⁺</text>
  <circle class="cation" cx="300" cy="100" r="28"/>
  <text class="cation-l" x="300" y="106">Na⁺</text>
  <circle class="cation" cx="450" cy="130" r="28"/>
  <text class="cation-l" x="450" y="136">Na⁺</text>
  <circle class="cation" cx="600" cy="110" r="28"/>
  <text class="cation-l" x="600" y="116">Na⁺</text>
  <circle class="cation" cx="180" cy="230" r="28"/>
  <text class="cation-l" x="180" y="236">Na⁺</text>
  <circle class="cation" cx="350" cy="250" r="28"/>
  <text class="cation-l" x="350" y="256">Na⁺</text>
  <circle class="cation" cx="530" cy="240" r="28"/>
  <text class="cation-l" x="530" y="246">Na⁺</text>
  <circle class="cation" cx="680" cy="220" r="28"/>
  <text class="cation-l" x="680" y="226">Na⁺</text>
  <!-- Elétrons livres -->
  <circle class="e-free" cx="100" cy="80" r="5"/>
  <circle class="e-free" cx="230" cy="60" r="5"/>
  <circle class="e-free" cx="370" cy="70" r="5"/>
  <circle class="e-free" cx="520" cy="60" r="5"/>
  <circle class="e-free" cx="700" cy="80" r="5"/>
  <circle class="e-free" cx="100" cy="180" r="5"/>
  <circle class="e-free" cx="260" cy="180" r="5"/>
  <circle class="e-free" cx="400" cy="180" r="5"/>
  <circle class="e-free" cx="550" cy="180" r="5"/>
  <circle class="e-free" cx="700" cy="160" r="5"/>
  <circle class="e-free" cx="100" cy="280" r="5"/>
  <circle class="e-free" cx="260" cy="310" r="5"/>
  <circle class="e-free" cx="430" cy="320" r="5"/>
  <circle class="e-free" cx="600" cy="300" r="5"/>
  <circle class="e-free" cx="730" cy="280" r="5"/>
  <text class="cap" x="400" y="360">Cátions fixos + elétrons livres = condução elétrica e maleabilidade</text>
</svg>`,
        tip: 'Explica por que metais conduzem eletricidade/calor e são maleáveis/dúcteis.'
    },
    {
        id: 'funcoes-organicas-completa',
        category: 'organica',
        icon: '⚛️',
        title: 'Funções Orgânicas Completas',
        description: 'Todas as principais funções com exemplos.',
        svg: `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" style="min-width:700px">
  <style>
    .fn-box { fill: rgba(157,0,255,0.08); stroke: #9d00ff; stroke-width: 1.5; }
    .fn-name { font-family: sans-serif; font-size: 13px; font-weight: 800; fill: #9d00ff; text-anchor: middle; }
    .fn-group { font-family: monospace; font-size: 15px; font-weight: 700; fill: #00e5ff; text-anchor: middle; }
    .fn-ex { font-family: sans-serif; font-size: 10px; fill: #a0a8c5; text-anchor: middle; }
  </style>
  <rect width="800" height="600" fill="#0a0e27"/>
  <!-- Linha 1 -->
  <rect class="fn-box" x="20" y="20" width="180" height="90" rx="8"/>
  <text class="fn-name" x="110" y="45">Álcool</text>
  <text class="fn-group" x="110" y="70">R-OH</text>
  <text class="fn-ex" x="110" y="90">Etanol, Metanol</text>
  <rect class="fn-box" x="210" y="20" width="180" height="90" rx="8"/>
  <text class="fn-name" x="300" y="45">Aldeído</text>
  <text class="fn-group" x="300" y="70">R-CHO</text>
  <text class="fn-ex" x="300" y="90">Formol, Acetaldeído</text>
  <rect class="fn-box" x="400" y="20" width="180" height="90" rx="8"/>
  <text class="fn-name" x="490" y="45">Cetona</text>
  <text class="fn-group" x="490" y="70">R-CO-R'</text>
  <text class="fn-ex" x="490" y="90">Acetona</text>
  <rect class="fn-box" x="590" y="20" width="190" height="90" rx="8"/>
  <text class="fn-name" x="685" y="45">Ácido Carboxílico</text>
  <text class="fn-group" x="685" y="70">R-COOH</text>
  <text class="fn-ex" x="685" y="90">Vinagre, Ácido cítrico</text>
  <!-- Linha 2 -->
  <rect class="fn-box" x="20" y="120" width="180" height="90" rx="8"/>
  <text class="fn-name" x="110" y="145">Éster</text>
  <text class="fn-group" x="110" y="170">R-COO-R'</text>
  <text class="fn-ex" x="110" y="190">Aromas, Gorduras</text>
  <rect class="fn-box" x="210" y="120" width="180" height="90" rx="8"/>
  <text class="fn-name" x="300" y="145">Éter</text>
  <text class="fn-group" x="300" y="170">R-O-R'</text>
  <text class="fn-ex" x="300" y="190">Éter etílico</text>
  <rect class="fn-box" x="400" y="120" width="180" height="90" rx="8"/>
  <text class="fn-name" x="490" y="145">Amina</text>
  <text class="fn-group" x="490" y="170">R-NH₂</text>
  <text class="fn-ex" x="490" y="190">Putrescina</text>
  <rect class="fn-box" x="590" y="120" width="190" height="90" rx="8"/>
  <text class="fn-name" x="685" y="145">Amida</text>
  <text class="fn-group" x="685" y="170">R-CONH₂</text>
  <text class="fn-ex" x="685" y="190">Ureia</text>
  <!-- Linha 3 -->
  <rect class="fn-box" x="20" y="220" width="180" height="90" rx="8"/>
  <text class="fn-name" x="110" y="245">Nitrocomposto</text>
  <text class="fn-group" x="110" y="270">R-NO₂</text>
  <text class="fn-ex" x="110" y="290">Nitroglicerina</text>
  <rect class="fn-box" x="210" y="220" width="180" height="90" rx="8"/>
  <text class="fn-name" x="300" y="245">Nitrila</text>
  <text class="fn-group" x="300" y="270">R-CN</text>
  <text class="fn-ex" x="300" y="290">Acetonitrila</text>
  <rect class="fn-box" x="400" y="220" width="180" height="90" rx="8"/>
  <text class="fn-name" x="490" y="245">Fenol</text>
  <text class="fn-group" x="490" y="270">Ar-OH</text>
  <text class="fn-ex" x="490" y="290">Antissépticos</text>
  <rect class="fn-box" x="590" y="220" width="190" height="90" rx="8"/>
  <text class="fn-name" x="685" y="245">Haleto</text>
  <text class="fn-group" x="685" y="270">R-X</text>
  <text class="fn-ex" x="685" y="290">Clorofórmio</text>
  <!-- Hidrocarbonetos -->
  <rect class="fn-box" x="20" y="330" width="760" height="100" rx="8"/>
  <text class="fn-name" x="400" y="360" style="font-size:16px;">HIDROCARBONETOS</text>
  <text class="fn-group" x="400" y="390">C + H apenas</text>
  <text class="fn-ex" x="400" y="415">Alcanos (C-C simples) · Alcenos (C=C) · Alcinos (C≡C) · Aromáticos (benzeno)</text>
  <!-- Resumo -->
  <text x="400" y="480" text-anchor="middle" style="font-family:sans-serif;font-size:14px;font-weight:800;fill:#00e5ff;">PRIORIDADE DE NOMENCLATURA (IUPAC)</text>
  <text x="400" y="510" text-anchor="middle" style="font-family:sans-serif;font-size:12px;fill:#a0a8c5;">Ácido &gt; Éster &gt; Amida &gt; Nitrila &gt; Aldeído &gt; Cetona &gt; Álcool &gt; Amina &gt; Éter &gt; Alceno &gt; Alcino</text>
  <text x="400" y="545" text-anchor="middle" style="font-family:sans-serif;font-size:12px;fill:#a0a8c5;">Radical + Insaturação + Grupo funcional + Cadeia + Nome base</text>
</svg>`,
        tip: 'Reconhecer o grupo funcional é o 1º passo para nomear e prever propriedades.'
    },
    {
        id: 'hibridizacao-completa',
        category: 'organica',
        icon: '🔺',
        title: 'Hibridização do Carbono — Completa',
        description: 'Geometria molecular conforme o tipo de ligação.',
        svg: `<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="min-width:700px">
  <style>
    .c-atom { fill: #ffb400; stroke: #ffa94d; stroke-width: 2; }
    .c-l { font-family: sans-serif; font-size: 20px; font-weight: 800; fill: #0a0e27; text-anchor: middle; }
    .bond { stroke: #00e5ff; stroke-width: 3; }
    .bond-d { stroke: #00ff88; stroke-width: 3; }
    .bond-t { stroke: #ff3860; stroke-width: 3; }
    .title { font-family: sans-serif; font-size: 16px; font-weight: 800; fill: #ffffff; text-anchor: middle; }
    .info { font-family: sans-serif; font-size: 12px; fill: #a0a8c5; text-anchor: middle; }
  </style>
  <rect width="800" height="400" fill="#0a0e27"/>
  <!-- sp3 -->
  <text class="title" x="130" y="40">sp³</text>
  <line class="bond" x1="130" y1="220" x2="80" y2="150"/>
  <line class="bond" x1="130" y1="220" x2="180" y2="150"/>
  <line class="bond" x1="130" y1="220" x2="80" y2="290"/>
  <line class="bond" x1="130" y1="220" x2="180" y2="290"/>
  <circle class="c-atom" cx="130" cy="220" r="24"/>
  <text class="c-l" x="130" y="228">C</text>
  <text class="info" x="130" y="340">Tetraédrica · 109,5°</text>
  <text class="info" x="130" y="360">4 ligações simples</text>
  <text class="info" x="130" y="380" style="fill:#00ff88;">Ex: metano (CH₄)</text>
  <!-- sp2 -->
  <text class="title" x="400" y="40">sp²</text>
  <line class="bond-d" x1="400" y1="220" x2="340" y2="160"/>
  <line class="bond-d" x1="400" y1="220" x2="460" y2="160"/>
  <line class="bond-d" x1="400" y1="220" x2="400" y2="290"/>
  <circle class="c-atom" x="400" cy="220" r="24"/>
  <text class="c-l" x="400" y="228">C</text>
  <text class="info" x="400" y="340">Trigonal plana · 120°</text>
  <text class="info" x="400" y="360">1 dupla + 2 simples</text>
  <text class="info" x="400" y="380" style="fill:#ffb400;">Ex: eteno (C₂H₄)</text>
  <!-- sp -->
  <text class="title" x="670" y="40">sp</text>
  <line class="bond-t" x1="670" y1="220" x2="600" y2="220"/>
  <line class="bond-t" x1="670" y1="220" x2="740" y2="220"/>
  <circle class="c-atom" cx="670" cy="220" r="24"/>
  <text class="c-l" x="670" y="228">C</text>
  <text class="info" x="670" y="340">Linear · 180°</text>
  <text class="info" x="670" y="360">1 tripla + 1 simples</text>
  <text class="info" x="670" y="380" style="fill:#ff3860;">Ex: etino (C₂H₂)</text>
</svg>`,
        tip: 'Simples → sp³ (109,5°) | Dupla → sp² (120°) | Tripla → sp (180°).'
    },
    {
        id: 'escala-ph-completa',
        category: 'referencia',
        icon: '🧪',
        title: 'Escala de pH — Completa com Exemplos',
        description: 'Do ácido forte ao básico forte com exemplos reais.',
        svg: `<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="min-width:700px">
  <defs>
    <linearGradient id="phGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff3860"/>
      <stop offset="50%" stop-color="#00ff88"/>
      <stop offset="100%" stop-color="#9d00ff"/>
    </linearGradient>
  </defs>
  <style>
    .ph-bar { fill: url(#phGrad); stroke: #2a3050; stroke-width: 2; }
    .num { font-family: sans-serif; font-size: 14px; font-weight: 800; fill: #ffffff; text-anchor: middle; }
    .lbl { font-family: sans-serif; font-size: 12px; fill: #a0a8c5; text-anchor: middle; }
    .ex { font-family: sans-serif; font-size: 10px; fill: #a0a8c5; text-anchor: middle; }
  </style>
  <rect width="800" height="400" fill="#0a0e27"/>
  <rect class="ph-bar" x="40" y="120" width="720" height="60" rx="30"/>
  <text class="num" x="55" y="155">0</text>
  <text class="num" x="107" y="155">1</text>
  <text class="num" x="159" y="155">2</text>
  <text class="num" x="211" y="155">3</text>
  <text class="num" x="263" y="155">4</text>
  <text class="num" x="315" y="155">5</text>
  <text class="num" x="367" y="155">6</text>
  <text class="num" x="419" y="155" style="fill:#0a0e27;">7</text>
  <text class="num" x="471" y="155">8</text>
  <text class="num" x="523" y="155">9</text>
  <text class="num" x="575" y="155">10</text>
  <text class="num" x="627" y="155">11</text>
  <text class="num" x="679" y="155">12</text>
  <text class="num" x="731" y="155">13</text>
  <text class="num" x="745" y="155">14</text>
  <text class="lbl" x="160" y="60" style="fill:#ff3860;font-size:16px;font-weight:800;">ÁCIDO</text>
  <text class="lbl" x="400" y="60" style="fill:#00ff88;font-size:16px;font-weight:800;">NEUTRO</text>
  <text class="lbl" x="640" y="60" style="fill:#9d00ff;font-size:16px;font-weight:800;">BÁSICO</text>
  <text class="lbl" x="160" y="80">pH &lt; 7</text>
  <text class="lbl" x="400" y="80">pH = 7</text>
  <text class="lbl" x="640" y="80">pH &gt; 7</text>
  <!-- Exemplos -->
  <text class="ex" x="55" y="220">HCl</text>
  <text class="ex" x="107" y="220">Suco gástrico</text>
  <text class="ex" x="159" y="220">Limão</text>
  <text class="ex" x="211" y="220">Vinagre</text>
  <text class="ex" x="263" y="220">Refrigerante</text>
  <text class="ex" x="315" y="220">Café</text>
  <text class="ex" x="367" y="220">Leite</text>
  <text class="ex" x="419" y="220">Água pura</text>
  <text class="ex" x="471" y="220">Sangue</text>
  <text class="ex" x="523" y="220">Bicarbonato</text>
  <text class="ex" x="575" y="220">Sabão</text>
  <text class="ex" x="627" y="220">Amônia</text>
  <text class="ex" x="679" y="220">Água sanitária</text>
  <text class="ex" x="731" y="220">NaOH</text>
  <!-- Fórmulas -->
  <text x="400" y="290" text-anchor="middle" style="font-family:monospace;font-size:16px;font-weight:800;fill:#00e5ff;">pH = -log[H⁺]</text>
  <text x="400" y="320" text-anchor="middle" style="font-family:monospace;font-size:16px;font-weight:800;fill:#00e5ff;">pOH = -log[OH⁻]</text>
  <text x="400" y="350" text-anchor="middle" style="font-family:monospace;font-size:16px;font-weight:800;fill:#00ff88;">pH + pOH = 14 (a 25°C)</text>
  <text x="400" y="380" text-anchor="middle" style="font-family:sans-serif;font-size:12px;fill:#a0a8c5;">A cada unidade de pH → variação de 10x na acidez</text>
</svg>`,
        formula: 'pH + pOH = 14 (25°C)',
        tip: 'pH < 7 ácido · pH = 7 neutro · pH > 7 básico. Cada unidade = 10x mais ácido/básico.'
    },
    {
        id: 'tabela-periodica-tendencias',
        category: 'tabela',
        icon: '📈',
        title: 'Tendências Periódicas',
        description: 'Como as propriedades variam na tabela periódica.',
        svg: `<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="min-width:700px">
  <style>
    .bg { fill: #0a0e27; }
    .label { font-family: sans-serif; font-size: 13px; font-weight: 700; fill: #ffffff; }
    .desc { font-family: sans-serif; font-size: 11px; fill: #a0a8c5; }
    .arrow { stroke: #00e5ff; stroke-width: 3; fill: none; }
    .arrow2 { stroke: #ff3860; stroke-width: 3; fill: none; }
    .box { fill: rgba(0,229,255,0.05); stroke: #00e5ff; stroke-width: 1; }
  </style>
  <rect class="bg" width="800" height="400"/>
  <!-- Representação simplificada da tabela -->
  <rect class="box" x="100" y="80" width="120" height="60" rx="6"/>
  <rect class="box" x="230" y="80" width="120" height="60" rx="6"/>
  <rect class="box" x="360" y="80" width="120" height="60" rx="6"/>
  <rect class="box" x="490" y="80" width="120" height="60" rx="6"/>
  <rect class="box" x="620" y="80" width="120" height="60" rx="6"/>
  <rect class="box" x="100" y="150" width="120" height="60" rx="6"/>
  <rect class="box" x="230" y="150" width="120" height="60" rx="6"/>
  <rect class="box" x="360" y="150" width="120" height="60" rx="6"/>
  <rect class="box" x="490" y="150" width="120" height="60" rx="6"/>
  <rect class="box" x="620" y="150" width="120" height="60" rx="6"/>
  <text class="label" x="160" y="115">Metais</text>
  <text class="desc" x="160" y="130">alcalinos</text>
  <text class="label" x="290" y="115">Alcalinos</text>
  <text class="desc" x="290" y="130">terrosos</text>
  <text class="label" x="420" y="115">Transição</text>
  <text class="label" x="550" y="115">Ametais</text>
  <text class="label" x="680" y="115">Gases</text>
  <text class="desc" x="680" y="130">nobres</text>
  <text class="label" x="160" y="185">Metais</text>
  <text class="label" x="290" y="185">Ametais</text>
  <text class="label" x="420" y="185">Semimetais</text>
  <text class="label" x="550" y="185">Halogênios</text>
  <text class="label" x="680" y="185">Hidrogênio</text>
  <!-- Setas das tendências -->
  <text class="label" x="400" y="30" text-anchor="middle" style="font-size:16px;">TENDÊNCIAS PERIÓDICAS</text>
  <!-- Eletronegatividade -->
  <text class="label" x="30" y="260">Eletronegatividade:</text>
  <text class="desc" x="30" y="280">Aumenta → (esquerda p/ direita)</text>
  <text class="desc" x="30" y="295">Aumenta ↑ (baixo p/ cima)</text>
  <!-- Raio atômico -->
  <text class="label" x="30" y="330">Raio atômico:</text>
  <text class="desc" x="30" y="350">Aumenta ← (direita p/ esquerda)</text>
  <text class="desc" x="30" y="365">Aumenta ↓ (cima p/ baixo)</text>
  <!-- Energia de ionização -->
  <text class="label" x="450" y="260">Energia de ionização:</text>
  <text class="desc" x="450" y="280">Aumenta → e ↑</text>
  <text class="label" x="450" y="320">Afinidade eletrônica:</text>
  <text class="desc" x="450" y="340">Aumenta → e ↑</text>
</svg>`,
        tip: 'Fluor (F) é o elemento mais eletronegativo. Frâncio (Fr) tem o maior raio atômico.'
    }
];


/* =========================================================
   ESTADO GLOBAL
   ========================================================= */
const state = {
    questions: [],
    memoryElements: [],
    matchPairs: [],
    hangmanWords: [],
    diagrams: [],
    hubConfig: {},
    visualConfig: {},
    adminPassword: DEFAULT_ADMIN_PASSWORD,
    currentIndex: 0,
    score: 0,
    answered: false,
    total: 0,
    editingIndex: -1,
    adminFilter: 'all',
    sessionQuestions: [],
    profile: { grade: null, level: null, count: null },
    setupStep: 0,
    setupAnswers: { grade: null, level: null, count: null },
    currentGame: null,
    currentPlayer: null,
    currentSession: { game: null, startTime: null, endTime: null },
    diagramFilter: 'all',
    adminGlobalTab: 'visual',
    adminLocalGame: null,
    hangman: {
        availableWords: [],
        currentWordObj: null,
        guessedLetters: new Set(),
        wrongErrors: 0,
        maxErrors: 6,
        score: 0,
        roundCount: 0,
        gameActive: true,
        hintRevealed: false,
        hintPenalty: 0
    }
};

/* =========================================================
   STORAGE
   ========================================================= */
const storage = {
    get(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return fallback;
            return JSON.parse(raw);
        } catch { return fallback; }
    },
    set(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); return true; }
        catch (e) { console.warn('Erro ao salvar:', e); return false; }
    },
    remove(key) { try { localStorage.removeItem(key); } catch { } },

    loadQuestions() {
        const data = this.get(STORAGE_KEYS.QUESTIONS, null);
        return Array.isArray(data) && data.length > 0 ? data : JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
    },
    saveQuestions(q) { return this.set(STORAGE_KEYS.QUESTIONS, q); },

    loadMemoryElements() {
        const data = this.get(STORAGE_KEYS.MEMORY_ELEMENTS, null);
        return Array.isArray(data) && data.length > 0 ? data : JSON.parse(JSON.stringify(DEFAULT_MEMORY_ELEMENTS));
    },
    saveMemoryElements(m) { return this.set(STORAGE_KEYS.MEMORY_ELEMENTS, m); },

    loadMatchPairs() {
        const data = this.get(STORAGE_KEYS.MATCH_PAIRS, null);
        return Array.isArray(data) && data.length > 0 ? data : JSON.parse(JSON.stringify(DEFAULT_MATCH_PAIRS));
    },
    saveMatchPairs(m) { return this.set(STORAGE_KEYS.MATCH_PAIRS, m); },

    loadHangmanWords() {
        const data = this.get(STORAGE_KEYS.HANGMAN_WORDS, null);
        return Array.isArray(data) && data.length > 0 ? data : JSON.parse(JSON.stringify(DEFAULT_HANGMAN_WORDS));
    },
    saveHangmanWords(h) { return this.set(STORAGE_KEYS.HANGMAN_WORDS, h); },

    loadDiagrams() {
        const data = this.get(STORAGE_KEYS.DIAGRAMS, null);
        return Array.isArray(data) && data.length > 0 ? data : JSON.parse(JSON.stringify(DEFAULT_DIAGRAMS));
    },
    saveDiagrams(d) { return this.set(STORAGE_KEYS.DIAGRAMS, d); },

    loadHubConfig() {
        const data = this.get(STORAGE_KEYS.HUB_CONFIG, null);
        return data || JSON.parse(JSON.stringify(DEFAULT_HUB_CONFIG));
    },
    saveHubConfig(c) { return this.set(STORAGE_KEYS.HUB_CONFIG, c); },

    loadVisualConfig() {
        const data = this.get(STORAGE_KEYS.SETTINGS, null);
        return data || JSON.parse(JSON.stringify(DEFAULT_VISUAL_CONFIG));
    },
    saveVisualConfig(v) { return this.set(STORAGE_KEYS.SETTINGS, v); },

    loadAdminPassword() { return this.get(STORAGE_KEYS.ADMIN_PASSWORD, DEFAULT_ADMIN_PASSWORD); },
    saveAdminPassword(p) { return this.set(STORAGE_KEYS.ADMIN_PASSWORD, p); },

    loadScores() { return this.get(STORAGE_KEYS.SCORES, []); },
    saveScores(s) { return this.set(STORAGE_KEYS.SCORES, s); },
    addScore(entry) {
        const s = this.loadScores();
        s.push(entry);
        if (s.length > 500) s.splice(0, s.length - 500);
        this.saveScores(s);
    },
    clearScores() { this.remove(STORAGE_KEYS.SCORES); },

    loadPlayer() { return this.get(STORAGE_KEYS.PLAYER, null); },
    savePlayer(p) { return this.set(STORAGE_KEYS.PLAYER, p); },

    loadTheme() { return this.get(STORAGE_KEYS.THEME, 'dark'); },
    saveTheme(t) { return this.set(STORAGE_KEYS.THEME, t); }
};

/* =========================================================
   UTILITÁRIOS
   ========================================================= */
const utils = {
    escapeHtml(str) {
        if (str == null) return '';
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    },
    uid(prefix = 'x') { return prefix + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8); },
    letterFor(i) { return String.fromCharCode(65 + i); },
    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },
    formatTime(sec) {
        const m = String(Math.floor(sec / 60)).padStart(2, '0');
        const s = String(sec % 60).padStart(2, '0');
        return `${m}:${s}`;
    },
    formatDateTime(ts) {
        const d = new Date(ts);
        return d.toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: '2-digit',
            hour: '2-digit', minute: '2-digit'
        });
    },
    initials(name) {
        const parts = (name || '').trim().split(/\s+/).filter(Boolean);
        if (parts.length === 0) return '?';
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    },
    scoreClass(score) {
        if (score >= 80) return 'great';
        if (score >= 60) return 'good';
        if (score >= 40) return 'ok';
        return 'bad';
    },
    normalizeStr(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    },
    showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const el = document.getElementById(id);
        if (el) {
            void el.offsetWidth;
            el.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
};

/* =========================================================
   TOAST
   ========================================================= */
const toast = {
    show(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const el = document.createElement('div');
        el.className = `toast ${type}`;
        el.textContent = message;
        container.appendChild(el);
        setTimeout(() => {
            el.classList.add('leaving');
            setTimeout(() => el.remove(), 300);
        }, duration);
    }
};

/* =========================================================
   MODAL UNIVERSAL
   ========================================================= */
const modal = {
    open({ title, content, actions = [] }) {
        const overlay = document.getElementById('modalOverlay');
        const contentEl = document.getElementById('modalContent');
        if (!overlay || !contentEl) return;

        let html = '';
        if (title) html += `<h3>${title}</h3>`;
        if (typeof content === 'string') html += content;
        else html += content || '';

        if (actions.length > 0) {
            html += '<div class="modal-actions">';
            actions.forEach((action, i) => {
                html += `<button class="btn ${action.className || 'btn-ghost'} btn-sm" data-action-index="${i}">${action.label}</button>`;
            });
            html += '</div>';
        }

        contentEl.innerHTML = html;
        overlay.classList.add('active');

        contentEl.querySelectorAll('[data-action-index]').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.actionIndex, 10);
                const action = actions[idx];
                if (action && action.onClick) action.onClick();
                if (!action || action.autoClose !== false) this.close();
            });
        });
    },
    close() {
        const overlay = document.getElementById('modalOverlay');
        if (overlay) overlay.classList.remove('active');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.addEventListener('click', e => {
            if (e.target === overlay) modal.close();
        });
    }
});

/* =========================================================
   TEMA
   ========================================================= */
const theme = {
    init() {
        const saved = storage.loadTheme();
        this.apply(saved);
    },
    apply(name) {
        document.documentElement.setAttribute('data-theme', name);
        const btn = document.getElementById('themeBtn');
        if (btn) btn.textContent = name === 'dark' ? '🌙' : '☀️';
        if (typeof visuals !== 'undefined' && visuals.apply) {
            setTimeout(() => visuals.apply(name), 10);
        }
    },
    toggle() {
        const cur = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = cur === 'dark' ? 'light' : 'dark';
        this.apply(next);
        storage.saveTheme(next);
        toast.show(`Tema ${next === 'dark' ? 'escuro 🌙' : 'claro ☀️'}`, 'info', 1800);
    },
    bind() {
        const btn = document.getElementById('themeBtn');
        if (btn) {
            // Clona o botão para remover todos os listeners antigos (correção do bug)
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', () => this.toggle());
            const current = document.documentElement.getAttribute('data-theme') || 'dark';
            newBtn.textContent = current === 'dark' ? '🌙' : '☀️';
        }
    }
};

/* =========================================================
   VISUAL (cores customizadas)
   ========================================================= */
const visuals = {
    apply(themeName) {
        const config = state.visualConfig[themeName];
        if (!config) return;
        const root = document.documentElement;
        root.style.setProperty('--accent', config.accent);
        root.style.setProperty('--accent-2', config.accent2);
        root.style.setProperty('--success', config.success);
        root.style.setProperty('--danger', config.danger);
        root.style.setProperty('--warning', config.warning);
        root.style.setProperty('--purple', config.purple);
        root.style.setProperty('--bg-primary', config.bgPrimary);
        root.style.setProperty('--bg-card', config.bgCard);
    },
    applyCurrent() {
        const cur = document.documentElement.getAttribute('data-theme') || 'dark';
        this.apply(cur);
    }
};

/* =========================================================
   PLAYER
   ========================================================= */
const player = {
    init() {
        const saved = storage.loadPlayer();
        if (saved && saved.name) {
            state.currentPlayer = saved;
            this.updateBadge();
        }
    },
    askName({ title = 'Quem vai jogar?', subtitle = 'Digite seu nome', confirmLabel = 'Começar', cancelLabel = 'Cancelar', showCancel = true } = {}) {
        return new Promise(resolve => {
            const content = `
        <div class="player-modal-content">
          <div class="player-avatar-big" id="playerAvatarPreview">?</div>
          <p class="modal-sub">${subtitle}</p>
          <div class="player-input-wrap">
            <input type="text" id="playerNameInput" maxlength="20" autocomplete="off" placeholder="Seu nome..." value="${state.currentPlayer ? utils.escapeHtml(state.currentPlayer.name) : ''}">
            <div class="player-input-hint">Até 20 caracteres</div>
          </div>
        </div>
      `;

            const actions = [];
            if (showCancel) {
                actions.push({ label: cancelLabel, className: 'btn-ghost', onClick: () => resolve(null) });
            }
            actions.push({
                label: confirmLabel,
                className: 'btn-primary',
                autoClose: false,
                onClick: () => {
                    const input = document.getElementById('playerNameInput');
                    const name = (input?.value || '').trim();
                    if (!name) { toast.show('Digite um nome!', 'error'); input?.focus(); return; }
                    if (name.length < 2) { toast.show('Nome muito curto!', 'error'); return; }
                    state.currentPlayer = {
                        name,
                        createdAt: state.currentPlayer?.name === name ? state.currentPlayer.createdAt : Date.now()
                    };
                    storage.savePlayer(state.currentPlayer);
                    player.updateBadge();
                    modal.close();
                    resolve(name);
                }
            });

            modal.open({ content, actions });

            setTimeout(() => {
                const input = document.getElementById('playerNameInput');
                const preview = document.getElementById('playerAvatarPreview');
                if (input) {
                    input.focus(); input.select();
                    input.addEventListener('input', () => {
                        const v = input.value.trim();
                        if (preview) preview.textContent = v ? utils.initials(v) : '?';
                    });
                    input.addEventListener('keydown', e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            const btn = document.querySelector('[data-action-index="' + (actions.length - 1) + '"]');
                            if (btn) btn.click();
                        }
                    });
                }
            }, 60);
        });
    },
    updateBadge() {
        const badge = document.getElementById('playerBadge');
        if (!badge) return;
        if (!state.currentPlayer) {
            badge.classList.remove('visible');
            return;
        }
        badge.classList.add('visible');
        document.getElementById('playerAvatar').textContent = utils.initials(state.currentPlayer.name);
        document.getElementById('playerNameBadge').textContent = state.currentPlayer.name;
        const scores = storage.loadScores();
        const ps = scores.filter(s => s.player === state.currentPlayer.name);
        const total = ps.reduce((sum, s) => sum + (s.score || 0), 0);
        document.getElementById('playerScoreBadge').textContent = `${total} pontos`;
    },
    change() {
        this.askName({
            title: 'Trocar de Jogador',
            subtitle: 'Digite o nome do novo jogador',
            confirmLabel: 'Trocar',
            cancelLabel: 'Cancelar'
        });
    }
};

/* =========================================================
   SCORES
   ========================================================= */
const scores = {
    record({ game, score, duration, details = {} }) {
        if (!state.currentPlayer) return;
        storage.addScore({
            id: 's_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
            player: state.currentPlayer.name,
            game,
            score: Math.round(score),
            duration: Math.round(duration),
            playedAt: Date.now(),
            details
        });
        player.updateBadge();
    },
    getAll() { return storage.loadScores(); },
    getAllPlayers() {
        const all = this.getAll();
        const map = new Map();
        all.forEach(s => {
            if (!map.has(s.player)) {
                map.set(s.player, { name: s.player, totalScore: 0, gamesPlayed: 0, totalTime: 0, bestScore: 0, byGame: {} });
            }
            const p = map.get(s.player);
            p.totalScore += s.score;
            p.gamesPlayed++;
            p.totalTime += s.duration;
            p.bestScore = Math.max(p.bestScore, s.score);
            if (!p.byGame[s.game]) p.byGame[s.game] = { plays: 0, totalScore: 0, best: 0, totalTime: 0 };
            const g = p.byGame[s.game];
            g.plays++;
            g.totalScore += s.score;
            g.best = Math.max(g.best, s.score);
            g.totalTime += s.duration;
        });
        return [...map.values()].sort((a, b) => b.totalScore - a.totalScore);
    }
};

/* =========================================================
   RENDER HELPERS
   ========================================================= */
const render = {
    emptyTable(icon, title, desc) {
        return `<div class="empty-table"><span class="empty-icon">${icon}</span><div class="empty-title">${title}</div><div class="empty-desc">${desc}</div></div>`;
    },
    scoreBadge(score) { return `<span class="score-badge ${utils.scoreClass(score)}">${score}</span>`; },
    rankBadge(i) {
        let cls = 'rank-badge';
        if (i === 0) cls += ' gold';
        else if (i === 1) cls += ' silver';
        else if (i === 2) cls += ' bronze';
        const icon = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1);
        return `<span class="${cls}">${icon}</span>`;
    }
};

/* =========================================================
   ZOOM INTERATIVO
   ========================================================= */
const zoom = {
    init(container) {
        if (!container) return;

        let scale = 1;
        let translateX = 0;
        let translateY = 0;
        let isDragging = false;
        let startX = 0, startY = 0;
        let startTranslateX = 0, startTranslateY = 0;

        const content = container.querySelector('.zoom-content');
        const zoomLevelEl = container.querySelector('.zoom-level');
        const zoomInBtn = container.querySelector('[data-zoom="in"]');
        const zoomOutBtn = container.querySelector('[data-zoom="out"]');
        const zoomResetBtn = container.querySelector('[data-zoom="reset"]');

        const updateTransform = () => {
            if (content) content.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            if (zoomLevelEl) zoomLevelEl.textContent = Math.round(scale * 100) + '%';
        };

        const setScale = (newScale, centerX, centerY) => {
            const prevScale = scale;
            scale = Math.max(0.3, Math.min(5, newScale));

            if (centerX !== undefined && centerY !== undefined && content) {
                const rect = container.getBoundingClientRect();
                const cx = centerX - rect.left - rect.width / 2;
                const cy = centerY - rect.top - rect.height / 2;
                translateX -= cx * (scale / prevScale - 1);
                translateY -= cy * (scale / prevScale - 1);
            }
            updateTransform();
        };

        container.addEventListener('wheel', e => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            setScale(scale * delta, e.clientX, e.clientY);
        }, { passive: false });

        container.addEventListener('mousedown', e => {
            if (e.target.closest('.zoom-controls')) return;
            isDragging = true;
            startX = e.clientX; startY = e.clientY;
            startTranslateX = translateX; startTranslateY = translateY;
            container.classList.add('grabbing');
            e.preventDefault();
        });

        document.addEventListener('mousemove', e => {
            if (!isDragging) return;
            translateX = startTranslateX + (e.clientX - startX);
            translateY = startTranslateY + (e.clientY - startY);
            updateTransform();
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                container.classList.remove('grabbing');
            }
        });

        let touchStartDist = 0;
        let touchStartScale = 1;

        container.addEventListener('touchstart', e => {
            if (e.touches.length === 1) {
                isDragging = true;
                startX = e.touches[0].clientX; startY = e.touches[0].clientY;
                startTranslateX = translateX; startTranslateY = translateY;
            } else if (e.touches.length === 2) {
                isDragging = false;
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                touchStartDist = Math.hypot(dx, dy);
                touchStartScale = scale;
            }
        }, { passive: true });

        container.addEventListener('touchmove', e => {
            if (e.touches.length === 1 && isDragging) {
                translateX = startTranslateX + (e.touches[0].clientX - startX);
                translateY = startTranslateY + (e.touches[0].clientY - startY);
                updateTransform();
            } else if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const dist = Math.hypot(dx, dy);
                scale = Math.max(0.3, Math.min(5, touchStartScale * (dist / touchStartDist)));
                updateTransform();
            }
        }, { passive: true });

        container.addEventListener('touchend', () => { isDragging = false; });

        if (zoomInBtn) zoomInBtn.addEventListener('click', e => { e.stopPropagation(); setScale(scale * 1.25); });
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', e => { e.stopPropagation(); setScale(scale * 0.8); });
        if (zoomResetBtn) zoomResetBtn.addEventListener('click', e => {
            e.stopPropagation();
            scale = 1; translateX = 0; translateY = 0;
            updateTransform();
        });

        updateTransform();
    },

    wrap(svgOrHtml) {
        return `
      <div class="zoom-container">
        <div class="zoom-level">100%</div>
        <div class="zoom-content">${svgOrHtml}</div>
        <div class="zoom-controls">
          <button class="zoom-btn" data-zoom="out" title="Diminuir">−</button>
          <button class="zoom-btn" data-zoom="reset" title="Resetar">⟲</button>
          <button class="zoom-btn" data-zoom="in" title="Aumentar">+</button>
        </div>
      </div>
    `;
    }
};

/* =========================================================
   SIDE PANEL (DIAGRAMAS)
   ========================================================= */
const panel = {
    open() {
        this.renderDiagrams();
        const sidePanel = document.getElementById('sidePanel');
        const overlay = document.getElementById('sidePanelOverlay');
        const hamburger = document.getElementById('hamburgerBtn');
        if (sidePanel) sidePanel.classList.add('active');
        if (overlay) overlay.classList.add('active');
        if (hamburger) hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    close() {
        const sidePanel = document.getElementById('sidePanel');
        const overlay = document.getElementById('sidePanelOverlay');
        const hamburger = document.getElementById('hamburgerBtn');
        if (sidePanel) sidePanel.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        document.body.style.overflow = '';
    },
    toggle() {
        const sidePanel = document.getElementById('sidePanel');
        if (sidePanel && sidePanel.classList.contains('active')) this.close();
        else this.open();
    },
    setFilter(cat) {
        state.diagramFilter = cat;
        document.querySelectorAll('.diagram-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.cat === cat);
        });
        this.renderDiagrams();
    },
    renderDiagrams() {
        const list = document.getElementById('diagramList');
        if (!list) return;

        const filter = state.diagramFilter;
        const filtered = filter === 'all' ? state.diagrams : state.diagrams.filter(d => d.category === filter);

        if (filtered.length === 0) {
            list.innerHTML = '<div class="empty-state">Nenhum diagrama nesta categoria.</div>';
            return;
        }

        list.innerHTML = filtered.map(d => {
            let bodyHtml = '';
            if (d.svg) bodyHtml += zoom.wrap(d.svg);
            if (d.description) bodyHtml += `<div class="diagram-desc">${d.description}</div>`;
            if (d.formula) bodyHtml += `<div class="diagram-formula">${utils.escapeHtml(d.formula)}</div>`;
            if (d.tip) bodyHtml += `<div class="diagram-tip"><strong>💡 Dica:</strong> ${d.tip}</div>`;

            return `
        <div class="diagram-card expanded" data-id="${d.id}">
          <div class="diagram-card-header">
            <div class="title-wrap">
              <div class="diagram-icon">${d.icon}</div>
              <div class="title-info">
                <h3>${utils.escapeHtml(d.title)}</h3>
                <div class="category">${this.categoryLabel(d.category)}</div>
              </div>
            </div>
            <span class="diagram-toggle-icon">▼</span>
          </div>
          <div class="diagram-card-body">
            <div class="diagram-content">${bodyHtml}</div>
          </div>
        </div>
      `;
        }).join('');

        list.querySelectorAll('.diagram-card-header').forEach(header => {
            header.addEventListener('click', () => header.parentElement.classList.toggle('expanded'));
        });

        list.querySelectorAll('.zoom-container').forEach(c => zoom.init(c));
    },
    categoryLabel(cat) {
        const labels = {
            tabela: 'Tabela Periódica', ligacoes: 'Ligações Químicas',
            organica: 'Química Orgânica', formulas: 'Fórmulas',
            solucoes: 'Soluções', referencia: 'Referência'
        };
        return labels[cat] || cat;
    }
};

/* =========================================================
   HUB DE JOGOS
   ========================================================= */
const hub = {
    renderLanding() {
        const cfg = state.hubConfig.landing;
        return `
      <div class="screen active" id="landingScreen">
        <div class="card landing-card">
          <span class="flask-icon">${cfg.icon}</span>
          <h1>${utils.escapeHtml(cfg.title)}</h1>
          <div class="landing-stats">
            <div class="landing-stat"><div class="value">4</div><div class="label">Jogos</div></div>
            <div class="landing-stat"><div class="value" id="landingTotalQuestions">${state.questions.length}</div><div class="label">Perguntas</div></div>
            <div class="landing-stat"><div class="value" id="landingTotalPlayers">${scores.getAllPlayers().length}</div><div class="label">Jogadores</div></div>
          </div>
          <div class="landing-actions">
            <button class="btn btn-primary btn-lg" id="playNowBtn">${utils.escapeHtml(cfg.btnPlay)}</button>
            <button class="btn btn-ghost btn-lg" id="viewStatsBtn">${utils.escapeHtml(cfg.btnStats)}</button>
            <button class="btn btn-ghost btn-lg" id="openDiagramsBtn">${utils.escapeHtml(cfg.btnDiagrams)}</button>
          </div>
        </div>
      </div>
    `;
    },

    renderGames() {
        const games = state.hubConfig.games;
        const order = Object.entries(games)
            .filter(([_, g]) => g.enabled !== false)
            .sort((a, b) => a[1].order - b[1].order);

        const cards = order.map(([key, g]) => `
      <button class="game-card" data-game="${key}">
        <span class="game-icon">${g.icon}</span>
        <span class="game-name">${utils.escapeHtml(g.name)}</span>
        <span class="game-desc">${utils.escapeHtml(g.desc)}</span>
      </button>
    `).join('');

        return `
      <div class="screen" id="gamesScreen">
        <div class="card">
          <div class="games-header">
            <span class="setup-icon">🎯</span>
            <h2>Escolha um Jogo</h2>
            <p>Selecione o tipo de desafio que você quer jogar</p>
          </div>
          <div class="games-grid">${cards}</div>
          <div class="setup-actions" style="margin-top: 24px;">
            <button class="btn btn-ghost" id="backFromGamesBtn">← Voltar</button>
            <div class="spacer"></div>
            <button class="btn btn-ghost" id="openDiagramsFromGamesBtn">📐 Ver Diagramas</button>
          </div>
        </div>
      </div>
    `;
    },

    renderScreens() {
        const app = document.getElementById('app');
        if (!app) return;

        app.innerHTML = `
      ${this.renderLanding()}
      ${this.renderGames()}
      ${this.renderSetupScreen()}
      ${this.renderQuizScreen()}
      ${this.renderMemoryScreen()}
      ${this.renderMatchScreen()}
      ${this.renderHangmanScreen()}
      ${this.renderResultScreen()}
      ${this.renderStatsScreen()}
      ${this.renderAdminGlobalScreen()}
      ${this.renderAdminLocalScreen()}
    `;

        this.bindEvents();
    },

    renderSetupScreen() {
        return `
      <div class="screen" id="setupScreen">
        <div class="card">
          <div class="setup-header">
            <span class="setup-icon">📋</span>
            <h2>Vamos personalizar!</h2>
            <p>Responda rapidinho para prepararmos o quiz ideal</p>
          </div>
          <div class="steps-indicator">
            <div class="step-dot active" data-step="0"></div>
            <div class="step-dot" data-step="1"></div>
            <div class="step-dot" data-step="2"></div>
          </div>
          <div class="setup-step active" data-step="0">
            <span class="step-label">Passo 1 de 3</span>
            <h3 class="step-title">Qual é o seu ano escolar?</h3>
            <p class="step-subtitle">Isso nos ajuda a escolher perguntas com a dificuldade certa</p>
            <div class="choice-grid" id="gradeChoices">
              <button class="choice-card" data-value="9"><span class="choice-icon">📗</span><span class="choice-name">9º ano</span><span class="choice-desc">Fundamental II</span></button>
              <button class="choice-card" data-value="1"><span class="choice-icon">📘</span><span class="choice-name">1º ano</span><span class="choice-desc">Ensino Médio</span></button>
              <button class="choice-card" data-value="2"><span class="choice-icon">📙</span><span class="choice-name">2º ano</span><span class="choice-desc">Ensino Médio</span></button>
              <button class="choice-card" data-value="3"><span class="choice-icon">📕</span><span class="choice-name">3º ano</span><span class="choice-desc">Ensino Médio</span></button>
              <button class="choice-card" data-value="outro"><span class="choice-icon">🎓</span><span class="choice-name">Outro</span><span class="choice-desc">Faculdade / Curioso</span></button>
            </div>
          </div>
          <div class="setup-step" data-step="1">
            <span class="step-label">Passo 2 de 3</span>
            <h3 class="step-title">Qual nível você prefere?</h3>
            <p class="step-subtitle">Escolha o desafio que combina com você</p>
            <div class="choice-grid" id="levelChoices">
              <button class="choice-card" data-value="facil"><span class="choice-icon">🟢</span><span class="choice-name">Fácil</span><span class="choice-desc">Conceitos básicos</span></button>
              <button class="choice-card" data-value="medio"><span class="choice-icon">🟡</span><span class="choice-name">Médio</span><span class="choice-desc">Um pouco mais fundo</span></button>
              <button class="choice-card" data-value="dificil"><span class="choice-icon">🔴</span><span class="choice-name">Difícil</span><span class="choice-desc">Cálculos e detalhes</span></button>
              <button class="choice-card" data-value="misto"><span class="choice-icon">🎲</span><span class="choice-name">Misto</span><span class="choice-desc">Mistura de tudo</span></button>
            </div>
          </div>
          <div class="setup-step" data-step="2">
            <span class="step-label">Passo 3 de 3</span>
            <h3 class="step-title">Quantas perguntas?</h3>
            <p class="step-subtitle">Escolha o tamanho do desafio</p>
            <div class="choice-grid" id="countChoices">
              <button class="choice-card" data-value="5"><span class="choice-icon">⚡</span><span class="choice-name">5</span><span class="choice-desc">Rápido</span></button>
              <button class="choice-card" data-value="10"><span class="choice-icon">🎯</span><span class="choice-name">10</span><span class="choice-desc">Padrão</span></button>
              <button class="choice-card" data-value="15"><span class="choice-icon">🔥</span><span class="choice-name">15</span><span class="choice-desc">Desafio</span></button>
              <button class="choice-card" data-value="999"><span class="choice-icon">🚀</span><span class="choice-name">Todas</span><span class="choice-desc">Sem limite</span></button>
            </div>
          </div>
          <div class="setup-actions">
            <button class="btn btn-ghost" id="setupBackBtn" style="display:none;">← Voltar</button>
            <div class="spacer"></div>
            <button class="btn btn-primary" id="setupNextBtn" disabled>Continuar →</button>
          </div>
        </div>
      </div>
    `;
    },

    renderQuizScreen() {
        return `
      <div class="screen" id="quizScreen">
        <div class="quiz-header">
          <div class="progress-info">Questão <span class="current" id="currentQ">1</span> / <span id="totalQ">10</span></div>
          <div class="score-display">⭐ Acertos: <span class="score-value" id="scoreDisplay">0</span></div>
        </div>
        <div class="progress-bar"><div class="progress-fill" id="progressFill" style="width:10%"></div></div>
        <div class="card">
          <div class="question-tags">
            <span class="tag tag-number" id="tagNumber">Questão 1</span>
            <span class="tag tag-level" id="tagLevel">🟢 Fácil</span>
            <span class="tag tag-grade" id="tagGrade">📘 1º ano</span>
          </div>
          <h3 class="question-text" id="questionText"></h3>
          <div class="options" id="optionsContainer"></div>
          <div class="feedback" id="feedback"></div>
          <div class="next-container" id="nextContainer" style="display:none;">
            <button class="btn btn-primary" id="nextBtn">Próxima →</button>
          </div>
        </div>
        <div style="margin-top:16px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <button class="btn btn-ghost btn-sm" id="quizExitBtn">← Sair do Quiz</button>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-ghost btn-sm" id="quizAdminBtn">⚙️ Editar Quiz</button>
            <button class="btn btn-ghost btn-sm" id="quizDiagramBtn">📐 Diagramas</button>
            <button class="btn btn-ghost btn-sm" id="quizHomeBtn">🏠 Início</button>
          </div>
        </div>
      </div>
    `;
    },

    renderMemoryScreen() {
        return `
      <div class="screen" id="memoryScreen">
        <div class="card">
          <div class="memory-header">
            <div>
              <h2 style="font-size:1.4rem;font-weight:800;">🧠 Memória dos Elementos</h2>
              <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:4px;">Combine o símbolo com o nome do elemento</p>
            </div>
            <div class="memory-stats">
              <div class="memory-stat">⏱️ <span class="stat-value" id="memoryTimer">00:00</span></div>
              <div class="memory-stat moves">🎯 <span class="stat-value" id="memoryMoves">0</span></div>
              <div class="memory-stat matches">✅ <span class="stat-value" id="memoryMatches">0</span>/8</div>
            </div>
          </div>
          <div class="memory-board" id="memoryBoard"></div>
          <div class="memory-controls">
            <button class="btn btn-primary" id="memoryRestartBtn">🔄 Reiniciar</button>
            <button class="btn btn-ghost" id="memoryBackBtn">← Voltar</button>
            <button class="btn btn-ghost" id="memoryAdminBtn">⚙️ Editar</button>
            <button class="btn btn-ghost" id="memoryDiagramBtn">📐 Diagramas</button>
            <button class="btn btn-ghost" id="memoryHomeBtn">🏠 Início</button>
          </div>
        </div>
      </div>
    `;
    },

    renderMatchScreen() {
        return `
      <div class="screen" id="matchScreen">
        <div class="card">
          <div class="memory-header">
            <div>
              <h2 style="font-size:1.4rem;font-weight:800;">🔗 Ligue os Pares</h2>
              <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:4px;">Conecte cada elemento à sua propriedade</p>
            </div>
            <div class="memory-stats">
              <div class="memory-stat">⏱️ <span class="stat-value" id="matchTimer">00:00</span></div>
              <div class="memory-stat moves">🎯 <span class="stat-value" id="matchMoves">0</span></div>
              <div class="memory-stat matches">✅ <span class="stat-value" id="matchMatches">0</span>/6</div>
            </div>
          </div>
          <div class="match-board">
            <div class="match-column">
              <div class="match-column-title">Elemento</div>
              <div id="matchLeftColumn"></div>
            </div>
            <div class="match-column">
              <div class="match-column-title">Propriedade</div>
              <div id="matchRightColumn"></div>
            </div>
          </div>
          <div class="memory-controls">
            <button class="btn btn-primary" id="matchRestartBtn">🔄 Reiniciar</button>
            <button class="btn btn-ghost" id="matchBackBtn">← Voltar</button>
            <button class="btn btn-ghost" id="matchAdminBtn">⚙️ Editar</button>
            <button class="btn btn-ghost" id="matchDiagramBtn">📐 Diagramas</button>
            <button class="btn btn-ghost" id="matchHomeBtn">🏠 Início</button>
          </div>
        </div>
      </div>
    `;
    },

    renderHangmanScreen() {
        return `
      <div class="screen" id="hangmanScreen">
        <div class="card">
          <div class="hangman-wrapper">
            <div class="hangman-top-row">
              <span class="hangman-level-badge facil" id="hangmanLevelBadge">🟢 Nível: Fácil</span>
              <span class="hangman-counter">Palavra <strong id="hangmanWordIndex">1</strong> de <strong id="hangmanTotalWords">20</strong></span>
            </div>
            <div class="hangman-layout-new">
              <div class="hangman-drawing-new">
                <div class="svg-wrap">
                  <svg id="hangmanSvg" viewBox="0 0 200 220">
                    <line x1="20" y1="200" x2="140" y2="200" stroke="var(--border)" stroke-width="6" stroke-linecap="round"/>
                    <line x1="50" y1="200" x2="50" y2="20" stroke="var(--border)" stroke-width="6" stroke-linecap="round"/>
                    <line x1="50" y1="20" x2="130" y2="20" stroke="var(--border)" stroke-width="6" stroke-linecap="round"/>
                    <line x1="130" y1="20" x2="130" y2="50" stroke="var(--text-muted)" stroke-width="4" stroke-linecap="round"/>
                    <circle id="hangmanPart1" cx="130" cy="70" r="16" stroke="var(--accent)" stroke-width="4" fill="none" opacity="0"/>
                    <line id="hangmanPart2" x1="130" y1="86" x2="130" y2="140" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" opacity="0"/>
                    <line id="hangmanPart3" x1="130" y1="100" x2="105" y2="120" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" opacity="0"/>
                    <line id="hangmanPart4" x1="130" y1="100" x2="155" y2="120" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" opacity="0"/>
                    <line id="hangmanPart5" x1="130" y1="140" x2="105" y2="180" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" opacity="0"/>
                    <line id="hangmanPart6" x1="130" y1="140" x2="155" y2="180" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" opacity="0"/>
                  </svg>
                </div>
                <div class="hangman-stats-new">
                  <div class="hangman-stat-box score">
                    <div class="label">Pontos</div>
                    <div class="value" id="hangmanScore">0</div>
                  </div>
                  <div class="hangman-stat-box errors">
                    <div class="label">Erros</div>
                    <div class="value" id="hangmanErrors">0 / 6</div>
                  </div>
                </div>
              </div>
              <div class="hangman-info-new">
                <div class="hangman-hint-new">
                  <span class="hint-label">💡 Dica Científica</span>
                  <button class="hangman-hint-btn" id="hangmanHintBtn">💡 Revelar Dica</button>
                </div>
                <div class="hangman-word-new" id="hangmanWordContainer"></div>
                <div class="hangman-keyboard-new" id="hangmanKeyboard"></div>
              </div>
            </div>
            <div class="memory-controls">
              <button class="btn btn-primary" id="hangmanRestartBtn">🔄 Nova Palavra</button>
              <button class="btn btn-ghost" id="hangmanBackBtn">← Voltar</button>
              <button class="btn btn-ghost" id="hangmanAdminBtn">⚙️ Editar</button>
              <button class="btn btn-ghost" id="hangmanDiagramBtn">📐 Diagramas</button>
              <button class="btn btn-ghost" id="hangmanHomeBtn">🏠 Início</button>
            </div>
          </div>
        </div>
      </div>
    `;
    },

    renderResultScreen() {
        return `
      <div class="screen" id="resultScreen">
        <div class="card result-card">
          <span class="result-emoji" id="resultEmoji">🏆</span>
          <h2 id="resultTitle">Parabéns!</h2>
          <p class="result-title" id="resultMessage"></p>
          <div class="result-profile" id="resultProfile"></div>
          <div class="result-score">
            <div class="score-circle">
              <svg viewBox="0 0 160 160">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="var(--accent)"/>
                    <stop offset="100%" stop-color="var(--success)"/>
                  </linearGradient>
                </defs>
                <circle class="track" cx="80" cy="80" r="65"/>
                <circle class="progress-ring" id="progressRing" cx="80" cy="80" r="65"/>
              </svg>
              <div class="score-inner">
                <span class="score-number" id="finalScore">0</span>
                <span class="score-total" id="finalTotal">de 10</span>
              </div>
            </div>
          </div>
          <div class="result-stats">
            <div class="stat-box correct">
              <div class="stat-value" id="correctCount">0</div>
              <div class="stat-label" id="statLabel1">✅ Acertos</div>
            </div>
            <div class="stat-box neutral">
              <div class="stat-value" id="wrongCount">0</div>
              <div class="stat-label" id="statLabel2">❌ Erros</div>
            </div>
          </div>
          <div class="result-actions">
            <button class="btn btn-primary" id="playAgainBtn">🔄 Jogar Novamente</button>
            <button class="btn btn-ghost" id="backToGamesBtn">🎮 Outros Jogos</button>
            <button class="btn btn-ghost" id="backHomeBtn">🏠 Menu Inicial</button>
          </div>
        </div>
      </div>
    `;
    },

    renderStatsScreen() {
        return `
      <div class="screen" id="statsScreen">
        <div class="card stats-card">
          <div class="stats-header">
            <h2>📊 Ranking e Estatísticas</h2>
            <div class="stats-actions">
              <button class="btn btn-ghost btn-sm" id="clearScoresBtn">🗑️ Limpar Histórico</button>
              <button class="btn btn-ghost btn-sm" id="backFromStatsBtn">← Voltar</button>
            </div>
          </div>
          <div class="stats-tabs">
            <button class="tab-btn active" data-tab="overview">📈 Visão Geral</button>
            <button class="tab-btn" data-tab="games">🎮 Por Jogo</button>
            <button class="tab-btn" data-tab="players">👥 Jogadores</button>
          </div>
          <div class="tab-panel active" data-panel="overview">
            <div class="summary-grid" id="overviewSummary"></div>
            <h3 style="font-size:1.1rem;margin-bottom:12px;">🏆 Melhores Pontuações</h3>
            <div id="topScores"></div>
          </div>
          <div class="tab-panel" data-panel="games">
            <div class="summary-grid" id="gamesSummary"></div>
            <h3 style="font-size:1.1rem;margin:20px 0 12px;">📋 Tabela Detalhada</h3>
            <div id="byGameTable"></div>
          </div>
          <div class="tab-panel" data-panel="players">
            <div class="summary-grid" id="playersSummary"></div>
            <h3 style="font-size:1.1rem;margin:20px 0 12px;">📋 Todos os Jogadores</h3>
            <div id="playersTable"></div>
          </div>
        </div>
      </div>
    `;
    },

    renderAdminGlobalScreen() {
        return `
      <div class="screen" id="adminGlobalScreen">
        <div class="card admin-card">
          <div class="admin-header">
            <h2>⚙️ Painel Admin Global <span class="admin-badge">ADMIN</span></h2>
            <div class="admin-actions" style="margin:0;">
              <button class="btn btn-ghost btn-sm" id="adminGlobalCloseBtn">← Voltar</button>
            </div>
          </div>
          <div class="admin-notice">
            <strong>🔓 Acesso total:</strong> Aqui você pode alterar TODOS os jogos, o tema visual, a tela inicial e o hub de jogos.
          </div>
          <div class="admin-tabs" id="adminGlobalTabs">
            <button class="admin-tab active" data-tab="visual">🎨 Tema Visual</button>
            <button class="admin-tab" data-tab="landing">🏠 Tela Inicial</button>
            <button class="admin-tab" data-tab="hub">🎮 Hub de Jogos</button>
            <button class="admin-tab" data-tab="quiz">🧪 Quiz</button>
            <button class="admin-tab" data-tab="memory">🧠 Memória</button>
            <button class="admin-tab" data-tab="match">🔗 Ligar</button>
            <button class="admin-tab" data-tab="hangman">🔤 Forca</button>
            <button class="admin-tab" data-tab="diagrams">📐 Diagramas</button>
            <button class="admin-tab" data-tab="backup">💾 Backup</button>
            <button class="admin-tab" data-tab="password">🔐 Senha</button>
          </div>
          <div id="adminGlobalContent"></div>
        </div>
      </div>
    `;
    },

    renderAdminLocalScreen() {
        return `
      <div class="screen" id="adminLocalScreen">
        <div class="card admin-card admin-local">
          <div class="admin-header">
            <h2 id="adminLocalTitle">⚙️ Editando Jogo <span class="admin-badge local">LOCAL</span></h2>
            <div class="admin-actions" style="margin:0;">
              <button class="btn btn-ghost btn-sm" id="adminLocalCloseBtn">← Voltar ao Jogo</button>
            </div>
          </div>
          <div class="admin-notice">
            <strong>🔒 Modo Local:</strong> Você está editando <span id="adminLocalGameName">este jogo</span>. As alterações <strong>não afetam outros jogos</strong>.
          </div>
          <div id="adminLocalContent"></div>
        </div>
      </div>
    `;
    },

    bindEvents() {
        // Corrigido: Usando theme.bind() que clona o botão e evita listeners duplicados
        theme.bind();

        const statsBtn = document.getElementById('statsBtn');
        const adminGlobalBtn = document.getElementById('adminGlobalBtn');
        const hamburgerBtn = document.getElementById('hamburgerBtn');

        if (statsBtn) statsBtn.addEventListener('click', () => this.openStats());
        if (adminGlobalBtn) adminGlobalBtn.addEventListener('click', () => this.openAdminGlobal());
        if (hamburgerBtn) hamburgerBtn.addEventListener('click', () => panel.toggle());

        const overlay = document.getElementById('sidePanelOverlay');
        const closeBtn = document.getElementById('sidePanelClose');
        if (overlay) overlay.addEventListener('click', () => panel.close());
        if (closeBtn) closeBtn.addEventListener('click', () => panel.close());

        const diagramTabs = document.getElementById('diagramTabs');
        if (diagramTabs) {
            diagramTabs.addEventListener('click', e => {
                const t = e.target.closest('.diagram-tab');
                if (t) panel.setFilter(t.dataset.cat);
            });
        }

        const changePlayerBtn = document.getElementById('changePlayerBtn');
        if (changePlayerBtn) changePlayerBtn.addEventListener('click', () => player.change());

        const playNowBtn = document.getElementById('playNowBtn');
        const viewStatsBtn = document.getElementById('viewStatsBtn');
        const openDiagramsBtn = document.getElementById('openDiagramsBtn');
        if (playNowBtn) playNowBtn.addEventListener('click', () => utils.showScreen('gamesScreen'));
        if (viewStatsBtn) viewStatsBtn.addEventListener('click', () => this.openStats());
        if (openDiagramsBtn) openDiagramsBtn.addEventListener('click', () => panel.open());

        const backFromGamesBtn = document.getElementById('backFromGamesBtn');
        const openDiagramsFromGamesBtn = document.getElementById('openDiagramsFromGamesBtn');
        if (backFromGamesBtn) backFromGamesBtn.addEventListener('click', () => utils.showScreen('landingScreen'));
        if (openDiagramsFromGamesBtn) openDiagramsFromGamesBtn.addEventListener('click', () => panel.open());

        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', () => this.launchGame(card.dataset.game));
        });

        const setupNextBtn = document.getElementById('setupNextBtn');
        const setupBackBtn = document.getElementById('setupBackBtn');
        if (setupNextBtn) setupNextBtn.addEventListener('click', () => quizSetup.next());
        if (setupBackBtn) setupBackBtn.addEventListener('click', () => quizSetup.back());

        document.querySelectorAll('#gradeChoices .choice-card, #levelChoices .choice-card, #countChoices .choice-card').forEach(card => {
            card.addEventListener('click', () => quizSetup.selectChoice(card));
        });

        const nextBtn = document.getElementById('nextBtn');
        const quizExitBtn = document.getElementById('quizExitBtn');
        const quizHomeBtn = document.getElementById('quizHomeBtn');
        const quizDiagramBtn = document.getElementById('quizDiagramBtn');
        const quizAdminBtn = document.getElementById('quizAdminBtn');

        if (nextBtn) nextBtn.addEventListener('click', () => quiz.next());
        if (quizExitBtn) quizExitBtn.addEventListener('click', () => this.confirmExit('quiz'));
        if (quizHomeBtn) quizHomeBtn.addEventListener('click', () => this.confirmHome('quiz'));
        if (quizDiagramBtn) quizDiagramBtn.addEventListener('click', () => panel.open());
        if (quizAdminBtn) quizAdminBtn.addEventListener('click', () => this.openAdminLocal('quiz'));

        const memoryRestartBtn = document.getElementById('memoryRestartBtn');
        const memoryBackBtn = document.getElementById('memoryBackBtn');
        const memoryHomeBtn = document.getElementById('memoryHomeBtn');
        const memoryDiagramBtn = document.getElementById('memoryDiagramBtn');
        const memoryAdminBtn = document.getElementById('memoryAdminBtn');

        if (memoryRestartBtn) memoryRestartBtn.addEventListener('click', () => memoryGame.start());
        if (memoryBackBtn) memoryBackBtn.addEventListener('click', () => utils.showScreen('gamesScreen'));
        if (memoryHomeBtn) memoryHomeBtn.addEventListener('click', () => utils.showScreen('landingScreen'));
        if (memoryDiagramBtn) memoryDiagramBtn.addEventListener('click', () => panel.open());
        if (memoryAdminBtn) memoryAdminBtn.addEventListener('click', () => this.openAdminLocal('memory'));

        const matchRestartBtn = document.getElementById('matchRestartBtn');
        const matchBackBtn = document.getElementById('matchBackBtn');
        const matchHomeBtn = document.getElementById('matchHomeBtn');
        const matchDiagramBtn = document.getElementById('matchDiagramBtn');
        const matchAdminBtn = document.getElementById('matchAdminBtn');

        if (matchRestartBtn) matchRestartBtn.addEventListener('click', () => matchGame.start());
        if (matchBackBtn) matchBackBtn.addEventListener('click', () => utils.showScreen('gamesScreen'));
        if (matchHomeBtn) matchHomeBtn.addEventListener('click', () => utils.showScreen('landingScreen'));
        if (matchDiagramBtn) matchDiagramBtn.addEventListener('click', () => panel.open());
        if (matchAdminBtn) matchAdminBtn.addEventListener('click', () => this.openAdminLocal('match'));

        const hangmanRestartBtn = document.getElementById('hangmanRestartBtn');
        const hangmanBackBtn = document.getElementById('hangmanBackBtn');
        const hangmanHomeBtn = document.getElementById('hangmanHomeBtn');
        const hangmanDiagramBtn = document.getElementById('hangmanDiagramBtn');
        const hangmanAdminBtn = document.getElementById('hangmanAdminBtn');
        const hangmanHintBtn = document.getElementById('hangmanHintBtn');

        if (hangmanRestartBtn) hangmanRestartBtn.addEventListener('click', () => hangmanGame.nextRound());
        if (hangmanBackBtn) hangmanBackBtn.addEventListener('click', () => utils.showScreen('gamesScreen'));
        if (hangmanHomeBtn) hangmanHomeBtn.addEventListener('click', () => utils.showScreen('landingScreen'));
        if (hangmanDiagramBtn) hangmanDiagramBtn.addEventListener('click', () => panel.open());
        if (hangmanAdminBtn) hangmanAdminBtn.addEventListener('click', () => this.openAdminLocal('hangman'));
        if (hangmanHintBtn) hangmanHintBtn.addEventListener('click', () => hangmanGame.revealHint());

        const playAgainBtn = document.getElementById('playAgainBtn');
        const backToGamesBtn = document.getElementById('backToGamesBtn');
        const backHomeBtn = document.getElementById('backHomeBtn');
        if (playAgainBtn) playAgainBtn.addEventListener('click', () => {
            if (state.currentGame === 'quiz') quizSetup.open();
            else if (state.currentGame === 'memory') memoryGame.start();
            else if (state.currentGame === 'match') matchGame.start();
            else if (state.currentGame === 'hangman') hangmanGame.start();
        });
        if (backToGamesBtn) backToGamesBtn.addEventListener('click', () => utils.showScreen('gamesScreen'));
        if (backHomeBtn) backHomeBtn.addEventListener('click', () => utils.showScreen('landingScreen'));

        document.querySelectorAll('.tab-btn').forEach(t => {
            t.addEventListener('click', () => this.setStatsTab(t.dataset.tab));
        });
        const clearScoresBtn = document.getElementById('clearScoresBtn');
        const backFromStatsBtn = document.getElementById('backFromStatsBtn');
        if (clearScoresBtn) clearScoresBtn.addEventListener('click', () => this.clearScores());
        if (backFromStatsBtn) backFromStatsBtn.addEventListener('click', () => utils.showScreen('landingScreen'));

        const adminGlobalCloseBtn = document.getElementById('adminGlobalCloseBtn');
        if (adminGlobalCloseBtn) adminGlobalCloseBtn.addEventListener('click', () => utils.showScreen('landingScreen'));

        const adminGlobalTabs = document.getElementById('adminGlobalTabs');
        if (adminGlobalTabs) {
            adminGlobalTabs.addEventListener('click', e => {
                const tab = e.target.closest('.admin-tab');
                if (!tab) return;
                document.querySelectorAll('#adminGlobalTabs .admin-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                adminGlobal.setTab(tab.dataset.tab);
            });
        }

        const adminLocalCloseBtn = document.getElementById('adminLocalCloseBtn');
        if (adminLocalCloseBtn) adminLocalCloseBtn.addEventListener('click', () => adminLocal.close());
    },

    launchGame(game) {
        const meta = state.hubConfig.games[game];
        state.currentGame = game;
        if (game === 'quiz') this.requestPlayerAndRun(() => quizSetup.open(), `o ${meta.name}`);
        else if (game === 'memory') this.requestPlayerAndRun(() => memoryGame.start(), `a ${meta.name}`);
        else if (game === 'match') this.requestPlayerAndRun(() => matchGame.start(), `o ${meta.name}`);
        else if (game === 'hangman') this.requestPlayerAndRun(() => hangmanGame.start(), `a ${meta.name}`);
    },

    async requestPlayerAndRun(cb, label) {
        if (state.currentPlayer) { cb(); return; }
        const name = await player.askName({
            title: 'Quem vai jogar?',
            subtitle: `Digite seu nome para jogar ${label || 'o jogo'}`,
            confirmLabel: '🎮 Começar',
            cancelLabel: 'Cancelar'
        });
        if (name) cb();
    },

    openStats() { this.renderStats(); utils.showScreen('statsScreen'); },

    setStatsTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === tab));
    },

    renderStats() {
        const all = scores.getAll();
        const players = scores.getAllPlayers();
        const me = state.currentPlayer ? state.currentPlayer.name : null;

        const totalPlays = all.length;
        const totalPlayers = players.length;
        const avgScore = totalPlays > 0 ? Math.round(all.reduce((s, e) => s + e.score, 0) / totalPlays) : 0;
        const totalTime = all.reduce((s, e) => s + e.duration, 0);

        const overviewSummary = document.getElementById('overviewSummary');
        if (overviewSummary) {
            overviewSummary.innerHTML = `
        <div class="summary-card" data-color="accent"><span class="summary-icon">🎮</span><div class="summary-value">${totalPlays}</div><div class="summary-label">Partidas</div></div>
        <div class="summary-card" data-color="purple"><span class="summary-icon">👥</span><div class="summary-value">${totalPlayers}</div><div class="summary-label">Jogadores</div></div>
        <div class="summary-card" data-color="success"><span class="summary-icon">⭐</span><div class="summary-value">${avgScore}</div><div class="summary-label">Média</div></div>
        <div class="summary-card" data-color="warning"><span class="summary-icon">⏱️</span><div class="summary-value">${utils.formatTime(Math.round(totalTime))}</div><div class="summary-label">Tempo Total</div></div>
      `;
        }

        const top = [...all].sort((a, b) => b.score - a.score || a.duration - b.duration).slice(0, 10);
        const topScores = document.getElementById('topScores');
        if (topScores) {
            if (top.length === 0) {
                topScores.innerHTML = render.emptyTable('🏆', 'Nenhuma partida registrada', 'Jogue algum jogo!');
            } else {
                topScores.innerHTML = `
          <div class="table-wrap"><table class="data-table">
            <thead><tr><th class="center">#</th><th>Jogador</th><th>Jogo</th><th class="center">Pontos</th><th class="right">Tempo</th><th class="right">Data</th></tr></thead>
            <tbody>${top.map((e, i) => {
                    const m = GAME_META[e.game] || { icon: '🎮', label: e.game };
                    return `<tr>
                <td class="center">${render.rankBadge(i)}</td>
                <td><div class="player-cell"><div class="avatar-mini">${utils.initials(e.player)}</div><span class="player-name-cell ${e.player === me ? 'me' : ''}">${utils.escapeHtml(e.player)}</span></div></td>
                <td>${m.icon} ${m.label}</td>
                <td class="center">${render.scoreBadge(e.score)}</td>
                <td class="right"><span class="time-cell">⏱️ ${utils.formatTime(e.duration)}</span></td>
                <td class="right" style="color:var(--text-muted);font-size:0.8rem;">${utils.formatDateTime(e.playedAt)}</td>
              </tr>`;
                }).join('')}</tbody>
          </table></div>
        `;
            }
        }

        const gameKeys = Object.keys(GAME_META);
        const gamesSummary = document.getElementById('gamesSummary');
        if (gamesSummary) {
            gamesSummary.innerHTML = gameKeys.map(k => {
                const m = GAME_META[k];
                const gs = all.filter(e => e.game === k);
                const best = gs.length > 0 ? Math.max(...gs.map(e => e.score)) : 0;
                return `<div class="summary-card" data-color="${m.color}"><span class="summary-icon">${m.icon}</span><div class="summary-value">${best}</div><div class="summary-label">${m.label} · ${gs.length}</div></div>`;
            }).join('');
        }

        const rows = [];
        gameKeys.forEach(k => {
            const m = GAME_META[k];
            all.filter(e => e.game === k).forEach(e => rows.push({ ...e, gameMeta: m }));
        });
        rows.sort((a, b) => b.playedAt - a.playedAt);

        const byGameTable = document.getElementById('byGameTable');
        if (byGameTable) {
            if (rows.length === 0) {
                byGameTable.innerHTML = render.emptyTable('📋', 'Nenhuma partida', 'Jogue para preencher.');
            } else {
                byGameTable.innerHTML = `
          <div class="table-wrap"><table class="data-table">
            <thead><tr><th>Jogo</th><th>Jogador</th><th class="center">Pontos</th><th class="right">Tempo</th><th class="right">Data</th></tr></thead>
            <tbody>${rows.slice(0, 100).map(e => `
              <tr>
                <td>${e.gameMeta.icon} ${e.gameMeta.label}</td>
                <td><div class="player-cell"><div class="avatar-mini">${utils.initials(e.player)}</div><span class="player-name-cell ${e.player === me ? 'me' : ''}">${utils.escapeHtml(e.player)}</span></div></td>
                <td class="center">${render.scoreBadge(e.score)}</td>
                <td class="right"><span class="time-cell">⏱️ ${utils.formatTime(e.duration)}</span></td>
                <td class="right" style="color:var(--text-muted);font-size:0.8rem;">${utils.formatDateTime(e.playedAt)}</td>
              </tr>`).join('')}</tbody>
          </table></div>
        `;
            }
        }

        const playersSummary = document.getElementById('playersSummary');
        const playersTable = document.getElementById('playersTable');
        if (playersSummary && playersTable) {
            if (players.length === 0) {
                playersSummary.innerHTML = '';
                playersTable.innerHTML = render.emptyTable('👥', 'Nenhum jogador', 'Jogue para aparecer!');
            } else {
                const topPlayer = players[0];
                const mostActive = [...players].sort((a, b) => b.gamesPlayed - a.gamesPlayed)[0];
                const bestSingle = [...all].sort((a, b) => b.score - a.score)[0];

                playersSummary.innerHTML = `
          <div class="summary-card" data-color="warning"><span class="summary-icon">🥇</span><div class="summary-value" style="font-size:1.1rem;">${utils.escapeHtml(topPlayer.name)}</div><div class="summary-label">Líder · ${topPlayer.totalScore} pts</div></div>
          <div class="summary-card" data-color="purple"><span class="summary-icon">🔥</span><div class="summary-value" style="font-size:1.1rem;">${utils.escapeHtml(mostActive.name)}</div><div class="summary-label">Mais Ativo · ${mostActive.gamesPlayed}</div></div>
          <div class="summary-card" data-color="success"><span class="summary-icon">⭐</span><div class="summary-value">${bestSingle.score}</div><div class="summary-label">Recorde · ${utils.escapeHtml(bestSingle.player)}</div></div>
        `;

                playersTable.innerHTML = `
          <div class="table-wrap"><table class="data-table">
            <thead><tr><th class="center">#</th><th>Jogador</th><th class="center">Partidas</th><th class="center">Total</th><th class="center">Melhor</th><th class="right">Tempo</th><th class="right">Média</th></tr></thead>
            <tbody>${players.map((p, i) => {
                    const avg = Math.round(p.totalScore / p.gamesPlayed);
                    return `<tr>
                <td class="center">${render.rankBadge(i)}</td>
                <td><div class="player-cell"><div class="avatar-mini">${utils.initials(p.name)}</div><span class="player-name-cell ${p.name === me ? 'me' : ''}">${utils.escapeHtml(p.name)}</span></div></td>
                <td class="center">${p.gamesPlayed}</td>
                <td class="center"><strong>${p.totalScore}</strong></td>
                <td class="center">${render.scoreBadge(p.bestScore)}</td>
                <td class="right"><span class="time-cell">⏱️ ${utils.formatTime(p.totalTime)}</span></td>
                <td class="right">${avg}</td>
              </tr>`;
                }).join('')}</tbody>
          </table></div>
        `;
            }
        }
    },

    clearScores() {
        modal.open({
            title: '🗑️ Limpar Histórico',
            content: '<p>Apagar TODAS as pontuações registradas?</p>',
            actions: [
                { label: 'Cancelar', className: 'btn-ghost' },
                {
                    label: 'Sim, limpar', className: 'btn-danger', onClick: () => {
                        storage.clearScores();
                        player.updateBadge();
                        this.renderStats();
                        toast.show('Histórico limpo!', 'success');
                    }
                }
            ]
        });
    },

    confirmExit(game) {
        modal.open({
            title: '🚪 Sair do Jogo?',
            content: '<p>Seu progresso atual não será salvo.</p>',
            actions: [
                { label: 'Continuar', className: 'btn-ghost' },
                { label: 'Sim, sair', className: 'btn-danger', onClick: () => utils.showScreen('gamesScreen') }
            ]
        });
    },

    confirmHome(game) {
        modal.open({
            title: '🏠 Voltar ao Início?',
            content: '<p>O progresso atual não será salvo.</p>',
            actions: [
                { label: 'Cancelar', className: 'btn-ghost' },
                { label: 'Sim, ir ao início', className: 'btn-danger', onClick: () => utils.showScreen('landingScreen') }
            ]
        });
    },

    openAdminGlobal() { if (window.adminGlobal) window.adminGlobal.open(); },
    openAdminLocal(game) { if (window.adminLocal) window.adminLocal.open(game); }
};

/* =========================================================
   SETUP DO QUIZ
   ========================================================= */
const quizSetup = {
    open() {
        state.setupStep = 0;
        state.setupAnswers = { grade: null, level: null, count: null };
        this.render();
        utils.showScreen('setupScreen');
    },
    render() {
        document.querySelectorAll('.setup-step').forEach((s, i) => {
            s.classList.toggle('active', i === state.setupStep);
        });
        document.querySelectorAll('.step-dot').forEach((d, i) => {
            d.classList.remove('active', 'completed');
            if (i < state.setupStep) d.classList.add('completed');
            if (i === state.setupStep) d.classList.add('active');
        });
        const backBtn = document.getElementById('setupBackBtn');
        const nextBtn = document.getElementById('setupNextBtn');
        if (backBtn) backBtn.style.display = state.setupStep === 0 ? 'none' : 'flex';
        const v = this.getCurrentValue();
        if (nextBtn) {
            nextBtn.disabled = v === null;
            nextBtn.textContent = state.setupStep === 2 ? '🎯 Começar Quiz' : 'Continuar →';
        }
        this.highlight();
    },
    getCurrentValue() {
        if (state.setupStep === 0) return state.setupAnswers.grade;
        if (state.setupStep === 1) return state.setupAnswers.level;
        if (state.setupStep === 2) return state.setupAnswers.count;
        return null;
    },
    highlight() {
        ['gradeChoices', 'levelChoices', 'countChoices'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.querySelectorAll('.choice-card').forEach(c => c.classList.remove('selected'));
        });
        const map = [
            { id: 'gradeChoices', v: state.setupAnswers.grade },
            { id: 'levelChoices', v: state.setupAnswers.level },
            { id: 'countChoices', v: state.setupAnswers.count }
        ];
        map.forEach(({ id, v }) => {
            if (v === null) return;
            const el = document.getElementById(id);
            if (!el) return;
            el.querySelectorAll('.choice-card').forEach(card => {
                if (String(card.dataset.value) === String(v)) card.classList.add('selected');
            });
        });
    },
    selectChoice(card) {
        const v = card.dataset.value;
        if (state.setupStep === 0) state.setupAnswers.grade = v;
        if (state.setupStep === 1) state.setupAnswers.level = v;
        if (state.setupStep === 2) state.setupAnswers.count = parseInt(v, 10);
        this.highlight();
        const nextBtn = document.getElementById('setupNextBtn');
        if (nextBtn) nextBtn.disabled = false;
    },
    next() {
        if (state.setupStep < 2) { state.setupStep++; this.render(); }
        else this.finish();
    },
    back() { if (state.setupStep > 0) { state.setupStep--; this.render(); } },
    finish() {
        state.profile = { ...state.setupAnswers };
        this.applyFiltersAndStart();
    },
    applyFiltersAndStart() {
        const { grade, level, count } = state.profile;
        let pool = [...state.questions];
        if (grade && grade !== 'outro') {
            const byG = pool.filter(q => q.grade === grade);
            if (byG.length >= 3) pool = byG;
            else if (byG.length > 0) pool = [...byG, ...pool.filter(q => q.grade !== grade)];
        }
        if (level && level !== 'misto') {
            const ex = pool.filter(q => q.level === level);
            if (ex.length >= 3) pool = ex;
            else if (ex.length > 0) pool = [...ex, ...pool.filter(q => q.level !== level)];
        }
        pool = utils.shuffle(pool);
        if (count && count !== 999 && count < pool.length) pool = pool.slice(0, count);
        if (pool.length === 0) { toast.show('Nenhuma pergunta!', 'warning'); return; }
        state.sessionQuestions = pool;
        quiz.start(pool);
    }
};

/* =========================================================
   QUIZ
   ========================================================= */
const quiz = {
    start(qs) {
        if (!qs || qs.length === 0) { toast.show('Nenhuma pergunta!', 'warning'); return; }
        state.currentIndex = 0;
        state.score = 0;
        state.answered = false;
        state.total = qs.length;
        state.sessionQuestions = qs;
        state.currentSession = { game: 'quiz', startTime: Date.now(), endTime: null };
        const sd = document.getElementById('scoreDisplay');
        if (sd) sd.textContent = '0';
        utils.showScreen('quizScreen');
        this.render();
    },
    render() {
        const q = state.sessionQuestions[state.currentIndex];
        state.answered = false;
        document.getElementById('currentQ').textContent = state.currentIndex + 1;
        document.getElementById('totalQ').textContent = state.total;
        document.getElementById('scoreDisplay').textContent = state.score;
        document.getElementById('progressFill').style.width = `${((state.currentIndex + 1) / state.total) * 100}%`;
        document.getElementById('tagNumber').textContent = `Questão ${state.currentIndex + 1}`;
        const lm = LEVEL_META[q.level] || LEVEL_META.facil;
        document.getElementById('tagLevel').textContent = `${lm.icon} ${lm.label}`;
        const gm = GRADE_META[q.grade] || GRADE_META['outro'];
        document.getElementById('tagGrade').textContent = `${gm.icon} ${gm.label}`;
        document.getElementById('questionText').textContent = q.question;
        const fb = document.getElementById('feedback');
        fb.className = 'feedback';
        fb.innerHTML = '';
        document.getElementById('nextContainer').style.display = 'none';
        const oc = document.getElementById('optionsContainer');
        oc.innerHTML = '';
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'option';
            btn.innerHTML = `<span class="option-letter">${utils.letterFor(i)}</span><span class="option-text">${utils.escapeHtml(opt)}</span>`;
            btn.addEventListener('click', () => this.answer(i));
            oc.appendChild(btn);
        });
    },
    answer(selected) {
        if (state.answered) return;
        state.answered = true;
        const q = state.sessionQuestions[state.currentIndex];
        const isCorrect = selected === q.correct;
        const btns = document.querySelectorAll('#optionsContainer .option');
        btns.forEach(b => { b.disabled = true; b.classList.add('disabled'); });
        btns[q.correct].classList.add('correct');
        if (!isCorrect) btns[selected].classList.add('wrong');
        else { state.score++; document.getElementById('scoreDisplay').textContent = state.score; }
        const fb = document.getElementById('feedback');
        fb.className = `feedback show ${isCorrect ? 'correct' : 'wrong'}`;
        fb.innerHTML = `${isCorrect ? '✅ <strong>Correto!</strong>' : '❌ <strong>Incorreto.</strong>'} ${q.explanation || ''}`;
        document.getElementById('nextContainer').style.display = 'flex';
        document.getElementById('nextBtn').textContent = state.currentIndex === state.total - 1 ? 'Ver Resultado 🏁' : 'Próxima →';
    },
    next() {
        if (state.currentIndex < state.total - 1) { state.currentIndex++; this.render(); }
        else this.showResult();
    },
    showResult() {
        const total = state.total, sc = state.score, wrong = total - sc;
        const pct = total > 0 ? (sc / total) * 100 : 0;
        const dur = Math.round((Date.now() - state.currentSession.startTime) / 1000);
        scores.record({ game: 'quiz', score: Math.round(pct), duration: dur, details: { acertos: sc, erros: wrong, total } });

        document.getElementById('finalScore').textContent = sc;
        document.getElementById('finalTotal').textContent = `de ${total}`;
        document.getElementById('correctCount').textContent = sc;
        document.getElementById('wrongCount').textContent = wrong;
        document.getElementById('statLabel1').textContent = '✅ Acertos';
        document.getElementById('statLabel2').textContent = '❌ Erros';

        const gm = GRADE_META[state.profile.grade] || GRADE_META['outro'];
        const lm = LEVEL_META[state.profile.level] || { icon: '🎲', label: 'Misto' };
        document.getElementById('resultProfile').innerHTML = `
      <span class="profile-chip">👤 ${utils.escapeHtml(state.currentPlayer.name)}</span>
      <span class="profile-chip">${gm.icon} ${gm.label}</span>
      <span class="profile-chip">${lm.icon} Nível ${lm.label}</span>
      <span class="profile-chip">⏱️ ${utils.formatTime(dur)}</span>
    `;
        showResultScreen(pct);
    }
};

/* =========================================================
   RESULT SCREEN
   ========================================================= */
function showResultScreen(pct) {
    let emoji, title, message;
    if (pct === 100) { emoji = '🏆'; title = 'Perfeito!'; message = 'Você é um(a) químico(a) mestre!'; }
    else if (pct >= 80) { emoji = '🎉'; title = 'Excelente!'; message = 'Muito bom! Você domina química!'; }
    else if (pct >= 60) { emoji = '👍'; title = 'Bom trabalho!'; message = 'Na média! Dá pra melhorar.'; }
    else if (pct >= 40) { emoji = '📚'; title = 'Continue estudando!'; message = 'Você está no caminho.'; }
    else { emoji = '💪'; title = 'Não desista!'; message = 'Hora de revisar a química!'; }

    document.getElementById('resultEmoji').textContent = emoji;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultMessage').textContent = message;

    utils.showScreen('resultScreen');

    const c = 2 * Math.PI * 65;
    const offset = c - (pct / 100) * c;
    const ring = document.getElementById('progressRing');
    ring.style.strokeDasharray = c;
    ring.style.strokeDashoffset = c;
    requestAnimationFrame(() => requestAnimationFrame(() => {
        ring.style.strokeDashoffset = offset;
    }));
}

function showCustomResult({ emoji, title, message, score, total, label1, label2, profileChips, isPercent }) {
    document.getElementById('resultEmoji').textContent = emoji;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultMessage').innerHTML = message;
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalTotal').textContent = isPercent ? '/ 100' : `de ${total}`;
    document.getElementById('correctCount').textContent = label1.value;
    document.getElementById('wrongCount').textContent = label2.value;
    document.getElementById('statLabel1').textContent = label1.text;
    document.getElementById('statLabel2').textContent = label2.text;
    document.getElementById('resultProfile').innerHTML = profileChips.join('');

    const pct = isPercent ? score : (total > 0 ? (score / total) * 100 : 0);
    utils.showScreen('resultScreen');

    const c = 2 * Math.PI * 65;
    const offset = c - (pct / 100) * c;
    const ring = document.getElementById('progressRing');
    ring.style.strokeDasharray = c;
    ring.style.strokeDashoffset = c;
    requestAnimationFrame(() => requestAnimationFrame(() => {
        ring.style.strokeDashoffset = offset;
    }));
}

/* =========================================================
   MEMORY GAME
   ========================================================= */
const memoryGame = {
    firstCard: null, lockBoard: false, matches: 0, moves: 0,
    timerInterval: null, seconds: 0, totalPairs: 8,

    start() {
        this.reset();
        state.currentSession = { game: 'memory', startTime: Date.now(), endTime: null };
        utils.showScreen('memoryScreen');
        this.render();
        this.startTimer();
    },
    reset() {
        this.firstCard = null;
        this.lockBoard = false;
        this.matches = 0;
        this.moves = 0;
        this.seconds = 0;
        clearInterval(this.timerInterval);
        const t = document.getElementById('memoryTimer');
        const m = document.getElementById('memoryMoves');
        const mt = document.getElementById('memoryMatches');
        if (t) t.textContent = '00:00';
        if (m) m.textContent = '0';
        if (mt) mt.textContent = `0/${Math.min(8, state.memoryElements.length)}`;
    },
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.seconds++;
            const t = document.getElementById('memoryTimer');
            if (t) t.textContent = utils.formatTime(this.seconds);
        }, 1000);
    },
    stopTimer() { clearInterval(this.timerInterval); },
    render() {
        const pairsCount = Math.min(8, state.memoryElements.length);
        const els = utils.shuffle(state.memoryElements).slice(0, pairsCount);
        const cards = [];
        els.forEach((el, i) => {
            cards.push({ type: 'symbol', element: el, pairId: i });
            cards.push({ type: 'name', element: el, pairId: i });
        });
        const sh = utils.shuffle(cards);
        const board = document.getElementById('memoryBoard');
        if (!board) return;
        board.innerHTML = '';
        sh.forEach(cd => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.pairId = cd.pairId;
            card.dataset.type = cd.type;
            const back = cd.type === 'symbol'
                ? `<div class="element-symbol">${cd.element.symbol}</div><div class="element-atomic">Z = ${cd.element.atomic}</div>`
                : `<div class="element-name">${cd.element.name}</div>`;
            card.innerHTML = `<div class="memory-card-inner"><div class="memory-face memory-face-front"></div><div class="memory-face memory-face-back ${cd.type}">${back}</div></div>`;
            card.addEventListener('click', () => this.flip(card));
            board.appendChild(card);
        });
        const mt = document.getElementById('memoryMatches');
        if (mt) mt.textContent = `0/${pairsCount}`;
        this.totalPairs = pairsCount;
    },
    flip(card) {
        if (this.lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;
        card.classList.add('flipped');
        if (!this.firstCard) { this.firstCard = card; return; }
        this.moves++;
        const m = document.getElementById('memoryMoves');
        if (m) m.textContent = this.moves;
        const isMatch = this.firstCard.dataset.pairId === card.dataset.pairId &&
            this.firstCard.dataset.type !== card.dataset.type;
        if (isMatch) this.handleMatch(this.firstCard, card);
        else this.handleMismatch(this.firstCard, card);
    },
    handleMatch(a, b) {
        a.classList.add('matched'); b.classList.add('matched');
        this.matches++;
        const mt = document.getElementById('memoryMatches');
        if (mt) mt.textContent = `${this.matches}/${this.totalPairs}`;
        this.firstCard = null;
        if (this.matches === this.totalPairs) {
            this.stopTimer();
            setTimeout(() => this.finish(), 700);
        }
    },
    handleMismatch(a, b) {
        this.lockBoard = true;
        setTimeout(() => {
            a.classList.remove('flipped');
            b.classList.remove('flipped');
            this.firstCard = null;
            this.lockBoard = false;
        }, 900);
    },
    finish() {
        const min = this.totalPairs;
        const extra = Math.max(0, this.moves - min);
        const score = Math.max(0, 100 - extra * 4);
        scores.record({ game: 'memory', score, duration: this.seconds, details: { movimentos: this.moves } });
        state.currentGame = 'memory';
        showCustomResult({
            emoji: score >= 80 ? '🧠' : score >= 60 ? '👍' : '💪',
            title: score >= 80 ? 'Memória de Elefante!' : score >= 60 ? 'Muito Bom!' : 'Boa Tentativa!',
            message: `Completou em ${this.moves} movimentos e ${utils.formatTime(this.seconds)}`,
            score, total: 100,
            label1: { value: this.moves, text: '🎯 Movimentos' },
            label2: { value: utils.formatTime(this.seconds), text: '⏱️ Tempo' },
            profileChips: [
                `<span class="profile-chip">👤 ${utils.escapeHtml(state.currentPlayer.name)}</span>`,
                `<span class="profile-chip">🧠 Memória</span>`,
                `<span class="profile-chip">⏱️ ${utils.formatTime(this.seconds)}</span>`
            ],
            isPercent: true
        });
    }
};

/* =========================================================
   MATCH GAME
   ========================================================= */
const matchGame = {
    selectedLeft: null, selectedRight: null, matches: 0, moves: 0,
    timerInterval: null, seconds: 0, totalPairs: 6,

    start() {
        this.reset();
        state.currentSession = { game: 'match', startTime: Date.now(), endTime: null };
        utils.showScreen('matchScreen');
        this.render();
        this.startTimer();
    },
    reset() {
        this.selectedLeft = null;
        this.selectedRight = null;
        this.matches = 0;
        this.moves = 0;
        this.seconds = 0;
        clearInterval(this.timerInterval);
        const t = document.getElementById('matchTimer');
        const m = document.getElementById('matchMoves');
        const mt = document.getElementById('matchMatches');
        if (t) t.textContent = '00:00';
        if (m) m.textContent = '0';
        if (mt) mt.textContent = `0/${state.matchPairs.length}`;
    },
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.seconds++;
            const t = document.getElementById('matchTimer');
            if (t) t.textContent = utils.formatTime(this.seconds);
        }, 1000);
    },
    stopTimer() { clearInterval(this.timerInterval); },
    render() {
        const pairs = state.matchPairs;
        const L = utils.shuffle(pairs.map((p, i) => ({ text: p.left, id: i })));
        const R = utils.shuffle(pairs.map((p, i) => ({ text: p.right, id: i })));
        const lc = document.getElementById('matchLeftColumn');
        const rc = document.getElementById('matchRightColumn');
        if (!lc || !rc) return;
        lc.innerHTML = '';
        rc.innerHTML = '';
        L.forEach(it => {
            const b = document.createElement('button');
            b.className = 'match-item';
            b.dataset.id = it.id;
            b.dataset.side = 'left';
            b.textContent = it.text;
            b.addEventListener('click', () => this.select(b));
            lc.appendChild(b);
        });
        R.forEach(it => {
            const b = document.createElement('button');
            b.className = 'match-item';
            b.dataset.id = it.id;
            b.dataset.side = 'right';
            b.textContent = it.text;
            b.addEventListener('click', () => this.select(b));
            rc.appendChild(b);
        });
        const mt = document.getElementById('matchMatches');
        if (mt) mt.textContent = `0/${pairs.length}`;
        this.totalPairs = pairs.length;
    },
    select(btn) {
        if (btn.classList.contains('matched')) return;
        const side = btn.dataset.side;
        if (side === 'left') {
            if (this.selectedLeft) this.selectedLeft.classList.remove('selected');
            this.selectedLeft = btn;
            btn.classList.add('selected');
        } else {
            if (this.selectedRight) this.selectedRight.classList.remove('selected');
            this.selectedRight = btn;
            btn.classList.add('selected');
        }
        if (this.selectedLeft && this.selectedRight) this.checkMatch();
    },
    checkMatch() {
        const l = this.selectedLeft, r = this.selectedRight;
        const isMatch = l.dataset.id === r.dataset.id;
        this.moves++;
        const m = document.getElementById('matchMoves');
        if (m) m.textContent = this.moves;
        if (isMatch) {
            l.classList.remove('selected'); r.classList.remove('selected');
            l.classList.add('matched'); r.classList.add('matched');
            this.selectedLeft = null; this.selectedRight = null;
            this.matches++;
            const mt = document.getElementById('matchMatches');
            if (mt) mt.textContent = `${this.matches}/${this.totalPairs}`;
            if (this.matches === this.totalPairs) {
                this.stopTimer();
                setTimeout(() => this.finish(), 700);
            }
        } else {
            l.classList.add('shake'); r.classList.add('shake');
            setTimeout(() => {
                l.classList.remove('shake', 'selected');
                r.classList.remove('shake', 'selected');
            }, 500);
            this.selectedLeft = null;
            this.selectedRight = null;
        }
    },
    finish() {
        const min = this.totalPairs;
        const extra = Math.max(0, this.moves - min);
        const score = Math.max(0, 100 - extra * 8);
        scores.record({ game: 'match', score, duration: this.seconds, details: { tentativas: this.moves } });
        state.currentGame = 'match';
        showCustomResult({
            emoji: score >= 80 ? '🔗' : score >= 60 ? '👍' : '💪',
            title: score >= 80 ? 'Perfeito!' : score >= 60 ? 'Muito Bom!' : 'Boa!',
            message: `Completou em ${this.moves} tentativas e ${utils.formatTime(this.seconds)}`,
            score, total: 100,
            label1: { value: this.moves, text: '🎯 Tentativas' },
            label2: { value: utils.formatTime(this.seconds), text: '⏱️ Tempo' },
            profileChips: [
                `<span class="profile-chip">👤 ${utils.escapeHtml(state.currentPlayer.name)}</span>`,
                `<span class="profile-chip">🔗 Ligue os Pares</span>`,
                `<span class="profile-chip">⏱️ ${utils.formatTime(this.seconds)}</span>`
            ],
            isPercent: true
        });
    }
};

/* =========================================================
   HANGMAN GAME (com sistema de dica)
   ========================================================= */
const hangmanGame = {
    start() {
        state.currentSession = { game: 'hangman', startTime: Date.now(), endTime: null };
        state.hangman.availableWords = utils.shuffle([...state.hangmanWords]);
        state.hangman.score = 0;
        state.hangman.roundCount = 0;
        const tw = document.getElementById('hangmanTotalWords');
        if (tw) tw.textContent = state.hangmanWords.length;
        utils.showScreen('hangmanScreen');
        this.nextRound();
    },

    nextRound() {
        if (state.hangman.availableWords.length === 0) {
            state.hangman.availableWords = utils.shuffle([...state.hangmanWords]);
        }
        state.hangman.currentWordObj = state.hangman.availableWords.pop();
        state.hangman.roundCount++;
        const wi = document.getElementById('hangmanWordIndex');
        if (wi) wi.textContent = state.hangman.roundCount;
        state.hangman.guessedLetters.clear();
        state.hangman.wrongErrors = 0;
        state.hangman.gameActive = true;
        state.hangman.hintRevealed = false;
        state.hangman.hintPenalty = 0;
        state.currentSession.startTime = Date.now();

        const badge = document.getElementById('hangmanLevelBadge');
        if (badge) {
            badge.className = 'hangman-level-badge';
            const lvl = state.hangman.currentWordObj.level;
            if (lvl === 'Fácil') { badge.classList.add('facil'); badge.textContent = '🟢 Nível: Fácil'; }
            else if (lvl === 'Médio') { badge.classList.add('medio'); badge.textContent = '🟡 Nível: Médio'; }
            else { badge.classList.add('avancado'); badge.textContent = '🔴 Nível: Avançado'; }
        }

        // Reset do botão de dica
        const hintBtn = document.getElementById('hangmanHintBtn');
        if (hintBtn) {
            hintBtn.disabled = false;
            hintBtn.classList.remove('revealed');
            hintBtn.innerHTML = '💡 Revelar Dica';
        }

        // Fecha painel flutuante
        const floatingPanel = document.getElementById('hintFloatingPanel');
        if (floatingPanel) floatingPanel.classList.remove('visible');

        this.updateDrawing();
        this.renderWord();
        this.renderKeyboard();
        this.updateStats();
    },

    revealHint() {
        if (state.hangman.hintRevealed) return;
        if (!state.hangman.gameActive) return;

        modal.open({
            title: '💡 Revelar Dica?',
            content: `
                <div style="text-align:center;">
                    <div style="font-size:3rem;margin-bottom:12px;">⚠️</div>
                    <p style="color:var(--text-secondary);margin-bottom:16px;">Ao revelar a dica, você <strong style="color:var(--danger)">perderá 25% da pontuação</strong> desta rodada.</p>
                    <p style="color:var(--text-secondary);font-size:0.85rem;">Tem certeza que deseja continuar?</p>
                </div>
            `,
            actions: [
                { label: 'Não, continuar tentando', className: 'btn-ghost' },
                {
                    label: 'Sim, revelar dica',
                    className: 'btn-warning',
                    onClick: () => this.applyHint()
                }
            ]
        });
    },

    applyHint() {
        state.hangman.hintRevealed = true;

        const hintBtn = document.getElementById('hangmanHintBtn');
        if (hintBtn) {
            hintBtn.disabled = true;
            hintBtn.classList.add('revealed');
            hintBtn.innerHTML = '✅ Dica Revelada';
        }

        let floatingPanel = document.getElementById('hintFloatingPanel');
        if (!floatingPanel) {
            floatingPanel = document.createElement('div');
            floatingPanel.id = 'hintFloatingPanel';
            floatingPanel.className = 'hint-floating-panel';
            document.body.appendChild(floatingPanel);
        }

        const dica = state.hangman.currentWordObj.definition || 'Sem dica disponível para esta palavra.';
        floatingPanel.innerHTML = `
            <div class="hint-header">
                <span class="hint-title">💡 Dica Científica</span>
                <button class="hint-close" id="hintCloseBtn" title="Fechar">✕</button>
            </div>
            <div class="hint-text">${dica}</div>
            <div class="hint-penalty">⚠️ Penalidade: -25% na pontuação final</div>
        `;
        floatingPanel.classList.add('visible');

        const closeBtn = document.getElementById('hintCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                floatingPanel.classList.remove('visible');
            });
        }

        toast.show('💡 Dica revelada! -25% na pontuação', 'warning', 3000);
    },

    renderWord() {
        const container = document.getElementById('hangmanWordContainer');
        if (!container) return;
        container.innerHTML = '';
        const rawWord = state.hangman.currentWordObj.word;
        for (let i = 0; i < rawWord.length; i++) {
            const char = rawWord[i];
            if (char === ' ') {
                const space = document.createElement('div');
                space.className = 'hangman-letter-new space';
                container.appendChild(space);
            } else {
                const normChar = utils.normalizeStr(char);
                const isGuessed = state.hangman.guessedLetters.has(normChar);
                const box = document.createElement('div');
                box.className = `hangman-letter-new ${isGuessed ? 'revealed' : ''}`;
                box.textContent = isGuessed ? char : '';
                container.appendChild(box);
            }
        }
    },

    renderKeyboard() {
        const kb = document.getElementById('hangmanKeyboard');
        if (!kb) return;
        kb.innerHTML = '';
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÇ';
        const rawNorm = utils.normalizeStr(state.hangman.currentWordObj.word);

        for (const letter of alphabet) {
            const isGuessed = state.hangman.guessedLetters.has(letter);
            const btn = document.createElement('button');
            btn.textContent = letter;
            btn.disabled = isGuessed || !state.hangman.gameActive;
            let cls = 'key-btn-new';
            if (isGuessed) {
                if (rawNorm.includes(letter)) cls += ' correct';
                else cls += ' wrong';
            }
            btn.className = cls;
            btn.onclick = () => this.guess(letter);
            kb.appendChild(btn);
        }
    },

    guess(letter) {
        if (!state.hangman.gameActive || state.hangman.guessedLetters.has(letter)) return;
        state.hangman.guessedLetters.add(letter);
        const rawNorm = utils.normalizeStr(state.hangman.currentWordObj.word);
        if (rawNorm.includes(letter)) {
            this.renderWord();
            this.renderKeyboard();
            this.checkWin();
        } else {
            state.hangman.wrongErrors++;
            this.updateDrawing();
            this.updateStats();
            this.renderKeyboard();
            this.checkLoss();
        }
    },

    updateDrawing() {
        for (let i = 1; i <= state.hangman.maxErrors; i++) {
            const part = document.getElementById(`hangmanPart${i}`);
            if (part) {
                part.style.opacity = i <= state.hangman.wrongErrors ? '1' : '0';
                part.style.transition = 'opacity 0.4s ease';
            }
        }
    },

    updateStats() {
        const e = document.getElementById('hangmanErrors');
        const s = document.getElementById('hangmanScore');
        if (e) e.textContent = `${state.hangman.maxErrors - state.hangman.wrongErrors} / ${state.hangman.maxErrors}`;
        if (s) s.textContent = state.hangman.score;
    },

    checkWin() {
        const raw = state.hangman.currentWordObj.word;
        let won = true;
        for (const ch of raw) {
            if (ch !== ' ' && !state.hangman.guessedLetters.has(utils.normalizeStr(ch))) {
                won = false;
                break;
            }
        }
        if (won) {
            state.hangman.gameActive = false;
            const bonus = (state.hangman.maxErrors - state.hangman.wrongErrors) * 15;
            const mult = state.hangman.currentWordObj.difficultyScore * 50;
            const earned = mult + bonus;
            state.hangman.score += earned;
            this.updateStats();
            this.showModal(true, earned);
        }
    },

    checkLoss() {
        if (state.hangman.wrongErrors >= state.hangman.maxErrors) {
            state.hangman.gameActive = false;
            this.showModal(false, 0);
        }
    },

    showModal(isWin, points) {
        const dur = Math.round((Date.now() - state.currentSession.startTime) / 1000);

        // Aplica penalidade da dica
        let finalPoints = points;
        if (isWin && state.hangman.hintRevealed) {
            finalPoints = Math.round(points * 0.75);
        }

        scores.record({
            game: 'hangman',
            score: isWin ? finalPoints : 0,
            duration: dur,
            details: {
                palavra: state.hangman.currentWordObj.word,
                ganhou: isWin,
                erros: state.hangman.wrongErrors,
                usouDica: state.hangman.hintRevealed
            }
        });

        const icon = isWin ? '🏆' : '💀';
        const title = isWin ? 'Parabéns!' : 'Fim das Tentativas!';

        let subtitle;
        if (isWin) {
            if (state.hangman.hintRevealed) {
                subtitle = `Você ganhou <strong style="color:var(--success)">+${finalPoints} pontos</strong> descobrindo <strong>${state.hangman.currentWordObj.word}</strong>!<br><small style="color:var(--danger);">(-25% por usar a dica)</small>`;
            } else {
                subtitle = `Você ganhou <strong style="color:var(--success)">+${finalPoints} pontos</strong> descobrindo <strong>${state.hangman.currentWordObj.word}</strong>!`;
            }
        } else {
            subtitle = `A palavra era: <strong style="color:var(--danger)">${state.hangman.currentWordObj.word}</strong>`;
        }

        modal.open({
            title: '',
            content: `
                <div style="text-align:center;">
                    <div style="font-size:4rem;margin-bottom:8px;">${icon}</div>
                    <h3 style="font-size:1.4rem;margin-bottom:8px;">${title}</h3>
                    <p style="color:var(--text-secondary);margin-bottom:16px;">${subtitle}</p>
                    <div style="background:var(--bg-option);border-left:4px solid var(--accent);border-radius:10px;padding:14px;text-align:left;margin-bottom:16px;">
                        <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--accent);font-weight:800;margin-bottom:6px;">📖 Conceito Químico</div>
                        <div style="font-size:0.9rem;color:var(--text-secondary);line-height:1.6;">${state.hangman.currentWordObj.definition}</div>
                    </div>
                </div>
            `,
            actions: [
                { label: '🏠 Início', className: 'btn-ghost', onClick: () => utils.showScreen('landingScreen') },
                {
                    label: 'Próxima Rodada →', className: 'btn-primary', autoClose: false, onClick: () => {
                        modal.close();
                        this.nextRound();
                    }
                }
            ]
        });
    }
};

/* =========================================================
   EXPOR OBJETOS GLOBAIS
   ========================================================= */
window.hub = hub;
window.quiz = quiz;
window.quizSetup = quizSetup;
window.memoryGame = memoryGame;
window.matchGame = matchGame;
window.hangmanGame = hangmanGame;
window.player = player;
window.scores = scores;
window.storage = storage;
window.utils = utils;
window.toast = toast;
window.modal = modal;
window.theme = theme;
window.panel = panel;
window.state = state;
window.visuals = visuals;
window.zoom = zoom;
window.render = render;

/* =========================================================
   TECLADO FÍSICO NO HANGMAN
   ========================================================= */
window.addEventListener('keydown', e => {
    const hs = document.getElementById('hangmanScreen');
    if (!hs || !hs.classList.contains('active')) return;
    if (!state.hangman.gameActive) return;
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    const key = e.key.toUpperCase();
    if (/^[A-ZÇ]$/.test(key)) hangmanGame.guess(key);
});

console.log('%c🧪 BLOCO 1 carregado (base + jogos + dica integrada)', 'color: #00e5ff; font-size: 14px; font-weight: bold;');

/* =========================================================
   QUÍMICA PLAY v8.0 - BLOCO 2: Admin Global + Admin Local + Site Exporter
   ========================================================= */

const siteExporter = {
    generateUpdatedHTML() {
        const html = document.documentElement.outerHTML;
        const embeddedData = {
            questions: state.questions,
            memoryElements: state.memoryElements,
            matchPairs: state.matchPairs,
            hangmanWords: state.hangmanWords,
            diagrams: state.diagrams,
            hubConfig: state.hubConfig,
            visualConfig: state.visualConfig,
            adminPassword: state.adminPassword,
            exportedAt: new Date().toISOString()
        };
        const dataScript = '\n<script id="qp-embedded-data" type="application/json">\n' +
            JSON.stringify(embeddedData) +
            '\n<\/script>\n';

        let newHtml = html;
        newHtml = newHtml.replace(/<script id="qp-embedded-data"[\s\S]*?<\/script>/g, '');
        newHtml = newHtml.replace('</body>', dataScript + '\n</body>');
        return newHtml;
    },

    download() {
        const html = this.generateUpdatedHTML();
        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.show('✅ Site atualizado baixado! Substitua seu index.html', 'success', 5000);
    },

    loadEmbedded() {
        const scriptEl = document.getElementById('qp-embedded-data');
        if (!scriptEl) return null;
        try { return JSON.parse(scriptEl.textContent); }
        catch (e) { console.warn('Erro ao ler embedded:', e); return null; }
    }
};

/* =========================================================
   ADMIN GLOBAL
   ========================================================= */
const adminGlobal = {
    open() {
        const savedPassword = storage.loadAdminPassword();
        const content = `
      <div class="admin-login-content">
        <div class="admin-login-icon">🔐</div>
        <h3>Acesso Administrativo</h3>
        <p class="modal-sub">Digite a senha para acessar o painel global</p>
        <input type="password" id="adminPassInput" class="admin-password-input" placeholder="Senha" autocomplete="off">
        <p style="font-size:0.75rem;color:var(--text-muted);">Senha padrão: <code style="color:var(--warning)">admin123</code></p>
      </div>
    `;

        modal.open({
            title: '',
            content,
            actions: [
                { label: 'Cancelar', className: 'btn-ghost' },
                {
                    label: 'Entrar', className: 'btn-warning', autoClose: false, onClick: () => {
                        const input = document.getElementById('adminPassInput');
                        const pass = (input?.value || '').trim();
                        if (pass === savedPassword) {
                            modal.close();
                            this.openPanel();
                        } else {
                            toast.show('Senha incorreta!', 'error');
                            input?.focus();
                            input?.select();
                        }
                    }
                }
            ]
        });

        setTimeout(() => {
            const input = document.getElementById('adminPassInput');
            if (input) {
                input.focus();
                input.addEventListener('keydown', e => {
                    if (e.key === 'Enter') {
                        const btn = document.querySelector('[data-action-index="1"]');
                        if (btn) btn.click();
                    }
                });
            }
        }, 60);
    },

    openPanel() {
        state.adminGlobalTab = 'visual';
        document.querySelectorAll('#adminGlobalTabs .admin-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.tab === 'visual');
        });
        this.setTab('visual');
        utils.showScreen('adminGlobalScreen');
    },

    setTab(tab) {
        state.adminGlobalTab = tab;
        const content = document.getElementById('adminGlobalContent');
        if (!content) return;

        switch (tab) {
            case 'visual': content.innerHTML = this.renderVisual(); this.bindVisual(); break;
            case 'landing': content.innerHTML = this.renderLanding(); this.bindLanding(); break;
            case 'hub': content.innerHTML = this.renderHub(); this.bindHub(); break;
            case 'quiz': content.innerHTML = this.renderQuizAdmin(); this.bindQuizAdmin(); break;
            case 'memory': content.innerHTML = this.renderMemoryAdmin(); this.bindMemoryAdmin(); break;
            case 'match': content.innerHTML = this.renderMatchAdmin(); this.bindMatchAdmin(); break;
            case 'hangman': content.innerHTML = this.renderHangmanAdmin(); this.bindHangmanAdmin(); break;
            case 'diagrams': content.innerHTML = this.renderDiagramsAdmin(); this.bindDiagramsAdmin(); break;
            case 'backup': content.innerHTML = this.renderBackup(); this.bindBackup(); break;
            case 'password': content.innerHTML = this.renderPassword(); this.bindPassword(); break;
        }
    },

    renderVisual() {
        const dark = state.visualConfig.dark;
        const light = state.visualConfig.light;
        const colorField = (section, key, value, label) => `
      <div class="form-group">
        <label>${label}</label>
        <div class="color-input-group">
          <input type="color" data-visual="${section}" data-key="${key}" value="${value}">
          <input type="text" data-visual-text="${section}" data-key="${key}" value="${value}">
        </div>
      </div>
    `;
        return `
      <div class="admin-panel active">
        <div class="admin-notice">
          <strong>🎨 Personalização Visual:</strong> Ajuste as cores do tema escuro e claro. As alterações são aplicadas imediatamente.
        </div>
        <div class="form-grid-2">
          <div>
            <h3 style="font-size:1rem;margin-bottom:14px;color:var(--accent);">🌙 TEMA ESCURO</h3>
            ${colorField('dark', 'accent', dark.accent, 'Cor Accent')}
            ${colorField('dark', 'accent2', dark.accent2, 'Cor Accent 2')}
            ${colorField('dark', 'bgPrimary', dark.bgPrimary, 'Fundo Principal')}
            ${colorField('dark', 'bgCard', dark.bgCard, 'Fundo dos Cards')}
            ${colorField('dark', 'success', dark.success, 'Sucesso')}
            ${colorField('dark', 'danger', dark.danger, 'Erro')}
            ${colorField('dark', 'warning', dark.warning, 'Aviso')}
            ${colorField('dark', 'purple', dark.purple, 'Roxo')}
          </div>
          <div>
            <h3 style="font-size:1rem;margin-bottom:14px;color:var(--warning);">☀️ TEMA CLARO</h3>
            ${colorField('light', 'accent', light.accent, 'Cor Accent')}
            ${colorField('light', 'accent2', light.accent2, 'Cor Accent 2')}
            ${colorField('light', 'bgPrimary', light.bgPrimary, 'Fundo Principal')}
            ${colorField('light', 'bgCard', light.bgCard, 'Fundo dos Cards')}
            ${colorField('light', 'success', light.success, 'Sucesso')}
            ${colorField('light', 'danger', light.danger, 'Erro')}
            ${colorField('light', 'warning', light.warning, 'Aviso')}
            ${colorField('light', 'purple', light.purple, 'Roxo')}
          </div>
        </div>
        <div class="admin-actions" style="margin-top:24px;">
          <button class="btn btn-danger btn-sm" id="visualResetBtn">↺ Restaurar Padrão</button>
          <button class="btn btn-primary btn-sm" id="visualSaveBtn">💾 Salvar Alterações</button>
        </div>
      </div>
    `;
    },

    bindVisual() {
        const content = document.getElementById('adminGlobalContent');
        content.querySelectorAll('input[type="color"][data-visual]').forEach(colorInput => {
            const section = colorInput.dataset.visual;
            const key = colorInput.dataset.key;
            const textInput = content.querySelector(`[data-visual-text][data-key="${key}"]`);
            colorInput.addEventListener('input', () => {
                if (textInput) textInput.value = colorInput.value;
                this.applyLiveColor(section, key, colorInput.value);
            });
            if (textInput) {
                textInput.addEventListener('input', () => {
                    if (/^#[0-9a-fA-F]{6}$/.test(textInput.value)) {
                        colorInput.value = textInput.value;
                        this.applyLiveColor(section, key, textInput.value);
                    }
                });
            }
        });

        const saveBtn = document.getElementById('visualSaveBtn');
        if (saveBtn) saveBtn.addEventListener('click', () => {
            const newConfig = { dark: {}, light: {} };
            content.querySelectorAll('input[type="color"][data-visual]').forEach(input => {
                newConfig[input.dataset.visual][input.dataset.key] = input.value;
            });
            state.visualConfig = newConfig;
            storage.saveVisualConfig(newConfig);
            visuals.applyCurrent();
            toast.show('✅ Cores salvas!', 'success');
        });

        const resetBtn = document.getElementById('visualResetBtn');
        if (resetBtn) resetBtn.addEventListener('click', () => {
            state.visualConfig = JSON.parse(JSON.stringify(DEFAULT_VISUAL_CONFIG));
            storage.saveVisualConfig(state.visualConfig);
            visuals.applyCurrent();
            this.setTab('visual');
            toast.show('Cores restauradas!', 'success');
        });
    },

    applyLiveColor(section, key, value) {
        state.visualConfig[section][key] = value;
        const cur = document.documentElement.getAttribute('data-theme') || 'dark';
        if (cur === section) visuals.applyCurrent();
    },

    renderLanding() {
        const l = state.hubConfig.landing;
        return `
      <div class="admin-panel active">
        <div class="admin-notice">
          <strong>🏠 Tela Inicial:</strong> Personalize o título, ícone e textos dos botões.
        </div>
        <div class="form-group">
          <label>Ícone (emoji)</label>
          <input type="text" class="form-control" id="landingIcon" value="${utils.escapeHtml(l.icon)}" maxlength="4">
        </div>
        <div class="form-group">
          <label>Título</label>
          <input type="text" class="form-control" id="landingTitle" value="${utils.escapeHtml(l.title)}" maxlength="60">
        </div>
        <div class="form-grid-3">
          <div class="form-group">
            <label>Botão Jogar</label>
            <input type="text" class="form-control" id="landingBtnPlay" value="${utils.escapeHtml(l.btnPlay)}">
          </div>
          <div class="form-group">
            <label>Botão Ranking</label>
            <input type="text" class="form-control" id="landingBtnStats" value="${utils.escapeHtml(l.btnStats)}">
          </div>
          <div class="form-group">
            <label>Botão Diagramas</label>
            <input type="text" class="form-control" id="landingBtnDiagrams" value="${utils.escapeHtml(l.btnDiagrams)}">
          </div>
        </div>
        <div class="admin-actions" style="margin-top:16px;">
          <button class="btn btn-danger btn-sm" id="landingResetBtn">↺ Restaurar Padrão</button>
          <button class="btn btn-success btn-sm" id="landingSaveBtn">💾 Salvar e Aplicar</button>
        </div>
      </div>
    `;
    },

    bindLanding() {
        const resetBtn = document.getElementById('landingResetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                state.hubConfig.landing = JSON.parse(JSON.stringify(DEFAULT_HUB_CONFIG.landing));
                storage.saveHubConfig(state.hubConfig);
                this.setTab('landing');
                toast.show('Tela inicial restaurada!', 'success');
            });
        }

        const saveBtn = document.getElementById('landingSaveBtn');
        if (!saveBtn) return;
        saveBtn.addEventListener('click', () => {
            state.hubConfig.landing = {
                icon: document.getElementById('landingIcon').value || '⚗️',
                title: document.getElementById('landingTitle').value || 'Química Play',
                tagline: '',
                btnPlay: document.getElementById('landingBtnPlay').value,
                btnStats: document.getElementById('landingBtnStats').value,
                btnDiagrams: document.getElementById('landingBtnDiagrams').value
            };
            storage.saveHubConfig(state.hubConfig);
            hub.renderScreens();
            utils.showScreen('adminGlobalScreen');
            toast.show('✅ Tela inicial atualizada!', 'success');
        });
    },

    renderHub() {
        const games = state.hubConfig.games;
        const cards = Object.keys(games).map(key => {
            const g = games[key];
            return `
        <div class="list-item" data-game-key="${key}">
          <div class="item-index">${g.icon}</div>
          <div class="item-content">
            <div class="form-group" style="margin-bottom:8px;">
              <label style="font-size:0.7rem;">Nome do Jogo</label>
              <input type="text" class="form-control hub-name" data-key="${key}" value="${utils.escapeHtml(g.name)}">
            </div>
            <div class="form-grid-3" style="gap:8px;">
              <div class="form-group" style="margin-bottom:0;">
                <label style="font-size:0.7rem;">Ícone</label>
                <input type="text" class="form-control hub-icon" data-key="${key}" value="${utils.escapeHtml(g.icon)}" maxlength="4">
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label style="font-size:0.7rem;">Ordem</label>
                <input type="number" class="form-control hub-order" data-key="${key}" value="${g.order}" min="1" max="10">
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label style="font-size:0.7rem;">Status</label>
                <select class="form-control hub-enabled" data-key="${key}">
                  <option value="true" ${g.enabled !== false ? 'selected' : ''}>✅ Ativo</option>
                  <option value="false" ${g.enabled === false ? 'selected' : ''}>❌ Desativado</option>
                </select>
              </div>
            </div>
            <div class="form-group" style="margin-top:8px;margin-bottom:0;">
              <label style="font-size:0.7rem;">Descrição</label>
              <input type="text" class="form-control hub-desc" data-key="${key}" value="${utils.escapeHtml(g.desc)}">
            </div>
          </div>
        </div>
      `;
        }).join('');

        return `
      <div class="admin-panel active">
        <div class="admin-notice">
          <strong>🎮 Hub de Jogos:</strong> Altere nome, ícone, descrição, ordem e ative/desative jogos.
        </div>
        <div class="items-list">${cards}</div>
        <div class="admin-actions" style="margin-top:16px;">
          <button class="btn btn-danger btn-sm" id="hubResetBtn">↺ Restaurar Padrão</button>
          <button class="btn btn-success btn-sm" id="hubSaveBtn">💾 Salvar e Aplicar</button>
        </div>
      </div>
    `;
    },

    bindHub() {
        const resetBtn = document.getElementById('hubResetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                state.hubConfig.games = JSON.parse(JSON.stringify(DEFAULT_HUB_CONFIG.games));
                storage.saveHubConfig(state.hubConfig);
                this.setTab('hub');
                toast.show('Hub restaurado!', 'success');
            });
        }

        const saveBtn = document.getElementById('hubSaveBtn');
        if (!saveBtn) return;
        saveBtn.addEventListener('click', () => {
            const content = document.getElementById('adminGlobalContent');
            content.querySelectorAll('[data-key]').forEach(el => {
                const key = el.dataset.key;
                if (!state.hubConfig.games[key]) return;
                if (el.classList.contains('hub-name')) state.hubConfig.games[key].name = el.value;
                if (el.classList.contains('hub-icon')) state.hubConfig.games[key].icon = el.value;
                if (el.classList.contains('hub-desc')) state.hubConfig.games[key].desc = el.value;
                if (el.classList.contains('hub-order')) state.hubConfig.games[key].order = parseInt(el.value, 10) || 1;
                if (el.classList.contains('hub-enabled')) state.hubConfig.games[key].enabled = el.value === 'true';
            });
            storage.saveHubConfig(state.hubConfig);
            hub.renderScreens();
            utils.showScreen('adminGlobalScreen');
            toast.show('✅ Hub atualizado!', 'success');
        });
    },

    renderQuizAdmin() {
        const list = state.questions;
        const items = list.length === 0
            ? '<div class="empty-state">Nenhuma pergunta cadastrada.</div>'
            : list.map((q, i) => {
                const lm = LEVEL_META[q.level] || LEVEL_META.facil;
                const gm = GRADE_META[q.grade] || GRADE_META['outro'];
                return `
            <div class="list-item">
              <div class="item-index">${i + 1}</div>
              <div class="item-content">
                <div class="item-meta">
                  <span class="tag tag-level">${lm.icon} ${lm.label}</span>
                  <span class="tag tag-grade">${gm.icon} ${gm.label}</span>
                </div>
                <div class="item-title">${utils.escapeHtml(q.question)}</div>
                <div class="item-desc">✔ ${utils.escapeHtml(q.options[q.correct])}</div>
              </div>
              <div class="item-actions">
                <button class="mini-btn" data-quiz-action="edit" data-index="${i}">✏️</button>
                <button class="mini-btn delete" data-quiz-action="delete" data-index="${i}">🗑️</button>
              </div>
            </div>
          `;
            }).join('');

        return `
      <div class="admin-panel active">
        <div class="admin-notice"><strong>🧪 Quiz:</strong> Gerencie as perguntas do Quiz.</div>
        <div class="admin-actions">
          <button class="btn btn-primary btn-sm" id="quizAddBtn">➕ Nova Pergunta</button>
          <button class="btn btn-ghost btn-sm" id="quizExportBtn">📤 Exportar</button>
          <button class="btn btn-ghost btn-sm" id="quizImportBtn">📥 Importar</button>
          <button class="btn btn-danger btn-sm" id="quizResetBtn">↺ Restaurar Padrão</button>
        </div>
        <div id="quizFormContainer"></div>
        <div class="items-list">${items}</div>
      </div>
    `;
    },

    bindQuizAdmin() {
        const content = document.getElementById('adminGlobalContent');
        content.querySelectorAll('[data-quiz-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.quizAction;
                const index = parseInt(btn.dataset.index, 10);
                if (action === 'edit') this.openQuizForm(index);
                if (action === 'delete') this.confirmDeleteItem('question', index);
            });
        });
        const addBtn = document.getElementById('quizAddBtn');
        if (addBtn) addBtn.addEventListener('click', () => this.openQuizForm(-1));
        const exportBtn = document.getElementById('quizExportBtn');
        if (exportBtn) exportBtn.addEventListener('click', () => this.exportJSON('questions', state.questions));
        const importBtn = document.getElementById('quizImportBtn');
        if (importBtn) importBtn.addEventListener('click', () => this.importJSON('questions'));
        const resetBtn = document.getElementById('quizResetBtn');
        if (resetBtn) resetBtn.addEventListener('click', () => {
            modal.open({
                title: '⚠️ Restaurar Padrão',
                content: '<p>Apagar TODAS as perguntas personalizadas e restaurar as originais?</p>',
                actions: [
                    { label: 'Cancelar', className: 'btn-ghost' },
                    {
                        label: 'Sim, restaurar', className: 'btn-danger', onClick: () => {
                            state.questions = JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
                            storage.saveQuestions(state.questions);
                            this.setTab('quiz');
                            toast.show('Restaurado!', 'success');
                        }
                    }
                ]
            });
        });
    },

    openQuizForm(index = -1) {
        const container = document.getElementById('quizFormContainer');
        if (!container) return;
        const isEdit = index >= 0;
        const q = isEdit ? state.questions[index] : { question: '', options: ['', '', '', ''], correct: 0, explanation: '', grade: '1', level: 'facil' };

        container.innerHTML = `
      <div style="background:var(--bg-option);border-radius:12px;padding:20px;margin-bottom:16px;border:1px solid var(--border);">
        <h3 style="margin-bottom:16px;font-size:1.1rem;">${isEdit ? '✏️ Editar' : '➕ Nova'} Pergunta</h3>
        <div class="form-group">
          <label>Pergunta</label>
          <textarea class="form-control" id="qFormText">${utils.escapeHtml(q.question)}</textarea>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label>Ano</label>
            <select class="form-control" id="qFormGrade">
              <option value="9" ${q.grade === '9' ? 'selected' : ''}>9º ano</option>
              <option value="1" ${q.grade === '1' ? 'selected' : ''}>1º ano</option>
              <option value="2" ${q.grade === '2' ? 'selected' : ''}>2º ano</option>
              <option value="3" ${q.grade === '3' ? 'selected' : ''}>3º ano</option>
              <option value="outro" ${q.grade === 'outro' ? 'selected' : ''}>Outro</option>
            </select>
          </div>
          <div class="form-group">
            <label>Nível</label>
            <select class="form-control" id="qFormLevel">
              <option value="facil" ${q.level === 'facil' ? 'selected' : ''}>🟢 Fácil</option>
              <option value="medio" ${q.level === 'medio' ? 'selected' : ''}>🟡 Médio</option>
              <option value="dificil" ${q.level === 'dificil' ? 'selected' : ''}>🔴 Difícil</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Alternativas (marque a correta)</label>
          <div id="qFormOptions"></div>
        </div>
        <div class="form-group">
          <label>Explicação (opcional)</label>
          <textarea class="form-control" id="qFormExpl">${utils.escapeHtml(q.explanation || '')}</textarea>
        </div>
        <div class="modal-actions" style="justify-content:flex-start;">
          <button class="btn btn-success btn-sm" id="qFormSave">💾 Salvar</button>
          <button class="btn btn-ghost btn-sm" id="qFormCancel">Cancelar</button>
        </div>
      </div>
    `;

        const optsContainer = document.getElementById('qFormOptions');
        q.options.forEach((opt, i) => {
            const row = document.createElement('div');
            row.className = 'form-row';
            row.style.marginBottom = '8px';
            row.innerHTML = `
        <label class="radio-correct ${i === q.correct ? 'checked' : ''}">
          <input type="radio" name="qFormCorrect" value="${i}" ${i === q.correct ? 'checked' : ''}>
          <span style="font-weight:700;color:var(--text-secondary);">${utils.letterFor(i)}</span>
        </label>
        <input type="text" class="form-control q-form-opt" value="${utils.escapeHtml(opt)}" placeholder="Alternativa ${utils.letterFor(i)}">
      `;
            optsContainer.appendChild(row);
        });

        optsContainer.querySelectorAll('input[name="qFormCorrect"]').forEach(rad => {
            rad.addEventListener('change', () => {
                optsContainer.querySelectorAll('.radio-correct').forEach(l => l.classList.remove('checked'));
                rad.closest('.radio-correct').classList.add('checked');
            });
        });

        document.getElementById('qFormCancel').addEventListener('click', () => { container.innerHTML = ''; });

        document.getElementById('qFormSave').addEventListener('click', () => {
            const question = document.getElementById('qFormText').value.trim();
            const grade = document.getElementById('qFormGrade').value;
            const level = document.getElementById('qFormLevel').value;
            const explanation = document.getElementById('qFormExpl').value.trim();
            const options = Array.from(container.querySelectorAll('.q-form-opt')).map(i => i.value.trim());
            const correctRadio = container.querySelector('input[name="qFormCorrect"]:checked');
            const correct = correctRadio ? parseInt(correctRadio.value, 10) : 0;

            if (!question) { toast.show('Pergunta vazia!', 'error'); return; }
            if (options.some(o => !o)) { toast.show('Preencha todas as alternativas!', 'error'); return; }

            const data = { question, options, correct, explanation, grade, level };
            if (isEdit) {
                data.id = state.questions[index].id || utils.uid('q');
                state.questions[index] = data;
            } else {
                data.id = utils.uid('q');
                state.questions.push(data);
            }
            storage.saveQuestions(state.questions);
            this.setTab('quiz');
            toast.show(isEdit ? 'Atualizada!' : 'Adicionada!', 'success');
        });
    },

    renderMemoryAdmin() {
        const items = state.memoryElements.map((m, i) => `
      <div class="list-item">
        <div class="item-index">${m.symbol}</div>
        <div class="item-content"><div class="item-title">${utils.escapeHtml(m.name)} (Z = ${m.atomic})</div></div>
        <div class="item-actions">
          <button class="mini-btn" data-mem-action="edit" data-index="${i}">✏️</button>
          <button class="mini-btn delete" data-mem-action="delete" data-index="${i}">🗑️</button>
        </div>
      </div>
    `).join('');
        return `
      <div class="admin-panel active">
        <div class="admin-notice"><strong>🧠 Memória:</strong> Elementos do jogo da memória.</div>
        <div class="admin-actions">
          <button class="btn btn-primary btn-sm" id="memAddBtn">➕ Novo Elemento</button>
          <button class="btn btn-danger btn-sm" id="memResetBtn">↺ Restaurar Padrão</button>
        </div>
        <div id="memFormContainer"></div>
        <div class="items-list">${items || '<div class="empty-state">Nenhum elemento.</div>'}</div>
      </div>
    `;
    },

    bindMemoryAdmin() {
        const content = document.getElementById('adminGlobalContent');
        content.querySelectorAll('[data-mem-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.memAction;
                const index = parseInt(btn.dataset.index, 10);
                if (action === 'edit') this.openMemoryForm(index);
                if (action === 'delete') this.confirmDeleteItem('memoryElement', index);
            });
        });
        const addBtn = document.getElementById('memAddBtn');
        if (addBtn) addBtn.addEventListener('click', () => this.openMemoryForm(-1));
        const resetBtn = document.getElementById('memResetBtn');
        if (resetBtn) resetBtn.addEventListener('click', () => {
            state.memoryElements = JSON.parse(JSON.stringify(DEFAULT_MEMORY_ELEMENTS));
            storage.saveMemoryElements(state.memoryElements);
            this.setTab('memory');
            toast.show('Restaurado!', 'success');
        });
    },

    openMemoryForm(index = -1) {
        const container = document.getElementById('memFormContainer');
        const isEdit = index >= 0;
        const m = isEdit ? state.memoryElements[index] : { symbol: '', name: '', atomic: 0 };
        container.innerHTML = `
      <div style="background:var(--bg-option);border-radius:12px;padding:20px;margin-bottom:16px;border:1px solid var(--border);">
        <h3 style="margin-bottom:16px;font-size:1.1rem;">${isEdit ? '✏️ Editar' : '➕ Novo'} Elemento</h3>
        <div class="form-grid-3">
          <div class="form-group"><label>Símbolo</label><input type="text" class="form-control" id="memFormSymbol" value="${utils.escapeHtml(m.symbol)}" maxlength="3"></div>
          <div class="form-group"><label>Nome</label><input type="text" class="form-control" id="memFormName" value="${utils.escapeHtml(m.name)}"></div>
          <div class="form-group"><label>Nº Atômico</label><input type="number" class="form-control" id="memFormAtomic" value="${m.atomic}" min="1" max="118"></div>
        </div>
        <div class="modal-actions" style="justify-content:flex-start;">
          <button class="btn btn-success btn-sm" id="memFormSave">💾 Salvar</button>
          <button class="btn btn-ghost btn-sm" id="memFormCancel">Cancelar</button>
        </div>
      </div>
    `;
        document.getElementById('memFormCancel').addEventListener('click', () => container.innerHTML = '');
        document.getElementById('memFormSave').addEventListener('click', () => {
            const symbol = document.getElementById('memFormSymbol').value.trim();
            const name = document.getElementById('memFormName').value.trim();
            const atomic = parseInt(document.getElementById('memFormAtomic').value, 10);
            if (!symbol || !name) { toast.show('Preencha tudo!', 'error'); return; }
            const data = { symbol, name, atomic };
            if (isEdit) {
                data.id = state.memoryElements[index].id || utils.uid('m');
                state.memoryElements[index] = data;
            } else {
                data.id = utils.uid('m');
                state.memoryElements.push(data);
            }
            storage.saveMemoryElements(state.memoryElements);
            this.setTab('memory');
            toast.show('Salvo!', 'success');
        });
    },

    renderMatchAdmin() {
        const items = state.matchPairs.map((p, i) => `
      <div class="list-item">
        <div class="item-index">${i + 1}</div>
        <div class="item-content"><div class="item-title">${utils.escapeHtml(p.left)} ↔ ${utils.escapeHtml(p.right)}</div></div>
        <div class="item-actions">
          <button class="mini-btn" data-match-action="edit" data-index="${i}">✏️</button>
          <button class="mini-btn delete" data-match-action="delete" data-index="${i}">🗑️</button>
        </div>
      </div>
    `).join('');
        return `
      <div class="admin-panel active">
        <div class="admin-notice"><strong>🔗 Ligar:</strong> Pares do jogo Ligar.</div>
        <div class="admin-actions">
          <button class="btn btn-primary btn-sm" id="matchAddBtn">➕ Novo Par</button>
          <button class="btn btn-danger btn-sm" id="matchResetBtn">↺ Restaurar Padrão</button>
        </div>
        <div id="matchFormContainer"></div>
        <div class="items-list">${items || '<div class="empty-state">Nenhum par.</div>'}</div>
      </div>
    `;
    },

    bindMatchAdmin() {
        const content = document.getElementById('adminGlobalContent');
        content.querySelectorAll('[data-match-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.matchAction;
                const index = parseInt(btn.dataset.index, 10);
                if (action === 'edit') this.openMatchForm(index);
                if (action === 'delete') this.confirmDeleteItem('matchPair', index);
            });
        });
        const addBtn = document.getElementById('matchAddBtn');
        if (addBtn) addBtn.addEventListener('click', () => this.openMatchForm(-1));
        const resetBtn = document.getElementById('matchResetBtn');
        if (resetBtn) resetBtn.addEventListener('click', () => {
            state.matchPairs = JSON.parse(JSON.stringify(DEFAULT_MATCH_PAIRS));
            storage.saveMatchPairs(state.matchPairs);
            this.setTab('match');
            toast.show('Restaurado!', 'success');
        });
    },

    openMatchForm(index = -1) {
        const container = document.getElementById('matchFormContainer');
        const isEdit = index >= 0;
        const p = isEdit ? state.matchPairs[index] : { left: '', right: '' };
        container.innerHTML = `
      <div style="background:var(--bg-option);border-radius:12px;padding:20px;margin-bottom:16px;border:1px solid var(--border);">
        <h3 style="margin-bottom:16px;font-size:1.1rem;">${isEdit ? '✏️ Editar' : '➕ Novo'} Par</h3>
        <div class="form-grid-2">
          <div class="form-group"><label>Coluna Esquerda</label><input type="text" class="form-control" id="matchFormLeft" value="${utils.escapeHtml(p.left)}"></div>
          <div class="form-group"><label>Coluna Direita</label><input type="text" class="form-control" id="matchFormRight" value="${utils.escapeHtml(p.right)}"></div>
        </div>
        <div class="modal-actions" style="justify-content:flex-start;">
          <button class="btn btn-success btn-sm" id="matchFormSave">💾 Salvar</button>
          <button class="btn btn-ghost btn-sm" id="matchFormCancel">Cancelar</button>
        </div>
      </div>
    `;
        document.getElementById('matchFormCancel').addEventListener('click', () => container.innerHTML = '');
        document.getElementById('matchFormSave').addEventListener('click', () => {
            const left = document.getElementById('matchFormLeft').value.trim();
            const right = document.getElementById('matchFormRight').value.trim();
            if (!left || !right) { toast.show('Preencha tudo!', 'error'); return; }
            const data = { left, right };
            if (isEdit) {
                data.id = state.matchPairs[index].id || utils.uid('p');
                state.matchPairs[index] = data;
            } else {
                data.id = utils.uid('p');
                state.matchPairs.push(data);
            }
            storage.saveMatchPairs(state.matchPairs);
            this.setTab('match');
            toast.show('Salvo!', 'success');
        });
    },

    renderHangmanAdmin() {
        const items = state.hangmanWords.map((w, i) => `
      <div class="list-item">
        <div class="item-index">${i + 1}</div>
        <div class="item-content">
          <div class="item-meta"><span class="tag tag-level">${w.level}</span></div>
          <div class="item-title">${utils.escapeHtml(w.word)}</div>
        </div>
        <div class="item-actions">
          <button class="mini-btn" data-hang-action="edit" data-index="${i}">✏️</button>
          <button class="mini-btn delete" data-hang-action="delete" data-index="${i}">🗑️</button>
        </div>
      </div>
    `).join('');
        return `
      <div class="admin-panel active">
        <div class="admin-notice"><strong>🔤 Forca:</strong> Palavras + nível + definição científica.</div>
        <div class="admin-actions">
          <button class="btn btn-primary btn-sm" id="hangAddBtn">➕ Nova Palavra</button>
          <button class="btn btn-ghost btn-sm" id="hangExportBtn">📤 Exportar</button>
          <button class="btn btn-ghost btn-sm" id="hangImportBtn">📥 Importar</button>
          <button class="btn btn-danger btn-sm" id="hangResetBtn">↺ Restaurar Padrão</button>
        </div>
        <div id="hangFormContainer"></div>
        <div class="items-list">${items || '<div class="empty-state">Nenhuma palavra.</div>'}</div>
      </div>
    `;
    },

    bindHangmanAdmin() {
        const content = document.getElementById('adminGlobalContent');
        content.querySelectorAll('[data-hang-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.hangAction;
                const index = parseInt(btn.dataset.index, 10);
                if (action === 'edit') this.openHangmanForm(index);
                if (action === 'delete') this.confirmDeleteItem('hangmanWord', index);
            });
        });
        const addBtn = document.getElementById('hangAddBtn');
        if (addBtn) addBtn.addEventListener('click', () => this.openHangmanForm(-1));
        const exportBtn = document.getElementById('hangExportBtn');
        if (exportBtn) exportBtn.addEventListener('click', () => this.exportJSON('hangmanWords', state.hangmanWords));
        const importBtn = document.getElementById('hangImportBtn');
        if (importBtn) importBtn.addEventListener('click', () => this.importJSON('hangmanWords'));
        const resetBtn = document.getElementById('hangResetBtn');
        if (resetBtn) resetBtn.addEventListener('click', () => {
            state.hangmanWords = JSON.parse(JSON.stringify(DEFAULT_HANGMAN_WORDS));
            storage.saveHangmanWords(state.hangmanWords);
            this.setTab('hangman');
            toast.show('Restaurado!', 'success');
        });
    },

    openHangmanForm(index = -1) {
        const container = document.getElementById('hangFormContainer');
        const isEdit = index >= 0;
        const w = isEdit ? state.hangmanWords[index] : { word: '', level: 'Fácil', difficultyScore: 1, definition: '' };
        container.innerHTML = `
      <div style="background:var(--bg-option);border-radius:12px;padding:20px;margin-bottom:16px;border:1px solid var(--border);">
        <h3 style="margin-bottom:16px;font-size:1.1rem;">${isEdit ? '✏️ Editar' : '➕ Nova'} Palavra</h3>
        <div class="form-group"><label>Palavra</label><input type="text" class="form-control" id="hangFormWord" value="${utils.escapeHtml(w.word)}" maxlength="40" style="text-transform:uppercase;"></div>
        <div class="form-grid-2">
          <div class="form-group">
            <label>Nível</label>
            <select class="form-control" id="hangFormLevel">
              <option value="Fácil" ${w.level === 'Fácil' ? 'selected' : ''}>Fácil</option>
              <option value="Médio" ${w.level === 'Médio' ? 'selected' : ''}>Médio</option>
              <option value="Avançado" ${w.level === 'Avançado' ? 'selected' : ''}>Avançado</option>
            </select>
          </div>
          <div class="form-group"><label>Pontuação Base (1-3)</label><input type="number" class="form-control" id="hangFormScore" value="${w.difficultyScore}" min="1" max="3"></div>
        </div>
        <div class="form-group"><label>Definição Científica (aparece como DICA no jogo)</label><textarea class="form-control" id="hangFormDef" rows="4">${utils.escapeHtml(w.definition || '')}</textarea></div>
        <div class="modal-actions" style="justify-content:flex-start;">
          <button class="btn btn-success btn-sm" id="hangFormSave">💾 Salvar</button>
          <button class="btn btn-ghost btn-sm" id="hangFormCancel">Cancelar</button>
        </div>
      </div>
    `;
        document.getElementById('hangFormCancel').addEventListener('click', () => container.innerHTML = '');
        document.getElementById('hangFormSave').addEventListener('click', () => {
            const word = document.getElementById('hangFormWord').value.trim().toUpperCase();
            const level = document.getElementById('hangFormLevel').value;
            const difficultyScore = parseInt(document.getElementById('hangFormScore').value, 10) || 1;
            const definition = document.getElementById('hangFormDef').value.trim();
            if (!word) { toast.show('Palavra vazia!', 'error'); return; }
            const data = { word, level, difficultyScore, definition };
            if (isEdit) {
                data.id = state.hangmanWords[index].id || utils.uid('h');
                state.hangmanWords[index] = data;
            } else {
                data.id = utils.uid('h');
                state.hangmanWords.push(data);
            }
            storage.saveHangmanWords(state.hangmanWords);
            this.setTab('hangman');
            toast.show('Salvo!', 'success');
        });
    },

    renderDiagramsAdmin() {
        const items = state.diagrams.map((d, i) => `
      <div class="list-item">
        <div class="item-index">${d.icon || '📐'}</div>
        <div class="item-content">
          <div class="item-meta"><span class="tag tag-level">${d.category}</span></div>
          <div class="item-title">${utils.escapeHtml(d.title)}</div>
        </div>
        <div class="item-actions">
          <button class="mini-btn" data-diag-action="edit" data-index="${i}">✏️</button>
          <button class="mini-btn delete" data-diag-action="delete" data-index="${i}">🗑️</button>
        </div>
      </div>
    `).join('');
        return `
      <div class="admin-panel active">
        <div class="admin-notice"><strong>📐 Diagramas:</strong> Cards do painel ☰.</div>
        <div class="admin-actions">
          <button class="btn btn-primary btn-sm" id="diagAddBtn">➕ Novo Diagrama</button>
          <button class="btn btn-danger btn-sm" id="diagResetBtn">↺ Restaurar Padrão</button>
        </div>
        <div id="diagFormContainer"></div>
        <div class="items-list">${items || '<div class="empty-state">Nenhum diagrama.</div>'}</div>
      </div>
    `;
    },

    bindDiagramsAdmin() {
        const content = document.getElementById('adminGlobalContent');
        content.querySelectorAll('[data-diag-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.diagAction;
                const index = parseInt(btn.dataset.index, 10);
                if (action === 'edit') this.openDiagramForm(index);
                if (action === 'delete') this.confirmDeleteItem('diagram', index);
            });
        });
        const addBtn = document.getElementById('diagAddBtn');
        if (addBtn) addBtn.addEventListener('click', () => this.openDiagramForm(-1));
        const resetBtn = document.getElementById('diagResetBtn');
        if (resetBtn) resetBtn.addEventListener('click', () => {
            state.diagrams = JSON.parse(JSON.stringify(DEFAULT_DIAGRAMS));
            storage.saveDiagrams(state.diagrams);
            this.setTab('diagrams');
            panel.renderDiagrams();
            toast.show('Restaurado!', 'success');
        });
    },

    openDiagramForm(index = -1) {
        const container = document.getElementById('diagFormContainer');
        const isEdit = index >= 0;
        const d = isEdit ? state.diagrams[index] : { category: 'referencia', icon: '📐', title: '', description: '', svg: '', formula: '', tip: '' };
        container.innerHTML = `
      <div style="background:var(--bg-option);border-radius:12px;padding:20px;margin-bottom:16px;border:1px solid var(--border);">
        <h3 style="margin-bottom:16px;font-size:1.1rem;">${isEdit ? '✏️ Editar' : '➕ Novo'} Diagrama</h3>
        <div class="form-group"><label>Título</label><input type="text" class="form-control" id="diagFormTitle" value="${utils.escapeHtml(d.title)}"></div>
        <div class="form-grid-3">
          <div class="form-group">
            <label>Categoria</label>
            <select class="form-control" id="diagFormCat">
              <option value="tabela" ${d.category === 'tabela' ? 'selected' : ''}>Tabela Periódica</option>
              <option value="ligacoes" ${d.category === 'ligacoes' ? 'selected' : ''}>Ligações</option>
              <option value="organica" ${d.category === 'organica' ? 'selected' : ''}>Orgânica</option>
              <option value="formulas" ${d.category === 'formulas' ? 'selected' : ''}>Fórmulas</option>
              <option value="solucoes" ${d.category === 'solucoes' ? 'selected' : ''}>Soluções</option>
              <option value="referencia" ${d.category === 'referencia' ? 'selected' : ''}>Referência</option>
            </select>
          </div>
          <div class="form-group"><label>Ícone</label><input type="text" class="form-control" id="diagFormIcon" value="${utils.escapeHtml(d.icon || '📐')}" maxlength="4"></div>
          <div class="form-group"><label>Fórmula</label><input type="text" class="form-control" id="diagFormFormula" value="${utils.escapeHtml(d.formula || '')}"></div>
        </div>
        <div class="form-group"><label>Descrição</label><textarea class="form-control" id="diagFormDesc" rows="2">${utils.escapeHtml(d.description || '')}</textarea></div>
        <div class="form-group"><label>SVG (código)</label><textarea class="form-control" id="diagFormSvg" rows="6" placeholder="<svg>...</svg>">${utils.escapeHtml(d.svg || '')}</textarea></div>
        <div class="form-group"><label>Dica</label><input type="text" class="form-control" id="diagFormTip" value="${utils.escapeHtml(d.tip || '')}"></div>
        <div class="modal-actions" style="justify-content:flex-start;">
          <button class="btn btn-success btn-sm" id="diagFormSave">💾 Salvar</button>
          <button class="btn btn-ghost btn-sm" id="diagFormCancel">Cancelar</button>
        </div>
      </div>
    `;
        document.getElementById('diagFormCancel').addEventListener('click', () => container.innerHTML = '');
        document.getElementById('diagFormSave').addEventListener('click', () => {
            const title = document.getElementById('diagFormTitle').value.trim();
            if (!title) { toast.show('Título obrigatório!', 'error'); return; }
            const data = {
                category: document.getElementById('diagFormCat').value,
                icon: document.getElementById('diagFormIcon').value || '📐',
                title,
                description: document.getElementById('diagFormDesc').value.trim(),
                svg: document.getElementById('diagFormSvg').value.trim(),
                formula: document.getElementById('diagFormFormula').value.trim(),
                tip: document.getElementById('diagFormTip').value.trim()
            };
            if (isEdit) {
                data.id = state.diagrams[index].id || utils.uid('d');
                state.diagrams[index] = data;
            } else {
                data.id = utils.uid('d');
                state.diagrams.push(data);
            }
            storage.saveDiagrams(state.diagrams);
            panel.renderDiagrams();
            this.setTab('diagrams');
            toast.show('Salvo!', 'success');
        });
    },

    renderBackup() {
        const all = storage.loadScores();
        const totalSize = (JSON.stringify({
            q: state.questions, m: state.memoryElements, p: state.matchPairs,
            h: state.hangmanWords, d: state.diagrams
        }).length / 1024).toFixed(1);

        return `
      <div class="admin-panel active">
        <div class="admin-notice"><strong>💾 Backup:</strong> Download do site, export/import e reset.</div>

        <h3 style="font-size:1rem;margin-bottom:12px;color:var(--accent);">📥 SITE ATUALIZADO</h3>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px;">
          Gera um novo <code>index.html</code> com TODAS as suas alterações. Substitua o arquivo antigo para torná-las permanentes.
        </p>
        <div class="admin-actions">
          <button class="btn btn-primary btn-sm" id="downloadSiteBtn">⬇️ Baixar Site Atualizado</button>
        </div>

        <div class="divider"></div>

        <h3 style="font-size:1rem;margin-bottom:12px;color:var(--success);">📤 EXPORTAR / IMPORTAR</h3>
        <div class="admin-actions">
          <button class="btn btn-success btn-sm" id="exportAllBtn">📦 Exportar TUDO (JSON)</button>
          <button class="btn btn-warning btn-sm" id="importAllBtn">📥 Importar Backup</button>
        </div>

        <div class="divider"></div>

        <h3 style="font-size:1rem;margin-bottom:12px;">📊 Informações do Sistema</h3>
        <div style="background:var(--bg-option);padding:16px;border-radius:12px;border:1px solid var(--border);font-size:0.9rem;line-height:1.8;">
          <div>📝 Perguntas: <strong>${state.questions.length}</strong></div>
          <div>🧠 Elementos: <strong>${state.memoryElements.length}</strong></div>
          <div>🔗 Pares: <strong>${state.matchPairs.length}</strong></div>
          <div>🔤 Palavras: <strong>${state.hangmanWords.length}</strong></div>
          <div>📐 Diagramas: <strong>${state.diagrams.length}</strong></div>
          <div>🏆 Registros: <strong>${all.length}</strong></div>
          <div>💾 Tamanho: <strong>${totalSize} KB</strong></div>
        </div>

        <div class="divider"></div>

        <h3 style="font-size:1rem;margin-bottom:12px;color:var(--danger);">⚠️ Zona de Perigo</h3>
        <div class="admin-actions">
          <button class="btn btn-danger btn-sm" id="resetAllBtn">🗑️ Restaurar TUDO Padrão</button>
        </div>
      </div>
    `;
    },

    bindBackup() {
        const downloadBtn = document.getElementById('downloadSiteBtn');
        if (downloadBtn) downloadBtn.addEventListener('click', () => siteExporter.download());

        const exportBtn = document.getElementById('exportAllBtn');
        if (exportBtn) exportBtn.addEventListener('click', () => {
            const data = {
                version: 8,
                exportedAt: new Date().toISOString(),
                questions: state.questions,
                memoryElements: state.memoryElements,
                matchPairs: state.matchPairs,
                hangmanWords: state.hangmanWords,
                diagrams: state.diagrams,
                hubConfig: state.hubConfig,
                visualConfig: state.visualConfig,
                scores: storage.loadScores()
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `quimica-play-backup-${Date.now()}.json`;
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            URL.revokeObjectURL(url);
            toast.show('Backup exportado!', 'success');
        });

        const importBtn = document.getElementById('importAllBtn');
        if (importBtn) importBtn.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.addEventListener('change', e => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = ev => {
                    try {
                        const data = JSON.parse(ev.target.result);
                        modal.open({
                            title: '📥 Importar Backup',
                            content: `<p>Substituir TUDO pelos dados do backup?</p>`,
                            actions: [
                                { label: 'Cancelar', className: 'btn-ghost' },
                                {
                                    label: 'Sim, importar', className: 'btn-primary', onClick: () => {
                                        if (Array.isArray(data.questions)) { state.questions = data.questions; storage.saveQuestions(state.questions); }
                                        if (Array.isArray(data.memoryElements)) { state.memoryElements = data.memoryElements; storage.saveMemoryElements(state.memoryElements); }
                                        if (Array.isArray(data.matchPairs)) { state.matchPairs = data.matchPairs; storage.saveMatchPairs(state.matchPairs); }
                                        if (Array.isArray(data.hangmanWords)) { state.hangmanWords = data.hangmanWords; storage.saveHangmanWords(state.hangmanWords); }
                                        if (Array.isArray(data.diagrams)) { state.diagrams = data.diagrams; storage.saveDiagrams(state.diagrams); }
                                        if (data.hubConfig) { state.hubConfig = data.hubConfig; storage.saveHubConfig(state.hubConfig); }
                                        if (data.visualConfig) { state.visualConfig = data.visualConfig; storage.saveVisualConfig(state.visualConfig); }
                                        if (Array.isArray(data.scores)) storage.saveScores(data.scores);
                                        visuals.applyCurrent();
                                        panel.renderDiagrams();
                                        this.setTab('backup');
                                        toast.show('Backup importado!', 'success');
                                    }
                                }
                            ]
                        });
                    } catch (err) { toast.show('Erro: ' + err.message, 'error', 4000); }
                };
                reader.readAsText(file);
            });
            input.click();
        });

        const resetBtn = document.getElementById('resetAllBtn');
        if (resetBtn) resetBtn.addEventListener('click', () => {
            modal.open({
                title: '⚠️ Restaurar TUDO',
                content: '<p>Apagar TODOS os dados personalizados e restaurar o padrão?</p>',
                actions: [
                    { label: 'Cancelar', className: 'btn-ghost' },
                    {
                        label: 'Sim, restaurar', className: 'btn-danger', onClick: () => {
                            state.questions = JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
                            state.memoryElements = JSON.parse(JSON.stringify(DEFAULT_MEMORY_ELEMENTS));
                            state.matchPairs = JSON.parse(JSON.stringify(DEFAULT_MATCH_PAIRS));
                            state.hangmanWords = JSON.parse(JSON.stringify(DEFAULT_HANGMAN_WORDS));
                            state.diagrams = JSON.parse(JSON.stringify(DEFAULT_DIAGRAMS));
                            state.hubConfig = JSON.parse(JSON.stringify(DEFAULT_HUB_CONFIG));
                            state.visualConfig = JSON.parse(JSON.stringify(DEFAULT_VISUAL_CONFIG));
                            storage.saveQuestions(state.questions);
                            storage.saveMemoryElements(state.memoryElements);
                            storage.saveMatchPairs(state.matchPairs);
                            storage.saveHangmanWords(state.hangmanWords);
                            storage.saveDiagrams(state.diagrams);
                            storage.saveHubConfig(state.hubConfig);
                            storage.saveVisualConfig(state.visualConfig);
                            visuals.applyCurrent();
                            panel.renderDiagrams();
                            hub.renderScreens();
                            utils.showScreen('adminGlobalScreen');
                            toast.show('Tudo restaurado!', 'success');
                        }
                    }
                ]
            });
        });
    },

    renderPassword() {
        return `
      <div class="admin-panel active">
        <div class="admin-notice"><strong>🔐 Senha do Admin:</strong> Altere a senha do painel global.</div>
        <div class="form-group"><label>Senha Atual</label><input type="password" class="form-control" id="passCurrent" placeholder="Senha atual"></div>
        <div class="form-group"><label>Nova Senha</label><input type="password" class="form-control" id="passNew" placeholder="Nova senha"></div>
        <div class="form-group"><label>Confirmar Nova Senha</label><input type="password" class="form-control" id="passConfirm" placeholder="Repita a nova senha"></div>
        <div class="admin-actions"><button class="btn btn-primary btn-sm" id="passSaveBtn">🔒 Alterar Senha</button></div>
      </div>
    `;
    },

    bindPassword() {
        const btn = document.getElementById('passSaveBtn');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const current = document.getElementById('passCurrent').value;
            const newPass = document.getElementById('passNew').value;
            const confirm = document.getElementById('passConfirm').value;
            if (current !== state.adminPassword) { toast.show('Senha atual incorreta!', 'error'); return; }
            if (newPass.length < 4) { toast.show('Nova senha muito curta!', 'error'); return; }
            if (newPass !== confirm) { toast.show('Senhas não coincidem!', 'error'); return; }
            state.adminPassword = newPass;
            storage.saveAdminPassword(newPass);
            toast.show('✅ Senha alterada!', 'success');
            document.getElementById('passCurrent').value = '';
            document.getElementById('passNew').value = '';
            document.getElementById('passConfirm').value = '';
        });
    },

    exportJSON(name, data) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quimica-${name}-${Date.now()}.json`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.show('Exportado!', 'success');
    },

    importJSON(type) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', e => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = ev => {
                try {
                    const data = JSON.parse(ev.target.result);
                    if (!Array.isArray(data)) throw new Error('Formato inválido');
                    modal.open({
                        title: '📥 Importar',
                        content: `<p><strong>${data.length}</strong> itens. Como importar?</p>`,
                        actions: [
                            { label: 'Cancelar', className: 'btn-ghost' },
                            {
                                label: 'Substituir', className: 'btn-danger', onClick: () => {
                                    if (type === 'questions') { state.questions = data; storage.saveQuestions(data); }
                                    if (type === 'hangmanWords') { state.hangmanWords = data; storage.saveHangmanWords(data); }
                                    this.setTab(type === 'questions' ? 'quiz' : 'hangman');
                                    toast.show('Importado!', 'success');
                                }
                            },
                            {
                                label: 'Adicionar', className: 'btn-success', onClick: () => {
                                    if (type === 'questions') { state.questions = state.questions.concat(data); storage.saveQuestions(state.questions); }
                                    if (type === 'hangmanWords') { state.hangmanWords = state.hangmanWords.concat(data); storage.saveHangmanWords(state.hangmanWords); }
                                    this.setTab(type === 'questions' ? 'quiz' : 'hangman');
                                    toast.show('Adicionado!', 'success');
                                }
                            }
                        ]
                    });
                } catch (err) { toast.show('Erro: ' + err.message, 'error', 4000); }
            };
            reader.readAsText(file);
        });
        input.click();
    },

    confirmDeleteItem(type, index) {
        const labels = {
            question: 'pergunta', memoryElement: 'elemento',
            matchPair: 'par', hangmanWord: 'palavra', diagram: 'diagrama'
        };
        modal.open({
            title: '🗑️ Excluir',
            content: `<p>Excluir este ${labels[type]}?</p>`,
            actions: [
                { label: 'Cancelar', className: 'btn-ghost' },
                {
                    label: 'Sim, excluir', className: 'btn-danger', onClick: () => {
                        if (type === 'question') { state.questions.splice(index, 1); storage.saveQuestions(state.questions); this.setTab('quiz'); }
                        if (type === 'memoryElement') { state.memoryElements.splice(index, 1); storage.saveMemoryElements(state.memoryElements); this.setTab('memory'); }
                        if (type === 'matchPair') { state.matchPairs.splice(index, 1); storage.saveMatchPairs(state.matchPairs); this.setTab('match'); }
                        if (type === 'hangmanWord') { state.hangmanWords.splice(index, 1); storage.saveHangmanWords(state.hangmanWords); this.setTab('hangman'); }
                        if (type === 'diagram') { state.diagrams.splice(index, 1); storage.saveDiagrams(state.diagrams); panel.renderDiagrams(); this.setTab('diagrams'); }
                        toast.show('Excluído!', 'success');
                    }
                }
            ]
        });
    }
};

/* =========================================================
   ADMIN LOCAL
   ========================================================= */
const adminLocal = {
    currentGame: null,

    open(game) {
        this.currentGame = game;
        const meta = GAME_META[game] || { label: game };
        const titleEl = document.getElementById('adminLocalTitle');
        const nameEl = document.getElementById('adminLocalGameName');
        if (titleEl) titleEl.innerHTML = `⚙️ Editando: ${meta.label} <span class="admin-badge local">LOCAL</span>`;
        if (nameEl) nameEl.textContent = meta.label;
        this.render(game);
        utils.showScreen('adminLocalScreen');
    },

    close() {
        const screens = { quiz: 'quizScreen', memory: 'memoryScreen', match: 'matchScreen', hangman: 'hangmanScreen' };
        utils.showScreen(screens[this.currentGame] || 'gamesScreen');
    },

    render(game) {
        const content = document.getElementById('adminLocalContent');
        if (!content) return;

        switch (game) {
            case 'quiz': content.innerHTML = this.renderQuiz(); this.bindQuiz(); break;
            case 'memory': content.innerHTML = this.renderMemory(); this.bindMemory(); break;
            case 'match': content.innerHTML = this.renderMatch(); this.bindMatch(); break;
            case 'hangman': content.innerHTML = this.renderHangman(); this.bindHangman(); break;
        }
    },

    renderQuiz() {
        const items = state.questions.map((q, i) => `
      <div class="list-item">
        <div class="item-index">${i + 1}</div>
        <div class="item-content">
          <div class="item-title">${utils.escapeHtml(q.question)}</div>
          <div class="item-desc">✔ ${utils.escapeHtml(q.options[q.correct])}</div>
        </div>
        <div class="item-actions">
          <button class="mini-btn" data-local-action="edit" data-index="${i}">✏️</button>
          <button class="mini-btn delete" data-local-action="delete" data-index="${i}">🗑️</button>
        </div>
      </div>
    `).join('');
        return `
      <div class="admin-actions"><button class="btn btn-primary btn-sm" id="localAddBtn">➕ Nova Pergunta</button></div>
      <div id="localFormContainer"></div>
      <div class="items-list">${items || '<div class="empty-state">Nenhuma pergunta.</div>'}</div>
    `;
    },

    bindQuiz() {
        const content = document.getElementById('adminLocalContent');
        content.querySelectorAll('[data-local-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.localAction;
                const index = parseInt(btn.dataset.index, 10);
                if (action === 'edit') adminGlobal.openQuizForm(index);
                if (action === 'delete') adminGlobal.confirmDeleteItem('question', index);
            });
        });
        const addBtn = document.getElementById('localAddBtn');
        if (addBtn) addBtn.addEventListener('click', () => adminGlobal.openQuizForm(-1));
    },

    renderMemory() {
        const items = state.memoryElements.map((m, i) => `
      <div class="list-item">
        <div class="item-index">${m.symbol}</div>
        <div class="item-content"><div class="item-title">${utils.escapeHtml(m.name)} (Z = ${m.atomic})</div></div>
        <div class="item-actions">
          <button class="mini-btn" data-local-action="edit" data-index="${i}">✏️</button>
          <button class="mini-btn delete" data-local-action="delete" data-index="${i}">🗑️</button>
        </div>
      </div>
    `).join('');
        return `
      <div class="admin-actions"><button class="btn btn-primary btn-sm" id="localAddBtn">➕ Novo Elemento</button></div>
      <div id="localFormContainer"></div>
      <div class="items-list">${items}</div>
    `;
    },

    bindMemory() {
        const content = document.getElementById('adminLocalContent');
        content.querySelectorAll('[data-local-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.localAction;
                const index = parseInt(btn.dataset.index, 10);
                if (action === 'edit') adminGlobal.openMemoryForm(index);
                if (action === 'delete') adminGlobal.confirmDeleteItem('memoryElement', index);
            });
        });
        const addBtn = document.getElementById('localAddBtn');
        if (addBtn) addBtn.addEventListener('click', () => adminGlobal.openMemoryForm(-1));
    },

    renderMatch() {
        const items = state.matchPairs.map((p, i) => `
      <div class="list-item">
        <div class="item-index">${i + 1}</div>
        <div class="item-content"><div class="item-title">${utils.escapeHtml(p.left)} ↔ ${utils.escapeHtml(p.right)}</div></div>
        <div class="item-actions">
          <button class="mini-btn" data-local-action="edit" data-index="${i}">✏️</button>
          <button class="mini-btn delete" data-local-action="delete" data-index="${i}">🗑️</button>
        </div>
      </div>
    `).join('');
        return `
      <div class="admin-actions"><button class="btn btn-primary btn-sm" id="localAddBtn">➕ Novo Par</button></div>
      <div id="localFormContainer"></div>
      <div class="items-list">${items}</div>
    `;
    },

    bindMatch() {
        const content = document.getElementById('adminLocalContent');
        content.querySelectorAll('[data-local-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.localAction;
                const index = parseInt(btn.dataset.index, 10);
                if (action === 'edit') adminGlobal.openMatchForm(index);
                if (action === 'delete') adminGlobal.confirmDeleteItem('matchPair', index);
            });
        });
        const addBtn = document.getElementById('localAddBtn');
        if (addBtn) addBtn.addEventListener('click', () => adminGlobal.openMatchForm(-1));
    },

    renderHangman() {
        const items = state.hangmanWords.map((w, i) => `
      <div class="list-item">
        <div class="item-index">${i + 1}</div>
        <div class="item-content">
          <div class="item-meta"><span class="tag tag-level">${w.level}</span></div>
          <div class="item-title">${utils.escapeHtml(w.word)}</div>
        </div>
        <div class="item-actions">
          <button class="mini-btn" data-local-action="edit" data-index="${i}">✏️</button>
          <button class="mini-btn delete" data-local-action="delete" data-index="${i}">🗑️</button>
        </div>
      </div>
    `).join('');
        return `
      <div class="admin-actions"><button class="btn btn-primary btn-sm" id="localAddBtn">➕ Nova Palavra</button></div>
      <div id="localFormContainer"></div>
      <div class="items-list">${items}</div>
    `;
    },

    bindHangman() {
        const content = document.getElementById('adminLocalContent');
        content.querySelectorAll('[data-local-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.localAction;
                const index = parseInt(btn.dataset.index, 10);
                if (action === 'edit') adminGlobal.openHangmanForm(index);
                if (action === 'delete') adminGlobal.confirmDeleteItem('hangmanWord', index);
            });
        });
        const addBtn = document.getElementById('localAddBtn');
        if (addBtn) addBtn.addEventListener('click', () => adminGlobal.openHangmanForm(-1));
    }
};

window.adminGlobal = adminGlobal;
window.adminLocal = adminLocal;
window.siteExporter = siteExporter;

console.log('%c⚙️ BLOCO 2 carregado (admin + exporter)', 'color: #ffb400; font-size: 14px; font-weight: bold;');


/* =========================================================
   BLOCO 3: Inicialização
   ========================================================= */

function init() {
    console.log('%c🧪 Química Play v8.0 - Inicializando...', 'color: #00e5ff; font-size: 14px; font-weight: bold;');

    const embedded = siteExporter.loadEmbedded();

    if (embedded) {
        console.log('%c📦 Dados embedded detectados', 'color: #00ff88;');
        state.questions = storage.loadQuestions();
        state.memoryElements = storage.loadMemoryElements();
        state.matchPairs = storage.loadMatchPairs();
        state.hangmanWords = storage.loadHangmanWords();
        state.diagrams = storage.loadDiagrams();
        state.hubConfig = storage.loadHubConfig();
        state.visualConfig = storage.loadVisualConfig();
        state.adminPassword = storage.loadAdminPassword();
    } else {
        state.questions = storage.loadQuestions();
        state.memoryElements = storage.loadMemoryElements();
        state.matchPairs = storage.loadMatchPairs();
        state.hangmanWords = storage.loadHangmanWords();
        state.diagrams = storage.loadDiagrams();
        state.hubConfig = storage.loadHubConfig();
        state.visualConfig = storage.loadVisualConfig();
        state.adminPassword = storage.loadAdminPassword();
    }

    // Garante IDs
    state.questions = state.questions.map(q => ({ ...q, id: q.id || utils.uid('q') }));
    state.memoryElements = state.memoryElements.map(m => ({ ...m, id: m.id || utils.uid('m') }));
    state.matchPairs = state.matchPairs.map(p => ({ ...p, id: p.id || utils.uid('p') }));
    state.hangmanWords = state.hangmanWords.map(h => ({ ...h, id: h.id || utils.uid('h') }));
    state.diagrams = state.diagrams.map(d => ({ ...d, id: d.id || utils.uid('d') }));

    // Aplica tema e config visual
    theme.init();
    visuals.applyCurrent();

    // Inicializa player
    player.init();

    // Renderiza UI
    hub.renderScreens();
    panel.renderDiagrams();

    // Reaplica visual após render
    setTimeout(() => visuals.applyCurrent(), 100);

    console.log(`%c📚 ${state.questions.length} perguntas · ${state.hangmanWords.length} palavras · ${state.diagrams.length} diagramas`, 'color: #00ff88;');
    console.log('%c✅ Pronto! Senha do admin: admin123', 'color: #ffb400;');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}