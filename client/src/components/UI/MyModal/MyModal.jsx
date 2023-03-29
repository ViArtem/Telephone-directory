import React from 'react';
import classes from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {

const rootClasses= [classes.myModal]

//передаєм вісібл якщо він буде то буде видно модальне вікно, якщо ні то ні
//подивитись як в відео це роблять
if(visible){
    rootClasses.push(classes.active)
}

return(
<div className={rootClasses.join(' ')} onClick={()=>{setVisible(false)}}>
    <div className={classes.myModalContent} onClick={(e)=>{e.stopPropagation()}}>
        {children}
    </div>
</div>
)
};

export default MyModal;