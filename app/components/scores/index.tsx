export default function Scores({
  playerLife,
  enemyLife,
  gameOver,
}: {
  playerLife: number,
  enemyLife: number,
  gameOver: boolean,
}) {
  return (
    <div className='flex w-full justify-between text-3xl text-white' style={{zIndex: 2000, top: 0, left: 0, position: 'fixed'}}>
      <div className='mx-2 my-2'>Player: {playerLife}</div>
      <div className='mx-2 my-2'>{gameOver ? 'Game Over' : ''}</div>
      <div className='mx-2 my-2'>Enemy: {enemyLife}</div>
    </div>
  );
}