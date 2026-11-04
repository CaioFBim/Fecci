const configResilienciaHumano = 1, configMultiplicadorCritico = 2; 

const characterClasses = {
    'clérigo': { hp: 50, red: 'Integral Divina: 2× dano vs Espíritos', green: 'Teorema da Proteção: +3 escudo aliados', blue: 'Equação da Bênção: Cura 2 PV aliados, 2 dano em todos inimigos' },
    'bárbaro': { hp: 50, red: 'Força Bruta: 2× dano vs Guardiões de Pedra', green: 'Resistência Ancestral: recebe 2 escudo', blue: 'Fúria Matemática: causa 2 dano e ignora 1 armadura' },
    'druida': { hp: 50, red: 'Integral da Vida: 2× dano vs Espíritos', green: 'Progressão Vital: cura 4 PV dos aliados', blue: 'Vetor da Natureza: causa 2 dano e ignora 1 armadura' },
    'mago': { hp: 50, red: 'Explosão Algébrica: 2× dano vs Humanos', green: 'Axioma da Resistência: recebe metade do dano na rodada', blue: 'Portal Dimensional: teletransporta e causa 2 dano' },
    'arqueiro': { hp: 50, red: 'Flecha Vetorial: 2× dano vs Guardiões de Pedra', green: 'Manto Assintótico: imune nesta rodada', blue: 'Olho de Águia Geométrico: 2× dano independentemente da raça' },
    'paladino': { hp: 50, red: 'Julgamento Divino: 2× dano vs Espíritos', green: 'Escudo da Razão: reduz 2 de dano recebido nesta rodada', blue: 'Cálculo da Vitória: cura 2 PV e causa 1 dano em todos inimigos' }
};

const allMonsters = { 
    'guardião de pedra': { lvl: 2, hp: 3, dmg: 1, coins: 2, abName: 'Reflexo Rochoso', abDesc: 'A cada 2 rodadas, reduz em 1 o dano recebido.', cd: 2 },
    'humano': { lvl: 2, hp: 1, dmg: 3, coins: 2, abName: 'Resiliência', abDesc: 'Quanto menos vida tem, mais dano dá.', cd: 0 },
    'ladrões': { lvl: 2, hp: 2, dmg: 1, coins: 2, abName: 'Furtividade', abDesc: 'A cada 2 rodadas, pode roubar 1 moeda.', cd: 2 },
    'espírito da geometria': { lvl: 1, hp: 3, dmg: 1, coins: 1, abName: 'Equilíbrio Geométrico', abDesc: 'A cada 2 rodadas, +2 dano no próximo ataque.', cd: 2 },
    'golem da floresta': { lvl: 1, hp: 3, dmg: 1, coins: 1, abName: 'Habilidade especial', abDesc: 'A cada 2 rodadas, reduz em 1 o dano recebido.', cd: 2 },
    'espírito da floresta': { lvl: 2, hp: 3, dmg: 2, coins: 2, abName: 'Habilidade especial', abDesc: 'A cada 2 rodadas, regenera 1 de vida.', cd: 2 },
    'espírito da equação': { lvl: 4, hp: 1, dmg: 4, coins: 4, abName: 'Cálculo Implacável', abDesc: 'A cada 2 rodadas, +3 de dano no próximo ataque.', cd: 2 },
    'humano da estatística': { lvl: 2, hp: 3, dmg: 2, coins: 2, abName: 'Média Instável', abDesc: 'A cada 2 rodadas, +2 de dano no próximo ataque.', cd: 2 },
    'guardião da proporção': { lvl: 3, hp: 4, dmg: 1, coins: 3, abName: 'Escudo da Proporção', abDesc: 'Início do jogo: ganha 3 de escudo.', cd: 0 },
    'espírito da probabilidade': { lvl: 3, hp: 2, dmg: 3, coins: 3, abName: 'Lei da Probabilidade', abDesc: 'A cada 2 rodadas, 50% de chance de receber dano crítico.', cd: 2 },
    'guardião da fração': { lvl: 4, hp: 4, dmg: 1, coins: 4, abName: 'Divisão Protetora', abDesc: 'A cada 3 rodadas, reduz em 50% o dano recebido.', cd: 3 },
    'mago da geometria': { lvl: 3, hp: 2, dmg: 2, coins: 3, abName: 'Disciplina Geométrica', abDesc: 'Ganha 1 de escudo para cada 2 aliados.', cd: 0 },
    'humano da subtração': { lvl: 4, hp: 4, dmg: 2, coins: 4, abName: 'Divisão de Energia', abDesc: 'Divide pela metade o dano recebido.', cd: 1 },
    'espírito da soma': { lvl: 3, hp: 3, dmg: 3, coins: 3, abName: 'Progressão Ardente', abDesc: 'Início da rodada, aumenta 1 de dano (máx +2).', cd: 0 },
    'guardião do equilíbrio': { lvl: 4, hp: 5, dmg: 3, coins: 4, abName: 'Estabilidade Elementar', abDesc: 'Início do jogo: ganha 3 de escudo.', cd: 0 },
    'guardião da equação': { lvl: 5, hp: 6, dmg: 1, coins: 5, abName: 'Escudo da Equação', abDesc: 'Início de rodada: recebe 3 de escudo.', cd: 0 }
};

