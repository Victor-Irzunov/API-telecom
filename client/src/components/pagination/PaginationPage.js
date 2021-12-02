import React, { useContext } from 'react';
import {Context} from "../../index";
import { observer } from "mobx-react-lite";

import { Pagination } from "react-bootstrap";

const PaginationPage = observer(() => {
    const { dataStore } = useContext(Context);
    const countPage = Math.ceil(dataStore.totalCount / dataStore.limit);
    const pages = [];

    for (let i = 0; i < countPage; i++) {
        pages.push(i + 1);
    }

    return (
            <Pagination className="mt-3" size="sm">
                {pages.map(page =>
                    <Pagination.Item
                        key={page}
                        className=""
                        active={dataStore.page === page}
                        onClick={() => dataStore.setPage(page)}
                    >
                        {page}
                    </Pagination.Item>
                )}
            </Pagination>
    );
});

export default PaginationPage;