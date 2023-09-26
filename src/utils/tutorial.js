import React from 'react';
import { Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

const login = 'https://s3.us-east-2.amazonaws.com/videos.roommateuy/login.mov';
const registrar = 'https://s3.us-east-2.amazonaws.com/videos.roommateuy/registrar.mov';
const buscar = 'https://s3.us-east-2.amazonaws.com/videos.roommateuy/buscar.mov';
const facebook = 'https://s3.us-east-2.amazonaws.com/videos.roommateuy/facebook.mov';
const matching = 'https://s3.us-east-2.amazonaws.com/videos.roommateuy/matching.mov';
const publicar = 'https://s3.us-east-2.amazonaws.com/videos.roommateuy/publicar.mov';
const favoritos = 'https://s3.us-east-2.amazonaws.com/videos.roommateuy/fav.mov';

const Tutorial = () => (
    <Container>
        <div id="user-listings-box">
            <FontAwesomeIcon
                icon={faQuestion}
                color="#778899"
                size="2x"
            /><h5 style={{ display: "inline-block", marginLeft: "15px" }}>Tutorial</h5>

            <div className="row">
                <div className="col-md-12 text-center">
                    <h5>Login</h5>

                    <video width="80%" controls>
                        <source src={login} type="video/mp4" />
                        <source src={login} type="video/ogg"/>
                    </video>
                </div>

                <div className="col-md-12 text-center" style={{ marginTop: "40px" }}>
                    <h5>Login con Facebook</h5>

                    <video width="80%" controls>
                        <source src={facebook} type="video/mp4" />
                        <source src={facebook} type="video/ogg"/>
                    </video>
                </div>

                <div className="col-md-12 text-center" style={{ marginTop: "40px" }}>
                    <h5>Registrar</h5>

                    <video width="80%" controls>
                        <source src={registrar} type="video/mp4" />
                        <source src={registrar} type="video/ogg"/>
                    </video>
                </div>

                <div className="col-md-12 text-center" style={{ marginTop: "40px" }}>
                    <h5>Buscar habitación</h5>

                    <video width="80%" controls>
                        <source src={buscar} type="video/mp4" />
                        <source src={buscar} type="video/ogg"/>
                    </video>
                </div>

                <div className="col-md-12 text-center" style={{ marginTop: "40px" }}>
                    <h5>Publicar habitación</h5>

                    <video width="80%" controls>
                        <source src={publicar} type="video/mp4" />
                        <source src={publicar} type="video/ogg"/>
                    </video>
                </div>

                <div className="col-md-12 text-center" style={{ marginTop: "40px" }}>
                    <h5>Favoritos</h5>

                    <video width="80%" controls>
                        <source src={favoritos} type="video/mp4" />
                        <source src={favoritos} type="video/ogg"/>
                    </video>
                </div>

                <div className="col-md-12 text-center" style={{ marginTop: "40px", marginBottom: "40px" }}>
                    <h5>Matching</h5>

                    <video width="80%" controls>
                        <source src={matching} type="video/mp4" />
                        <source src={matching} type="video/ogg"/>
                    </video>
                </div>
            </div>
        </div>
    </Container>
);

export default Tutorial;
