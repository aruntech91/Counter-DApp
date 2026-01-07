import React from 'react';
import ConnectWallet from './components/ConnectWallet';
import Counter from './components/Counter';


function App() {
  
  return (
   

    <div className='text-2xl p-3 font-semibold'>
      On-Chain-Counter (CKB)

      <hr className='mt-1' />
        <div className="mt-24 gap-y-5 items-center place-self-center">
          
          <ConnectWallet></ConnectWallet>
     <div className='mt-5'>
          <Counter />
          
          </div>
        </div>
    </div>
  );
}

export default App;
