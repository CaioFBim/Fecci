Functional Specification & Test Suite for RPG da Matemática

Overview

A web-based Math RPG hosted on GitHub Pages designed for up to 6 players. It uses mental math tricks ("Macetes") to empower players in turn-based combat against various monsters, culminating in a 3-boss Final Battle.

Core Game Mechanics & Rules

1. Player Setup, Modes & Selection

Player Count: 1 to 6 players.

Game Modes & Starting Health Points (HP):

Standard Mode (Modo Padrão): Starting HP per player scales with the total number of players in the match ($10 \times \text{Total Player Count}$).

1 Player: 10 HP

2 Players: 20 HP each

3 Players: 30 HP each

4 Players: 40 HP each

5 Players: 50 HP each

6 Players: 60 HP each

Evaluator Mode (Modo Avaliador): Every player gets a fixed 50 HP regardless of the total player count.

Classes: Cleric (Clérigo), Barbarian (Bárbaro), Druid (Druida), Mage (Mago), Archer (Arqueiro), Paladin (Paladino).

Rules:

Class selection must not allow duplicate classes within the same game session.

If single-player mode is selected, the "Pular Turno" (Skip Turn) button must be disabled.

2. Turn System & Dice Mechanics

Dice Limit: 3 shared dice per team round.

Skill Trigger: Rolling 1-2 on a 6-sided die activates class skills (Red, Green, Blue).

Turn Progression:

Automatically advances to the next player once the current player acts (answers a math question or skips).

Automatically advances the global Round counter when all alive players have acted.

Punishes the team (-1 HP to all players) if all 3 shared dice are consumed in a round.

3. Math Question Generator

Difficulties:

Fácil: 0.3 damage multiplier. Basic operations / mental math warmups.

Médio: 0.7 damage multiplier. Intermediate mental math tricks (e.g., x11, x9, percentages).

Difícil: 2.0 damage multiplier. Advanced mental math tricks (e.g., squares ending in 5, division by 5, proportions).

Behavior:

Questions are pulled from pre-defined lists or generated dynamically from mathematical trick templates.

Floating point answers must be rounded to a maximum of 1 decimal place.

4. Macete (Grimório) System

Discovery: Unlocks 1 new trick card every 3 monsters defeated (up to 5 total tricks).

In-Battle Inspection:

Players can inspect discovered Macetes during question modals via "📖 Ver Macetes".

If inspected more than 2 times total across the session, the active player loses 1 HP per extra inspection.

5. Shop System

Appearances: Triggers once every 3 monsters defeated (up to 3 shop visits per session).

Inventory & Coins:

Monsters award coins upon defeat to all living players.

Items are single-use consumables.

Regular items cannot be purchased twice by the same player.

White Die (Dado Branco) has a shared global stock of 5 units (5 coins each, 1/6 success chance to activate a random class skill).

6. Monster & Boss Progression

Unique Encounter Rule: Each monster can only appear once per game session.

Final Battle ("Tríade Final"):

Combines the 3 highest-level unencountered monsters into a unified boss entity.

Inevitable Damage: Even on correct answers, the boss deals counter-attack damage to the active player.

Autonomous Testing & Fix Instructions for Codex

Objective

Execute full functional and UI test coverage based on this specification. Find and fix logic errors, state desynchronization, UI overflow issues, or broken event handlers without altering the underlying core mechanics.

Action Checklist

HP Calculation & Mode Selection Verification:

Verify if starting HP is calculated as $10 \times \text{Players}$ in Standard Mode.

Verify if Evaluator Mode ("Modo Avaliador") grants 50 HP to all players regardless of count.

State Consistency Tests:

Verify if players state correctly tracks HP, coins, inventory, shield, and turn status (hasActed).

Test coin spending in single-player and multiplayer modes to ensure player selection dropdowns update without desync.

Game Loop Tests:

Simulate a full match flow: Player Setup -> Mode Selection -> Monster Invocation -> Skill Rolling -> Math Answer -> Defeat -> Shop -> Final Boss.

Test edge cases: What happens when HP drops to 0? Are dead players skipped correctly in turn rotation?

Responsive UI Tests:

Verify landscape orientation locking on mobile viewports.

Check if modals (#math-modal, #shop-modal, #macete-modal) scale correctly without clipping text or buttons on small screens.

Bug Fix Protocol:

Refactor script.js and index.html as needed to support Mode Selection and correct HP allocation while resolving any runtime exceptions.