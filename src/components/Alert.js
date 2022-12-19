import { useContext } from 'react'
import { FaPencilAlt } from 'react-icons/fa';
import { AlertContext } from '../context/alert/AlertContext';

const Alert = () => {

  const { alert } = useContext(AlertContext);

  return alert !== null && (
    <div className='flex items-center w-full justify-center text-center mb-4'>
      {alert.type === 'error' && (
        <p className="flex-1 text-base font-semibold text-white text-center leading-7"><strong>{alert.msg}</strong><FaPencilAlt className='inline pb-[5px]' /></p>
      )}
    </div>
  )
}

export default Alert;