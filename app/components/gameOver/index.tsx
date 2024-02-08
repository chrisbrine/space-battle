export default function GameOver({
  scores,
  gameOver,
  restartGame,
}: {
  scores: { player: number, enemy: number },
  gameOver: boolean,
  restartGame: () => void,
}) {
  return (
    <div className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full' style={{display: gameOver ? 'block' : 'none'}}>
      <div className="relative p-4 w-full max-w-2xl max-h-full" style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
        <div className="relative p-8 bg-white rounded-lg shadow dark:bg-gray-700">
          <div className='mx-2 my-2 text-3xl text-center'>Game Over</div>
          <div className='mx-2 my-2 text-2xl text-center border-dashed border-gray-600 bg-gray-800'>
            <h4>Player</h4>
            {scores.player}
          </div>
          <div className='mx-2 my-2 text-2xl text-center border-dashed border-gray-600 bg-gray-800'>
            <h4>Enemy</h4>
            {scores.enemy}
          </div>
          <div className='mx-2 my-2 text-center'>
            <button className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700' onClick={restartGame}>Play Again</button>
          </div>
        </div>
      </div>
    </div>
  );
}