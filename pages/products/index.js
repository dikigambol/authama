import { Fragment, useEffect, useRef, useState } from "react";
import HeaderAdmin from "../../components/header-admin";
import { addProduct, deleteProduct, editProduct, isAuth, listProducts } from "@/lib/axios";
import { getToken } from "@/utils/configToken";
import { jwtDecode } from "jwt-decode";
import { failedAlert, successAlert } from "@/utils/alertSwal";
import QRCode from "react-qr-code";
import ProductTable from "@/components/product/table";

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
    const [listLoading, setListLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [baseUrl, setBaseUrl] = useState('');

    const modal = useRef(null)

    const generateQRCode = (id, product_name) => {
        const svg = document.getElementById(id);
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = product_name;
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };

    async function fetchListProduct(id, token) {
        setListLoading(true)
        const res = await listProducts(id, token)
        if (res) {
            setList(res)
            setListLoading(false)
        }
    }

    useEffect(() => {
        let token = getToken();
        const userdata = jwtDecode(token)
        const url = window.location.origin;
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
        setBaseUrl(url);
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

    const columns = [
        {
            Header: 'Num',
            accessor: 'num',
        },
        {
            Header: 'Transaction ID',
            accessor: 'id_trx',
        },
        {
            Header: 'Product Name',
            accessor: 'products_name',
        },
        {
            Header: 'Stock Keeping Unit',
            accessor: 'sku',
        },
        {
            Header: 'Batch Code',
            accessor: 'batch_code',
        },
        {
            Header: 'Option',
            accessor: 'actions',
        },
    ]

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
                                            onClick={() => setIsEdit(false)} disabled={listLoading}>
                                            <i className="typcn typcn-document-text" /> Add Product
                                        </button>
                                        <ProductTable
                                            columns={columns}
                                            data={list}
                                            baseUrl={baseUrl}
                                            listLoading={listLoading}
                                            setIsEdit={setIsEdit}
                                            showDetail={showDetail}
                                            handleDelete={handleDelete}
                                            generateQRCode={generateQRCode}
                                        />
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