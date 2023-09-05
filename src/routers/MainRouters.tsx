import { HashRouter,Routes,Route } from "react-router-dom"
import { Login } from "../Views/Login/Login"
import App from "../App"
import Home from "../Views/home/Home"
import { Productos } from "../Views/Productos/Productos"
import { Pedidos } from "../Views/Pedidos/Pedidos"
import { PedidosPDF } from "../Views/pdfs/pedidos/PedidosPDF"
import { Portafolios } from "../Views/Portafolios/Portafolios"
import { CargarContenedor } from "../Views/Compras/CargarContenedor/CargarContenedor"
import { Catalogos } from "../Views/catalogos/Catalogos_Pdf/Catalogos"
import { Ver_Catalogos } from "../Views/catalogos/VerCatalogos/Ver_Catalogos"
import ROUTES_PATHS from "./Paths"

const MainRouters = () => {
    return(
        <HashRouter>
            <Routes>
                <Route path="/" Component={App}/>
                <Route path={ROUTES_PATHS.LOGIN} Component={Login}/>
                <Route path={ROUTES_PATHS.HOME} Component={Home}/>
                <Route path={ROUTES_PATHS.PRODUCTOS} Component={Productos}/>
                <Route path={ROUTES_PATHS.PEDIDOS} Component={Pedidos}/>
                <Route path={ROUTES_PATHS.PORTAFOLIOS} Component={Portafolios}/>
                <Route path={ROUTES_PATHS.CARGAR_COMPRAS} Component={CargarContenedor}/>
                <Route path={ROUTES_PATHS.CATALOGOS} Component={Catalogos}/>
                <Route path={ROUTES_PATHS.VER_CATALOGOS} Component={Ver_Catalogos}/>

                <Route path="/pedidos/pdf/:pedidoId" Component={PedidosPDF}/>
            </Routes>
        </HashRouter>
    )
}

export default MainRouters