import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useTranslation } from 'react-i18next';

function TableUserPaginate(props) {

    const { listUsers, pageCount, currentPage, setCurrentPage } = props;
    const { t } = useTranslation();

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.fetchAllUsersPaginate(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
    };

    return (
        <>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">{t('admin.feature.manage-user.username')}</th>
                        <th scope="col">Email</th>
                        <th scope="col">{t('admin.feature.manage-user.role')}</th>
                        <th scope="col">{t('admin.feature.manage-user.actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={5}>{t('admin.feature.manage-user.message')}</td>
                        </tr>
                    }
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => props.handleClickBtnView(item)}>{t('admin.feature.manage-user.btn-view')}</button>
                                        <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(item)}>{t('admin.feature.manage-user.btn-update')}</button>
                                        <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(item)}>{t('admin.feature.manage-user.btn-delete')}</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <div className="user-pagination">
                <ReactPaginate
                    nextLabel={t('admin.feature.manage-user.next')}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel={t('admin.feature.manage-user.prev')}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    );
}

export default TableUserPaginate;