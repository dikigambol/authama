import { Fragment, useEffect, useRef, useState } from "react";
import HeaderAdmin from "../../components/header-admin";
import { addProduct, deleteProduct, editProduct, isAuth, listProducts } from "@/lib/axios";
import { getToken } from "@/utils/configToken";
import { jwtDecode } from "jwt-decode";
import { failedAlert, successAlert } from "@/utils/alertSwal";
import TableView from "@/components/tables";

const today = new Date();
// random string hanya sementara sampai api blockchain ready 
const randomString = today.getTime().toString(36) + Math.random().toString(36).substr(2);

const initialStateForm = {
    products_name: "",
    description: "",
    sku: "",
    id_trx: randomString,
    batch_code: "",
    id_writer: "",
    created_at: today.toISOString().slice(0, 10)
}

export default function Proucts() {
    const [list, setList] = useState([])
    const [form, setForm] = useState(initialStateForm)
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const modal = useRef(null)

    async function fetchListProduct(id, token) {
        const res = await listProducts(id, token)
        if (res) {
            setList(res)
        }
    }

    useEffect(() => {
        let token = getToken();
        const userdata = jwtDecode(token)
        async function checkAuth() {
            const res = await isAuth(token);
            setAuthenticated(res);
        }
        checkAuth();
        fetchListProduct(userdata.id, token)
        setForm({
            ...form,
            id_writer: userdata.id
        })
    }, []);

    function formHandler(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function postProduct(e) {
        e.preventDefault()
        let token = getToken();
        const userdata = jwtDecode(token)
        setLoading(true)
        if (!isEdit) {
            const res = await addProduct(form, token)
            if (res.status) {
                successAlert()
                modal.current.click();
                setForm(initialStateForm)
                setLoading(false)
                fetchListProduct(userdata.id, token)
            } else {
                failedAlert()
                modal.current.click();
                setForm(initialStateForm)
                setLoading(false)
                fetchListProduct(userdata.id, token)
            }
        } else {
            const res = await editProduct(form, token)
            if (res.status) {
                successAlert()
                modal.current.click();
                setForm(initialStateForm)
                setLoading(false)
                fetchListProduct(userdata.id, token)
            } else {
                failedAlert()
                modal.current.click();
                setForm(initialStateForm)
                setLoading(false)
                fetchListProduct(userdata.id, token)
            }
        }
    }

    async function handleDelete(id) {
        let token = getToken();
        const userdata = jwtDecode(token)
        const res = await deleteProduct(id, token)
        if (res.status) {
            successAlert()
            fetchListProduct(userdata.id, token)
        } else {
            failedAlert()
            fetchListProduct(userdata.id, token)
        }
    }

    function showDetail(id) {
        const filteredData = list.filter(item => item._id == id);
        setForm(filteredData[0])
    }

    return (
        <Fragment>
            {!authenticated ? null :
                <>
                    <HeaderAdmin />
                    <div className="az-content az-content-dashboard">
                        <div className="container">
                            <div className="az-content-body">
                                <h2 className="az-dashboard-title mb-4">List of Products.</h2>
                                <div className="row">
                                    <div className="col-lg-12 mt-2">
                                        <button className="btn btn-indigo btn-with-icon mb-4" data-toggle="modal" data-target="#products-modal"
                                            onClick={() => setIsEdit(false)}>
                                            <i className="typcn typcn-document-text" /> Add Product
                                        </button>
                                        <div className="table-responsive mt-1">
                                            <table className="table table-hover mg-b-0">
                                                <thead>
                                                    <tr>
                                                        <th>Num</th>
                                                        <th>ID Transaction</th>
                                                        <th>Product Name</th>
                                                        <th>Stock Keeping Unit</th>
                                                        <th>Batch Code</th>
                                                        <th>Option</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list.map((x, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <th scope="row">{i + 1}</th>
                                                                <td>{x.id_trx}</td>
                                                                <td>{x.products_name}</td>
                                                                <td>{x.sku}</td>
                                                                <td>
                                                                    <span className="badge badge-pill badge-dark">{x.batch_code}</span>
                                                                </td>
                                                                <td>
                                                                    <button data-toggle="dropdown" className="btn btn-indigo btn-sm">Option <i className="icon ion-ios-arrow-down tx-11 mg-l-3" /></button>
                                                                    <div className="dropdown-menu">
                                                                        <a href="#" className="dropdown-item" data-toggle="modal" data-target="#products-modal"
                                                                            onClick={() => {
                                                                                showDetail(x._id);
                                                                                setIsEdit(true);
                                                                            }}
                                                                        >Update</a>
                                                                        <a href="#" className="dropdown-item" onClick={() => handleDelete(x._id)}>Delete</a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* product modal  */}
                    <div id="products-modal" className="modal" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Products Form</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={modal}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <form onSubmit={postProduct}>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label className="col-form-label">Product Name:</label>
                                                    <input type="text" className="form-control" name="products_name"
                                                        onChange={formHandler}
                                                        value={form.products_name}
                                                        disabled={loading}
                                                        required />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label className="col-form-label">Description:</label>
                                                    <textarea className="form-control" name="description"
                                                        onChange={formHandler}
                                                        value={form.description}
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Stock Keeping Unit:</label>
                                                    <input type="number" className="form-control" name="sku"
                                                        onChange={formHandler}
                                                        value={form.sku}
                                                        disabled={loading}
                                                        required />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Batch Code:</label>
                                                    <input type="text" className="form-control" name="batch_code"
                                                        onChange={formHandler}
                                                        value={form.batch_code}
                                                        disabled={loading}
                                                        required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-indigo" disabled={loading}>{loading ? "Loading.." : "Save"}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            }
        </Fragment>
    )
}