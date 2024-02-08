'use client';

import { CSSProperties, useState, useEffect, useCallback } from "react";

export default function SpaceCraft({
  playerLife,
  playerX,
  setPlayerX,
  hitPlayer,
  enemyLife,
  enemyX,
  setEnemyX,
  hitEnemy,
  gameOver,
}: {
  playerLife: number,
  playerX: number,
  setPlayerX: (x: number) => void,
  hitPlayer: () => void,
  enemyLife: number,
  enemyX: number,
  setEnemyX: (x: number) => void,
  hitEnemy: () => void,
  gameOver: boolean,
}) {
  const [lasers, setLasers] = useState(false);
  const [enemyLasers, setEnemyLasers] = useState(false);
  const [laserInterval, setLaserInterval] = useState<any>(null);
  const [enemyLaserInterval, setEnemyLaserInterval] = useState<any>(null);
  const [enemyMoveInterval, setEnemyMoveInterval] = useState<any>(null);
  const [laserColor, setLaserColor] = useState('red');
  const [enemyLaserColor, setEnemyLaserColor] = useState('red');
  const xMin = -50;
  const xMax = 50;
  const xMove = 2;
  const xMoveFast = 6;
  const calculatePosition = () => {
    if (playerX < xMin) {
      return 0;
    } else if (playerX > xMax) {
      return 100;
    } else {
      return playerX + 50;
    }
  }
  const calculateEnemyPosition = () => {
    if (enemyX < xMin) {
      return 0;
    } else if (enemyX > xMax) {
      return 100;
    } else {
      return enemyX + 50;
    }
  }
  const currentShipStyle: CSSProperties = {
    position: 'fixed',
    bottom: 2,
    left: `${calculatePosition()}%`,
    transform: 'translateX(-50%)',
  };

  const currentLaserStyle: CSSProperties = {
    position: 'fixed',
    display: lasers ? 'block' : 'none',
    width: 10,
    height: 'calc(100vh - 96px)',
    top: 0,
    left: `${calculatePosition()}%`,
    transform: 'translateX(-50%)',
    fill: laserColor,
    stroke: laserColor,
  };

  const currentEnemyLaserStyle: CSSProperties = {
    position: 'fixed',
    display: enemyLasers ? 'block' : 'none',
    width: 10,
    height: 'calc(100vh - 96px)',
    bottom: 0,
    left: `${calculateEnemyPosition()}%`,
    transform: 'translateX(-50%)',
    fill: enemyLaserColor,
    stroke: enemyLaserColor,
  };

  const currentEnemyShipStyle: CSSProperties = {
    position: 'fixed',
    top: 2,
    left: `${calculateEnemyPosition()}%`,
    transform: 'translateX(-50%) scaleY(-1)',
  };

  const checkLaserHit = useCallback(() => {
    if (lasers && Math.abs(playerX - enemyX) < 45) {
      hitEnemy();
    }
  }, [lasers, playerX, enemyX, hitEnemy]);

  const fireLasers = useCallback(() => {
    if (!laserInterval) {
      setLasers(true);
      setLaserColor('red');
      checkLaserHit();
      const interval = setInterval(() => {
        clearInterval(interval);
        setLaserColor('orange');
        checkLaserHit();
        const secondInterval = setInterval(() => {
          setLasers(false);
          clearInterval(secondInterval);
          setLaserColor('red');
          const thirdInterval = setInterval(() => {
            clearInterval(thirdInterval);
            setLaserInterval(null);
          }, 350);
          setLaserInterval(thirdInterval);
        }, 65);
        setLaserInterval(secondInterval);
      }, 85);
      setLaserInterval(interval);
    }
  }, [checkLaserHit, laserInterval]);

  const checkEnemyLaserHit = useCallback(() => {
    if (enemyLasers && Math.abs(playerX - enemyX) < 45) {
      hitPlayer();
    }
  }, [enemyLasers, playerX, enemyX, hitPlayer]);

  const fireEnemyLasers = useCallback(() => {
    if (!enemyLaserInterval) {
      setEnemyLasers(true);
      setEnemyLaserColor('purple');
      checkEnemyLaserHit();
      const interval = setInterval(() => {
        clearInterval(interval);
        setEnemyLaserColor('blue');
        checkEnemyLaserHit();
        const secondInterval = setInterval(() => {
          setEnemyLasers(false);
          clearInterval(secondInterval);
          setEnemyLaserColor('purple');
          const thirdInterval = setInterval(() => {
            clearInterval(thirdInterval);
            setEnemyLaserInterval(null);
          }, 350);
          setEnemyLaserInterval(thirdInterval);
        }, 65);
        setEnemyLaserInterval(secondInterval);
      }, 85);
      setEnemyLaserInterval(interval);
    }
  }, [enemyLaserInterval, checkEnemyLaserHit]);


  const enemyMove = useCallback(() => {
    const randomMove = Math.random() > 0.30;
    if (gameOver) {
      return;
    }

    if (randomMove) {
      if (enemyX < playerX - 30) {
        setEnemyX(enemyX + (xMoveFast));
      } else if (enemyX > playerX + 30) {
        setEnemyX(enemyX - (xMoveFast));
      } else if (enemyX < playerX - 1) {
        setEnemyX(enemyX + (xMove));
      } else if (enemyX > playerX + 1) {
        setEnemyX(enemyX - (xMove));
      }
      const randomFire = Math.random() > 0.60;
  
      if (randomFire && enemyX > playerX - 5 && enemyX < playerX + 5) {
        fireEnemyLasers();
      }
    }
  }, [enemyX, fireEnemyLasers, gameOver, playerX, setEnemyX]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) {
        return;
      }
      enemyMove();
      checkEnemyLaserHit();
      checkLaserHit();
      if (e.key === 'ArrowLeft') {
        if (playerX - xMove > xMin) {
          setPlayerX(playerX - xMove);
        } else {
          setPlayerX(xMin);
        }
      } else if (e.key === 'ArrowRight') {
        if (playerX + xMove < xMax) {
          setPlayerX(playerX + xMove);
        } else {
          setPlayerX(xMax);
        }
      } else if (e.key === 'ArrowUp') {
        if (playerX + xMoveFast < xMax) {
          setPlayerX(playerX + xMoveFast);
        } else {
          setPlayerX(xMax);
        }
      } else if (e.key === 'ArrowDown') {
        if (playerX - xMoveFast > xMin) {
          setPlayerX(playerX - xMoveFast);
        } else {
          setPlayerX(xMin);
        }
      } else if (e.key === ' ') {
        fireLasers();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerX, xMin, xMax, xMove, xMoveFast, gameOver, fireLasers, enemyMove, checkEnemyLaserHit, checkLaserHit, setPlayerX]);

  return (
    <section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 5000" style={currentLaserStyle}>
        <line x1="5" y1="0" x2="5" y2="5000" style={{ strokeWidth: 10 }} />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 5000" style={currentEnemyLaserStyle}>
        <line x1="5" y1="0" x2="5" y2="5000" style={{ strokeWidth: 10 }} />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 200 200" style={currentEnemyShipStyle}>
        <polygon points="100,0 0,150 35,161 100,200 165,161 200,150" style={{ fill: 'red', stroke: 'orange', strokeWidth: 3, zIndex: 1000 }} />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 200 200" style={currentShipStyle}>
        <polygon points="100,0 0,150 35,161 100,200 165,161 200,150" style={{ fill: 'lime', stroke: 'purple', strokeWidth: 3, zIndex: 1000 }} />
      </svg>
    </section>
  );
}

