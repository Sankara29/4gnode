
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import API_URL from '../../../config'
import { Col, Input, Label, Row, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap'
import { Info } from 'react-feather'
import dayjs from 'dayjs'


const index = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const gridRef = useRef()
    // Fetch data


    const fetchData = async () => {
        try {
            console.log("⏳ Fetching latest logs...");

            // Step 1: Fetch latest logs
            const res = await fetch("https://api.ms-tech.in/v17/port-check");
            const json = await res.json();
            const logs = json || [];



            // Step 5: Merge TM into logs
            const finalData = logs.map(node => ({
                ...node,
                // tm: tmMap[node.node_id] || null
            }));

            console.log("✅ Final merged data:", finalData);

            setData(finalData);

        } catch (error) {
            console.error("❌ Error fetching data:", error);
            setData([]);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);




    const columnDefs = useMemo(() => [
        { headerName: 'DCU', field: 'dcu_id', flex: 2 },
        {
            headerName: "port1", field: "port_1", flex: 1, valueFormatter: (params) => {
                const value = params.value;

                return value === "error" ? "Failed" : 'Success';
            },
        },
        {
            headerName: "port2", field: "port_2", flex: 1, valueFormatter: (params) => {
                const value = params.value;

                return value === "error" ? "Failed" : 'Success';
            },
        },
        {
            headerName: "port3", field: "port_3", flex: 1, valueFormatter: (params) => {
                const value = params.value;

                return value === "error" ? "Failed" : 'Success';
            },
        },
        {
            headerName: "port4", field: "port_4", flex: 1, valueFormatter: (params) => {
                const value = params.value;

                return value === "error" ? "Failed" : 'Success';
            },
        },
        {
            headerName: 'Time',
            field: 'created_at',
            flex: 2,
            valueFormatter: (params) => {
                const value = params.value;
                if (!value) return 'Not Communicated';

                const dateStr = value.split("T")[0]; // "6/27/2024"
                const date = dayjs(dateStr, 'YYYY-MM-DD');
                return date.isValid() ? date.format('MMM-DD-YY') : 'Not Communicated';
            },
            exportValueGetter: (params) => {
                const value = params.value;
                if (!value) return 'Not Communicated';

                const dateStr = value.split("T")[0];
                const date = dayjs(dateStr, 'YYYY-MM-DD');
                return date.isValid() ? date.format('YYYY-MM-DD') : 'Not Communicated';
            },
            filter: 'agDateColumnFilter',
            filterParams: {
                // filterOptions: ['equals', 'notEqual'],
                suppressAndOrCondition: true,
                browserDatePicker: true,
                applyButton: true,
                clearButton: true,
                comparator: (filterDate, cellValue) => {
                    if (!cellValue) return -1;
                    const dateStr = cellValue.split("T")[0];
                    const cellDate = dayjs(dateStr, 'YYYY-MM-DD').startOf('day');
                    const fDate = dayjs(filterDate).startOf('day');

                    if (!cellDate.isValid() || !fDate.isValid()) return 0;
                    if (cellDate.isBefore(fDate)) return -1;
                    if (cellDate.isAfter(fDate)) return 1;
                    return 0;
                }
            }
        }
        // ,
        // {
        //     headerName: 'gettime',
        //     field: 'tm',
        //     flex: 2,
        //     valueFormatter: (params) => {
        //         const date = dayjs(params.value, 'MM/DD/YY HH:mm:ss');
        //         return date.isValid() ? date.format('MMM-DD') : 'Not Communicated';
        //     },
        //     exportValueGetter: (params) => {
        //         const date = dayjs(params.value, 'MM/DD/YY HH:mm:ss');
        //         return date.isValid() ? date.format('YYYY-MM-DD') : 'Not Communicated';
        //     },
        //     filter: 'agDateColumnFilter',
        //     filterParams: {
        //         // filterOptions: ['equals', 'notEqual'],
        //         suppressAndOrCondition: true,
        //         browserDatePicker: true,
        //         applyButton: true,
        //         clearButton: true,
        //         comparator: (filterDate, cellValue) => {
        //             if (!cellValue) return -1;
        //             const cellDate = dayjs(cellValue, 'MM/DD/YY HH:mm:ss').startOf('day');
        //             const fDate = dayjs(filterDate).startOf('day');
        //             if (!cellDate.isValid() || !fDate.isValid()) return 0;

        //             if (cellDate.isBefore(fDate)) return -1;
        //             if (cellDate.isAfter(fDate)) return 1;
        //             return 0;
        //         }
        //     }
        // },

    ], []);
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        flex: 1,
        filterParams: { buttons: ['apply', 'reset'] }
    }), [])

    const onGridReady = (params) => {
        gridRef.current = params.api
    }
    return (
        <>

            <h1>NSDCU Test List</h1>
            <Row className='d-flex justify-content-between  align-items-end mb-4' >

                {/* Node ID Search */}
                <Col md='3' sm='6'>
                    {/* <div className='mb-1'> */}
                    <Label className='form-label'>Search</Label>
                    <Input
                        type='text'
                        placeholder='Search anything...'
                        onChange={(e) => {
                            if (gridRef.current) {
                                gridRef.current.setQuickFilter(e.target.value);
                            }
                        }}
                    />
                    {/* </div> */}
                </Col>


            </Row>
            <div className="ag-theme-alpine" style={{ height: '674px', width: '100%' }}>
                {data.length > 0 ? (
                    <AgGridReact
                        ref={gridRef}
                        rowData={data}
                        columnDefs={columnDefs}
                        animateRows
                        rowSelection="multiple"
                        pagination
                        paginationPageSize={12}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                    // onCellContextMenu={handleCellRightClick}
                    />
                ) : <p>No Data Found</p>}
            </div>

        </>
    )
}

export default index;