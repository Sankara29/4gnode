import { lazy } from "react";


const NodeList = lazy(() => import("../../views/dashboard/NodeList/index.js"))
const NodeList4g = lazy(() => import("../../views/dashboard/4gNodes/index.js"))
const EspdcuTest = lazy(() => import("../../views/dashboard/espdcu_test/index.jsx"))
//Nayana
const DashboardRoutes = [


  {
    path: "/dashboard/node_list",
    element: <NodeList />
  }, {
    path: "/dashboard/node_list_4g",
    element: <NodeList4g />
  }, {
    path: "/dashboard/espdcu_test",
    element: <EspdcuTest />
  }

];

export default DashboardRoutes;
