function Layout(props) {
    return (
        <div className="container">
            <div className="col-2"></div>
            <div className="col-8">
                {props.children}
            </div>
            <div className="col-2"></div>
        </div>
    )
}

export default Layout