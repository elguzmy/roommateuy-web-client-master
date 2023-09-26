import React from 'react';
import './userSettings.css';

const UserSettings = (props) => (
    <div id="user-settings-box">
        <div className="row">
            <h4 id="user-settings-h4">Configuración</h4>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="slc-user-notification" className="control-label col-lg-6">Notificaciones</label>
                        <select id="slc-user-notification" className="form-control col-lg-6" >
                            <option>Si</option>
                            <option>No</option>
                        </select>
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="slc-user-status" className="control-label col-lg-6">Status</label>
                        <select id="slc-user-status" className="form-control col-lg-6" >
                            <option>Activo</option>
                            <option>Inactivo</option>
                        </select>
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-save">Guardar</button>
                    <button type="submit" className="btn btn-primary btn-cancel">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
)

export default UserSettings;