const macetesDB = [
    { text: "Multiplicação por 11: Separe os dígitos e some no meio! (Ex: 35 * 11 -> 3 e 5, 3+5=8 -> 385)", questions: [{ q: "43 * 11", a: 473, dmg: 2.0 }, { q: "62 * 11", a: 682, dmg: 2.0 }] },
    { text: "Quadrado terminado em 5: Multiplique o 1º dígito pelo próximo e adicione 25! (Ex: 35² -> 3*4=12, termina 25 -> 1225)", questions: [{ q: "85²", a: 7225, dmg: 2.0 }, { q: "45²", a: 2025, dmg: 2.0 }] },
    { text: "Divisão por 5: Multiplique por 2 e corte o zero! (Ex: 140 / 5 -> 280 / 10 = 28)", questions: [{ q: "320 / 5", a: 64, dmg: 2.0 }, { q: "610 / 5", a: 122, dmg: 2.0 }] },
    { text: "Multiplicação por 9: Multiplique por 10 e subtraia o número original! (Ex: 23 * 9 -> 230 - 23 = 207)", questions: [{ q: "45 * 9", a: 405, dmg: 2.0 }, { q: "72 * 9", a: 648, dmg: 2.0 }] },
    { text: "Divisão por 50: Multiplique por 2 e divida por 100! (Ex: 450 / 50 -> 900 / 100 = 9)", questions: [{ q: "850 / 50", a: 17, dmg: 2.0 }, { q: "1300 / 50", a: 26, dmg: 2.0 }] }
];

const shopInventory = [ 
    { id: 'armadura_circulo', name: 'Armadura do Círculo', img: 'Armadura do Circulo.jpeg', price: 3, type: 'shield', val: 2 },
    { id: 'colar_raiz', name: 'Colar da Raiz', img: 'Colar da Raiz.jpeg', price: 2, type: 'regen', val: 2, duration: 3 },
    { id: 'anel_proporcao', name: 'Anel da Proporção', img: 'Anel da Proporcao.jpeg', price: 2, type: 'dmg', val: 1 },
    { id: 'peitoral_poligonos', name: 'Peitoral dos Polígonos', img: 'Peitoral dos Poligonos.jpeg', price: 3, type: 'shield', val: 2 },
    { id: 'lanca_teorema', name: 'Lança do Teorema', img: 'Lanca do Teorema.jpeg', price: 2, type: 'dmg', val: 1 },
    { id: 'pocao_quadrado', name: 'Poção do Quadrado', img: 'Pocao do Quadrado.jpeg', price: 2, type: 'dmg', val: 1, duration: 2 },
    { id: 'pocao_raiz', name: 'Poção da Raiz Quadrada', img: 'Pocao da Raiz Quadrada.jpeg', price: 3, type: 'heal', val: 4 },
    { id: 'manto_fracao', name: 'Manto da Fração', img: 'Manto da Fracao.jpeg', price: 5, type: 'halfDmg', duration: 1 },
    { id: 'couraca_divisao', name: 'Couraça da Divisão', img: 'Couraca da Divisao.jpeg', price: 5, type: 'shield', val: 2 },
    { id: 'anel_multiplicacao', name: 'Anel da Multiplicação', img: 'Anel da Multiplicacao.jpeg', price: 4, type: 'mult', val: 2 },
    { id: 'lamina_razao', name: 'Lâmina da Razão', img: 'Lamina da Razao.jpeg', price: 5, type: 'dmg', val: 2, duration: 3 },
    { id: 'pocao_soma', name: 'Poção da Soma', img: 'Pocao da Soma.jpeg', price: 3, type: 'heal', val: 3 },
    { id: 'lamina_progressao', name: 'Lâmina da Progressão', img: 'Lamina da Progressao.jpeg', price: 4, type: 'dmg', val: 1, duration: 3 },
    { id: 'pocao_potencia', name: 'Poção da Potência', img: 'Pocao da Potencia.jpeg', price: 5, type: 'mult', val: 2 },
    { id: 'pingente_geometria', name: 'Pingente da Geometria', img: 'Pingente da Geometria.jpeg', price: 4, type: 'shield', val: 1 },
    { id: 'dado_branco', name: 'Dado Branco (Especial)', img: '', price: 5, type: 'special' }
];

