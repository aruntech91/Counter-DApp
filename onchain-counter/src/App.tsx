import React from 'react';
import ConnectWallet from './components/ConnectWallet';
import Counter from './components/Counter';


function App() {
  
  return (
   

    <div className='mt-2'>
      <div className='flex justify-between items-center '>
      <h1 className='text-xl p-1 font-semibold md:ml-20 ml-3 md:mr-0 mr-3 ' >On-Chain Counter (CKB)</h1>
      <a className='md:mr-20 mr-3 p-1 border rounded-md bg-white text-black font-semibold hover:bg-green-600' href="https://github.com/aruntech91/Counter-DApp" target='blank'>Source-Code</a>
     
    </div>
      <hr className=' mt-2 md:ml-20 ml-3 md:mr-20 mr-3' />
        <div className="rounded-md border mt-24 p-7 mr-3 ml-3 gap-y-5 items-center place-self-center">
          
          <ConnectWallet></ConnectWallet>
     <div className='mt-5'>
          <Counter />
          
          </div>
        </div>
    </div>
  );
}

export default App;
