/*import React, {useContext} from 'react';
import {observe} from "mobx";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const Pages = observe(() => {
    const {device} = useContext(Context)
    const pages = [1,2,3,4,5]
    return (
        <Pagination className={"mt-5"}>
            {pages.map(page =>
            <Pagination.Item>{page}</Pagination.Item>)}

        </Pagination>
    );
})

export default Pages;*/