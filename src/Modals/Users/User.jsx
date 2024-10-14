import { useEffect, useState } from "react"
import { GetJobs } from "../../Services/Jobs";
import { EditUser, GetUser, NewUser } from "../../Services/Users";
import { USER } from "../../Models/User";

export default function UserModal({
    identifier = null,
    show = false,
    setShow = () => { },
    onSuccess = () => { },
    onError = () => { },
    onClose = () => { },

}) {

    const [jobs, setJobs] = useState([]);
    const [user, setUser] = useState(USER);

    const [importing, setImporting] = useState(false);
    const [processing, setProcessing] = useState(false);

    const [errorOnImport, setErrorOnImport] = useState(false);
    const [errorOnProcess, setErrorOnProcess] = useState(false);


    useEffect(() => {

        if (show) {
            getJobs();
            if (identifier) getUser();
        }

    }, [show]);

    async function getJobs() {
        const result = await GetJobs();
        setJobs(result.data);
    }

    function closeModal() {
        setShow(false);
        setUser(USER);

        setErrorOnImport(null);
        setErrorOnProcess(null);

        setImporting(false);
        setProcessing(false);

        onClose();
    }


    async function getUser() {
        setImporting(true);
        try {
            const response = await GetUser(identifier);
            const result = response.data;
            setUser({ ...result, idCargo: result.cargo.idCargo });
        } catch (error) {
            setErrorOnImport(error?.response?.data?.message || error.message);
        }
        setImporting(false);
    }

    async function saveUser() {

        setProcessing(true);

        try {

            const { nomeEmpregado, email, idCargo, senha, ativo } = user;
            const response = identifier ?
                await EditUser(identifier, { nomeEmpregado, email, idCargo, senha, ativo }) :
                await NewUser({ nomeEmpregado, email, idCargo, senha, ativo });
            onSuccess(response.data);
            closeModal();

        } catch (error) {
            setErrorOnProcess(error?.response?.data?.message || error.message);
            onError(error);
        }

        setProcessing(false);


    }


    return (
        <>
            {show && <div className="modal-backdrop show"></div>}
            <div className={`modal ${show ? 'show d-block' : 'd-none'}`} tabindex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title">{identifier ? "Editar Usuário" : "Novo Usuário"}</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal} />
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label className="form-label required" htmlFor="nameInput">Nome:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nameInput"
                                    placeholder="Digite o nome do usuário ..."
                                    required
                                    disabled={processing || importing}
                                    value={user.nomeEmpregado}
                                    onChange={({ target }) => setUser(_ => ({ ..._, nomeEmpregado: target.value }))}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label required" htmlFor="emailInput">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="emailInput"
                                    placeholder="Informe o e-mail do usuário ..."
                                    required
                                    disabled={processing || importing}
                                    value={user.email}
                                    onChange={({ target }) => setUser(_ => ({ ..._, email: target.value }))}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label required" htmlFor="jobSelect">Cargo:</label>
                                <select
                                    className="form-control"
                                    id="jobSelect"
                                    name="idCargo"
                                    required
                                    disabled={processing || importing}
                                    value={user.idCargo}
                                    onChange={({ target }) => setUser(_ => ({ ..._, idCargo: target.value }))}
                                >
                                    {
                                        jobs.map(job =>
                                            <option key={job.idCargo} job-id={job.idCargo} value={job.idCargo}>{job.nomeCargo}</option>
                                        )
                                    }
                                </select>
                            </div>

                            {!identifier &&
                                <div className="mb-3">
                                    <label className="form-label required" htmlFor="passwordInput">Senha:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="passwordInput"
                                        placeholder="Digite a senha do usuário ..."
                                        required
                                        disabled={processing || importing}
                                        value={user.senha}
                                        onChange={({ target }) => setUser(_ => ({ ..._, senha: target.value }))}
                                    />
                                </div>
                            }

                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="ativoSwitch"
                                    required
                                    disabled={processing || importing}
                                    value={user.ativo}
                                    onChange={({ target }) => setUser(_ => ({ ..._, ativo: target.checked }))}
                                />
                                <label className="form-check-label" htmlFor="ativoSwitch">
                                    {user.ativo ? "Ativo" : "Inativo"}
                                </label>
                            </div>


                            {
                                errorOnImport &&
                                <div className="alert alert-warning mt-3" role="alert">
                                    {errorOnImport}
                                </div>
                            }

                            {
                                errorOnProcess &&
                                <div className="alert alert-warning mt-3" role="alert">
                                    {errorOnProcess}
                                </div>
                            }

                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>
                                Cancelar
                            </button>

                            <button type="button" className="btn btn-primary" onClick={saveUser} disabled={importing || processing}>
                                {processing ? (identifier ? "Salvando..." : "Cadastrando...") : (identifier ? "Salvar Alterações" : "Cadastrar")}
                            </button>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}