let mathQuestions = { dificil: [] }; 
let maxPlayers = 0, currentPlayerIndex = 1, players = [], currentRound = 1;
let activeMonster = null, currentMathQ = null, dicePool = 3;
let monstersKilled = 0, shopVisits = 0, globalWhiteDiceStock = 5;
let currentAttackBuffs = { mult: 1, ignoreArmor: 0, immune: false, receiveHalfDmg: false, reduceReceiveDmg: 0 };
let activeMacetes = [], maceteIndex = 0, totalGrimorioViews = 0;
let summonedMonsters = [];
let isFinalPhase = false;

function tryLockLandscape() {
    let de = document.documentElement;
    if (de.requestFullscreen) { de.requestFullscreen().catch(()=>{}); }
    if (screen.orientation && screen.orientation.lock) { screen.orientation.lock('landscape').catch(()=>{}); }
}

function setPlayers(num) { 
    tryLockLandscape(); 
    maxPlayers = num; 
    document.getElementById('screen-players').classList.add('hidden'); 
    document.getElementById('screen-selection').classList.remove('hidden'); 
    if(maxPlayers === 1) document.getElementById('btn-skip').disabled = true;

    let shuffled = [...macetesDB].sort(() => 0.5 - Math.random());
    activeMacetes = shuffled.slice(0, 3);
}

function checkCharacter() {
    let input = document.getElementById('class-input').value.trim().toLowerCase().replace('clerico', 'clérigo').replace('barbaro', 'bárbaro');
    if (!characterClasses[input]) return document.getElementById('error-msg').innerText = "Profissão desconhecida!";
    if (players.some(p => p.className === input)) return document.getElementById('error-msg').innerText = "Profissão já escolhida!";
    
    let cData = characterClasses[input];
    players.push({
        className: input, name: input.charAt(0).toUpperCase() + input.slice(1),
        hp: cData.hp, maxHp: cData.hp, shield: 0, coins: 0, inventory: [], buffs: [], skills: cData, hasActed: false 
    });

    if (players.length < maxPlayers) {
        currentPlayerIndex++; document.getElementById('player-turn').innerText = `Jogador ${currentPlayerIndex}, escolha sua profissão!`; document.getElementById('class-input').value = "";
    } else {
        document.getElementById('screen-selection').classList.add('hidden'); document.getElementById('screen-game').classList.remove('hidden'); updatePlayersUI();
    }
}

function updatePlayersUI() {
    const panel = document.getElementById('players-panel'); const select = document.getElementById('active-player-select');
    panel.innerHTML = ""; select.innerHTML = "";
    players.forEach((p, index) => {
        let invHTML = p.inventory.map(item => `<span class="inv-item" onclick="useItem(${index}, '${item.id}')">${item.name}</span>`).join('');
        let buffsHTML = p.buffs.map(b => `<span style="color:#f39c12; font-size:0.8em;">[${b.name} (${b.duration}r)]</span>`).join(' ');
        panel.innerHTML += `
            <div class="player-card ${p.hasActed ? 'acted' : ''}">
                <h4>${p.name} ${p.hasActed ? '<span style="color:#7f8c8d;font-size:0.8em;">(Já jogou)</span>' : ''} ${buffsHTML}</h4>
                <div class="player-stats"><span class="hp-text">❤️ ${p.hp}/${p.maxHp}</span> | <span class="shield-text">🛡️ ${p.shield}</span> | <span class="coin-text">💰 ${p.coins}</span></div>
                <ul class="skill-list"><li class="skill-red">Σ: ${p.skills.red}</li><li class="skill-green">∞: ${p.skills.green}</li><li class="skill-blue">▲: ${p.skills.blue}</li></ul>
                ${invHTML ? `<div class="inventory-list"><strong>Inventário:</strong> ${invHTML}</div>` : ''}
            </div>`;
        if(p.hp > 0 && !p.hasActed) select.innerHTML += `<option value="${index}">${p.name}</option>`;
    });
}

