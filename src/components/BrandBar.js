import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Form} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Form className="d-flex">
            {device.brands.map(brand =>
                <Card key={brand.id} className="p-3 mx-1 "
                onClick={() => device.setSelectedBrand(brand)}
                border={brand.id === device.selectedBrand.id ?  'danger' : 'light'}
                style={{cursor: 'pointer'}}
                >
                    {brand.name}
                </Card>

            )}
            
        </Form>
    );
});// Form

export default BrandBar;