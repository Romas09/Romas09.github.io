import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {

    const {device} = useContext(Context)
    console.log(device)
    return (
       <ListGroup>
           {device.types.map(type =>
               <ListGroup.Item active={type.id === device.selectedType.id}
                   onClick={() => device.setSelectedType(type)}
                   key={type.id} style={{cursor: 'pointer'}}

               >
                   {type.name}
               </ListGroup.Item>
           )}
       </ListGroup>
    );
});


export default TypeBar;