function skipTurn() {
    let select = document.getElementById('active-player-select');
    if(!select.value) return;
    players[select.value].hasActed = true;
    resetActionUI(); checkRoundCompletion(); updatePlayersUI();
}

function checkRoundCompletion() {
    let alivePlayers = players.filter(p => p.hp > 0);
    if (alivePlayers.filter(p => p.hasActed).length === alivePlayers.length && alivePlayers.length > 0) advanceRound();
}

function rollDie(color) {
    let pIndex = document.getElementById('active-player-select').value;
    let attacker = players[pIndex];
    let success = (Math.floor(Math.random() * 6) + 1) <= 2;
    dicePool--; document.getElementById('dice-count-display').innerText = dicePool;

    alert(success ? `✅ SUCESSO! Habilidade ${color.toUpperCase()} ativada!` : `❌ FALHOU. O poder não ativou.`);
    if(success) activateSkill(attacker, color);

    if(dicePool === 0) {
        alert("Os 3 dados da equipe foram usados!\nPUNIÇÃO: Todos perdem 1 de Vida!");
        players.forEach(p => { if(p.hp > 0) p.hp -= 1; });
        dicePool = 3; document.getElementById('dice-count-display').innerText = dicePool; updatePlayersUI();
    }
    document.getElementById('dice-section').classList.add('hidden'); document.getElementById('difficulty-section').classList.remove('hidden');
}

function activateSkill(attacker, color) {
    let c = attacker.className, n = activeMonster.name;
    if(color === 'red') { if(['clérigo','druida','paladino'].includes(c) && n.includes('espírito')) currentAttackBuffs.mult = 2; if(['bárbaro','arqueiro'].includes(c) && n.includes('guardião de pedra')) currentAttackBuffs.mult = 2; if(c === 'mago' && n.includes('humano')) currentAttackBuffs.mult = 2; } 
    else if(color === 'green') { if(c==='clérigo') players.forEach(p=>{if(p.hp>0) p.shield+=3;}); if(c==='bárbaro') attacker.shield+=2; if(c==='druida') players.forEach(p=>{if(p.hp>0) p.hp=Math.min(p.maxHp, p.hp+4);}); if(c==='mago') currentAttackBuffs.receiveHalfDmg=true; if(c==='arqueiro') currentAttackBuffs.immune=true; if(c==='paladino') currentAttackBuffs.reduceReceiveDmg=2; updatePlayersUI(); } 
    else if(color === 'blue') { if(c==='clérigo') { players.forEach(p=>{if(p.hp>0) p.hp=Math.min(p.maxHp, p.hp+2);}); applyDirectDamage(2); } if(['bárbaro','druida'].includes(c)) { applyDirectDamage(2); currentAttackBuffs.ignoreArmor=1; } if(c==='mago') applyDirectDamage(2); if(c==='arqueiro') currentAttackBuffs.mult=2; if(c==='paladino') { attacker.hp=Math.min(attacker.maxHp, attacker.hp+2); applyDirectDamage(1); } updatePlayersUI(); }
}

function applyDirectDamage(amt) { activeMonster.hp -= amt; updateMonsterUI(); if(activeMonster.hp <= 0) setTimeout(resolveMonsterDeath, 500); }

function advanceRound() {
    currentRound++; document.getElementById('round-display').innerText = currentRound; players.forEach(p => { p.hasActed = false; }); dicePool = 3; document.getElementById('dice-count-display').innerText = dicePool;
    players.forEach(p => { p.buffs = p.buffs.filter(b => { if(b.type === 'regen') p.hp = Math.min(p.maxHp, p.hp + b.val); b.duration--; return b.duration > 0; }); });
    if (activeMonster && !isFinalPhase) {
        if (activeMonster.cd > 0) { activeMonster.currentCd++; if (activeMonster.currentCd >= activeMonster.cd) { triggerMonsterAbility(); activeMonster.currentCd = 0; } }
        if (activeMonster.name === 'espírito da soma' && activeMonster.bonusDmg < 2) { activeMonster.bonusDmg++; activeMonster.dmg++; }
        if (activeMonster.name === 'guardião da equação') activeMonster.shield += 3;
        updateMonsterUI();
    }
}

