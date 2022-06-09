/**
 * Sources
 * Toggle switch Codepen: https://codepen.io/mauriziovacca/pen/zRWgyR
 */

import { Dispatch, SetStateAction, useState } from 'react';
import './LinkSwitch.css';

const LinkSwitch = ({setShowLinks}: {setShowLinks: Dispatch<SetStateAction<boolean>>}) => {
    const [checked, setChecked] = useState(true);
    const onSwitch = () => {
        setChecked(!checked);
        setShowLinks(!checked);
    }; 

    return (
        <div className='ToggleSwitch ToggleSwitch__rounded switch' >
            <div className='ToggleSwitch__wrapper'>
                <div className={`Slider ${checked && 'isChecked'}`} onClick={onSwitch}></div>
            </div>
        </div>
    )
}

export default LinkSwitch;