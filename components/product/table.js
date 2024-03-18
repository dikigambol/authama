import QRCode from 'react-qr-code';
import { useTable, useGlobalFilter, usePagination } from 'react-table';

const ProductTable = ({ columns, data, baseUrl, listLoading, setIsEdit, showDetail, handleDelete, generateQRCode }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setPageSize,
        state,
        setGlobalFilter,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useGlobalFilter,
        usePagination
    );

    const { globalFilter, pageIndex, pageSize } = state;

    if (listLoading) {
        return <div className="loader mt-5 mb-5"></div>
    }

    return (
        <div>
            <div className="mt-4 mb-2">
                <span>View : </span>
                <select onClick={(e) => setPageSize(e.target.value)}>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={rows.length}>All</option>
                </select>
            </div>
            <input
                className='form-control mb-3'
                type="text"
                value={globalFilter || ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search..."
            />
            <div className="table-responsive mt-2">
                <table {...getTableProps()} className="table table-hover mg-b-0">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, index) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={row.id}>
                                    {row.cells.map((cell, cellIndex) => {
                                        if (cell.column.id === 'num') {
                                            const absoluteIndex = pageIndex * pageSize + index + 1;
                                            return <td key={cellIndex}>{absoluteIndex}</td>;
                                        }
                                        if (cell.column.id === 'batch_code') {
                                            return <td key={index}><span className="badge badge-pill badge-dark">{row.original.batch_code}</span></td>
                                        }
                                        if (cell.column.id === 'actions') {
                                            return (
                                                <td key={cell.column.id} {...cell.getCellProps()}>
                                                    <QRCode
                                                        id={row.original.id_trx}
                                                        value={baseUrl + "/qr?data=" + row.original.id_trx}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <button data-toggle="dropdown" className="btn btn-indigo btn-sm">Option <i className="icon ion-ios-arrow-down tx-11 mg-l-3" /></button>
                                                    <div className="dropdown-menu">
                                                        <a href="#" className="dropdown-item" onClick={() => generateQRCode(row.original.id_trx, row.original.products_name)}>Generate QrCode</a>
                                                        <a href="#" className="dropdown-item" data-toggle="modal" data-target="#products-modal"
                                                            onClick={() => {
                                                                showDetail(row.original._id);
                                                                setIsEdit(true);
                                                            }}
                                                        >Update</a>
                                                        <a href="#" className="dropdown-item" onClick={() => handleDelete(row.original._id)}>Delete</a>
                                                    </div>
                                                </td>
                                            );
                                        }
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-right">
                <button className='btn btn-indigo btn-sm mr-2' onClick={() => previousPage()} disabled={!canPreviousPage}>
                    previous
                </button>
                <span> {pageIndex + 1}</span>
                <button className='btn btn-indigo btn-sm ml-2' onClick={() => nextPage()} disabled={!canNextPage}>
                    next
                </button>
            </div>
        </div>
    );
};

export default ProductTable;