function triggerMonsterAbility() {
    let n = activeMonster.name, st = document.getElementById('monster-status');
    if (['guardião de pedra','golem da floresta'].includes(n)) { activeMonster.buffReduceNext = 1; st.innerText = "-1 dano recebido"; } else if (n === 'ladrões') { let r = [...players].sort((a,b)=>b.coins-a.coins)[0]; if(r.coins>0) r.coins--; updatePlayersUI(); } else if (['espírito da geometria','humano da estatística'].includes(n)) { activeMonster.buffNextAtkDmg = 2; st.innerText = "+2 dano"; } else if (n === 'espírito da floresta' && activeMonster.hp < activeMonster.maxHp) activeMonster.hp++; else if (n === 'espírito da equação') { activeMonster.buffNextAtkDmg = 3; st.innerText = "+3 dano"; } else if (n === 'espírito da probabilidade') { activeMonster.buffCritChance = true; st.innerText = "50% de sofrer Crítico"; } else if (['guardião da fração','humano da subtração'].includes(n)) { activeMonster.buffReducePct = 0.5; st.innerText = "Dano recebido / 2"; }
}

function summonMonster() {
    let input = document.getElementById('monster-input').value.trim().toLowerCase();
    if (!allMonsters[input]) return document.getElementById('game-msg').innerText = "Monstro não encontrado!";
    if (summonedMonsters.includes(input)) return document.getElementById('game-msg').innerText = "Este monstro já foi derrotado e não pode voltar!";
    
    document.getElementById('game-msg').innerText = "";
    summonedMonsters.push(input);
    activeMonster = JSON.parse(JSON.stringify(allMonsters[input]));
    activeMonster.name = input; activeMonster.maxHp = activeMonster.hp; activeMonster.shield = 0; activeMonster.currentCd = 0; activeMonster.bonusDmg = 0;
    if(['guardião da proporção','guardião do equilíbrio','guardião da equação'].includes(input)) activeMonster.shield = 3;
    if(input === 'mago da geometria') activeMonster.shield = Math.floor((players.filter(p=>p.hp>0).length - 1) / 2);
    document.getElementById('monster-search-area').classList.add('hidden'); document.getElementById('combat-area').classList.remove('hidden'); resetActionUI(); updateMonsterUI();
}

function summonFinalBosses() {
    let available = Object.keys(allMonsters).filter(m => !summonedMonsters.includes(m));
    if(available.length < 3) return document.getElementById('game-msg').innerText = "Não há monstros suficientes para a Batalha Final!";
    
    available.sort((a,b) => allMonsters[b].lvl - allMonsters[a].lvl);
    let top3 = available.slice(0, 3).map(m => allMonsters[m]);
    
    isFinalPhase = true;
    activeMonster = {
        name: 'TRÍADE FINAL: ' + available.slice(0,3).join(', ').toUpperCase(),
        lvl: 'MÁXIMO',
        hp: top3.reduce((s,m) => s + m.hp, 0), maxHp: top3.reduce((s,m) => s + m.hp, 0),
        dmg: top3.reduce((s,m) => s + m.dmg, 0), coins: 20,
        abName: 'Ataque Inevitável',
        abDesc: 'Sofrem dano, mas SEMPRE devolvem dano independentemente de você acertar a conta!',
        shield: 0, currentCd: 0, cd: 0, bonusDmg: 0
    };
    document.getElementById('monster-search-area').classList.add('hidden'); document.getElementById('combat-area').classList.remove('hidden'); resetActionUI(); updateMonsterUI();
}

function updateMonsterUI() {
    if(!activeMonster) return;
    document.getElementById('monster-name-display').innerText = activeMonster.name.toUpperCase();
    document.getElementById('monster-level').innerText = activeMonster.lvl; document.getElementById('monster-coins').innerText = activeMonster.coins;
    document.getElementById('monster-ability-name').innerText = activeMonster.abName; document.getElementById('monster-ability-desc').innerText = activeMonster.abDesc;
    let d = activeMonster.dmg + (activeMonster.buffNextAtkDmg || 0);
    if (activeMonster.name === 'humano') d += (activeMonster.maxHp - activeMonster.hp) * configResilienciaHumano;
    document.getElementById('monster-dmg').innerText = d;
    document.getElementById('monster-hp-text').innerText = Math.max(0, activeMonster.hp.toFixed(1));
    document.getElementById('monster-max-hp-text').innerText = activeMonster.maxHp; document.getElementById('monster-shield').innerText = activeMonster.shield.toFixed(1);
    document.getElementById('monster-hp-fill').style.width = Math.max(0, (activeMonster.hp / activeMonster.maxHp) * 100) + '%';
}

