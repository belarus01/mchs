
import { Row, Col, Card, Image } from "antd";
import { LoginForm } from "../components/forms/LoginForm"

const LoginPage = () =>(
    <div>
        <div className="login-div">
        <Image width={400} src={ require('../logo.png') }></Image>
        </div>
       
        <div className="login-div">
     <Card title="Вход в АПК КНО" className="login-card" style={{width:700}}>
        <LoginForm/>
     </Card>
    </div>
    </div>
    
    
);
export default LoginPage;
