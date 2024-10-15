export default function PageHeader({ title = "Título da Página", children }) {
    return (
        <div className="row mb-3 align-items-center">
            <div className="col-4">
                <h4 className="mb-0 pb-0">{title}</h4>
            </div>
            <div className="col ms-auto">
                {children}
            </div>
        </div>
    )
}