function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generateMathQuestion(dificuldade) {
    let q = "", a = 0, dmg = 0.3;
    let type = getRandomInt(1, 4); 

    if (dificuldade === 'facil') {
        dmg = 0.3;
        if (type === 1 || type === 2) { 
            let n1 = getRandomInt(5, 20) * 10; let n2 = getRandomInt(1, 9) * 10;
            q = `${n1} + ${n2}`; a = n1 + n2;
        } else { 
            let n1 = getRandomInt(3, 9); let n2 = getRandomInt(3, 9);
            q = `${n1} x ${n2}`; a = n1 * n2;
        }
    } else if (dificuldade === 'medio') {
        dmg = 0.7;
        if (type === 1) { 
            let n1 = getRandomInt(12, 85); q = `${n1} x 11`; a = n1 * 11;
        } else if (type === 2) { 
            let n1 = getRandomInt(15, 45); let n2 = (Math.random() > 0.5) ? 9 : 99; q = `${n1} x ${n2}`; a = n1 * n2;
        } else { 
            let percent = getRandomInt(1, 5) * 10; let val = getRandomInt(12, 60) * 10;
            q = `${percent}% de ${val}`; a = (percent / 100) * val;
        }
    } else if (dificuldade === 'dificil') {
        dmg = 2.0;
        if (type === 1) { 
            let dezenas = getRandomInt(1, 11); let base = (dezenas * 10) + 5; q = `${base}²`; a = base * base;
        } else if (type === 2) { 
            let num = getRandomInt(123, 1999); q = `${num} ÷ 5`; a = num / 5;
        } else if (type === 3) {
            let n1 = getRandomInt(2, 9); let n2 = n1 * getRandomInt(3, 9); let n3 = n1 * getRandomInt(2, 5); let n4 = (n2 / n1) * n3;
            q = `${n1}/${n2} = x/${n4}. Valor de x`; a = n3;
        } else {
            let base = getRandomInt(4, 30) * 4; q = `${base} x 25`; a = base * 25;
        }
    }
    a = Math.round(a * 10) / 10;
    return { q, a, dmg };
}

function openQuestion(dificuldade) {
    currentMathQ = generateMathQuestion(dificuldade);
    
    if (dificuldade === 'dificil' && mathQuestions.dificil.length > 0) {
        if (Math.random() < 0.40) currentMathQ = mathQuestions.dificil[Math.floor(Math.random() * mathQuestions.dificil.length)];
    }

    document.getElementById('math-question').innerText = currentMathQ.q + " = ?"; 
    document.getElementById('math-answer').value = ""; document.getElementById('math-feedback').innerText = "";
    document.getElementById('grimorio-in-battle').classList.add('hidden');
    document.getElementById('math-modal').classList.remove('hidden'); document.getElementById('math-answer').focus();
}

function toggleGrimorioView() {
    let gDiv = document.getElementById('grimorio-in-battle');
    if (gDiv.classList.contains('hidden')) {
        let pIndex = document.getElementById('active-player-select').value;
        let attacker = players[pIndex];
        totalGrimorioViews++;
        if (totalGrimorioViews > 2) { attacker.hp -= 1; alert(`O grimório exige um sacrifício de sangue!\n${attacker.name} perdeu 1 de Vida.`); updatePlayersUI(); }
        let list = document.getElementById('grimorio-list'); list.innerHTML = "";
        if (maceteIndex === 0) { list.innerHTML = "<li>Nenhum macete descoberto ainda...</li>"; } 
        else { activeMacetes.slice(0, maceteIndex).forEach(m => { list.innerHTML += `<li>${m.text}</li>`; }); }
        gDiv.classList.remove('hidden');
    } else { gDiv.classList.add('hidden'); }
}

