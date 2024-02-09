'use client';

import { useState } from "react";
import SpaceGrid from "./components/spaceGrid";
import Ship from "./components/ship";
import Scores from "./components/scores";
import GameOver from "./components/gameOver";

export default function Home() {
  const [playerX, setPlayerX] = useState(-40);
  const [playerLife, setPlayerLife] = useState(100);
  const [enemyX, setEnemyX] = useState(40);
  const [enemyLife, setEnemyLife] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({ player: 0, enemy: 0 });
  const hitBy = 5;

  const hitPlayer = (): void => {
    setPlayerLife(playerLife - hitBy);
    if (playerLife - hitBy <= 0) {
      setGameOver(true);
      setScores({ ...scores, enemy: scores.enemy + 1 });
    }
  }

  const hitEnemy = () => {
    setEnemyLife(enemyLife - hitBy);
    if (enemyLife - hitBy <= 0) {
      setGameOver(true);
      setScores({ ...scores, player: scores.player + 1 });
    }
  }

  const restartGame = () => {
    setPlayerLife(100);
    setEnemyLife(100);
    setPlayerX(-40);
    setEnemyX(40);
    setGameOver(false);
  }

  return (
    <div className='h-screen'>
      <SpaceGrid />
      <Ship
        playerLife={playerLife}
        hitPlayer={hitPlayer}
        playerX={playerX}
        setPlayerX={setPlayerX}
        enemyLife={enemyLife}
        enemyX={enemyX}
        setEnemyX={setEnemyX}
        hitEnemy={hitEnemy}
        gameOver={gameOver}
      />
      <Scores playerLife={playerLife} enemyLife={enemyLife} gameOver={gameOver} />
      <GameOver scores={scores} gameOver={gameOver} restartGame={restartGame} />
    </div>
  );
}
