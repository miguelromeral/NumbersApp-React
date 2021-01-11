function Layout(props) {
    return (
        <div className="container">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
                {props.children}
            </div>
            <div className="col-lg-3"></div>
        </div>
    )
}

export default Layout