function checkMathAnswer() {
    let answer = parseFloat(document.getElementById('math-answer').value.trim().replace(',', '.')), feedback = document.getElementById('math-feedback');
    if (isNaN(answer)) { feedback.style.color = "#e74c3c"; feedback.innerText = "Digite um número!"; return; }
    
    let pIndex = document.getElementById('active-player-select').value; let attacker = players[pIndex];
    let extraDmg = 0;
    attacker.buffs = attacker.buffs.filter(b => { if(b.type === 'dmg') extraDmg += b.val; if(b.type === 'mult') currentAttackBuffs.mult *= b.val; if(b.type === 'halfDmg') currentAttackBuffs.receiveHalfDmg = true; return b.duration > 1 ? (b.duration--, true) : false; });

    if (answer === currentMathQ.a) {
        let dmg = (currentMathQ.dmg + extraDmg) * currentAttackBuffs.mult, critMsg = "";
        if (activeMonster.buffCritChance && Math.random() < 0.5) { dmg *= configMultiplicadorCritico; critMsg = " (CRÍTICO!)"; }
        activeMonster.buffCritChance = false;
        if (activeMonster.buffReducePct) { dmg *= activeMonster.buffReducePct; activeMonster.buffReducePct = 0; }
        if (activeMonster.buffReduceNext) { dmg = Math.max(0, dmg - activeMonster.buffReduceNext); activeMonster.buffReduceNext = 0; }
        if (activeMonster.shield > 0) { let effShield = Math.max(0, activeMonster.shield - currentAttackBuffs.ignoreArmor); if (dmg <= effShield) { activeMonster.shield -= dmg; dmg = 0; } else { dmg -= effShield; activeMonster.shield = 0; } }
        
        activeMonster.hp -= dmg; 
        feedback.style.color = "#2ecc71"; feedback.innerText = `Correto! Monstro sofreu ${dmg.toFixed(2)} de dano!${critMsg}`; 

        if (isFinalPhase) {
            let incDmg = activeMonster.dmg;
            if (attacker.shield > 0) { if (incDmg <= attacker.shield) { attacker.shield -= incDmg; incDmg = 0; } else { incDmg -= attacker.shield; attacker.shield = 0; } }
            attacker.hp -= incDmg; feedback.innerText += `\nMas a Tríade atacou de volta! Você perdeu ${incDmg} de Vida.`;
        }
        document.getElementById('monster-status').innerText = "";
        
        setTimeout(() => { document.getElementById('math-modal').classList.add('hidden'); updateMonsterUI(); if (activeMonster.hp <= 0) resolveMonsterDeath(); attacker.hasActed = true; resetActionUI(); checkRoundCompletion(); updatePlayersUI(); }, 2800); 
    } else {
        let incDmg = activeMonster.dmg + (activeMonster.buffNextAtkDmg || 0);
        if (activeMonster.name === 'humano') incDmg += (activeMonster.maxHp - activeMonster.hp) * configResilienciaHumano;
        activeMonster.buffNextAtkDmg = 0; document.getElementById('monster-status').innerText = "";
        if (currentAttackBuffs.immune) incDmg = 0; if (currentAttackBuffs.receiveHalfDmg) incDmg /= 2; if (currentAttackBuffs.reduceReceiveDmg) incDmg = Math.max(0, incDmg - currentAttackBuffs.reduceReceiveDmg);
        if (attacker.shield > 0) { if (incDmg <= attacker.shield) { attacker.shield -= incDmg; incDmg = 0; } else { incDmg -= attacker.shield; attacker.shield = 0; } }
        
        attacker.hp -= incDmg; feedback.style.color = "#e74c3c"; feedback.innerText = `Errado! ${attacker.name} sofreu ${incDmg} de dano!`; 
        setTimeout(() => { document.getElementById('math-modal').classList.add('hidden'); attacker.hasActed = true; resetActionUI(); checkRoundCompletion(); updatePlayersUI(); }, 1800);
    }
}

function resolveMonsterDeath() {
    if(isFinalPhase) { alert(`PARABÉNS! VOCÊS DERROTARAM A TRÍADE FINAL E VENCERAM O JOGO!`); location.reload(); return; }

    alert(`Derrotaram o ${activeMonster.name.toUpperCase()}! Recebem ${activeMonster.coins} moedas.`);
    players.forEach(p => { if (p.hp > 0) p.coins += activeMonster.coins; });
    activeMonster = null; monstersKilled++; document.getElementById('kill-count').innerText = monstersKilled;
    document.getElementById('combat-area').classList.add('hidden'); document.getElementById('monster-search-area').classList.remove('hidden'); document.getElementById('monster-input').value = "";
    players.forEach(p => p.hasActed = false); updatePlayersUI();
    
    if (monstersKilled % 3 === 0 && maceteIndex < 3) {
        let novoMacete = activeMacetes[maceteIndex];
        document.getElementById('macete-text').innerText = novoMacete.text;
        document.getElementById('macete-modal').classList.remove('hidden');
        mathQuestions.dificil = mathQuestions.dificil.concat(novoMacete.questions);
        maceteIndex++;
    }

    if (monstersKilled % 3 === 0 && shopVisits < 3) { shopVisits++; openShop(); }
}

function closeMacete() { document.getElementById('macete-modal').classList.add('hidden'); }
function resetActionUI() { currentAttackBuffs = { mult: 1, ignoreArmor: 0, immune: false, receiveHalfDmg: false, reduceReceiveDmg: 0 }; document.getElementById('difficulty-section').classList.add('hidden'); document.getElementById('dice-section').classList.remove('hidden'); }

function openShop() { document.getElementById('shop-modal').classList.remove('hidden'); let select = document.getElementById('shop-player-select'); select.innerHTML = ""; players.forEach((p, i) => { if(p.hp > 0) select.innerHTML += `<option value="${i}">${p.name}</option>`; }); renderShopItems(); }

function renderShopItems() {
    let pIndex = parseInt(document.getElementById('shop-player-select').value); if (isNaN(pIndex)) return; 
    let player = players[pIndex];
    document.getElementById('shop-player-coins').innerText = player.coins; document.getElementById('shop-whitedice-stock').innerText = globalWhiteDiceStock;
    let container = document.getElementById('shop-items-container'); container.innerHTML = "";
    
    shopInventory.forEach(item => {
        let hasItem = player.inventory.some(i => i.id === item.id); let isWhiteDie = item.id === 'dado_branco';
        if(hasItem && !isWhiteDie) return; if(isWhiteDie && globalWhiteDiceStock <= 0) return; 
        
        let canBuy = player.coins >= item.price;
        let btn = `<button onclick="buyItem('${item.id}')" ${!canBuy ? 'disabled' : ''}>Comprar (${item.price}💰)</button>`;
        container.innerHTML += `<div class="shop-item">
            ${item.img ? `<img src="${item.img}" alt="${item.name}">` : `<div style="width:50px;height:50px;background:#ecf0f1;color:#2c3e50;display:flex;align-items:center;justify-content:center;font-size:2em;border-radius:5px;">🎲</div>`}
            <div style="flex:1;"><strong>${item.name}</strong><br><span style="font-size:0.8em;color:#7f8c8d;">${item.type === 'special' ? 'Efeito Especial 1/6' : 'Uso único'}</span></div>
            ${btn}
        </div>`;
    });
}

function buyItem(itemId) {
    let pIndex = parseInt(document.getElementById('shop-player-select').value); let player = players[pIndex]; let item = shopInventory.find(i => i.id === itemId);
    if (player.coins >= item.price) { player.coins -= item.price; player.inventory.push(item); if (itemId === 'dado_branco') globalWhiteDiceStock--; updatePlayersUI(); renderShopItems(); }
}

function closeShop() { document.getElementById('shop-modal').classList.add('hidden'); }

function useItem(pIndex, itemId) {
    let player = players[pIndex]; let itemIndex = player.inventory.findIndex(i => i.id === itemId); if(itemIndex === -1) return;
    let item = player.inventory.splice(itemIndex, 1)[0]; 
    if (item.type === 'special') {
        if (Math.floor(Math.random() * 6) + 1 === 1) { 
            let classes = Object.values(characterClasses); let randClass = classes[Math.floor(Math.random()*classes.length)]; let colors = ['red','green','blue']; let randColor = colors[Math.floor(Math.random()*colors.length)];
            alert(`✅ DADO BRANCO ATIVOU!\nHabilidade conjurada: ${randClass[randColor]}\n(Aplique os efeitos manualmente)`);
        } else alert(`❌ DADO BRANCO FALHOU!`);
    } else if (item.type === 'heal') {
        player.hp = Math.min(player.maxHp, player.hp + item.val); alert(`${player.name} usou ${item.name} e curou ${item.val} de vida!`);
    } else if (item.type === 'shield' && !item.duration) {
        player.shield += item.val; alert(`${player.name} usou ${item.name} e ganhou ${item.val} de escudo!`);
    } else { player.buffs.push({ name: item.name, type: item.type, val: item.val, duration: item.duration || 1 }); alert(`${player.name} ativou ${item.name}! Efeito ativo.`); }
    updatePlayersUI();
}